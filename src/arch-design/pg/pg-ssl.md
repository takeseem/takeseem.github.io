---
title: PostgreSQL 配置 SSL
icon: fa-brands fa-expeditedssl
date: 2024-11-13 11:26:57
category:
  - 架构
  - postgres
tag:
  - 架构
  - postgres
  - SSL
order: 10
star: true
---

## SSL 加密
::: tip
- 先阅读：[SSL/TLS 加密](../net/ssl.md)，了解 私钥、证书、证书验证、CA、SAN 等概念
:::

- 根据官方文档：[安全 TCP/IP 连接](https://www.postgresql.org/docs/current/ssl-tcp.html)，参考最后的脚本生成证书，再配置后就可以使用 SSL 加密连接 PostgreSQL 了。

- 证书签名示意图：

![证书签名示意图](pg-ssl-certs.png =50%x)

## 生产环境配置

- 生产环境中，建议使用 CA 机构颁发的证书，以确保证书的完整性和可靠性。
- 不过使用自签证书也是可以的

## 通讯安全
- 内网：安全通常用网络控制，嗅探风险小，可 http 通讯，数据库可选 SSL （verify ca | full）仅验证服务器
- 外网：因流量走公网存在嗅探甚至中间人攻击，故需要确保：防窃听 + 防 MITM（中间人）
  - 客户端和服务器需要双向 verify-full | verify-ca

## 根证书和中间证书
- 证书说明
  - DN 设置 -subj 参数说明：`/C=国家/ST=省/L=城市/O=组织/OU=部门或单位/CN=服务的FQDN或常用名/emailAddress=邮件`
  - DN 示例：`/O=demo/OU=prd/CN=root.prd.demo.com"`
  - prd.demo.com: `prd` 代表生产环境
  - root 根证书：`/O=demo/OU=prd/CN=root.prd.demo.com`
  - inter 中间证书：`/O=demo/OU=prd/CN=inter.prd.demo.com`

- 创建根证书和中间证书脚本
  - 生成 root.prd 和 intr.prd 证书，（为什么设置 20 年？一是省事，二是 20 年后都退休了😸️）
  - `root.prd.key` 一定要设置密码，防止泄露，并放在安全的地方。
  - `inter.prd.key` 也要设置密码，并放在安全的地方。中间证书是一种安全隔离，一是保证根证书的安全性，二是便于签署服务器证书和客户端证书。
  - `chattr +i` 锁定文件，防止误删和修改。
```bash
# root
openssl req -new -text -out root.prd.csr -keyout root.prd.key -subj "/O=demo/OU=prd/CN=root.prd.demo.com"
openssl x509 -req -in root.prd.csr -text -days 7400 -extfile /etc/ssl/openssl.cnf -extensions v3_ca -signkey root.prd.key -out root.prd.crt
## 锁定文件
sudo chattr +i root.prd.key root.prd.csr root.prd.crt
## 检查锁定状态
lsattr root*

# 中间证书 inter
openssl req -new -text -out inter.prd.csr -keyout inter.prd.key -subj "/O=demo/OU=prd/CN=inter.prd.demo.com"
openssl x509 -req -in inter.prd.csr -text -days 7350 -extfile /etc/ssl/openssl.cnf -extensions v3_ca -CA root.prd.crt -CAkey root.prd.key -CAcreateserial -out inter.prd.crt
## 锁定文件
sudo chattr +i inter.prd.key inter.prd.csr inter.prd.crt
lsattr inter*
```

## postgres 服务器证书
- 服务器证书中 pg 表示 postgres，*.pg 用于标识不同的 pg 实例
```bash
# 如果配置了 SAN，CN 将不起作用，所以如要支持 CN，CN 也要包含在 SAN 中
openssl req -new -nodes -text -out pg.prd.csr -keyout pg.prd.key -subj "/O=demo/OU=prd.pg/CN=pg.prd.demo.com"
openssl x509 -req -in pg.prd.csr -text -days 7300 -CA inter.prd.crt -CAkey inter.prd.key -CAcreateserial -out pg.prd.crt -extfile <(printf "subjectAltName=DNS:*.pg.prd.demo.com,DNS:pg.prd.demo.com")
## 生成证书链
cat pg.prd.crt inter.prd.crt > pg.prd-all.crt
sudo chattr +i pg.prd.key pg.prd.csr pg.prd.crt
lsattr pg.*
```

## 配置 postgres 服务器
- 修改 `postgresql.conf` 启用 SSL、配置证书 root.prd.crt，pg.prd.key, pg.prd-all.crt
```bash
ssl = on
ssl_ca_file = '/etc/postgresql/ssl/root.prd.crt'
ssl_cert_file = '/etc/postgresql/ssl/pg.prd-all.crt'
ssl_key_file = '/etc/postgresql/ssl/pg.prd.key'

## 使用 HIGH 加密强度，不允许 NULL、MD5 加密
ssl_ciphers = 'HIGH:!aNULL:!MD5'
## 服务器端证书验证模式配置优先
ssl_prefer_server_ciphers = on
## 椭圆曲线(ECDH)密钥交换算法的选择
ssl_ecdh_curve = 'prime256v1'
ssl_min_protocol_version = 'TLSv1.2'
```
- 修改 `pg_hba.conf` 配置 ssl 认证：`hostssl all all all scram-sha-256 clientcert=verify-full`

## 客户端证书
- 生成客户端证书：数据库登录用户是什么，CN 就必须是什么，如：myuser
```bash
openssl req -new -nodes -text -out pg.client.myuser.prd.csr -keyout pg.client.myuser.prd.key -subj "/O=demo/OU=prd.pg.client/CN=myuser"
openssl x509 -req -in pg.client.myuser.prd.csr -text -days 7300 -CA inter.prd.crt -CAkey inter.prd.key -CAcreateserial -out pg.client.myuser.prd.crt
cat pg.client.myuser.prd.crt inter.prd.crt > pg.client.myuser-all.crt
sudo chattr +i pg.client.myuser.prd.key pg.client.myuser.prd.csr pg.client.myuser.prd.crt
lsattr pg.client.myuser.*
```

## 配置客户端连接
- 配置：root.prd.crt，pg.client.myuser.key, pg.client.myuser-all.crt
- [JDBC 连接参数](https://jdbc.postgresql.org/documentation/use/#connection-parameters)：
```
ssl=true&sslmode=verify-full&sslcert=pg.client.myuser-all.crt&sslkey=pg.client.myuser.key&sslrootcert=root.prd.crt
```
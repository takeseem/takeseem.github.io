import{_ as t,c as e,b as i,e as a,d as n,f as h,a as p,r,o as k}from"./app-DXZS36JJ.js";const d="/assets/pg-ssl-certs-Z1fxu7dh.png",g={},o={class:"hint-container tip"};function c(y,s){const l=r("RouteLink");return k(),e("div",null,[s[4]||(s[4]=i("h2",{id:"ssl-加密",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#ssl-加密"},[i("span",null,"SSL 加密")])],-1)),i("div",o,[s[3]||(s[3]=i("p",{class:"hint-container-title"},"提示",-1)),i("ul",null,[i("li",null,[s[1]||(s[1]=a("先阅读：")),n(l,{to:"/arch-design/net/ssl.html"},{default:h(()=>s[0]||(s[0]=[a("SSL/TLS 加密")])),_:1}),s[2]||(s[2]=a("，了解 私钥、证书、证书验证、CA、SAN 等概念"))])])]),s[5]||(s[5]=p('<ul><li><p>根据官方文档：<a href="https://www.postgresql.org/docs/current/ssl-tcp.html" target="_blank" rel="noopener noreferrer">安全 TCP/IP 连接</a>，参考最后的脚本生成证书，再配置后就可以使用 SSL 加密连接 PostgreSQL 了。</p></li><li><p>证书签名示意图：</p></li></ul><figure><img src="'+d+`" alt="证书签名示意图" width="50%" tabindex="0" loading="lazy"><figcaption>证书签名示意图</figcaption></figure><h2 id="生产环境配置" tabindex="-1"><a class="header-anchor" href="#生产环境配置"><span>生产环境配置</span></a></h2><ul><li>生产环境中，建议使用 CA 机构颁发的证书，以确保证书的完整性和可靠性。</li><li>不过使用自签证书也是可以的</li></ul><h2 id="通讯安全" tabindex="-1"><a class="header-anchor" href="#通讯安全"><span>通讯安全</span></a></h2><ul><li>内网：安全通常用网络控制，嗅探风险小，可 http 通讯，数据库可选 SSL （verify ca | full）仅验证服务器</li><li>外网：因流量走公网存在嗅探甚至中间人攻击，故需要确保：防窃听 + 防 MITM（中间人） <ul><li>客户端和服务器需要双向 verify-full | verify-ca</li></ul></li></ul><h2 id="根证书和中间证书" tabindex="-1"><a class="header-anchor" href="#根证书和中间证书"><span>根证书和中间证书</span></a></h2><ul><li><p>证书说明</p><ul><li>DN 设置 -subj 参数说明：<code>/C=国家/ST=省/L=城市/O=组织/OU=部门或单位/CN=服务的FQDN或常用名/emailAddress=邮件</code></li><li>DN 示例：<code>/O=demo/OU=prd/CN=root.prd.demo.com&quot;</code></li><li>prd.demo.com: <code>prd</code> 代表生产环境</li><li>root 根证书：<code>/O=demo/OU=prd/CN=root.prd.demo.com</code></li><li>inter 中间证书：<code>/O=demo/OU=prd/CN=inter.prd.demo.com</code></li></ul></li><li><p>创建根证书和中间证书脚本</p><ul><li>生成 root.prd 和 intr.prd 证书，（为什么设置 20 年？一是省事，二是 20 年后都退休了😸️）</li><li><code>root.prd.key</code> 一定要设置密码，防止泄露，并放在安全的地方。</li><li><code>inter.prd.key</code> 也要设置密码，并放在安全的地方。中间证书是一种安全隔离，一是保证根证书的安全性，二是便于签署服务器证书和客户端证书。</li><li><code>chattr +i</code> 锁定文件，防止误删和修改。</li></ul></li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># root</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -new</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -keyout</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -subj</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/O=demo/OU=prd/CN=root.prd.demo.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x509</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -days</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 7400</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -extfile</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ssl/openssl.cnf</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -extensions</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> v3_ca</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -signkey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 锁定文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.csr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 检查锁定状态</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lsattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 中间证书 inter</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -new</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -keyout</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -subj</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/O=demo/OU=prd/CN=inter.prd.demo.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x509</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -days</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 7350</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -extfile</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ssl/openssl.cnf</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -extensions</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> v3_ca</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.crt</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAkey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAcreateserial</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 锁定文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.csr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lsattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postgres-服务器证书" tabindex="-1"><a class="header-anchor" href="#postgres-服务器证书"><span>postgres 服务器证书</span></a></h2><ul><li>服务器证书中 pg 表示 postgres，*.pg 用于标识不同的 pg 实例</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 如果配置了 SAN，CN 将不起作用，所以如要支持 CN，CN 也要包含在 SAN 中</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -new</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -nodes</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -keyout</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -subj</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/O=demo/OU=prd.pg/CN=pg.prd.demo.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x509</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -days</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 7300</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAkey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAcreateserial</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.crt</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -extfile</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &lt;(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">printf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;subjectAltName=DNS:*.pg.prd.demo.com,DNS:pg.prd.demo.com&quot;)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 生成证书链</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.crt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">pg.prd-all.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.csr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lsattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-postgres-服务器" tabindex="-1"><a class="header-anchor" href="#配置-postgres-服务器"><span>配置 postgres 服务器</span></a></h2><ul><li>修改 <code>postgresql.conf</code> 启用 SSL、配置证书 root.prd.crt，pg.prd.key, pg.prd-all.crt</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_ca_file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/etc/postgresql/ssl/root.prd.crt&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_cert_file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/etc/postgresql/ssl/pg.prd-all.crt&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_key_file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/etc/postgresql/ssl/pg.prd.key&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 使用 HIGH 加密强度，不允许 NULL、MD5 加密</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_ciphers</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;HIGH:!aNULL:!MD5&#39;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 服务器端证书验证模式配置优先</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_prefer_server_ciphers</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">## 椭圆曲线(ECDH)密钥交换算法的选择</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_ecdh_curve</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;prime256v1&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssl_min_protocol_version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;TLSv1.2&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改 <code>pg_hba.conf</code> 配置 ssl 认证：<code>hostssl all all all scram-sha-256 clientcert=verify-full</code></li></ul><h2 id="客户端证书" tabindex="-1"><a class="header-anchor" href="#客户端证书"><span>客户端证书</span></a></h2><ul><li>生成客户端证书：数据库登录用户是什么，CN 就必须是什么，如：myuser</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -new</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -nodes</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -keyout</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -subj</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/O=demo/OU=prd.pg.client/CN=myuser&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x509</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -req</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.csr</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -text</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -days</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 7300</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CA</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAkey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.key</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -CAcreateserial</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.crt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> inter.prd.crt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">pg.client.myuser-all.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.csr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.prd.crt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lsattr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pg.client.myuser.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置客户端连接" tabindex="-1"><a class="header-anchor" href="#配置客户端连接"><span>配置客户端连接</span></a></h2><ul><li>配置：root.prd.crt，pg.client.myuser.key, pg.client.myuser-all.crt</li><li><a href="https://jdbc.postgresql.org/documentation/use/#connection-parameters" target="_blank" rel="noopener noreferrer">JDBC 连接参数</a>：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ssl=true&amp;sslmode=verify-full&amp;sslcert=pg.client.myuser-all.crt&amp;sslkey=pg.client.myuser.key&amp;sslrootcert=root.prd.crt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,22))])}const F=t(g,[["render",c],["__file","pg-ssl.html.vue"]]),u=JSON.parse('{"path":"/arch-design/pg/pg-ssl.html","title":"PostgreSQL 配置 SSL","lang":"zh-CN","frontmatter":{"title":"PostgreSQL 配置 SSL","icon":"fa-brands fa-expeditedssl","date":"2024-11-13T11:26:57.000Z","category":["架构","postgres"],"tag":["架构","postgres","SSL"],"order":10,"star":true,"description":"SSL 加密 提示 先阅读：，了解 私钥、证书、证书验证、CA、SAN 等概念 根据官方文档：安全 TCP/IP 连接，参考最后的脚本生成证书，再配置后就可以使用 SSL 加密连接 PostgreSQL 了。 证书签名示意图： 证书签名示意图证书签名示意图 生产环境配置 生产环境中，建议使用 CA 机构颁发的证书，以确保证书的完整性和可靠性。 不过使用...","head":[["meta",{"property":"og:url","content":"https://www.takeseem.com/arch-design/pg/pg-ssl.html"}],["meta",{"property":"og:site_name","content":"全球指数"}],["meta",{"property":"og:title","content":"PostgreSQL 配置 SSL"}],["meta",{"property":"og:description","content":"SSL 加密 提示 先阅读：，了解 私钥、证书、证书验证、CA、SAN 等概念 根据官方文档：安全 TCP/IP 连接，参考最后的脚本生成证书，再配置后就可以使用 SSL 加密连接 PostgreSQL 了。 证书签名示意图： 证书签名示意图证书签名示意图 生产环境配置 生产环境中，建议使用 CA 机构颁发的证书，以确保证书的完整性和可靠性。 不过使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-13T07:37:34.000Z"}],["meta",{"property":"article:tag","content":"架构"}],["meta",{"property":"article:tag","content":"postgres"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:published_time","content":"2024-11-13T11:26:57.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-13T07:37:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PostgreSQL 配置 SSL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-13T11:26:57.000Z\\",\\"dateModified\\":\\"2024-11-13T07:37:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"全球指数\\",\\"url\\":\\"https://www.takeseem.com\\"}]}"]]},"headers":[{"level":2,"title":"SSL 加密","slug":"ssl-加密","link":"#ssl-加密","children":[]},{"level":2,"title":"生产环境配置","slug":"生产环境配置","link":"#生产环境配置","children":[]},{"level":2,"title":"通讯安全","slug":"通讯安全","link":"#通讯安全","children":[]},{"level":2,"title":"根证书和中间证书","slug":"根证书和中间证书","link":"#根证书和中间证书","children":[]},{"level":2,"title":"postgres 服务器证书","slug":"postgres-服务器证书","link":"#postgres-服务器证书","children":[]},{"level":2,"title":"配置 postgres 服务器","slug":"配置-postgres-服务器","link":"#配置-postgres-服务器","children":[]},{"level":2,"title":"客户端证书","slug":"客户端证书","link":"#客户端证书","children":[]},{"level":2,"title":"配置客户端连接","slug":"配置客户端连接","link":"#配置客户端连接","children":[]}],"git":{"createdTime":1731483454000,"updatedTime":1731483454000,"contributors":[{"name":"takeseem","email":"takeseem@gmail.com","commits":1}]},"readingTime":{"minutes":2.91,"words":873},"filePathRelative":"arch-design/pg/pg-ssl.md","localizedDate":"2024年11月13日","excerpt":"<h2>SSL 加密</h2>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">提示</p>\\n<ul>\\n<li>先阅读：<a href=\\"/arch-design/net/ssl.html\\" target=\\"_blank\\">SSL/TLS 加密</a>，了解 私钥、证书、证书验证、CA、SAN 等概念</li>\\n</ul>\\n</div>\\n<ul>\\n<li>\\n<p>根据官方文档：<a href=\\"https://www.postgresql.org/docs/current/ssl-tcp.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">安全 TCP/IP 连接</a>，参考最后的脚本生成证书，再配置后就可以使用 SSL 加密连接 PostgreSQL 了。</p>\\n</li>\\n<li>\\n<p>证书签名示意图：</p>\\n</li>\\n</ul>","autoDesc":true}');export{F as comp,u as data};

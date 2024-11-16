---
title: PostgreSQL 入门指南
icon: republican
date: 2024-11-16 19:22:57
category:
  - 架构
  - postgres
tag:
  - 架构
  - postgres
order: 5
star: true
---

## 数据库操作
- [create user](https://www.postgresql.org/docs/current/sql-createuser.html)、[create database](https://www.postgresql.org/docs/current/sql-createdatabase.html)、[create table](https://www.postgresql.org/docs/current/sql-createtable.html)
```sql
create user demo with password 'demo';
create database demo with owner='demo' encoding='UTF8';

create table if not exists demo (
  id bigint generated always as identity primary key,
  ct timestamp not null default current_timestamp,
  ut timestamp not null default current_timestamp,
  user_id bigint,
  foreign key (user_id) references user (id)
);
```

- [create function](https://www.postgresql.org/docs/current/sql-createfunction.html)、[create trigger](https://www.postgresql.org/docs/current/sql-createtrigger.html)：通过触发器实现自动更新 updated_at 字段
```sql
create or replace function update_ut_col() returns trigger as $$
  begin
    if new.* is not distinct from old.* then
      return null;  -- 无变化时什么也不做包括创建新版本数据，如果 return old 实际依然会创建新版本数据
    end if;

    new.ut = current_timestamp;
    return new;
  end;
$$ language plpgsql;

create trigger trigger_update_demo_ut before update
  on demo for each row execute function update_ut_col();
```

- [STORAGE](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-STORAGE)PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT
  - 对于可变长度的列默认：[EXTENDED](https://www.postgresql.org/docs/current/storage-toast.html#STORAGE-TOAST-ONDISK) 先不压缩存在行内，再压缩尝试存在行内，依然无法放下存 [TOAST](https://www.postgresql.org/docs/current/storage-toast.html)
```sql
-- 查询列的存储类型
select t.relname as tab, attname AS col, 
  CASE attstorage
      WHEN 'p' THEN 'PLAIN'
      WHEN 'm' THEN 'MAIN'
      WHEN 'x' THEN 'EXTENDED'
      WHEN 'e' THEN 'EXTERNAL'
      ELSE 'UNKNOWN'
  END AS storage_type 
from pg_attribute c left outer join pg_class t on c.attrelid=t.oid
where c.attstorage not in ('p') and t.relname like 'ss_%';
```

- [数据类型](https://www.postgresql.org/docs/current/datatype.html)，重点掌握：
  - [数值类型](https://www.postgresql.org/docs/current/datatype-numeric.html)：自增推荐用 [generated](https://www.postgresql.org/docs/current/ddl-generated-columns.html)
  - [字符串类型](https://www.postgresql.org/docs/current/datatype-character.html)：varchar、text 在 pg 中性能差不多，char 最慢
  - [日期/时间](https://www.postgresql.org/docs/current/datatype-datetime.html)
    - 个人不推荐用带时区的，因为本质存储的是时间戳，在输入和输出时会根据客户端的时区转换为时间戳，而准确地时区数据是不容易获取的
    - 时区标准：[IANA TZdata page](http://www.iana.org/time-zones/)，Java：[tzdata](https://www.oracle.com/java/technologies/tzdata-versions.html)、[tz 更新器](https://www.oracle.com/java/technologies/javase/tzupdater-readme.html)，要定期更新才能保持正确
  - [json类型](https://www.postgresql.org/docs/current/datatype-json.html)：jsonb 会导致存储膨胀，除非要索引，推荐用 json，甚至能用 text 代替json
    - json：字符串副本、每次操作时需先解析为 json
    - jsonb：二进制 json，写入速度稍慢，存储膨胀，处理时无须解析，支持索引
      - 每个键值对的元数据：键的长度和位置、值的类型长度和位置，所以导致体积膨胀 10% ~ 100%
    - json vs jsonb：无须处理、索引时用 json，其他用 jsonb
      - jsonb 保留最后的重复 key，因为是解析后的 json
      - json 因是字符串副本，所以可以保留顺序和重复 key
  - 了解这些类型：[GEO](https://www.postgresql.org/docs/current/datatype-geometric.html)、net、mac、arrays、range

## MySQL 和 PostgreSQL 数据更新机制
  - pg 使用的 MVCC 机制，每次更新都创建新版本，可以通过 `where col is distinct from new_value` 来避免不必要的更新操作
  - 或使用触发器：`if new.* is not distinct from old.* then return null; end if;`但`return old`依然会创建新版本`return null`就不会了，但使用触发器会读取旧值，旧值如果非常大，会影响性能

| 特性 | MySQL InnoDB | PostgreSQL |
| --- | --- | --- |
| 数据存储 | 尽量原地更新，主键更新需要迁移 | 标记删除旧版本，插入新版本 |
| 事务支持 | 支持，通过 Undo/Redo Log 实现 | 支持，通过 MVCC 实现 |
| 并发控制 | 基于 Undo Log 提供 MVCC | 基于 MVCC 提供多版本支持 |
| 索引处理 | 索引涉及字段时需要更新 | 总是需要更新索引 |
| 性能 | 通常更快（尤其是更新小字段时） | 更新更复杂，但事务隔离性更好 |
| 存储膨胀 | 通常较小 | 可能更大（依赖 VACUUM 清理） |

## 其他
- [PostgreSQL 配置 SSL](pg-ssl.md)
- [PostgreSQL 可以代替 MongoDB 吗？](pg-vs-mongo.md)
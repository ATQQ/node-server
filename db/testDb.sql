-- 用于测试的数据库表结构
-- 2020年 01月 29日 星期三 10:57:45 CST
create table user
(
    id          int auto_increment
        primary key,
    username    varchar(32)                         not null comment '用户名',
    password    varchar(32)                         not null comment '密码',
    mobile      varchar(32)                         null comment '手机号',
    create_date timestamp default CURRENT_TIMESTAMP not null
)
    comment '用户表';


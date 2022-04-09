/**
 * 环境变量配置
 */
declare namespace NodeJS {
   interface ProcessEnv {
      // MySQL 数据库相关
      /**
       * 主机地址（域名||IP）
       * @default 'localhost'
       */
      MYSQL_DB_HOST:string
      /**
       * 端口号
       * @default 3306
       */
      MYSQL_DB_PORT:string
      /**
       * 数据库名
       * @default 'ep-dev'
       */
      MYSQL_DB_NAME:string
      /**
       * MySQL 用户名
       */
      MYSQL_DB_USER:string
      /**
       * MySQL 密码
       */
      MYSQL_DB_PWD:string

      // MongoDB数据库相关
      /**
       * 主机地址（域名||ip）
       * @default 'localhost'
       */
      MONGO_DB_HOST:string
      /**
       * 端口号
       * @default 27017
       */
      MONGO_DB_PORT:string
      /**
       * 数据库名
       * @default 'ep-dev'
       */
      MONGO_DB_NAME:string
      /**
       * 是否需要登录认证
       * @default false
       */
      MONGO_DB_NEED_AUTH:string
      /**
       * 用户名
       */
      MONGO_DB_USER:string
      /**
       * 密码
       */
      MONGO_DB_PWD:string

      // Redis 数据库相关
      /**
       * 主机地址（域名||IP）
       * @default ‘127.0.0.1’
       */
      REDIS_DB_HOST:string
      /**
       * 端口号
       * @default 6379
       */
      REDIS_DB_PORT:string
      /**
       * 数据库密码
       */
      REDIS_DB_PASSWORD:string
      /**
       * 是否需要密码认证
       * @default false
       */
      REDIS_DB_NEED_AUTH:string

      // 服务相关
      /**
      * 启动服务监听端口
      * @default 3000
      */
      SERVER_PORT:string
      /**
       * 服务主机地址
       * @default 'localhost'
       */
      SERVER_HOST:string

      // 七牛云相关
      /**
       * AccessKey
       */
      QINIU_ACCESS_KEY:string
      /**
       * SecretKey
       */
      QINIU_SECRET_KEY:string
      /**
       * SSO存储空间名
       */
      QINIU_BUCKET_NAME:string
      /**
       * SSO存储空间绑定的域名
       */
      QINIU_BUCKET_DOMAIN:string

      // 腾讯云相关
      /**
       * SecretId
       */
      TENCENT_SECRET_ID:string
      /**
      * SecretKey
      */
      TENCENT_SECRET_KEY:string
      /**
       * 短信模板ID
       */
      TENCENT_MESSAGE_TemplateID:string
      /**
       * 短信应用appid
       */
      TENCENT_MESSAGE_SmsSdkAppid:string
   }
 }

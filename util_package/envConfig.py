# coding:utf-8

# mysql 自动化数据库配置
DBHOST = "10.0.19.41"
DBPORT = '3306'
DBUSER = "xinyan"
DBPWD = "xinyan@123"
DBNAME = "AUTO_TEST"
DBCHAR = "utf8"

config = {
    'host': '10.0.19.41',
    'port': 3306,
    'database': 'AUTO_TEST',
    'user': 'xinyan',
    'password': 'xinyan@123',
    'charset': 'utf8'
}


# mongo 数据库配置
Mongo_host = '10.0.23.70'
Mongo_port = '27017'
Mongo_name = 'admin'
Mongo_user = 'root'
Mongo_pwd = 'baofoo@64'



# 邮件配置
# 第三方 SMTP 服务
mail_host = "smtp.qq.com"  # 设置服务器
mail_user = "356970306@qq.com"  # 用户名
mail_pass = "ljhrjxpzhhlvbhji"  # 口令
sender = '356970306@qq.com'
receivers = ['356970306@qq.com']  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

# 私有化商户信息
com_info = {
    'apiUser': '8013936097',
    'apiEnc': '2045460de4cefa51aba07848e8d4bd95',
    'apiKey': '6613d600d19941a094753830bd6fc0af'
}

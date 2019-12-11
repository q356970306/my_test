# !/usr/bin/python
# -*- coding: UTF-8 -*-

"""
Author： jinshuai_qiao
Date： 2019/10/14
Desc：
"""

import smtplib
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from util_package import envConfig


def send_email(subject, content, receivers, textype='plain'):
    # 三个参数：第一个为文本内容，第二个 plain 设置文本格式，第三个 utf-8 设置编码
    message = MIMEText(content, textype, 'utf-8')
    message['From'] = Header("qiaojinshuai", 'utf-8')  # 发送者
    message['To'] = Header("qiaojinshuai_test", 'utf-8')  # 接收者
    message['Subject'] = Header(subject, 'utf-8')  # 邮件主题

    try:
        smtpObj = smtplib.SMTP_SSL(envConfig.mail_host, 465)
        smtpObj.login(envConfig.mail_user, envConfig.mail_pass)
        smtpObj.sendmail(envConfig.sender, receivers, message.as_string())
        print("邮件发送成功")
        return 'success'
    except smtplib.SMTPException:
        print("Error: 邮件发送失败")
        return 'fail'


def sendfile_email(subject, file, content=None, receivers='356970306@qq.com', textype='plain'):
    # 创建一个带附件的实例
    message = MIMEMultipart()
    message['From'] = Header("qiaojinshuai", 'utf-8')  # 发送者
    message['To'] = Header("qiaojinshuai_test", 'utf-8')  # 接收者
    message['Subject'] = Header(subject, 'utf-8')  # 邮件主题

    # 添加正文
    with open(file, 'rb') as f:
        mail_name = f.name
        data = f.read()
    message.attach(MIMEText(content, textype, 'utf-8'))
    att1 = MIMEText(data, 'base64', 'utf-8')
    att1["Content-Type"] = 'application/octet-stream'
    att1["Content-Disposition"] = 'attachment; filename=' + mail_name
    message.attach(att1)

    try:
        smtpObj = smtplib.SMTP_SSL(envConfig.mail_host, 465)
        smtpObj.login(envConfig.mail_user, envConfig.mail_pass)
        smtpObj.sendmail(envConfig.sender, receivers, message.as_string())
        print("邮件发送成功")
        return 'success'
    except smtplib.SMTPException:
        print("Error: 邮件发送失败")
        return 'fail'



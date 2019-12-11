# coding=utf-8

"""
Author： jinshuai_qiao
Date： 2019/11/27
Desc：
"""
import json
import time
import requests
from util_package import *


class task(object):
    """
    私有化所有接口
    """

    def __init__(self):
        """

        :return:
        """
        self.headers = {'content-type': "application/json"}
        self.apiUser = envConfig.com_info['apiUser']
        self.apiEnc = envConfig.com_info['apiEnc']
        self.apiKey = envConfig.com_info['apiKey']
        self.Enc_md5org = envConfig.com_info['apiKey'] + envConfig.com_info['apiUser']

    def create(self):
        """
        创建任务接口
        :return:
        """
        url = 'http://10.0.221.96:8089/api/task/create'



        param = {
            "channelId": "1",
            "idCard": "654323198911272317",
            "idCardNum": "654323198911272317",
            "name": "赵敬远",
            "phone": "18119294818",
            "pwd": "159357",
            "realName": "赵敬远"
        }


        param_str = str(param)
        param_encry = str(get_rsa_sign(param_str))

        ti = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
        sign = get_md5_sign(envConfig.com_info['apiUser'] + ti + ti + envConfig.com_info['apiKey'])

        data = {
            "apiEnc": self.apiEnc,
            "apiName": "shanghaitelecom",
            "code": "1217",
            "sign": sign,
            "time": ti,
            "terminalId": "",
            "params": param_encry,
            "apiUser": self.apiUser,
            "taskId": ti
        }

        res = requests.post(url, data=json.dumps(data), headers=self.headers)
        resp = res.text
        print('创建任务请求参数：', data)
        print('创建任务返回结果：', resp)
        return resp

    def get_data(self, token):
        """
        查询数据接口
        :param token:
        :return:
        """
        param = {
            "apiUser": self.apiUser,
            "apiEnc": self.apiEnc
        }
        url = 'http://10.0.221.96:8089/api/data/' + token
        res = requests.get(url, param, headers=self.headers)
        resp = res.text
        print('查询数据请求参数：', param)
        print('查询数据返回结果：', resp)
        return resp

    def get_status(self, token):
        """
        查询状态接口
        :param token:
        :return:
        """
        param = {
            "apiUser": self.apiUser,
            "apiEnc": get_md5_sign(self.Enc_md5org + token)
        }
        url = 'http://10.0.221.96:8089/api/task/status/' + token
        res = requests.get(url, param, headers=self.headers)
        resp = res.text
        print('查询状态请求参数：', param)
        print('查询状态返回结果：', resp)
        return resp

    def message(self, token, code):
        """
        提交消息接口，如短信验证码
        code	类型	描述
        200002	输入	输入短信验证码
        200009	输入	输入图片验证码
        200019	输入	输入答案
        200003	刷新	重新发送动态验证码
        200008	刷新	刷新图片验证码
        200013	刷新	刷新二维码
        :param token:
        :param code:
        :return:
        """
        param = {
            "apiUser": self.apiUser,
            "apiEnc": get_md5_sign(self.Enc_md5org + token),
            "token": token,
            "code": "200002",
            "value": code
        }
        url = 'http://10.0.221.96:8089/api/task/message'
        res = requests.post(url, data=json.dumps(param), headers=self.headers)
        resp = res.text
        print('提交验证码请求参数：', param)
        print('验证码返回结果：', resp)


#  0120454741440069632、0120452652173361152、0121786673515986944
token = '0124442678414802944'
t = task()
# t.create()
# t.get_status(token)
# t.get_data(token)
t.message(token, '315969')

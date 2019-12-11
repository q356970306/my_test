# coding=utf-8

"""
Author： jinshuai_qiao
Date： 2019/12/2
Desc：
"""

from pymongo import MongoClient
from bson.objectid import ObjectId
from util_package import envConfig


class TestMongo(object):

    def __init__(self, db, table):
        url = 'mongodb://' + envConfig.Mongo_host + ':' + envConfig.Mongo_port
        self.client = MongoClient(url)
        self.db = self.client[db][table]

    def add_one(self, data: dict):
        """
        新增数据
        :param data:
        :return:
        """
        # post = {
        #     'name': 'ben',
        #     'age': 18,
        #     'sex': "male",
        #     'grade': 80,
        #     'adress': "china"
        # }

        return self.db.students.insert_one(data)

    def add_many(self, data: list):
        """
        新增多条数据
        :return:
        """
        # infos = [
        #     {'name': 'ben', 'age': 18, 'sex': "male", 'grade': 80, 'adress': "china"},
        #     {'name': 'sum', 'age': 19, 'sex': "male", 'grade': 75, 'adress': "china"},
        #     {'name': 'lily', 'age': 16, 'sex': "female", 'grade': 90, 'adress': "china"},
        #     {'name': 'teddy', 'age': 19, 'sex': "male", 'grade': 65, 'adress': "china"},
        #     {'name': 'fluence', 'age': 18, 'sex': "female", 'grade': 80, 'adress': "china"}
        # ]
        return self.db.students.insert_many(data)

    def get_one(self, param):
        """
        查询指定数据
        :param param: 示例：id:'123123123'
        :return:
        """
        return self.db.find_one(param)

    def get_more(self, param):
        """
        查询指定数据
        :param param: 示例：id:'123123123'
        :return:
        """
        return self.db.find(param)

    def get_one_from_oid(self, oid):
        """
        查询指定ID的数据
        :param oid:
        :return:
        """
        obj = ObjectId(oid)
        return self.db.students.find_one({'_id': obj})

    def update_one(self):
        """
        修改一条数据
        :return:
        """
        return self.db.students.update_one({'age': 20}, {'$inc': {'x': 10}})

    def update_many(self):
        """
        修改多条数据
        :return:
        """
        return self.db.students.update_many({}, {'$inc': {'age': 5}})

    def dalete_one(self):
        """
        删除一条数据
        :return:
        """
        return self.db.students.delete_one({'name': 'ben'})

    def delete_many(self):
        """
        删除多条数据
        :return:
        """
        return self.db.students.delete_many({'age': 24})


# t = TestMongo('auth_config', 'data_source')
# res = t.get_more({'wsType': 'ZX_YYSSJ'})
# data = []
# for x in res:
#     a = x['wsName'] + '|' + x['wsDesc']
#     data.append(a)
# print(data)

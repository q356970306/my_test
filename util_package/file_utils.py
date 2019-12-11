# coding=utf-8

"""
Author： jinshuai_qiao
Date： 2019/10/17
Desc：
"""
import random
import time


def file_read(path, read_type=None, encoding='UTF_8'):

    #  open(name[, mode[, buffering]])函数，mode默认为'r',只读
    with open(path, encoding=encoding) as f:
        if read_type is None:
            result = f.read()
        elif read_type == 'list':
            result = f.readlines()
        else:
            result = f.readline()
    return result


def file_write(path, content, write_mode='w', encoding='UTF_8'):

    #  open(name[, mode[, buffering]])函数，若要写入，则mode应为'w'，写入；'a'追加写入
    with open(path, write_mode, encoding=encoding) as f:
        f.write(content)

# file_write(path11, str(random.randint(1, 11))+':'+str(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))+'\n', 'a')

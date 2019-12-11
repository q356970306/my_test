# coding=utf-8

"""
Author： jinshuai_qiao
Date： 2019/11/29
Desc：
"""
import jpype
import os
import re
import time
import hashlib

privateKey = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrnxrOK+PyvXp8fyskLExVKK+4F/oTguDabKuEBVYXhrCUiZQurdrrEAz4bQmG8j0BR9q1+LtDCdPxdk5oI/ZpLKoHnJga14GuTjfPNcT6ZJGHZfcsArO8WyOgdtVKcuBp7NJFzg3fJw4kmC6sWiuzFcpoNbK4Rgok098dFsqxq46bRHMFVZFYT+NA9Iadmrgxf90FrCBLTyzGM1Z/7MVUTN546rA8baGpExbVO8KIVuhk/FJKQNVWoCeSO4HTq1/Y6tcqWlhjHLTtyxEfKZlVPQYdmV9qFrXVcVaTaHsQNP4s1TMyKjphMzaPdplG/jydBK7gQ6oIDUTQep9ImkCTAgMBAAECggEAV+DSgvuqbyNi0tjzKESemYSJ5cQxQ0hjBrVaZfGtkcJgLM7916EiVfcUDSkYFcd4QW2fqkpA6SThJ+UiZOT1Sgmazub6Y9QyDST0IuAvit9wPVqS5DBGBI7OgV4X/VUxYEvpp+DI7Zk7/rUGQS6y7bKcwBuu9fi3PQBYYLbI94xAefjMvGilDvOLPYi060Cj9smWkUQ8WHPvfTeDeABWxuXiCDKoO5N5EofaV1H2+LWJCu/D6/ueQgU71kx33JVmwUY9rKEzCxwhUN5wu4SZA5oTgzjXyuGD0rk0JQNQEjJAFWESiZrtIupFyGrTB6mz1ngy7omDVietsISirAjXsQKBgQDVTuKfrNu7jhf7+Pvy7cx9DtUYSpfKdwb8eElGRZpRYLGR9swPPNxEdDkflVCmTxWpPhFIxt/wC+aVSyhsJHbNRLVMg3cUiQ60KtO26hnBlU0saQLaJM1pC0dkD9wSs/zqjmK0OlZYTYZq/zCXBN6rgunSx1GLPnfsja7ziPRnrwKBgQDN+Fnm1cXCQ4nsrIgJXZaMXnK0DFU+Ae3lsCHebqAHmdvj/v6KL+O3orn66u8DjDRHrVusnT4vDDxD74bPIJJdCVDInrAgIeRJYMnIQe3E+17aYdCsVMMrONytq//VydL3Gypv36JGwpZwJxIXyE3z0ITyiP2zkAaN25vgWahKXQKBgDR+NUcWQvzk+wIHQ/mEi8462DYiJTiuEgoPj/i7KD7ejNRe59jYIVy3PVeIZ1CGJc6Ad8BxMKriQtx6onf6gUICppstvyBOmk+8Ol3JPo1lMJi9PvZwGBzBqc/2FzKDGLqgT6oKsTUJ3wp1wn9ns2SB0wkMBAVAWkLcmzFTgtIBAoGBAJnvRqFymz4449fyiikVvPJjlC5kGUEih/3lySpIW2nS37hiVzJH4FTaVUzmUIPCQUBgm+dCDbtz1YageYxLt5e44ptNniwlqEv+/k+glmdlxtpHyIFDSCoBcUyLA8Vv9S+hKfI6nTltLKndSXRky32xFet93r5Yoc1bl//wggoxAoGAUBbCjt7m36C4LFXrjY+cXp11vFlXYc1nNYLhNfbxLsD9vETZTAgll8mMeAfQOq0HT7szTkhby8ykAB003DU7QbG4wMJtE80nDQ85iMK6TZj7nwjYi8jfonfaQGqSlrORdNJzO7L5Ge75oIdtKLWG6hErKO6ms3ybUVYblfL/gmU=",
publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq58azivj8r16fH8rJCxMVSivuBf6E4Lg2myrhAVWF4awlImULq3a6xAM+G0JhvI9AUfatfi7QwnT8XZOaCP2aSyqB5yYGteBrk43zzXE+mSRh2X3LAKzvFsjoHbVSnLgaezSRc4N3ycOJJgurForsxXKaDWyuEYKJNPfHRbKsauOm0RzBVWRWE/jQPSGnZq4MX/dBawgS08sxjNWf+zFVEzeeOqwPG2hqRMW1TvCiFboZPxSSkDVVqAnkjuB06tf2OrXKlpYYxy07csRHymZVT0GHZlfaha11XFWk2h7EDT+LNUzMio6YTM2j3aZRv48nQSu4EOqCA1E0HqfSJpAkwIDAQAB"


# jar_path = os.path.join(os.path.abspath('.'), 'rsa-utils-1.0-jar-with-dependencies.jar')
# print(jar_path)
# jpype.startJVM(jpype.getDefaultJVMPath(), "-ea", "-Djava.class.path=%s" % jar_path)
#
# Test = jpype.JClass('sec.rsaCryp')
#
# t = Test()
#
# strparam = 'app_id=68613717&app_secret=039b8b6f1544f62dace6fe53e4c380be&platform=1&sign_type=RSA&timestamp=1536039464'
# res = t.encrypt(strparam, publicKey)
# org_res = t.decrypt(str(res), privateKey)
# print(res)
# print(org_res)
#
# jpype.shutdownJVM()


def get_rsa_sign(sign_raw):
    """
    调用java jar包，对入参进行rsa签名
    :param sign_raw:待签名字符串
    :return:signature:签名后的加密字符串
    """
    # 启动JVM
    jvmPath = jpype.getDefaultJVMPath()
    # 加载jar包
    jpype.startJVM(jvmPath, "-ea", "-Djava.class.path=rsa-utils-1.0-jar-with-dependencies.jar")
    # # 指定main class
    # JDClass = jpype.JClass("sec.rsaCryp")
    # # 创建类实例对象
    # jd = JDClass()

    jd = jpype.JPackage('sec').rsaCryp
    # 引用jar包类中的方法 rsa_sign
    signature = jd.encrypt(sign_raw, publicKey)
    # 关闭JVM
    jpype.shutdownJVM()
    return signature


def get_rsa_design(rsa_sign):
    """
    调用java jar包，对入参进行rsa签名
    :param sign_raw:待签名字符串
    :return:signature:签名后的加密字符串
    """
    # 启动JVM
    jvmPath = jpype.getDefaultJVMPath()
    # 加载jar包
    jpype.startJVM(jvmPath, "-ea", "-Djava.class.path=rsa-utils-1.0-jar-with-dependencies.jar")
    # # 指定main class
    # JDClass = jpype.JClass("sec.rsaCryp")
    # # 创建类实例对象
    # jd = JDClass()

    jd = jpype.JPackage('sec').rsaCryp
    # 引用jar包类中的方法 rsa_sign
    signorg = jd.decrypt(rsa_sign, privateKey)
    # 关闭JVM
    jpype.shutdownJVM()
    return signorg


def get_md5_sign(content):
    # # hanch = re.compile(u'[\u4e00-\u9fa5]')  # 检查中文
    # hanch = re.compile(u'[^\u4e00-\u9fa5]')   #检查非中文
    # if hanch.search(content):
    #     return hashlib.md5(content).hexdigest()
    # else:
    return str(hashlib.md5(content.encode(encoding='UTF-8')).hexdigest())

# print(time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())))
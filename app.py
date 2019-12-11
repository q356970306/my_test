import json

from flask import Flask, render_template, Response
from util_package import *

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/index.html')
def my_test():
    return render_template('index.html')


@app.route('/test/<webname>')
def link(webname):
    return render_template('test/' + webname)


@app.route('/my-test/carrier/getMessage', methods=['GET', 'POST'])
def get_message():
    t = TestMongo('auth_config', 'data_source')
    res = t.get_more({'wsType': 'ZX_YYSSJ'})
    # data = []
    # for x in res:
    #     a = x['wsName'] + '|' + x['wsDesc']
    #     data.append(a)
    # return str(data)
    data = {}
    for x in res:
        data[x['wsName']] = x['wsDesc']
    return Response(json.dumps(data), mimetype='application/json')

if __name__ == '__main__':
    app.run()

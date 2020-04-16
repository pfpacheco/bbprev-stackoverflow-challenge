""" This is the services.py """
import requests

from flask import make_response, request
from flask_cors import cross_origin

from json import loads

from src.app.bbprev_app import bbprev_app


@bbprev_app.route('/api/stackoverflow/questions', methods=['GET', 'POST'])
@cross_origin(origin='*')
def questions():
    """ This is the questions method """

    url = 'https://api.stackexchange.com/2.2/questions'

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    }

    try:
        url = url + '?order=desc' + '&sort=votes' + '&site=stackoverflow'
        req = loads(request.data)
        tags = req.get('search')
        if tags:
            tagged = ''
            for tag in tags.split():
                tagged += tag + ''
            url += '&tagged=' + tagged.strip().lower()
        resp = requests.get(url=url, headers=headers)
    except Exception as e:
        return make_response({'code': 500, 'status': 'INTERNAL_SERVER_ERROR', 'message': str(e)})
    return make_response({'code': 200, 'status': 'OK', 'questions': resp.json()})


@bbprev_app.route('/api/stackoverflow/question/<question_id>', methods=['GET'])
@cross_origin(origin='*')
def question(question_id):
    """ This is the question by id method """

    url = 'https://api.stackexchange.com/2.2/questions'

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    }

    try:
        url += '/' + question_id
        url += '?site=stackoverflow'
        if id:
            resp = requests.get(url=url, headers=headers)
    except Exception as e:
        return make_response({'code': 500, 'status': 'INTERNAL_SERVER_ERROR', 'message': str(e)})
    return make_response({'code': 200, 'status': 'OK', 'question': resp.json()})


if __name__ == '__main__':
    bbprev_app.run(host='localhost', port=5000)

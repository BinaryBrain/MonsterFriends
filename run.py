#!/usr/bin/env python2
# -*- coding: UTF-8 *-*


from app.monsterfriends import app
from gevent import monkey
from socketio.server import SocketIOServer
import werkzeug.serving

# necessary for autoreload (at least)
monkey.patch_all()

PORT = 5001


@werkzeug.serving.run_with_reloader
def run_server():
    print 'Listening on %s...' % PORT
    ws = SocketIOServer(('0.0.0.0', PORT), app, resource="socket.io", policy_server=False)
    ws.serve_forever()


run_server()



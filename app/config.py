#!/usr/bin/env python2
# -*- coding: UTF-8 *-*
import os

SQLALCHEMY_DATABASE_URI = os.getenv('MONSTERFRIENDS_DB')
SQLALCHEMY_ECHO = True
DEBUG = os.getenv('MONSTERFRIENDS_DEBUG', True)


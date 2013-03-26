#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.script import Manager, Shell

from app.monsterfriends import app, db

from app.models import User, Attak, Monster, Fight

manager = Manager(app)


def _make_context():
    return dict(app=app, db=db, User=User, Attak=Attak, Monster=Monster, Fight=Fight)

manager.add_command("shell", Shell(make_context=_make_context))

@manager.command
def init_db():
    with app.app_context():
        db.create_all()

@manager.command
def drop_db():
    with app.app_context():
        db.drop_all()

if __name__ == "__main__":
    manager.run()

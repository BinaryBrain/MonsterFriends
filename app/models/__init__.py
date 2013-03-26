#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import desc, or_, and_
from app.constant import TYPES


db = SQLAlchemy()

__all__ = ['User', 'Monster', 'Attak', 'db']


class Fight(db.Model):
    __tablename__ = 'fight'

    id = db.Column(db.Integer, primary_key=True)

    fb_id1 = db.Column(db.Integer, db.ForeignKey('user.fb_id'))
    fb_id2 = db.Column(db.Integer, db.ForeignKey('user.fb_id'))

    result = db.Column(db.Boolean) # True if fb_id1 win, False otherwise, null otherwise

    def __init__(self, fb_id1, fb_id2, result=None):
        self.fb_id1, self.fb_id2 = min(fb_id1, fb_id2), max(fb_id1, fb_id2)
        self.result = result

    def set_winner(self, winner_id):
        self.result = self.fb_id1 == winner_id

    @staticmethod
    def get_last_fight_of(fb_id, eid=None):
        if eid is not None:
            construct = or_(and_(Fight.fb_id1 == fb_id, Fight.fb_id2 == eid),
                            and_(Fight.fb_id2 == fb_id, Fight.fb_id1 == eid),)
        else:
            construct = or_(Fight.fb_id1 == fb_id, Fight.fb_id2 == fb_id)

        return Fight.query.distinct()\
            .filter_by(construct)\
            .order_by(desc(Fight.id))\
            .first()

    def who_won(self):
        return self.fb_id1 if self.result else self.fb_id2

class User(db.Model):

    __tablename__ = 'user'

    fb_id = db.Column(db.BigInteger, primary_key=True)
    monsters = db.relationship("Monster")
    fights = db.relationship("Fight", primaryjoin="or_(Fight.fb_id1==User.fb_id, Fight.fb_id2==User.fb_id)",
                             lazy='dynamic')

    def __init__(self, fb_id):
        self.fb_id = fb_id


class Monster(db.Model):

    __tablename__ = 'monster'

    id = db.Column(db.Integer, primary_key=True)
    fb_id = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    atk_spe = db.Column(db.Integer)
    def_spe = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    level = db.Column(db.Integer)
    xp = db.Column(db.BigInteger)
    pv_max = db.Column(db.Integer)
    type1 = db.Column(db.Enum(*TYPES, name="type"))
    type2 = db.Column(db.Enum(*TYPES, name="type"))

    atk1_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk1 = db.relationship("Attak", foreign_keys=[atk1_id])
    pp_max1 = db.Column(db.Integer)

    atk2_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk2 = db.relationship("Attak", foreign_keys=[atk2_id])
    pp_max2 = db.Column(db.Integer)

    atk3_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk3 = db.relationship("Attak", foreign_keys=[atk3_id])
    pp_max3 = db.Column(db.Integer)

    atk4_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk4 = db.relationship("Attak", foreign_keys=[atk4_id])
    pp_max4 = db.Column(db.Integer)

    belong_to = db.Column(db.Integer, db.ForeignKey('user.fb_id'))

    def get_stats(self, complete=False):
        d = dict()
        if complete:
            d = {
                'speed': self.speed,
                'attack': self.attack,
                'defense': self.defense,
                'atk_spe': self.atk_spe,
                'def_spe': self.def_spe
            }

        d.update(
            {
                'fb_id': self.fb_id,
                'owner': self.belong_to,
                'level': self.level,
                'pv_max': self.pv_max,
                'pv': self.pv_max, # init with pv_max
                'xp': self.xp,
                'atks': [
                    {
                        'name': self.atk1.name,
                        'id': self.atk1.id,
                        'dmg': self.atk1.dmg,
                        'type': self.atk1.type,
                        'pp_max': self.atk1.pp_max,
                        'pp': self.atk1.pp_max
                    },
                    {
                        'name': self.atk2.name,
                        'id': self.atk2.id,
                        'dmg': self.atk2.dmg,
                        'type': self.atk2.type,
                        'pp_max': self.atk2.pp_max,
                        'pp': self.atk2.pp_max
                    },
                    {
                        'name': self.atk3.name,
                        'id': self.atk3.id,
                        'dmg': self.atk3.dmg,
                        'type': self.atk3.type,
                        'pp_max': self.atk3.pp_max,
                        'pp': self.atk3.pp_max
                    },
                    {
                        'name': self.atk4.name,
                        'id': self.atk4.id,
                        'dmg': self.atk4.dmg,
                        'type': self.atk4.type,
                        'pp_max': self.atk4.pp_max,
                        'pp': self.atk4.pp_max
                    }
                ]
            }

        )

        return d

class Attak(db.Model):

    __tablename__ = 'attak'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    type = db.Column(db.Enum(*TYPES, name="type"), nullable=False)
    dmg = db.Column(db.Integer)
    desc = db.Column(db.Text)
    pp_max = db.Column(db.Integer)

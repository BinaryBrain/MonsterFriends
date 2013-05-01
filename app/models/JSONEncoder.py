#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from json import JSONEncoder
from app.models import Fight, User, Monster, Attak


class ModelsEncoder(JSONEncoder):

    def default(self, o):
        if isinstance(o, Fight):
            return dict(id=o.id, fb_id1=o.fb_id1, fb_id2=o.fb_id2, result=o.result)
        elif isinstance(o, User):
            return dict(fb_id=o.fb_id, monsters=[m.get_stats for m in o.monsters])
        elif isinstance(o, Monster):
            return o.get_stats(True)
        elif isinstance(o, Attak):
            return dict(id=o.id, name=o.name, type=o.type, dmg=o.dmg, desc=o.desc, pp_max=o.pp_max)
        else:
            return JSONEncoder.default(self, o)

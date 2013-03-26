# Socket.io Events
## Server -> Client

### General
`error( { type: "ERROR_???", msg: "Error: ???" })`: Send an error to the user.  
`ok`: Everything is good with the request.  
`welcome({ friends: [{ fbid: facebookID, name: facebookName, ... }, ... ] })`: The user has been authenticated with Facebook.  

### Fight
`reject-fight({  })`: The enemy cannot fight.  
`fight({ fid: fightID, eid: enemyID, data: FIGHT¹ })`: Tell the user he has been attacked by an another user.  
`attack({ aid: attackID, name: "name", type: "type", dmg: 42, msg: "Wow! A fireball!", ... })`: The user's friends is attacked.  

## Client -> Server
### General
`hello({ fbid: facebookID })`: User say hi to the server and send some user informations.  

### Fight
`ask-fight({ eid: enemyID })`: User asks the server to create a new fight against an enemy.  
`attack({ fid: fightID, aid: attackID })`: The user attack the enemy user.  

## Footnotes
FIGHT¹: `{ you: { ... } , enemy: { ... }`  

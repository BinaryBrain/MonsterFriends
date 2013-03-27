#!/bin/sh
echo "\n\n[INFO] Downloading dependencies (redis, postgresql, python-dev, etc.)"
sudo apt-get install git redis-server postgresql python-dev python-pip libevent-dev postgresql-server-dev-9.1

if [ "$?" = 0 ]
then
  echo "\n\n[INFO] Downloading gevent-socketio..."
  git clone git://github.com/abourget/gevent-socketio.git _TEMP_GEVENT_SOCKETIO_
  cd _TEMP_GEVENT_SOCKETIO_/
  
  echo "\n\n[INFO] Installing gevent-socketio..."
  sudo python setup.py install
  cd ..
  
  echo "\n\n[INFO] Cleaning gevent-socketio..."
  sudo rm -Rfv _TEMP_GEVENT_SOCKETIO_
  
  echo "\n\n[INFO] Configuring monsterfriends..."
  sudo pip install -r requirements.txt
  
  if [ "$?" = 0 ]
  then
    python run.py
    
    echo "\n\n[INFO] Server launched. To launch it again: python run.py"
    
  else
    echo "\n\n[EE] Abording..."
    return 2
  fi

else
  echo "\n\n[EE] Abording..."
  return 1
fi

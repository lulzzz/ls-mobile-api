#!/bin/bash -x

sed -i "s~http:\/\/localhost:8080\/s2\/api~$LOGI_HOST~g;s~http:\/\/localhost:9000~$TEMP_HOST~g;"s/amsUser:\ \'logistimo\'/amsUser:\ \'$AMS_USER\'/g";"s/amsPwd:\ \'logistimo\'/amsPwd:\ \'$AMS_PASS\'/g";"s~statusFilePath:\ \'\'~statusFilePath:\ \'$STATUS_FILE\'~g";s~http:\/\/localhost:9010~$ES_HOST~g" $NODE_HOME/conf/dev.js

exec npm start

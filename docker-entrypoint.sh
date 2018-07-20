#!/bin/bash -x

sed -i "s~http:\/\/localhost:8080\/s2\/api~$LOGI_HOST~g;s~http:\/\/localhost:9000~$TEMP_HOST~g;"s/amsUser:\ \'logistimo\'/amsUser:\ \'$AMS_USER\'/g";"s/amsPwd:\ \'logistimo\'/amsPwd:\ \'$AMS_PASS\'/g";"s~statusFilePath:\ \'\'~statusFilePath:\ \'$STATUS_FILE\'~g";s~http:\/\/localhost:9010~$ES_HOST~g;s~http:\/\/localhost:9070~$COLLAB_HOST~g;s~http:\/\/localhost:8080~$MEDIA_HOST~g" $NODE_HOME/conf/dev.js

sed -i "s~localhost:8200~$APM_SERVER_URL~g;s~mapi~$SERVICE_NAME~g" $NODE_HOME/bin/www

exec npm start

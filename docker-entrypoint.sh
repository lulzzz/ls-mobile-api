#!/usr/bin/env bash


sed -ri "s/baseurl: \'http:\/\/localhost:8080/baseurl: \'http:\/\/$LOGI_HOST:$LOGI_PORT/g" $NODE_HOME/conf/dev.js \
    sed -ri "s/tempurl: \'http:\/\/localhost:9000/tempurl: \'http:\/\/$TEMP_HOST:$TEMP_PORT/g" $NODE_HOME/conf/dev.js \
    sed -ri "s/approvalUrl: \'http:\/\/localhost:6400/approvalUrl: \'http:\/\/$APPROVAL_HOST:$APPROVAL_PORT/g" $NODE_HOME/conf/dev.js


exec npm start

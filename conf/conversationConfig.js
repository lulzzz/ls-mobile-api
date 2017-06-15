/**
 * Created by yuvaraj on 14/06/17.
 */
'use strict';

module.exports = {
    addmessage: {
        url: '/conversation/message',
        method: 'POST',
        timeout: 1000,
        req_pld: 'query'
    },
    addeditmessage: {
        url: '/conversation/addEditMessage',
        method: 'POST',
        timeout: 1000,
        req_pld: 'query'
    }
};

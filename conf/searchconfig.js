/**
 * Created by yuvaraj on 11/05/17.
 */
'use strict';

module.exports = {
    entity_search:{
        url: '/entities/',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    },
    material_search:{
        url: '/materials/',
        method:'GET',
        timeout:1000,
        req_pld: 'query'
    }
}


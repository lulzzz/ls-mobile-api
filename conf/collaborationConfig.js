/**
 * Created by smriti on 19/11/17.
 */


module.exports = {
    post_like: {
        url: '/collaboration/likes',
        method: 'POST',
        timeout: 30000,
        req_pld: 'query'
    },

    get_likers_detail: {
        url: '/collaboration/likes',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },

    get_likes_count: {
        url: '/likes/counts',
        method: 'POST',
        timeout: 30000,
        req_pld: 'query'
    },

    get_likes: {
        url: '/collaboration/likes',
        method: 'GET',
        timeout: 30000,
        req_pld: 'query'
    },
    post_feedback:{
        url: '/feedback',
        method: 'POST',
        timeout: 30000,
        req_pld: 'body'
    }
};
'use strict';

const Hapi = require('hapi');
const Twit = require('twit');
const config = require('./config');

const server = Hapi.server({host: '0.0.0.0', port: process.env.PORT});

server.route([
    {
        method: 'GET',
        path: '/webhook.json',
        handler(request, h) {
            console.log('REQUEST', request.payload);
            // const sha256_hash_digest = Hash.hmac(config.consumer_secret, )

            // Hash.sha256().update()

            // return {
            //     response_token: `sha256=${crypto.createHmac('sha256', config.consumer_secret).update(crc_token).digest('base64')}`
            // }
        }
    }
    // {
    //     method: 'POST',
    //     path: '/webhook',
    //     handler(request, h) {

    //     }
    // }
]);

(async () => {
    try {
        await server.start();

        const twit = new Twit(config);
        twit.post(`/webhooks.json?url=https://${process.env.HEROKU_APP_NAME}.herokuapp.com:${process.env.PORT}/webhook`, function(err, data, response) {
            console.log('RESPONSE', response);
        });
    } catch (e) {
        console.error(e);
    }
})();







// const userStream = twit.stream('user');
// userStream.on('follow', function({ source: {screen_name}}) {
//     console.log(`@${screen_name} followed you. Following back.`);
//     twit.post('friendships/create', {
//         screen_name,
//         follow: true
//     });
// });
// userStream.on('unfollow', function({ source: {screen_name}}) {
//     console.log(`@${screen_name} unfollowed you. Unfollowing back.`);
//     twit.post('friendships/create', {
//         screen_name,
//         follow: false
//     });
// });
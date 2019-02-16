'use strict';

const Hapi = require('hapi');
const Twit = require('twit');
const config = require('./config');

const PORT = process.env.PORT || 8080;

const server = Hapi.server({port: PORT});

server.route([
    {
        method: 'GET',
        path: '/alive.txt',
        handler(request, h) {
            return 'OK';
        }
    },
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
        twit.post(`/webhooks.json?url=https://${process.env.HEROKU_APP_NAME}.herokuapp.com:/webhook`, function(err, data, response) {
            console.log('RESPONSE', err);
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
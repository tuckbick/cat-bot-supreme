'use strict';

const Hapi = require('hapi');
const Twit = require('twit');
const Crypto = require('crypto');
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
        path: '/webhook',
        handler(request, h) {
            return {
                response_token: `sha256=${Crypto.createHmac('sha256', config.consumer_secret).update(request.query.crc_token).digest('base64')}`
            }
        }
    }
]);

(async () => {
    try {
        await server.start();

        const twit = new Twit(config);
        twit.post('account_activity/all/dev/webhooks', {url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/webhook`});
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
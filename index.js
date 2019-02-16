const Twit = require('twit');
const config = require('./config');

const twit = new Twit(config);

const userStream = twit.stream('user');
userStream.on('follow', function({ source: {screen_name}}) {
    console.log(`@${screen_name} followed you. Following back.`);
    twit.post('friendships/create', {
        screen_name,
        follow: true
    });
});
userStream.on('unfollow', function({ source: {screen_name}}) {
    console.log(`@${screen_name} unfollowed you. Unfollowing back.`);
    twit.post('friendships/create', {
        screen_name,
        follow: false
    });
});
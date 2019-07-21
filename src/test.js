const isReachable = require('is-reachable');

(async () => {
    console.log(await isReachable('developer.clashofclans.com'));
    //=> true

    console.log(await isReachable('google.com'));
    //=> true
})();
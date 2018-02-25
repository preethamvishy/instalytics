const { getStats } = require('./index');

getStats('instagram').then(stats => {
    console.log(stats);
});

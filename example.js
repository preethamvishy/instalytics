const { getStats, getFullStats, getQuickStats } = require('./index');

getFullStats('instagram').then(stats => {
    console.log(stats);
});

getQuickStats('instagram', 12).then(stats => {
    console.log(stats);
});

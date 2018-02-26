const { getStats, getFullStats, getQuickStats } = require('./index');

getFullStats('eminem').then(stats => {
    console.log(stats);
});

getQuickStats('eminem', 12).then(stats => {
    console.log(stats);
});

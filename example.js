const { getStats, getFullStats, getQuickStats } = require('./index');

getFullStats('rabonatv').then(stats => {
    console.log(stats);
});

getQuickStats('rabonatv').then(stats => {
    console.log(stats);
});

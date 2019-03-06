const { getQuickStats } = require('./index');

var desiredNumberOfTopPosts = 6;
getQuickStats('instagram', desiredNumberOfTopPosts).then(stats => {
    console.log(stats);
});

NodeJS tool to fetch Instagram analytics for any user without involving tokens or headless browsers. https://www.npmjs.com/package/instalytics

### Data

*Instalytics* returns the following data

```javascript
{
    posts,
    totalLikes,
    totalComments,
    totalEngagements,
    averageLikes,
    averageComments,
    averageEngagements,
    mostLikedMedia,         //Number of media customisable. Default: 5
    mostCommentedMedia,     //Number of media customisable. Default: 5
    username,
    name,
    id,
    bio,
    website,
    followers,
    following
}
```

⭐️ the [GitHub repo](https://github.com/preethamvishy/instalytics) if this works for you.

### Usage

Instalytics can be installed via npm: `npm install instalytics --save`

`Example.js` provides a concise example.

```javascript
const { getStats, getFullStats, getQuickStats } = require('instalytics');

//Get full statistics of all posts by the user
getFullStats('eminem').then(stats => {
    console.log(stats);
});

//Get quick stats 50 latest posts by the user (or all posts if the user has < 50 posts)
getQuickStats('eminem').then(stats => {
    console.log(stats);
});

```



Tested with accounts upto 2003 posts. Instagram blocks too many repeated requests in a short period of time and as a result, your Promises may be rejected while analysing accounts with relatively large number of posts. If you plan to analyse accounts with large number of posts repeatedly over a short durations, I suggest you to use `getUserMediaAdvanced() ` function from [instapro](https://github.com/preethamvishy/instagram-node) in a loop with time interval to fetch all posts and then use the `getStats()`function from this package. This will be fixed out of the box in future versions.

### License

MIT
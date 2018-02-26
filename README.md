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
    mostLikedMedia,
    mostCommentedMedia,
    username,
    name,
    id,
    bio,
    website,
    followers,
    following
}
```

### Usage

Instalytics can be installed via npm: `npm install instalytics --save`

`Example.js` provides a concise example.

```javascript
const { getStats, getFullStats, getQuickStats } = require('instalytics');

//Get full statistics of all posts by the user
getFullStats('instagram').then(stats => {
    console.log(stats);
});

//Get quick stats (upto 50 latest posts) by the user
getQuickStats('instagram').then(stats => {
    console.log(stats);
});

```



### License

MIT
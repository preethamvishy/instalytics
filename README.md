NodeJS tool to fetch Instagram analytics for any user without involving tokens or headless browsers. https://github.com/preethamvishy/instalytics

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
getFullStats('instagram').then(stats => {
    console.log(stats);
});

//Get quick stats 50 latest posts by the user (or all posts if the user has < 50 posts)
getQuickStats('instagram').then(stats => {
    console.log(stats);
});

```



### License

MIT
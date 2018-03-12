NodeJS tool to fetch Instagram analytics for any user without involving tokens or headless browsers. 

⭐️ the [GitHub repo](https://github.com/preethamvishy/instalytics) if this works for you.

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
    following,
    profilePictureUrl,
    profilePictureUrlHD
}
```

### Usage

 `npm install instalytics --save`

`Example.js` provides a concise example.

```javascript
const { getStats, getFullStats, getQuickStats } = require('instalytics');

//Get full statistics of all posts by the user
getFullStats('eminem', 6, interval = 5000).then(stats => {
    console.log(stats);
});
// => Time interval (in milliseconds) between calls is 
//      recommended for accounts with more than 200 posts
//      and accounts with more than 200 posts and 
//      needed for 500 or more posts.
// => Choose appropriate time intervals ( > 30,000 milliseconds)

// Get 50 latest posts by the user (or all posts if the user 
// has < 50 posts)
getQuickStats('eminem').then(stats => {
    console.log(stats);
});

```

`getQuickStats()` is recommended for general use.

`getFullStats()` has been tested with accounts upto 2003 posts. Instagram blocks too many repeated requests in a short period of time and as a result, your Promises may be rejected while analysing accounts with relatively large number of posts aggressively.



### License

MIT
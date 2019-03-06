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
const { getQuickStats } = require('./index');

getQuickStats('instagram', 6).then(stats => {
    console.log(stats);
});

```

### License

MIT
Instagram analytics for any user without involving tokens or headless browsers.

### Data

*Instalytics* returns the following data

```json
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
}
```

### Usage

`Example.js` provides a concise example.

```javascript
const { getStats } = require('./index');

getStats('instagram').then(stats => {
    console.log(stats);
});
```



### License

MIT
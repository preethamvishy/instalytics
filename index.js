const {
    getUserByUsername,
    getUserMediaAdvanced
 } = require('instapro');

exports.getQuickStats = username => {
    return getUserByUsername(username)
        .then(({ user }, res) => {
            return getUserMediaAdvanced(user.id)
                .then((userData, res) => {
                    return this.getStats(userData.data.user.edge_owner_to_timeline_media.edges, user, username)
                })
        })
}

exports.getFullStats = username => {
    return getUserByUsername(username)
        .then(({ user }, res) => {
            return fetchAllMedia(user)
                .then((media, res) => {
                    return this.getStats(media, user, username)
                })
        })
}

exports.getStats = (media, user, username) => {
    var mediaArray = media;
    var comments = 0;
    var likes = 0;
    var averageComments = 0
    var averageLikes = 0
    var count = 0,
        likesArray = [],
        commentsArray = [];

    for (let node of mediaArray) {
        likes += node.node.edge_media_preview_like.count;
        likesArray.push(node.node.edge_media_preview_like.count);
        comments += node.node.edge_media_to_comment.count;
        commentsArray.push(node.node.edge_media_to_comment.count);
        count++;
    }

    averageLikes = likes / count;
    averageComments = comments / count;
    mostLikedIndex = likesArray.indexOf(likesArray.reduce(function (a, b) {
        return Math.max(a, b);
    }));
    mostCommentedIndex = commentsArray.indexOf(commentsArray.reduce(function (a, b) {
        return Math.max(a, b);
    }));

    mostLikedMedia = mediaArray[mostLikedIndex].node;
    mostCommentedMedia = mediaArray[mostCommentedIndex].node;

    console.log(`@${username} summary for the last ${count} posts:`)
    console.log('Total likes:           ' + likes)
    console.log('Total comments:        ' + comments)
    console.log('Total engagements:     ' + (likes + comments))
    console.log('Average likes:         ' + averageLikes)
    console.log('Average comments:      ' + averageComments)
    console.log('Average engagements:   ' + (likes + comments) / count)

    return res = {
        username: username,
        name: user.full_name,
        id: user.id,
        bio: user.biography,
        website: user.external_url,
        followers: user.followed_by.count,
        following: user.follows.count,
        posts: user.media.count,
        totalLikes: likes,
        totalComments: comments,
        totalEngagements: (likes + comments),
        averageLikes: (likes / count),
        averageComments: (comments / count),
        averageEngagements: ((likes + comments) / count),
        mostLikedMedia: mostLikedMedia,
        mostCommentedMedia: mostCommentedMedia,
        success: true
    }
}

async function fetchAllMedia(user) {
    var after = '';
    var userData = {};
    var media = [];

    do {
        await getUserMediaAdvanced(user.id, 50, after).then((user) => {
            userData = user;
            after = userData.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
            for (let node of userData.data.user.edge_owner_to_timeline_media.edges) {
                media.push(node);
            }
        })
    } while (userData.data.user.edge_owner_to_timeline_media.page_info.has_next_page)
    return media;
}

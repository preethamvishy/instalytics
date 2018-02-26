const {
    getUserByUsername,
    getUserMediaAdvanced
 } = require('instapro');

exports.getQuickStats = (username, topCount) => {
    return getUserByUsername(username)
        .then(({ user }, res) => {
            return getUserMediaAdvanced(user.id)
                .then((userData, res) => {
                    return this.getStats(userData.data.user.edge_owner_to_timeline_media.edges, user, username, topCount)
                })
        })
}

exports.getFullStats = (username, topCount) => {
    return getUserByUsername(username)
        .then(({ user }, res) => {
            return fetchAllMedia(user)
                .then((media, res) => {
                    return this.getStats(media, user, username, topCount)
                })
        })
}

exports.getStats = (media, user, username, topCount = 5) => {
    var mediaArray = media,
                    comments = 0,
                    likes = 0,
                    averageComments = 0,
                    averageLikes = 0,
                    count = 0,
                    likesArray = [],
                    commentsArray = [];

    var mostLikedMedia = this.getTopLikedMedia(media, topCount),
        mostCommentedMedia = this.getTopCommentedMedia(media, topCount);
    for (let node of mediaArray) {
        likes += node.node.edge_media_preview_like.count;
        comments += node.node.edge_media_to_comment.count;
        count++;
    }

    averageLikes = likes / count;
    averageComments = comments / count;

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

exports.getTopLikedMedia = (media, topCount) => {
    return media.sort(function(node1, node2) {
        var x = node1.node.edge_media_preview_like.count
        var y = node2.node.edge_media_preview_like.count
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }).slice(0, (topCount > media.length ? media.length : topCount))
 }
 
 exports.getTopCommentedMedia = (media, topCount) => {
    return media.sort(function(node1, node2) {
        var x = node1.node.edge_media_to_comment.count
        var y = node2.node.edge_media_to_comment.count
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }).slice(0, (topCount > media.length ? media.length : topCount));
 }
 
 
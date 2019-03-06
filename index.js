const {
    getUserByUsername,
} = require('instapro');

exports.getQuickStats = (username, topCount=5) => {
    return getUserByUsername(username)
        .then((user, res) => {
            return this.getStats(user, username, topCount)
        });
}

exports.getStats = (user, username, topCount) => {
    var media = user.edge_owner_to_timeline_media.edges,
        comments = 0,
        likes = 0,
        count = 0;

    var mostLikedMedia = this.getTopLikedMedia(media, topCount),
        mostCommentedMedia = this.getTopCommentedMedia(media, topCount);
    for (let node of media) {
        likes += node.node.edge_media_preview_like.count;
        comments += node.node.edge_media_to_comment.count;
        count++;
    }


    return res = {
        username: username,
        name: user.full_name,
        id: user.id,
        bio: user.biography,
        profilePictureUrl: user.profile_pic_url,
        profilePictureUrlHD: user.profile_pic_url_hd,
        website: user.external_url,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        posts: user.edge_owner_to_timeline_media.count,
        totalLikes: likes,
        totalComments: comments,
        totalEngagements: (likes + comments),
        averageLikes: Math.round(likes / count),
        averageComments: Math.round(comments / count),
        averageEngagements: Math.round((likes + comments) / count),
        mostLikedMedia: mostLikedMedia,
        mostCommentedMedia: mostCommentedMedia,
        success: true
    }
}

exports.getTopLikedMedia = (media, topCount) => {
    return media.sort(function (node1, node2) {
        var x = node1.node.edge_media_preview_like.count;
        var y = node2.node.edge_media_preview_like.count;
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }).slice(0, (topCount > media.length ? media.length : topCount))
}

exports.getTopCommentedMedia = (media, topCount) => {
    return media.sort(function (node1, node2) {
        var x = node1.node.edge_media_to_comment.count;
        var y = node2.node.edge_media_to_comment.count;
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }).slice(0, (topCount > media.length ? media.length : topCount));
}


const {
    getUserByUsername,
    getUserMediaAdvanced
 } = require('instapro');



exports.getStats = username => {
    return getUserByUsername(username)
    .then(({ user }, res) => {
        return getUserMediaAdvanced(user.id)
            .then((userData, res) => {
                var mediaArray = userData.data.user.edge_owner_to_timeline_media.edges,
                    comments = 0,
                    likes = 0,
                    averageComments,
                    averageLikes,
                    count = 0,
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
                mostLikedIndex = likesArray.indexOf(likesArray.reduce(function(a, b) {
                    return Math.max(a, b);
                }));
                mostCommentedIndex = commentsArray.indexOf(commentsArray.reduce(function(a, b) {
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
                posts: count,
                totalLikes: likes,
                totalComments: comments,
                totalEngagements: (likes + comments),
                averageLikes: (likes/count),
                averageComments: (comments/count),
                averageEngagements: ((likes + comments)/count),
                mostLikedMedia: mostLikedMedia,
                mostCommentedMedia: mostCommentedMedia,
                success:true
                }
                
            })
    })
}
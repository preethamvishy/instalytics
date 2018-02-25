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
                    count = 0;
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
                posts: count,
                totalLikes: likes,
                totalComments: comments,
                totalEngagements: (likes + comments),
                averageLikes: (likes/count),
                averageComments: (comments/count),
                averageEngagements: ((likes + comments)/count),
                success:true
                }
            })
    })
}
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Comments } from "../api/models/Comments";

export default function useCommentsSubscribe(articleId: string) {
  return useTracker(() => {
    const handler = Meteor.subscribe("getArticleComments", articleId);
    if (!handler.ready()) return { loading: true, comments: [] };
    const rawComments = Comments.collection
      .find({}, { sort: { createdOn: -1 } })
      .fetch();
    const users = Meteor.users.find({}).fetch();
    const comments = rawComments.map((comment) => {
      const user = users.find((user) => user._id === comment.createdById);
      return {
        ...comment,
        author: {
          _id: user?._id,
          profile: {
            name: (user?.profile as any)?.name,
          },
        },
      };
    });
    console.log("Comments: ", comments);
    return { loading: false, comments };
  });
}

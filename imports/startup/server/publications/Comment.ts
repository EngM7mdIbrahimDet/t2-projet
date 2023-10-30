import { Meteor } from "meteor/meteor";
import { Comments } from "/imports/api/models/Comments";

Meteor.publish("getArticleComments", function (articleId: string) {
  const commentsHandler = Comments.collection.find({ articleId });
  const comments = commentsHandler.fetch();
  const userIds = comments.map((comment) => comment.createdById!);
  const usersHandler = Meteor.users.find(
    { _id: { $in: userIds } },
    {
      fields: {
        "profile.name": 1,
      },
    }
  );
  return [commentsHandler, usersHandler];
});

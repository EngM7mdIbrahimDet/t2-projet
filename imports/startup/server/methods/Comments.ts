import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Articles } from "/imports/api/models/Articles";
import { IComment } from "/imports/types/IComment";
import { Comments } from "/imports/api/models/Comments";

export const postCommentToArticle = (comment: IComment) => {
  check(comment, {
    content: String,
    articleId: String,
  });
  const currenUser = Meteor.user();
  if (!currenUser) {
    throw new Meteor.Error("You should be logged in to post a comment");
  }
  const currentArticle = Articles.collection.findOne({
    _id: comment.articleId,
  });
  if (!currentArticle) {
    throw new Meteor.Error(
      "Article not found! May be the author has removed it!"
    );
  }

  return Comments.collection.insert({
    ...comment,
    createdById: currenUser._id,
    createdOn: new Date(),
  });
};

export const removeComment = ( commentId: string ) => {
  const currenUser = Meteor.user();
  if (!currenUser) {
    throw new Meteor.Error("You should be logged in to remove a comment");
  }
  const currentComment = Comments.collection.findOne({ _id: commentId });
  if (!currentComment) {
    throw new Meteor.Error(
      "Comment not found! May be you have already removed it!"
    );
  }
  if (currentComment.createdById !== currenUser._id) {
    throw new Meteor.Error("You can only remove your own comments");
  }
  Comments.collection.remove({ _id: commentId });
  return true;
};

Meteor.methods({
  "comments.post": postCommentToArticle,
  "comments.remove": removeComment,
});

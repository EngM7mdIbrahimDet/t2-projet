import { Meteor } from "meteor/meteor";
import { IArticle } from "/imports/types/IArticle";
import { Articles } from "/imports/api/models/Articles";
import { check } from "meteor/check";
import { Comments } from "/imports/api/models/Comments";

const getAllArticles = async (filter: { page: number; search: string }) => {
  const skipCount = filter?.page ? Math.max(+filter.page - 1, 0) * 10 : 0;
  const articles = Articles.collection
    .createQuery({
      $filters: {
        $or: [
          { title: { $regex: filter?.search ?? "", $options: "i" } },
          {
            text: { $regex: filter?.search ?? "", $options: "i" },
          },
        ],
      },
      $options: {
        sort: { createdOn: -1 },
        skip: skipCount,
        limit: 10,
      },
      title: 1,
      createdOn: 1,
      modifiedOn: 1,
      text: 1,
      createdById: 1,
      author: { profile: { name: 1 } },
      comments: {
        text: 1,
      },
      commentsCount: 1,
    })
    .fetch();
  const articlesCount = Articles.collection.find({}).count();
  const queryCount = Articles.collection
    .find({
      $or: [
        { title: { $regex: new RegExp(`.*${filter?.search}.*`, "i") } },
        {
          text: { $regex: new RegExp(`.*${filter?.search}.*`, "i") },
        },
      ],
    })
    .count();
  return {
    articles: articles,
    count: articlesCount,
    pages: Math.ceil(queryCount / 10),
  };
};

const getSignleArticle = (articleID: string) => {
  return Articles.collection
    .createQuery({
      $filters: {
        _id: articleID,
      },
      $options: {
        sort: { createdOn: -1 },
      },
      title: 1,
      createdOn: 1,
      modifiedOn: 1,
      text: 1,
      createdById: 1,
      author: { profile: { name: 1 } },
      comments: {
        text: 1,
      },
      commentsCount: 1,
    })
    .fetchOne();
};

const addArticle = (article: IArticle) => {
  check(article, {
    title: String,
    text: String,
  });
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to create a new article");
  }
  const newArticle: IArticle = {
    ...article,
    createdById: currentUserID,
    createdOn: new Date(),
  };
  return Articles.collection.insert(newArticle);
};

const removeArticle = (articleID: string) => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to remove an article");
  }
  let currentArticle = Articles.collection.findOne({ _id: articleID });
  if (!currentArticle) {
    throw new Meteor.Error("Article not found");
  }
  if (currentArticle.createdById !== currentUserID) {
    throw new Meteor.Error("You are not the owner to remove this article");
  }
  Comments.collection.remove({ articleId: articleID });
  return Articles.collection.remove({ _id: articleID });
};

const getMyArticles = () => {
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to get my articles");
  }
  return Articles.collection
    .createQuery({
      $filters: {
        createdById: currentUserID,
      },
      $options: {
        sort: { createdOn: -1 },
      },
      title: 1,
      createdOn: 1,
      modifiedOn: 1,
      text: 1,
      createdById: 1,
      author: { profile: { name: 1 } },
      comments: {
        text: 1,
      },
      commentsCount: 1,
    })
    .fetch();
};

const updateArticle = (article: IArticle) => {
  check(article, {
    _id: String,
    title: String,
    text: String,
  });
  const currentUserID = Meteor.userId();
  if (!currentUserID) {
    throw new Meteor.Error("Unauthorized to update an article");
  }
  let currentArticle = Articles.collection.findOne({ _id: article._id });
  if (!currentArticle) {
    throw new Meteor.Error("Article not found");
  }
  if (currentArticle.createdById !== currentUserID) {
    throw new Meteor.Error("Unauthorized to update this article");
  }
  return Articles.collection.update(
    { _id: article._id },
    {
      $set: {
        title: article.title,
        text: article.text,
        modifiedOn: new Date(),
      },
    }
  );
};

Meteor.methods({
  "articles.add": addArticle,
  "articles.getAll": getAllArticles,
  "articles.remove": removeArticle,
  "articles.getMyArticles": getMyArticles,
  "articles.getSingle": getSignleArticle,
  "articles.update": updateArticle,
});

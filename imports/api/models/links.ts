import { Meteor } from "meteor/meteor";
import { Articles } from "./Articles";
import { Comments } from "./Comments";

//Link between articles and users
Articles.collection.addLinks({
  author: {
    type: "one",
    collection: Meteor.users,
    field: "createdById",
  },
  comments: {
    collection: Comments.collection,
    inversedBy: "article",
  },
});


Meteor.users.addLinks({
  articles: {
    collection: Articles.collection,
    inversedBy: "author",
  },
  comments: {
    collection: Comments.collection,
    inversedBy: "author",
  },
});

//Link between articles and comments
Comments.collection.addLinks({
  article: {
    collection: Articles.collection,
    type: "one",
    field: "articleId",
  },
  author: {
    type: "one",
    collection: Meteor.users,
    field: "createdById",
  },
});

//Reducers for articles
Articles.collection.addReducers({
  commentsCount: {
    body: {
      _id: 1,
      comments: {
        text: 1,
      },
    },
    reduce(body: any) {
      if (body.comments) {
        return body.comments.length;
      } else {
        return 0;
      }
    },
  },
});

import { Meteor } from "meteor/meteor";
import { IArticle } from "./IArticle";

export interface IComment {
  _id?: string;
  articleId: string;
  content: string;
  createdById?: string;
  createdOn?: Date;

  // These are not stored in the database, but are added by the links
  author?: Meteor.User;
  article?: IArticle;
}

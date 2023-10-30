import { Meteor } from "meteor/meteor";
import { IComment } from "./IComment";

export interface IArticle{
    _id?: string;
    title: string;
    text: string;
    createdById?: string;
    createdOn?: Date;
    modifiedOn?: Date;


    //Links to other collections
    author?: Meteor.User;
    comments?: IComment[];
    commentsCount?: number;
}
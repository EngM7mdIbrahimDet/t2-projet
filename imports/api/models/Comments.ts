import { Mongo } from "meteor/mongo";
import { CreatedOnDateSchema } from "./DoubleDate";
import SimpleSchema from 'simpl-schema';
import { IComment } from "../../types/IComment";

class CommentsCollection {

    name;
    collection: Mongo.Collection<IComment>;
    schema;

    constructor() {
        // The name of this collection.
        this.name = 'comments';
        // Define the Mongo collection.
        this.collection = new Mongo.Collection<IComment>(this.name);
        // Define the structure of each document in the collection.
        const ArticleSchema = new SimpleSchema({
           createdById: String,
           articleId: String,
           content: String,
        }, {
            clean: {
                autoConvert: true,
                removeEmptyStrings: true,
                trimStrings: true,
                getAutoValues: true,
            }
        })

        ArticleSchema.extend(CreatedOnDateSchema);

        this.schema = ArticleSchema;
        // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
        //@ts-ignore
        this.collection.attachSchema(this.schema);
    }
}

/**
 * The singleton instance of the ActivitiesCollection.
 * @type {CommentsCollection}
 */
export const Comments = new CommentsCollection();
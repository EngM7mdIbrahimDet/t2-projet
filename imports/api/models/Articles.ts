import { Mongo } from "meteor/mongo";
import { DoubleDateSchema } from "./DoubleDate";
import SimpleSchema from 'simpl-schema';
import { IArticle } from "../../types/IArticle";

class ArticlesCollection {

    name;
    collection: Mongo.Collection<IArticle>;
    schema;

    constructor() {
        // The name of this collection.
        this.name = 'articles';
        // Define the Mongo collection.
        this.collection = new Mongo.Collection<IArticle>(this.name);
        // Define the structure of each document in the collection.
        const ArticleSchema = new SimpleSchema({
           createdById: String,
           text: String,
           title: String,
        }, {
            clean: {
                filter: true,
                autoConvert: true,
                removeEmptyStrings: true,
                trimStrings: true,
                getAutoValues: true,
            }
        })

        ArticleSchema.extend(DoubleDateSchema);

        this.schema = ArticleSchema;
        // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
        //@ts-ignore
        this.collection.attachSchema(this.schema);
    }
}

/**
 * The singleton instance of the ActivitiesCollection.
 * @type {ArticlesCollection}
 */
export const Articles = new ArticlesCollection();
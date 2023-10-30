declare module "meteor/mongo" {
  import SimpleSchema from "simpl-schema";
  namespace Mongo {
    type FieldsSelector<T> = {
      [key in keyof T]?: 1 | 0 | any
    }
    type CreateQueryType<T>  =  FieldsSelector<T> & {
      $filters?: Selector<T> | ObjectID | string;
      $options?: Options<T>;
    }
    interface Collection<T> {
      addLinks(arg0: Object): void;
      addReducers(arg0: Object): void;
      createQuery(arg0: CreateQueryType<T>): {
        fetchOne(): T | undefined | null;
        getCount: () => number;
        fetch: () => T[];
      };
      /**
       * collection2 extension
       */
      attachSchema(schema: SimpleSchema): void;
    }
  }
}

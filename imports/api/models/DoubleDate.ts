export const CreatedOnDateSchema = {
  createdOn: {
    type: Date,
    autoValue: function () {
      //@ts-ignore
      if (this.isInsert) {
        const date = new Date();
        return date;
      } else {
        //@ts-ignore
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
};

export const DoubleDateSchema = {
  ...CreatedOnDateSchema,
  modifiedOn: {
    type: Date,
    optional: true,
    autoValue: function () {
      //@ts-ignore
      if (this.isInsert) {
        return null;
        //@ts-ignore
      } else if (this.isUpdate) {
        const date = new Date();
        return date;
      } else {
        //@ts-ignore
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
};

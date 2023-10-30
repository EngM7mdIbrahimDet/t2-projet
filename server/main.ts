import { Meteor } from 'meteor/meteor';
import "/imports/startup/server/methods/Accounts";
import "/imports/startup/server/methods/Articles";
import "/imports/startup/server/publications/Comment";
import "/imports/startup/server/methods/Comments";
import "../imports/api/models/links";

//Default Data

Meteor.startup(async () => {
  
});

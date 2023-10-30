import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {Accounts} from 'meteor/accounts-base';
export default function useCurrentUser() {
  return useTracker(() => {
    return {
      currentUser: Meteor.user(),
      isLoading: !Accounts.loginServicesConfigured(),
    };
  }, []);
}

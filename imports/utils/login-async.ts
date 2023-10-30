import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
function loginAsync({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<null> {
  return new Promise<null>((resolve, reject) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error && error instanceof Meteor.Error) {
        handleMeteorError(error);
        reject(error);
      } else if (error) {
        console.log(error);
        const metoerError = new Meteor.Error("Something went wrong!");
        console.log(error.message);
        handleMeteorError(metoerError);
      } else {
        resolve(null);
      }
    });
  });
}
export default loginAsync;

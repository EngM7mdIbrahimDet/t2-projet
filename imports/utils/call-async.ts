import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
function callAsync<Type>(methodName: string, arg: any): Promise<Type> {
  return new Promise<Type>((resolve, reject) =>
    Meteor.call(methodName, arg, (error: Meteor.Error, result: any) => {
      if (error) {
        handleMeteorError(error);
        reject(error);
      } else {
        resolve(result);
      }
    })
  );
}
export default callAsync;

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

export const createAcccount = ({
  email,
  password,
  name,
  confirmPassword,
}: {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}) => {
  if (password !== confirmPassword) {
    throw new Meteor.Error("Passwords doesn't match!");
  }
  const existingUser = Accounts.findUserByEmail(email);
  if (existingUser) {
    throw new Meteor.Error("Email already exists!");
  }
  return Accounts.createUser({
    email,
    password,
    profile: {
      name,
    },
  });
};

Meteor.methods({
  "accounts.create": createAcccount,
});

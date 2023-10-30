import { showNotification } from "@mantine/notifications";
import { Meteor } from "meteor/meteor";

export default function haldeMeteorError(error: Meteor.Error){
    showNotification({
        title: "Error",
        message: error.message,
        color: "red",
    });
}
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { WalletRoles } from "/infra/WalletRoles";

Meteor.methods({
    "role.checkIsAdmin": () => {
        const userId = Meteor.userId();
        if (!userId) {
            throw new Meteor.Error("Access denied")
        }

        return Roles.userIsInRole(userId, WalletRoles.ADMIN);
    }
});

import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { WalletRoles } from "/infra/WalletRoles";

Roles.createRole(WalletRoles.ADMIN, { unlessExists: true });

Meteor.startup(() => {
    const user = Meteor.users.findOne({ email: "loan@dev.com" });
    if (!user || Roles.userIsInRole(user._id, WalletRoles.ADMIN)) {
        return;
    }

    Roles.addUsersToRoles(user._id, WalletRoles.ADMIN);
});

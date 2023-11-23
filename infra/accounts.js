import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { paths } from "/imports/ui/route/paths";
import { WalletCollection } from "/imports/api/modules/wallet/infra/collections/WalletCollection";

Accounts.emailTemplates.resetPassword.html = (user, url) => `
    Hi ${user.username},</br></br>
    Reset your password with this link: ${url}
`;

Accounts.urls.resetPassword = (token) =>
    Meteor.absoluteUrl(`${paths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
    const customUser = { ...user };

    WalletCollection.insert({
        userId: user._id,
        createdAt: new Date(),
    });

    customUser.email = user.emails[0].address;

    return customUser;
});

Accounts.setDefaultPublishFields({
    ...Accounts._defaultPublishFields.projection,
    email: 1,
});

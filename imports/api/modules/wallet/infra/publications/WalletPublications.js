import { Meteor } from "meteor/meteor";
import { WalletCollection } from "/imports/api/modules/wallet/infra/collections/WalletCollection";

Meteor.publish("wallet", function publishWallets() {
    const { userId } = this;
    if (!userId) {
        throw new Meteor.Error("Access denied");
    }
    return WalletCollection.find({ userId });
});

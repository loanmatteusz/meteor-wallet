import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

import { TransactionCollection } from "/imports/api/modules/transaction/infra/collections/TransactionCollection";
import { WalletRoles } from "/infra/WalletRoles";

Meteor.methods({
    "make.transaction": (args) => {
        const userId = Meteor.userId();
        if (!userId) {
            throw new Meteor.Error("Access denied");
        }
        const schema = new SimpleSchema({
            isTransferring: {
                type: Boolean,
            },
            sourceWalletId: {
                type: String,
            },
            destinationContactId: {
                type: String,
                optional: !args.isTransferring,
            },
            amount: {
                type: Number,
                min: 1,
            },
        });
        const cleanArgs = schema.clean(args);
        schema.validate(cleanArgs);
        const { isTransferring, sourceWalletId, destinationWalletId, amount } =
            args;
        return TransactionCollection.insert({
            type: isTransferring ? "TRANSFER" : "ADD",
            sourceWalletId,
            destinationWalletId: isTransferring ? destinationWalletId : null,
            amount,
            createdAt: new Date(),
            userId,
        });
    },
    "remove.transaction": (transactionId) => {
        const userId = Meteor.userId();
        if (!userId) {
            throw new Meteor.Error("Access denied");
        }
        check(transactionId, String);

        if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
            throw new Meteor.Error("Access denied");
        }

        return TransactionCollection.remove(transactionId);
    },
});

import { Mongo } from 'meteor/mongo';
import {
    ADD_TYPE,
    TransactionSchema,
    TRANSFER_TYPE
} from "/imports/api/modules/transaction/domain/schemas/TransactionSchema";
import { WalletCollection } from "/imports/api/modules/wallet/infra/collections/WalletCollection";

export const TransactionCollection = new Mongo.Collection("transactions");

TransactionCollection.before.insert(function (userId, transactionDocument) {
    if (transactionDocument.type === TRANSFER_TYPE) {
        // We could also check here if destination wallet exists
        const sourceWallet = WalletCollection.findOne(
            transactionDocument.sourceWalletId
        );
        if (!sourceWallet) {
            throw new Meteor.Error("Source wallet not found.");
        }
        if (sourceWallet.balance < transactionDocument.amount) {
            throw new Meteor.Error("Insufficient funds.");
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc: { balance: -transactionDocument.amount },
        });
        WalletCollection.update(transactionDocument.destinationWalletId, {
            $inc: { balance: transactionDocument.amount },
        });
    }
    if (transactionDocument.type === ADD_TYPE) {
        const sourceWallet = WalletCollection.findOne(
            transactionDocument.sourceWalletId
        );
        if (!sourceWallet) {
            throw new Meteor.Error("Source wallet not found.");
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc: { balance: transactionDocument.amount },
        });
    }
});

TransactionCollection.before.remove(function (userId, transactionDocument) {
    if (transactionDocument.type === TRANSFER_TYPE) {
        // We could also check here if destination wallet exists
        const sourceWallet = WalletCollection.findOne(
            transactionDocument.sourceWalletId
        );
        if (!sourceWallet) {
            throw new Meteor.Error("Source wallet not found.");
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc: { balance: transactionDocument.amount },
        });
    }
    if (transactionDocument.type === ADD_TYPE) {
        const sourceWallet = WalletCollection.findOne(
            transactionDocument.sourceWalletId
        );
        if (!sourceWallet) {
            throw new Meteor.Error("Source wallet not found.");
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc: { balance: -transactionDocument.amount },
        });
    }
});

TransactionCollection.attachSchema(TransactionSchema);

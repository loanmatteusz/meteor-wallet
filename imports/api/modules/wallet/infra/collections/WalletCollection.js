import { Mongo } from 'meteor/mongo';
import { WalletSchema } from "/imports/api/modules/wallet/domain/schemas/WalletSchema";

export const WalletCollection = new Mongo.Collection("wallets");

WalletCollection.attachSchema(WalletSchema);

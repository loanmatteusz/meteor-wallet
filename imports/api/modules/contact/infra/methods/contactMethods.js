import { Meteor } from 'meteor/meteor';
import { ContactCollection } from "/imports/api/modules/contact/infra/collections/ContactCollection";
import { check } from 'meteor/check';

Meteor.methods({
    "create.contact": ({ name, email, imageUrl, walletId }) => {
        const userId = Meteor.userId();
        if (!userId) {
            throw new Meteor.Error("Access denied");
        }
        check(name, String);
        check(email, String);
        check(imageUrl, String);
        check(walletId, String);
        if (!name) {
            throw new Meteor.Error("Name should be not null!", "invalid-name");
        }
        if (!email) {
            throw new Meteor.Error("Email should be not null!", "invalid-email");
        }
        if (!imageUrl) {
            throw new Meteor.Error("Image should be not null!", "invalid-image");
        }
        if (!walletId) {
            throw new Meteor.Error("Wallet Id should be not null!", "invalid-wallet-id");
        }
        return ContactCollection.insert({
            name,
            email,
            imageUrl,
            walletId,
            createdAt: new Date(),
            archived: false,
            userId,
        });
    },
    "get.contacts": () => {
        return ContactCollection.find({}, { sort: { createdAt: -1 }}).fetch();
    },
    "archive.contact": ({ _id }) => {
        // check(_id, String);
        return ContactCollection.update({ _id }, { $set: { archived: true } });
    }
});

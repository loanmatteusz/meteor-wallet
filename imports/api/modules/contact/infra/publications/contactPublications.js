import { Meteor } from 'meteor/meteor';
import { ContactCollection } from "/imports/api/modules/contact/infra/collections/ContactCollection";

Meteor.publish("contacts", function publishAllContacts() {
    const userId = Meteor.userId();
    if (!userId) {
        throw new Meteor.Error("Access denied");
    }
    return ContactCollection.find({
        userId,
        archived: { $ne: true },
    }, {
        fields: {
            createdAt: false,
        },
    });
});

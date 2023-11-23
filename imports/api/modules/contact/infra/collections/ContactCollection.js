import { Mongo } from 'meteor/mongo';
import { ContactSchema } from "/imports/api/modules/contact/domain/schemas/ContactSchema";

export const ContactCollection = new Mongo.Collection("contacts");

ContactCollection.attachSchema(ContactSchema);

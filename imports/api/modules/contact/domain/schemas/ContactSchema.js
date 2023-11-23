import SimpleSchema from 'simpl-schema';

export const ContactSchema = new SimpleSchema({
    name: {
        type: String,
    },
    email: {
        type: String,
        // regEx: SimpleSchema.RegEx.Email,
    },
    imageUrl: {
        type: String,
        optional: true,
    },
    walletId: {
        type: String,
        // regEx: SimpleSchema.RegEx.Id,
    },
    createdAt: {
        type: Date,
    },
    archived: {
        type: Boolean,
        defaultValue: false,
    },
    userId: {
        type: String,
    }
});

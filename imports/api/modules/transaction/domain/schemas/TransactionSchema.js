import SimpleSchema from 'simpl-schema';

export const TRANSFER_TYPE = "TRANSFER";
export const ADD_TYPE = "ADD";


export const TransactionSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: [TRANSFER_TYPE, ADD_TYPE],
    },
    sourceWalletId: {
        type: String,
        // regEx: SimpleSchema.RegEx.Id,
    },
    destinationContactId: {
        type: String,
        optional: true,
        // regEx: SimpleSchema.RegEx.Id,
    },
    amount: {
        type: Number,
        min: 1,
    },
    createdAt: {
        type: Date,
    },
    userId: {
        type: String,
    }
});

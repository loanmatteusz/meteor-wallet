import SimpleSchema from "simpl-schema";

export const WalletSchema = new SimpleSchema({
    balance: {
        type: Number,
        min: 0,
        defaultValue: 0,
    },
    currency: {
        type: String,
        allowedValues: ["BTC", "USD"],
        defaultValue: "BTC",
    },
    createdAt: {
        type: Date,
    },
    userId: {
        type: String,
    },
});

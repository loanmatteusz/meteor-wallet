import { Meteor } from 'meteor/meteor';
import React, {useState} from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { useLoggedUser } from 'meteor/quave:logged-user-react';

import { ContactCollection } from "/imports/api/modules/contact/infra/collections/ContactCollection";
import { WalletCollection } from "/imports/api/modules/wallet/infra/collections/WalletCollection";
import { Loading } from "/imports/ui/components/Loading";
import { Modal } from "/imports/ui/components/Modal";
import { SelectContact } from "/imports/ui/components/SelectContact";

export const WalletForm = () => {
    const { loggedUser } = useLoggedUser();

    const isLoadingContacts = useSubscribe("contacts");
    const isLoadingWallets = useSubscribe("wallet");

    const contacts = useFind(() =>
        ContactCollection.find(
            { archived: { $ne: true } },
            { sort: { createdAt: -1 } },
        ));
    const [wallet] = useFind(() => WalletCollection.find());

    const [open, setOpen] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);
    const [amount, setAmount] = useState(0);
    const [destinationContact, setDestinationContact] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const addTransaction = () => {
        Meteor.call("make.transaction", {
            isTransferring,
            sourceWalletId: wallet?._id,
            destinationContactId: destinationContact?._id || "",
            amount: Number(amount),
        }, (errorResponse) => {
            if (errorResponse) {
                if (errorResponse.error) {
                    setErrorMessage(errorResponse.error);
                } else {
                    errorResponse.details?.forEach((error) => {
                        setErrorMessage(error.message);
                    });
                }
            } else {
                setOpen(false);
                setDestinationContact({});
                setAmount(0);
                setErrorMessage("");
            }
        });
    };

    if (isLoadingContacts() || isLoadingWallets()) {
        return <Loading/>;
    }

    return (<>
        <div className="flex font-sans shadow-md my-10">
            <form className="flex-auto p-6">
                <div className="flex flex-wrap">
                    <div className="w-full flex-none text-sm font-medium text-gray-500">
                        Main account
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                        Email:
                    </div>
                    <h1 className="flex-auto text-lg font-semibold text-gray-700">
                        {loggedUser.email}
                    </h1>
                    <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                        Wallet ID:
                    </div>
                    <h1 className="flex-auto text-lg font-semibold text-gray-700">
                        {wallet._id}
                    </h1>
                    <div className="text-2xl font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
                </div>
                <div className="flex space-x-4 text-sm font-medium">
                    <div className="flex-auto flex space-x-4 mt-4">
                        <button
                            type="button"
                            className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            onClick={() => {
                                setIsTransferring(false);
                                setErrorMessage("");
                                setOpen(true);
                            }}
                        >
                            Add money
                        </button>
                        <button
                            type="button"
                            className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            onClick={() => {
                                setIsTransferring(true);
                                setErrorMessage("");
                                setOpen(true);
                            }}
                        >
                            Transfer money
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <Modal
            open={open}
            setOpen={setOpen}
            title={isTransferring ? "Transfer money to other wallet" : "Add money to your wallet"}
            body={<>
                {isTransferring && (<div className="mt-2">
                    <SelectContact
                        title="Destination contact"
                        contacts={contacts}
                        contact={destinationContact}
                        setContact={setDestinationContact}
                    />
                </div>)}

                <div className="mt-2">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        min={0}
                        onChange={(event) => setAmount(Number(event.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="0.00"
                    />
                </div>
            </>}
            footer={<button
                type="button"
                className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={addTransaction}
            >
                {isTransferring ? "Transfer" : "Add"}
            </button>}
            errorMessage={errorMessage}
        />
    </>);
};

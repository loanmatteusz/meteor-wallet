import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'meteor/quave:alert-react-tailwind';

import { ErrorAlert } from "/imports/ui/components/util/ErrorAlert";
import { SuccessAlert } from "/imports/ui/components/util/SuccessAlert";

import { paths } from "/imports/ui/route/paths";


export const RemoveTransaction = () => {
    const { openAlert } = useAlert();
    const navigate = useNavigate();

    const [transactionId, setTransactionId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const removeTransaction = (transactionId) => {
        Meteor.call("remove.transaction", transactionId, (error) => {
            if (error) {
                console.error({ error });
                setError(error);
                return;
            }
            setError("");
            setTransactionId("");
            openAlert("Transaction was removed");
        });
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="px-3 py-2 text-lg font-medium">
                Remove Transaction
            </h3>
            {error && <ErrorAlert message={error.reason || "Unknown Error"}/>}
            {success && <SuccessAlert message={success}/>}
            <form className="flex flex-col items-center gap-2">
                <div className="w-full">
                    <input
                        type="text"
                        id="transactionId"
                        placeholder={"Transaction ID"}
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>
                <div className="flex w-full justify-between py-3">
                    <button
                        type="submit"
                        className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        onClick={(event) => {
                            event.preventDefault();
                            removeTransaction(transactionId);
                        }}
                    >
                        Remove
                    </button>
                    <button
                        className="border border-gray-700 rounded-md px-2 text-sm font-medium hover:bg-gray-50"
                        onClick={() => navigate(paths.ACCESS)}
                    >
                        Back to Home
                    </button>
                </div>
            </form>
        </div>
    );
}

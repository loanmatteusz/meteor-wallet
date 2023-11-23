import { Meteor } from 'meteor/meteor';
import React, { useState } from "react";
import { ErrorAlert } from "/imports/ui/components/util/ErrorAlert";
import { SuccessAlert } from "/imports/ui/components/util/SuccessAlert";

export const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [walletId, setWalletId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const saveContact = () => {
        Meteor.call(
            "create.contact",
            { name, email, imageUrl, walletId },
            (errorResponse) => {
                if (errorResponse) {
                    setError(errorResponse.error);
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                } else {
                    setName("");
                    setEmail("");
                    setImageUrl("");
                    setWalletId("");
                    setSuccess("Contact saved!");
                    setTimeout(() => {
                        setSuccess("");
                    }, 3000);
                }
        });
    }

    return (
        <form className="mt-6">
            { error && <ErrorAlert message={error} /> }
            { success && <SuccessAlert message={success} /> }
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Wallet Id
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="px-2 py-3 text-right">
                <button
                    type="button"
                    onClick={saveContact}
                    className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                    Save Contact
                </button>
            </div>
        </form>
    );
}

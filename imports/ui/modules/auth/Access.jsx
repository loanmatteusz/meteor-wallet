import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { paths } from "/imports/ui/route/paths";
import { ErrorAlert } from "/imports/ui/components/util/ErrorAlert";
import { SuccessAlert } from "/imports/ui/components/util/SuccessAlert";


export const Access = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isSignUp, setIsSignUp] = useState(true);


    const signUp = ({email, password}) => {
        Accounts.createUser(
            {email, password},
            (error) => {
                if (error) {
                    console.error({error});
                    setError(error);
                    return;
                }
                console.log("Success!");
                navigate(paths.HOME);
            }
        );
    }

    const signIn = ({ email, password }) => {
        Meteor.loginWithPassword( email, password, (error) => {
            if (error) {
                console.error({ error });
                setError(error);
                return;
            }
            navigate(paths.HOME);
        });
    }


    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="px-3 py-2 text-lg font-medium">
                {isSignUp ? "SignUp" : "SignIn"}
            </h3>
            {error && <ErrorAlert message={error.reason || "Unknown Error"}/>}
            {success && <SuccessAlert message={success}/>}
            <form className="flex flex-col items-center gap-2">
                <div className="w-full">
                    <input
                        type="email"
                        id="email"
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>
                <div className="flex w-full justify-between py-3">
                    {
                        isSignUp ?
                            <button
                                type="submit"
                                className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                                onClick={(event) => {
                                    event.preventDefault();
                                    signUp({email, password})
                                }}
                            >
                                SignUp
                            </button> :
                            <button
                                type="submit"
                                className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                                onClick={(event) => {
                                    event.preventDefault();
                                    signIn({email, password})
                                }}
                            >
                                SignIn
                            </button>
                    }
                    <button
                        className="border border-gray-700 rounded-md px-2 text-sm font-medium hover:bg-gray-50"
                        onClick={() => navigate(paths.HOME)}
                    >
                        Cancel
                    </button>
                </div>
                <div className="py3">
                    <a
                        className="cursor-pointer text-gray-800"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {
                            isSignUp ?
                                "If you already have a account, click here" :
                                "If you don't an account, click here"
                        }
                    </a>
                </div>
                <div className="py3">
                    <a
                        className="cursor-pointer text-gray-800"
                        onClick={() => navigate(paths.FORGOT_PASSWORD)}
                    >
                        Forgot your Password?
                    </a>
                </div>
            </form>
        </div>
    );
}

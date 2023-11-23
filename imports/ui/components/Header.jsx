import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { paths } from "/imports/ui/route/paths";


export const Header = () => {
    const navigate = useNavigate();
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

    return (
        <header className="bg-gray-700">
            <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 lg:border-none">
                    <div className="flex justify-between grow items-center">
                        <a
                            className="cursor-pointer"
                            onClick={() => navigate(paths.HOME)}
                        >
                            <span className="sr-only">Meteor Wallet</span>
                            <img
                                className="h-10 w-auto"
                                src="/images/logo.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div>
                        {!isLoadingLoggedUser && !loggedUser && (
                            <button
                                className="text-white font-bold"
                                onClick={() => navigate(paths.ACCESS)}
                            >
                                Sign Up
                            </button>
                        )}
                        {!isLoadingLoggedUser && loggedUser && (
                            <button
                                className="text-white font-bold"
                                onClick={() => {
                                    Meteor.logout();
                                    navigate(paths.ACCESS);
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "/imports/ui/route/paths";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center">
            <h3 className="px-3 py-2 text-lg font-medium">
                Page not found
            </h3>
            <button
                className="bg-gray-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                onClick={() => navigate(paths.HOME)} type="button"
            >
                Go Home
            </button>
        </div>
    );
}

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from "/imports/ui/components/Loading";
import { paths } from "/imports/ui/route/paths";

export const LoggedUserOnly = ({ children }) => {
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const location = useLocation();

    if (isLoadingLoggedUser) {
        return <Loading/>
    }

    if (!loggedUser) {
        return <Navigate to={paths.ACCESS} state={{ from: location }} replace />;
    }

    return children;
}

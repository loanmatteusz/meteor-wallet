import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "/imports/ui/components/Loading";
import { paths } from "/imports/ui/route/paths";

export const AdminOnly = ({ children }) => {
    const location = useLocation();

    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        Meteor.call("role.checkIsAdmin", (error, isAdminReturn) => {
            if (error) {
                setIsAdmin(false);
                return;
            }
            setIsAdmin(isAdminReturn);
        });
    }, []);

    if (isAdmin == null) {
        return <Loading/>
    }

    if (!isAdmin) {
        return <Navigate to={paths.HOME} state={{ from: location }} replace />;
    }

    return children;
}

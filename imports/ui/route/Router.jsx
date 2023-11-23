import React from "react";
import { Routes, Route } from "react-router-dom";

import { AdminOnly } from "/imports/ui/components/VisualizePages/AdminOnly";
import { LoggedUserOnly } from "/imports/ui/components/VisualizePages/LoggedUserOnly";
import { AnonymousOnly } from "/imports/ui/components/VisualizePages/AnonymousOnly";

import { Home } from "/imports/ui/pages/Home";
import { Access } from "/imports/ui/modules/auth/Access";
import { NotFound } from "/imports/ui/components/util/NotFound";
import { ForgotPassword } from "/imports/ui/modules/auth/ForgotPassword";
import { ResetPassword } from "/imports/ui/modules/auth/ResetPassword";
import { RemoveTransaction } from "/imports/ui/modules/transaction/RemoveTransaction";

import { paths } from "/imports/ui/route/paths";
export const Router = () => (
    <Routes>
        <Route
            path={paths.HOME}
            element={
                <LoggedUserOnly>
                    <Home/>
                </LoggedUserOnly>
            }
        />
        <Route
            path={paths.ACCESS}
            element={
                <AnonymousOnly>
                    <Access/>
                </AnonymousOnly>
            }
        />
        <Route
            path={paths.FORGOT_PASSWORD}
            element={
                <AnonymousOnly>
                    <ForgotPassword/>
                </AnonymousOnly>
            }
        />
        <Route
            path={`${paths.RESET_PASSWORD}/:token`}
            element={
                <AnonymousOnly>
                    <ResetPassword/>
                </AnonymousOnly>
            }
        />
        <Route
            path={paths.REMOVE_TRANSACTION}
            element={
                <AdminOnly>
                    <RemoveTransaction/>
                </AdminOnly>
            }
        />
        <Route path="*" element={<NotFound/>}/>
    </Routes>
);

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AlertProvider, Alert } from 'meteor/quave:alert-react-tailwind';

import { Header } from "/imports/ui/components/Header";
import { Router } from "/imports/ui/route/Router";

export const App = () => (
    <BrowserRouter>
        <AlertProvider>
            <div>
                <Header/>
                <Alert/>
                <div className="min-h-full">
                    <div className="max-w-4xl mx-auto p-2">
                        <Router/>
                    </div>
                </div>
            </div>
        </AlertProvider>
    </BrowserRouter>
);
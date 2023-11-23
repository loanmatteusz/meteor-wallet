import React from 'react';
import { WalletForm } from "/imports/ui/modules/wallet/WalletForm";
import { ContactForm } from "/imports/ui/modules/contact/ContactForm";
import { ContactList } from "/imports/ui/modules/contact/ContactList";


export const Home = () => {
    return (
        <>
            <WalletForm/>
            <ContactForm/>
            <ContactList/>
        </>
    );
}

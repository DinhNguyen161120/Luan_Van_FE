import '../styles/style.css'
import '../styles/globals.css'
import '@mantine/core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import store from '../redux/store'
import { Provider } from 'react-redux'
import { MantineProvider, createTheme } from '@mantine/core';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme({
    /** Put your mantine theme override here */
});

import { I18nProvider } from '@lingui/react'
import { i18n } from "@lingui/core";

import messagesEn from "../locales/en/messages.json";
import messagesVi from "../locales/vi/messages.json";
i18n.load({
    en: messagesEn,
    vi: messagesVi,
});
i18n.activate("en");

import { Chatbot } from "../component/Chatbot"
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Provider store={store}>
        <I18nProvider i18n={i18n}>
            <MantineProvider theme={theme}>
                <Component {...pageProps} />
                <ToastContainer />
                <Chatbot />
            </MantineProvider>
        </I18nProvider>
    </Provider >
}


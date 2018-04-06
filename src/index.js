import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import GeckoLocalizationProvider from './l10n';
import App from './App';

ReactDOM.render(
    <GeckoLocalizationProvider
        resourcePaths={["main.ftl", "hello.ftl"]}
    >
        <App username="Anna" />
    </GeckoLocalizationProvider>,
    document.getElementById('root')
);

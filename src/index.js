import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import GeckoLocalizationProvider from './l10n';
import App from './App';

ReactDOM.render(
    <GeckoLocalizationProvider
        userLocales={navigator.languages}
        resourcePaths={["hello.ftl"]}
    >
        <App />
    </GeckoLocalizationProvider>,
    document.getElementById('root')
);

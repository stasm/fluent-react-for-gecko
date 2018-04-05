import React, { Component } from "react";
import { LocalizationProvider } from "fluent-react/compat";

// In Gecko, you would do:
//
// const { L10nRegistry } = ChromeUtils.import("resource://gre/modules/L10nRegistry.jsm", {});
// const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm", {});
// const appLocales = Services.locale.getAppLocalesAsLangTags();
import L10nRegistry from "./L10nRegistry";
const appLocales = ["pl", "en-US"];


// XXX <LocalizationProvider> doesn't accept async iterables right now.
// See https://github.com/projectfluent/fluent.js/issues/100.
async function toSyncIterable(iterable) {
    const elements = [];
    for await (const element of iterable) {
        elements.push(element);
    }
    return elements;
}

export default class GeckoLocalizationProvider extends Component {
    state = {
        messages: null
    };

    async componentDidMount() {
        const {resourcePaths} = this.props;
        const contexts = L10nRegistry.generateContexts(
            appLocales, resourcePaths
        );
        this.setState({
            messages: await toSyncIterable(contexts)
        });
    }

    render() {
        const {children} = this.props;
        const {messages} = this.state;

        if (!messages) {
            // Show a loader.
            return <div>…</div>;
        }

        return (
            <LocalizationProvider messages={messages}>
                {children}
            </LocalizationProvider>
        );
    }
}

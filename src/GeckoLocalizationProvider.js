import React, {Component} from "react";
import {LocalizationProvider} from "fluent-react/compat";

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

    componentDidMount() {
        this.handleChange();
        // In Gecko:
        // Services.obs.addObserver(this, "intl:app-locales-changed", true);
        window.addEventListener("languagechange", this);
    }

    componentDidUpdate(prevProps, prevState) {
        // Join the array of resource paths to make the comparison easy and
        // avoid false positives and false negatives when _some_ elements of the
        // array change but the array stays the same (by identity).
        const prevResourcePaths = prevProps.resourcePaths.join();
        const currentResourcePaths = this.props.resourcePaths.join();
        if (currentResourcePaths !== prevResourcePaths) {
            this.handleChange();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("languagechange", this);
    }

    // In Gecko:
    // observe(subject, topic, data)
    handleEvent(evt) {
        switch (evt.type) {
            case "languagechange":
                // XXX Just so that we can verify it's working.
                appLocales.reverse();
                return void this.handleChange();
            default:
                return;
        }
    }

    async handleChange() {
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

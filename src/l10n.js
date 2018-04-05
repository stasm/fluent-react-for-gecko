import React, { Component } from "react";
import { LocalizationProvider } from "fluent-react/compat";
import L10nRegistry from "./L10nRegistry";

export default class GeckoLocalizationProvider extends Component {
    state = {
        messages: null
    };

    componentDidMount() {
        const {userLocales, resourcePaths} = this.props;
        this.setState({
            messages: L10nRegistry.generateContexts(
                userLocales, resourcePaths
            )
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

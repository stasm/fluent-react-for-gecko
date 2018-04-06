import React, {Component} from 'react';
import { Localized } from 'fluent-react/compat';

export default class App extends Component {
    render() {
        const {username} = this.props;
        return <div>
            <Localized id="hello" $username={username}>
                <h1>Hello, you!</h1>
            </Localized>
        </div>;
    }
}

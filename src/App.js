import React from 'react';
import { Localized } from 'fluent-react/compat';

export default function App() {
    return <div>
        <Localized id="hello" $username="Anna">
            <h1>Hello, you!</h1>
        </Localized>
    </div>;
}

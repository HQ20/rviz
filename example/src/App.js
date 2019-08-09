import React, { Component } from 'react'

import { VoroniArcMap } from 'reviz'

export default class App extends Component {
    render() {
        return (
            <div>
                <VoroniArcMap width={980} height={540} />
            </div>
        )
    }
}

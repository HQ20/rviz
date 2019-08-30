import React, { Component } from 'react'

import { VoroniArcMap, DAG, ForceDirected } from 'reviz'
import dataDAG from './dummyData/DAG';
import dataForceDirected from './dummyData/ForceDirected';

export default class App extends Component {
    render() {
        return (
            <div>
                <VoroniArcMap width={980} height={540} />
                <DAG
                    width={600}
                    height={600}
                    grafo={dataDAG}
                    layering={'Simplex (slow)'}
                    decross={'Optimal (slow)'}
                    coord={'Vertical (slow)'}
                    arrow={'end'} />

                <ForceDirected
                    width={600}
                    height={600}
                    graph={dataForceDirected}
                />
            </div>
        )
    }
}

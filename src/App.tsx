import React from 'react';
import DAG from './Components/DAG';
import ForceDirected from './Components/ForceDirected';

import data from './data';

const App: React.FC = () => {
    return (
        <div className="App">
            <DAG
                width={600}
                height={600}
                grafo={data}
                layering={'Simplex (slow)'}
                decross={'Optimal (slow)'}
                coord={'Vertical (slow)'}
                arrow={'end'}
            />
        </div>
    );
};

export default App;

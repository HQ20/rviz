import React from 'react';
import ForceDirected from './Components/ForceDirected';
import DAG from './Components/DAG';

import data from './data';

const App: React.FC = () => {
    return (
        <div className="App">
            <DAG width={600} height={600} grafo={data} />
        </div>
    );
}

export default App;

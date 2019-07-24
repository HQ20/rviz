import React from 'react';
import ForceDirected from './Components/ForceDirected';

import data from './data';

const App: React.FC = () => {
    return (
        <div className="App">
            <ForceDirected width={600} height={600} graph={data} />
        </div>
    );
}

export default App;

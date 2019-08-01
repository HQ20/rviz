import React from 'react';
import DAG from './Components/DAG';
import dagData from './Components/DAG/__test__/dummyData';

const App: React.FC = () => {
    return (
        <>
            <DAG
                width={600}
                height={600}
                grafo={dagData}
                layering={'Simplex (slow)'}
                decross={'Optimal (slow)'}
                coord={'Vertical (slow)'}
                arrow={'end'}
            />
        </>
    );
};

export default App;

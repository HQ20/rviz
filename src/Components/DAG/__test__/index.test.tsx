/* globals describe test jest expect */
import * as React from 'react';
import renderer from 'react-test-renderer';
import DAG from '../index';

import data from './dummyData';

describe('Basic DAG Component test', () => {
    test('render a dag', () => {
        const tree = renderer
            .create(<DAG
                width={600}
                height={600}
                grafo={data}
                layering={'Simplex (slow)'}
                decross={'Optimal (slow)'}
                coord={'Vertical (slow)'}
                arrow={'end'}
            />)
            .toJSON();
        // TODO: improve
        expect(tree).toMatchSnapshot();
    });
});


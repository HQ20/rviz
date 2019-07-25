/* globals describe test jest expect */
import * as React from 'react';
import renderer from 'react-test-renderer';
import ForceDirected from '../index';

import data from './dummyData';

describe('Basic renderer Component test', () => {
    test('render a renderer', () => {
        const tree = renderer
            .create(<ForceDirected
                width={600}
                height={600}
                graph={data}
            />)
            .toJSON();
        // TODO: improve
        expect(tree).toMatchSnapshot();
    });
});


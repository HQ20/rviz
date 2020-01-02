/* globals describe test jest expect */
import { render } from '@testing-library/react';
import * as React from 'react';
import DAG from '../index';

import data from './dummyData';

describe('Basic DAG Component test', () => {
    test('render a dag', () => {
        render(<DAG
            width={600}
            height={600}
            grafo={data}
            layering={'Simplex (slow)'}
            decross={'Optimal (slow)'}
            coord={'Vertical (slow)'}
            arrow={'end'}
        />);
    });
});


/* globals describe test jest expect */
import { render } from '@testing-library/react';
import * as React from 'react';
import ForceDirected from '../index';

import data from './dummyData';

describe('Basic renderer Component test', () => {
    test('render a renderer', () => {
        render(<ForceDirected
            width={600}
            height={600}
            graph={data}
        />);
    });
});


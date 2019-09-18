import React from 'react';
interface IProps {
    width: number;
    height: number;
    grafo: any;
    layering: 'Coffman Graham (medium)' | 'Longest Path (fast)' | 'Simplex (slow)';
    decross: 'Optimal (slow)' | 'Two Layer (flast)' | 'Two Layer Opt (medium)';
    coord: 'Center (fast)' | 'Greedy (medium)' | 'Minimum Curves (slow)' | 'Vertical (slow)';
    arrow: 'start' | 'end';
}
export default class DAG extends React.Component<IProps, {}> {
    private ref;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};

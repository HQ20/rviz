import React from 'react';
import './index.css';
interface ID3Node {
    id: string;
    group: number;
}
interface ID3Link {
    source: string;
    target: string;
    value: number;
}
interface IGraph {
    nodes: ID3Node[];
    links: ID3Link[];
}
interface IProps {
    width: number;
    height: number;
    graph: IGraph;
}
export default class ForceDirected extends React.Component<IProps, {}> {
    private ref;
    private color;
    private simulation;
    private link;
    private node;
    componentDidMount(): void;
    dragstarted: (d: any) => void;
    dragged: (d: any) => void;
    dragended: (d: any) => void;
    ticked: () => void;
    render(): JSX.Element;
}
export {};

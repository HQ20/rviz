import React from 'react';
import './index.css';
interface IProps {
    width: number;
    height: number;
}
export default class VoroniArcMap extends React.Component<IProps, {}> {
    private ref;
    componentDidMount(): void;
    ready(us: any, airports: any, flights: any): void;
    typeAirport(d: any): any;
    typeFlight(d: any): any;
    render(): JSX.Element;
}
export {};

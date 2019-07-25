import * as d3 from 'd3';
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
    private ref!: SVGSVGElement;
    private color = d3.scaleOrdinal(d3.schemeCategory10);
    private simulation: any;
    private link: any;
    private node: any;

    public componentDidMount() {
        const context: any = d3.select(this.ref);

        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink()
                .id((nodeData: d3.SimulationNodeDatum, i: number, nodesData: d3.SimulationNodeDatum[]) => {
                    // for some reason, this type is not correct
                    return (nodeData as any).id;
                }))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));

        this.link = context.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.props.graph.links)
            .enter().append('line')
            .attr('stroke-width', (d: ID3Link) => {
                return Math.sqrt(d.value);
            });

        this.node = context.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.props.graph.nodes)
            .enter().append('circle')
            .attr('r', 5)
            .attr('fill', (d: ID3Node) => {
                return this.color(d.group.toString());
            })
            .call(d3.drag()
                .on('start', this.dragstarted)
                .on('drag', this.dragged)
                .on('end', this.dragended));

        this.node.append('title')
            .text((d: ID3Node) => {
                return d.id;
            });

        this.simulation.nodes(this.props.graph.nodes).on('tick', this.ticked);
        this.simulation.force('link').links(this.props.graph.links);
    }

    public dragstarted = (d: any) => {
        if (!d3.event.active) {
            this.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    public dragged = (d: any) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    public dragended = (d: any) => {
        if (!d3.event.active) {
            this.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }

    public ticked = () => {
        this.link
            .attr('x1', (d: any) => {
                return d.source.x;
            })
            .attr('y1', (d: any) => {
                return d.source.y;
            })
            .attr('x2', (d: any) => {
                return d.target.x;
            })
            .attr('y2', (d: any) => {
                return d.target.y;
            });

        this.node
            .attr('cx', (d: any) => {
                return d.x;
            })
            .attr('cy', (d: any) => {
                return d.y;
            });
    }

    public render() {
        const { width, height } = this.props;

        return (
            <svg
                className="container"
                ref={(ref: SVGSVGElement) => this.ref = ref}
                width={width}
                height={height}
            />
        );
    }
}

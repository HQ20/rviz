import * as d3 from 'd3';
import React from 'react';
import './index.css';


interface d3Node {
    id: string;
    group: number;
}

interface d3Link {
    source: string;
    target: string;
    value: number;
}

interface Graph {
    nodes: d3Node[];
    links: d3Link[];
}



interface IProps {
    width: number;
    height: number;
    graph: Graph;
}

export default class ForceDirected extends React.Component<IProps, {}> {
    private ref!: SVGSVGElement;

    public componentDidMount() {
        const context: any = d3.select(this.ref);
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation: any = d3.forceSimulation()
            .force('link', d3.forceLink()
                .id((nodeData: d3.SimulationNodeDatum, i: number, nodesData: d3.SimulationNodeDatum[]) => {
                    // for some reason, this type is not correct
                    return (nodeData as any).id;
                }))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));

        const link = context.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.props.graph.links)
            .enter().append('line')
            .attr('stroke-width', (d: d3Link) => {
                return Math.sqrt(d.value);
            });

        const node = context.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.props.graph.nodes)
            .enter().append('circle')
            .attr('r', 5)
            .attr('fill', (d: d3Node) => {
                return color(d.group.toString());
            })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        node.append('title')
            .text((d: d3Node) => {
                return d.id;
            });

        simulation.nodes(this.props.graph.nodes).on('tick', ticked);
        simulation.force('link').links(this.props.graph.links);

        function dragstarted(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d: any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d: any) {
            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }

        function ticked() {
            link
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

            node
                .attr('cx', (d: any) => {
                    return d.x;
                })
                .attr('cy', (d: any) => {
                    return d.y;
                });
        }
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

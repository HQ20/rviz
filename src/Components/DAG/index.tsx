import * as d3 from 'd3';
import * as d3Dag from 'd3-dag';
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
    private ref!: SVGSVGElement;

    public componentDidMount() {
        const { width, height, grafo, layering, decross, coord } = this.props;
        const context: any = d3.select(this.ref);

        // This code only handles rendering
        const nodeRadius = 20;
        const svgNode = context
            .attr('width', width + nodeRadius * 2)
            .attr('height', height + nodeRadius * 2)
            .attr('viewbox', `${-nodeRadius} ${-nodeRadius} ${width + 2 * nodeRadius} ${height + 2 * nodeRadius}`);

        const defs = svgNode.append('defs'); // For gradients

        const layerings = {
            'Coffman Graham (medium)': d3Dag.layeringCoffmanGraham(),
            'Longest Path (fast)': d3Dag.layeringLongestPath(),
            'Simplex (slow)': d3Dag.layeringSimplex(),
        };
        const decrossings = {
            'Optimal (slow)': d3Dag.decrossOpt(),
            'Two Layer (flast)': d3Dag.decrossTwoLayer(),
            'Two Layer Opt (medium)': d3Dag.decrossTwoLayer().order(d3Dag.twolayerOpt()),
        };
        const coords = {
            'Center (fast)': d3Dag.coordCenter(),
            'Greedy (medium)': d3Dag.coordGreedy(),
            'Minimum Curves (slow)': d3Dag.coordMinCurve(),
            'Vertical (slow)': d3Dag.coordVert(),
        };

        const dag = d3Dag.dagStratify()(grafo);
        const layout = d3Dag.sugiyama()
            .size([width, height])
            .layering(layerings[layering])
            .decross(decrossings[decross])
            .coord(coords[coord]);
        // Use computed layout
        layout(dag);

        const steps = dag.size();
        const interp = d3.interpolateRainbow;
        const colorMap: [string] = [] as any;
        dag.each((node: { id: number }, i: any) => {
            colorMap[node.id] = interp(i / steps);
        });

        // How to draw edges
        const line = d3.line()
            .curve(d3.curveCatmullRom)
            .x((d: any) => d.x + nodeRadius)
            .y((d: any) => d.y + nodeRadius);

        // Plot edges
        svgNode.append('g')
            .selectAll('path')
            .data(dag.links())
            .enter()
            .append('path')
            .attr('d', (d: any) => line(d.data.points))
            .attr('fill', 'none')
            .attr('stroke-width', 3)
            .attr('stroke', (stroke: any) => {
                const gradId = `${stroke.source.id}-${stroke.target.id}`;
                const grad = defs.append('linearGradient')
                    .attr('id', gradId)
                    .attr('gradientUnits', 'userSpaceOnUse')
                    .attr('x1', stroke.source.x)
                    .attr('x2', stroke.target.x)
                    .attr('y1', stroke.source.y)
                    .attr('y2', stroke.target.y);
                grad.append('stop').attr('offset', '0%').attr('stop-color', colorMap[stroke.source.id]);
                grad.append('stop').attr('offset', '100%').attr('stop-color', colorMap[stroke.target.id]);
                return `url(#${gradId})`;
            });

        // Select nodes
        const nodes = svgNode.append('g')
            .selectAll('g')
            .data(dag.descendants())
            .enter()
            .append('g')
            .attr('transform', (transform: any) =>
                `translate(${transform.x + nodeRadius}, ${transform.y + nodeRadius})`);

        // Plot node circles
        nodes.append('circle')
            .attr('r', nodeRadius)
            .attr('fill', (n: any) => colorMap[n.id]);

        const arrow = d3.symbol().type(d3.symbolTriangle).size(nodeRadius * nodeRadius / 5.0);
        svgNode.append('g')
            .selectAll('path')
            .data(dag.links())
            .enter()
            .append('path')
            .attr('d', arrow)
            .attr('transform', (transform: any) => {
                const [end, start] = transform.data.points.reverse();
                // This sets the arrows the node radius (20) + a little bit (3) away from the
                // node center, on the last line segment of the edge. This means that edges
                // that only span ine level will work perfectly, but if the edge bends,
                // this will be a little off.
                if (this.props.arrow === 'start') {
                    const dx = end.x - start.x;
                    const dy = end.y - start.y;
                    const scale = nodeRadius * 1.15 / Math.sqrt(dx * dx + dy * dy);
                    // This is the angle of the last line segment
                    const angle = Math.atan2(-dy, -dx) * 180 / Math.PI + 90;
                    return `translate(${start.x + nodeRadius + dx * scale},`
                        + `${start.y + nodeRadius + dy * scale}) rotate(${angle})`;
                } else if (this.props.arrow === 'end') {
                    const dx = start.x - end.x;
                    const dy = start.y - end.y;
                    const scale = nodeRadius * 1.15 / Math.sqrt(dx * dx + dy * dy);
                    // This is the angle of the last line segment
                    const angle = Math.atan2(-dy, -dx) * 180 / Math.PI + 90;
                    return `translate(${end.x + nodeRadius + dx * scale},`
                        + `${end.y + nodeRadius + dy * scale}) rotate(${angle})`;
                }
            })
            .attr('fill', (fill: any) => colorMap[fill.target.id])
            .attr('stroke', 'white')
            .attr('stroke-width', 1.5);

        // Add text to nodes
        nodes.append('text')
            .text((d: any) => d.id)
            .attr('font-weight', 'bold')
            .attr('font-family', 'sans-serif')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr('fill', 'white');
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

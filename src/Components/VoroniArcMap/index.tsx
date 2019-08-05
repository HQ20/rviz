import * as d3 from 'd3';
import * as topojson from 'topojson';
import React from 'react';
import './index.css';


interface IProps {
    width: number;
    height: number;
}

export default class VoroniArcMap extends React.Component<IProps, {}> {

    private ref!: SVGSVGElement;

    public componentDidMount() {
        d3.json('https://gist.githubusercontent.com/mbostock/4090846/raw/us.json').then((us: any) => {
            d3.csv('https://gist.githubusercontent.com/mbostock/7608400/raw/e5974d9bba45bc9ab272d98dd7427567aafd55bc/airports.csv').then((airport: any) => {
                d3.csv('https://gist.githubusercontent.com/mbostock/7608400/raw/e5974d9bba45bc9ab272d98dd7427567aafd55bc/flights.csv').then((flights: any) => {
                    flights = flights.map((f:any) => this.typeFlight(f));
                    airport = airport.map((a:any) => this.typeAirport(a));
                    this.ready(us, airport, flights);
                });
            });
        });
    }

    public ready(us: any, airports: any, flights: any) {
        const svg = d3.select(this.ref);
        const { width, height } = this.props;

        var projection = d3.geoAlbers()
            .translate([width / 2, height / 2])
            .scale(1280);

        const radius = d3.scaleSqrt()
            .domain([0, 100])
            .range([0, 14]);

        const path: any = d3.geoPath()
            .projection(projection)
            .pointRadius(2.5);

        const voronoi = d3.voronoi()
            .extent([[-1, -1], [width + 1, height + 1]]);

        var airportByIata = d3.map(airports, function (d: any) { return d.iata; });

        flights.forEach(function (flight: any) {
            const source: any = airportByIata.get(flight.origin);
            const target: any = airportByIata.get(flight.destination);
            source.arcs.coordinates.push([source, target]);
            target.arcs.coordinates.push([target, source]);
        });

        airports = airports
            .filter(function (d: any) { return d.arcs.coordinates.length; });

        svg.append("path")
            .datum(topojson.feature(us, us.objects.land))
            .attr("class", "land")
            .attr("d", path);

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a: any, b: any) { return a !== b; }))
            .attr("class", "state-borders")
            .attr("d", path);

        svg.append("path")
            .datum({ type: "MultiPoint", coordinates: airports })
            .attr("class", "airport-dots")
            .attr("d", path);

        var airport = svg.selectAll(".airport")
            .data(airports)
            .enter().append("g")
            .attr("class", "airport");

        airport.append("title")
            .text(function (d: any) { return d.iata + "\n" + d.arcs.coordinates.length + " flights"; });

        airport.append("path")
            .attr("class", "airport-arc")
            .attr("d", function (d: any) { return path(d.arcs); });

        airport.append("path")
            .data(voronoi.polygons(airports.map(projection)))
            .attr("class", "airport-cell")
            .attr("d", function (d) { return d ? "M" + d.join("L") + "Z" : null; });
    }
    public typeAirport(d: any) {
        d[0] = +d.longitude;
        d[1] = +d.latitude;
        d.arcs = { type: "MultiLineString", coordinates: [] };
        return d;
    }

    public typeFlight(d: any) {
        d.count = +d.count;
        return d;
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

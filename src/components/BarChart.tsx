import React, { useEffect, useState } from "react";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import "d3-transition";
import { easeBounceInOut } from "d3-ease";
import { axisBottom, axisLeft, Axis } from "d3-axis";

type Props = {
    data: Item[];
};

const BarChart: React.FunctionComponent<Props> = (props: Props) => {
    const barChartRef = React.createRef<SVGSVGElement>();
    const axisBottomRef = React.createRef<SVGSVGElement>();
    const axisLeftRef = React.createRef<SVGSVGElement>();

    const margin = { top: 10, left: 100, bottom: 100 };
    const graphHeight = 700 - margin.top - margin.bottom;
    const graphWidth = 1000 - margin.left;

    const y = scaleLinear().range([graphHeight, 0]);
    const x = scaleBand()
        .range([0, graphWidth])
        .padding(0.1);

    const [selection, setSelection] = useState<Selection<
        SVGSVGElement | null,
        {},
        null,
        undefined
    > | null>(null);

    useEffect(() => {
        if (!selection) {
            setSelection(select(barChartRef.current));
        }
        mountChart();
    });

    const mountChart = () => {
        if (selection) {
            y.domain([0, max(props.data, d => d.price) || 0]);
            x.domain(props.data.map(d => d.name));

            selection
                .attr("height", graphHeight)
                .attr("width", graphWidth)
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            selection
                .selectAll("rect")
                .data(props.data)
                .enter()
                .append("rect");

            selection
                .selectAll("rect")
                .data(props.data)
                .exit()
                .remove();

            const rects = selection.selectAll("rect").data(props.data);

            selection
                .selectAll("rect")
                .data(props.data)
                .attr("x", d => x(d.name)!)
                // .attr("height", 0)
                // .attr("y", y(0))
                .attr("width", x.bandwidth)
                .attr("fill", "orange")
                // .merge(rects)
                .transition()
                .duration(750)
                .attr("y", d => y(d.price))
                .attr("height", d => graphHeight - y(d.price));

            const xAxis = axisBottom(x);
            const yAxis = axisLeft(y);

            const botAxis = select(axisBottomRef.current).attr(
                "transform",
                `translate(${margin.left}, ${graphHeight + margin.top})`
            );

            const leftAxis = select(axisLeftRef.current).attr(
                "transform",
                `translate(${margin.left}, ${margin.top})`
            );
            botAxis
                .transition()
                .duration(750)
                .call(xAxis as any);
            leftAxis
                .transition()
                .duration(750)
                .call(yAxis as any);
        }
    };
    return (
        <svg width={1000} height={800}>
            <g ref={axisBottomRef} />
            <g ref={axisLeftRef} />
            <g ref={barChartRef} />
        </svg>
    );
};

export default BarChart;

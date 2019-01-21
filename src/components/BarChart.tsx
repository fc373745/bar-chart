import React, { useEffect } from "react";
import { select } from "d3-selection";

const BarChart = () => {
    const barChartRef = React.createRef<SVGSVGElement>();
    const selection = select(barChartRef.current);

    const mountChart = () => {};

    useEffect(() => {
        mountChart();
    });
    return (
        <svg>
            <g ref={barChartRef} />
        </svg>
    );
};

export default BarChart;

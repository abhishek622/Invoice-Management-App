import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
			labels: {
				color: "white",
			},
		},
		title: {
			display: true,
			text: "Pie Chart for Currencies",
			color: "#fff",
		},
	},
};

const labels = ["USD", "CAD"];

function PieChart(props) {
	const { invoice_currency } = props;

	const data = {
		labels,
		datasets: [
			{
				label: "Invoice Currency",
				data: invoice_currency,
				backgroundColor: [
					"rgba(255, 99, 132, 0.8)",
					"rgba(153, 102, 255, 0.8)",
				],
				borderWidth: 2,
			},
		],
	};

	return (
		<div style={{ width: '21rem' }}>
			<Pie data={data} options={options} />
		</div>
	);
}

export default PieChart;

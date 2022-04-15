import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      text: "Bar Chart for No of Customers & Total Open Amount per lakh",
      color: "#fff",
    },
  },
  scales: {
    yAxes: {
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.55)",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
    xAxes: {
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.55)",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
  },
};

function BarChart(props) {
  const { labels, total_open_amount, no_of_customers } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "No of Customers",
        data: no_of_customers,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Total Open Amount",
        data: total_open_amount,
        backgroundColor: "rgba(153, 102, 255, 0.8)",
      },
    ],
    color: "#fff",
  };

  return (
    <div style={{ width: "40rem" }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart;

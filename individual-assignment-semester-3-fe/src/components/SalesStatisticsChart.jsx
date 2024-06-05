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
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const SalesStatisticsChart = ({ stats }) => {
    const data = {
      labels: stats.map(stat => stat.gameTitle),
      datasets: [
        {
          label: 'Total Units Sold',
          data: stats.map(stat => stat.totalUnitsSold),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Total Revenue (€)',
          data: stats.map(stat => stat.totalRevenue),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
          label: 'Average Rating',
          data: stats.map(stat => stat.averageRating),
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        }
      ]
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    return <Bar data={data} options={options} />;
  };
  
  export default SalesStatisticsChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';

const chartData = (canvas) => {
  const ctx = canvas.getContext('2d');
  const gradientStroke = ctx.createLinearGradient(500, 150, 100, 500);
  gradientStroke.addColorStop(0, '#DA50CA');
  gradientStroke.addColorStop(1, '#FE6666');
  return (
    {
      labels: ['Bookings', 'Rooms', 'Users', 'Promos'],
      datasets: [{
        label: 'Total Count',
        data: [12, 19, 3, 5],
        borderColor: gradientStroke,
        backgroundColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointBackgroundColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        borderWidth: 3
      }]
    }
  );
};

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        display: true,
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  },
  maintainAspectRatio: false
};

export default props => (
  <div>
    <Bar data={chartData} options={chartOptions} width={60} height={250}/>
  </div>
);
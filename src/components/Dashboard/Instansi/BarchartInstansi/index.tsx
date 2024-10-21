"use client";

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Dummy data representing job vacancies by category
interface JobData {
  jobTitle: string;
  male: number;
  female: number;
}

// Updated dummy data with job titles
const dummyData: JobData[] = [
  { jobTitle: 'Software Engineer', male: 1200, female: 300 },
  { jobTitle: 'UI/UX Designer', male: 500, female: 600 },
  { jobTitle: 'Marketing Specialist', male: 800, female: 700 },
  { jobTitle: 'Data Analyst', male: 600, female: 400 },
  { jobTitle: 'Product Manager', male: 400, female: 500 },
  { jobTitle: 'Content Writer', male: 200, female: 800 },
  { jobTitle: 'Customer Service', male: 700, female: 900 },
  { jobTitle: 'Digital Marketing', male: 300, female: 600 },
  { jobTitle: 'Sales', male: 900, female: 300 },
  { jobTitle: 'Human Resources', male: 400, female: 700 },
];

const ApexChart: React.FC = () => {
  const [chartData] = useState<{
    series: ApexAxisChartSeries; // Correct type for chart data series
    options: ApexOptions; // Correct type for ApexCharts options
  }>({
    series: [
      {
        name: 'Laki-laki',
        data: dummyData.map(item => item.male),
      },
      {
        name: 'Perempuan',
        data: dummyData.map(item => item.female),
      },
    ],
    options: {
      chart: {
        type: 'bar', // Correct 'bar' type for ApexCharts
        height: 350,
        stacked: true, // Stacked bar chart
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal bars
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      colors: ['#2F55D4', '#FC6736'], // Blue for Male, Red for Female
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
      },
      xaxis: {
        categories: dummyData.map(item => item.jobTitle), // Categories from job titles
        labels: {
          formatter: (val: string) => val, // Format labels correctly as strings
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => val.toString(), // Tooltip value formatting as string
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar" // Chart type as 'bar'
          height={500}
        />
      </div>
    </div>
  );
};

export default ApexChart;

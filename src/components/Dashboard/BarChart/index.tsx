"use client"

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Dummy data representing population distribution by gender for each kecamatan in Tanggamus, Lampung
interface PopulationData {
  kecamatan: string;
  male: number;
  female: number;
}

const dummyData: PopulationData[] = [
  { kecamatan: 'Kecamatan Talang Padang', male: 6000, female: 5800 },
  { kecamatan: 'Kecamatan Kota Agung', male: 6500, female: 6400 },
  { kecamatan: 'Kecamatan Pugung', male: 5300, female: 5200 },
  { kecamatan: 'Kecamatan Gisting', male: 4800, female: 4700 },
  { kecamatan: 'Kecamatan Wonosobo', male: 4000, female: 3900 },
  { kecamatan: 'Kecamatan Semaka', male: 5200, female: 5100 },
  { kecamatan: 'Kecamatan Cukuh Balak', male: 4900, female: 4800 },
  { kecamatan: 'Kecamatan Sumber Jaya', male: 5500, female: 5400 },
  { kecamatan: 'Kecamatan Kelumbayan', male: 5700, female: 5600 },
  { kecamatan: 'Kecamatan Limau', male: 4500, female: 4400 },
  { kecamatan: 'Kecamatan Air Naningan', male: 4000, female: 3900 },
  { kecamatan: 'Kecamatan Bandar Negeri Semuong', male: 6000, female: 5900 },
  { kecamatan: 'Kecamatan Pagelaran', male: 5300, female: 5200 },
  { kecamatan: 'Kecamatan Pringsewu', male: 6200, female: 6100 },
  { kecamatan: 'Kecamatan Sukoharjo', male: 5800, female: 5700 },
  { kecamatan: 'Kecamatan Pematang Sawa', male: 4900, female: 4800 },
  { kecamatan: 'Kecamatan Talang', male: 6100, female: 5900 },
  { kecamatan: 'Kecamatan Kota Agung Timur', male: 6000, female: 5800 },
  { kecamatan: 'Kecamatan Kota Agung Barat', male: 6200, female: 6100 },
  { kecamatan: 'Kecamatan Pulau Panggung', male: 5500, female: 5400 },
];

const ApexChart: React.FC = () => {
  const [chartData] = useState<{
    series: ApexAxisChartSeries; // Correct type for chart data series
    options: ApexOptions; // Correct type for ApexCharts options
  }>( {
    series: [
      {
        name: 'Laki-laki',
        data: dummyData.map(item => item.male),
      },
      {
        name: 'Perempuan',
        data: dummyData.map(item => item.female),
      }
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
        // text: 'Klasifikasi tenaga kerja pria dan wanita provinsi Tanggamus',
      },
      xaxis: {
        categories: dummyData.map(item => item.kecamatan), // Categories from kecamatan names
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
          height={800}
        />
      </div>
    </div>
  );
};

export default ApexChart;

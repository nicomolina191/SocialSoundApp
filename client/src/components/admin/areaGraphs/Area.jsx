
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const AreaComponent = (dates, step) => {
  console.log(dates)
    
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const fontSpect = {
    color:"white"
  } 
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Post time',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
   const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: [1,2,3,10,5,6,7],
        borderColor: 'var(--main-page-color',
        backgroundColor: 'rgba(53, 235, 208, 0.5)',
      },
    ],
  };
  
  return (
     <Line options={options} data={data} />
  )
}

export default AreaComponent
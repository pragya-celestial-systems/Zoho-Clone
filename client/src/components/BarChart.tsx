import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { fetchData } from '../utility';
import styles from './css/chart.module.css';
import { ChartProps, ResponseData } from './PieChart';
import Navbar from './Navbar';
import { AxiosResponse } from 'axios';

  export interface ResponseInterface {
    data: AxiosResponse | {
      status: number;
      message: string;
    };
  }

  export default function BarCharTab({chartType}: ChartProps) {
  const [xAxis, setXAxis] = React.useState<number[]>([]);
  const [yAxis, setYAxis] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    getChartData();
  }, []);
  
  async function getChartData() {
    try {
        const response = await fetchData(`/api/admin/chart-data?type=${chartType}`, 'GET');
        const data = (response as ResponseInterface).data;
        if(response.status === 200) {
            const xAxisData = Array.isArray(data) && data.map((data: ResponseData) => +data.userCount);
            const yAxisData = Array.isArray(data) && data.map((data: ResponseData) => {
              if(chartType === 'designation') {
                return data.users_designation
              }
              if(chartType === 'department') {
                return data.users_department
              }
              if(chartType === 'date_of_joining') {
                return data.users_date_of_joining
              }

              return null;
            }).filter((data: string) => data !== null);

            setXAxis(xAxisData);
            setYAxis(yAxisData);
        } 
    } catch (error) {
        console.error(error);
    }
  }


  return (
    <div id={styles.chartContainer}>
    <Navbar heading={`Pie Chart of the employees based on ${chartType}`}/>
    <BarChart
      xAxis={[{ scaleType: 'band', data: yAxis }]}
      series={[{ data: xAxis}]}
      width={1350}
      height={800}
    />
    </div>
  );
}
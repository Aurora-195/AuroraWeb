import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

export default function LineGraph({data}) {
  if (data === undefined || data.length === 0) return;
  
  const lineData = data.map(activity => ({
      data: activity.instances.map(instance => {
        const x = instance.startTime ? instance.startTime.slice(0, 10) : null;
        const y = instance.status === "completed" && instance.endTime ? calculateDuration(instance.startTime, instance.endTime) : 0;
  
        return { x, y };
      }).filter(point => point.x !== null),
      id: activity.name,
      color: `rgb(${activity.color.r}, ${activity.color.g}, ${activity.color.b})`,
  }));
  
  function calculateDuration(startTime, endTime) {
    // if (!endTime) {
    //   return 0;
    // }
  
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const durationInHours = (durationInMilliseconds / (1000 * 60 * 60)).toFixed(2);
  
    return durationInHours;
  }

  //console.log("LINE DATA");
  //console.log(lineData);

  return (<ResponsiveLine
    animate
    axisBottom={{
      format: '%b %d',
      legend: 'Dates',
      legendOffset: 30,
      legendPosition: 'middle',
      tickValues: 'every 2 days'
    }}
    axisLeft={{
      legend: 'Time (hr)',
      legendOffset: -33,
      legendPosition: 'middle',
    }}
    curve="stepAfter"
    data={lineData}
    height={400}
    margin={{
      bottom: 150,
      left: 40,
      right: 20,
      top: 40
    }}

    colors={(d) => d.color} 
    pointBorderWidth={2}
    pointColor={{ theme: 'background' }}
    pointBorderColor={{ from: 'serieColor' }}
    pointSize={10}
    useMesh
    xFormat="time:%Y-%m-%d"
    xScale={{
      format: '%Y-%m-%d',
      precision: 'day',
      type: 'time',
      useUTC: false
    }}
    yScale={{
      type: 'linear'
    }}
  />);
}
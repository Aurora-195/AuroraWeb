import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

export default function LineGraph({data}) {
  if (data === undefined) return;
  
  const convertedData = data.map(activity => {
    return {
      data: activity.instances.map(instance => {
        const x = instance.startTime.slice(0, 10);
        const y =
          instance.status === "completed"
            ? calculateDuration(instance.startTime, instance.endTime)
            : 0;
  
        return { x, y };
      }),
      id: activity.name
    };
  });
  
  function calculateDuration(startTime, endTime) {
    if (!endTime) {
      return 0;
    }
  
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
  
    return durationInHours;
  }
  
  console.log(convertedData);

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
  curve="monotoneX"
  data={convertedData}
  height={400}
  margin={{
    bottom: 150,
    left: 40,
    right: 20,
    top: 40
  }}

     // 1. defining gradients
     defs={[
      // using helpers
      // will inherit colors from current element
      linearGradientDef('gradientA', [        //purple emerald
          { offset: 0, color: '#9154C1' },
          { offset: 100, color: '#68EFC1'},
      ]),
      linearGradientDef('gradientB', [
          { offset: 0, color: '#f0a247' },
          { offset: 100, color: '#f583ff' },
      ]),
      linearGradientDef('gradientC', [
          { offset: 0, color: '#ed7693' },
          { offset: 100, color: '#a78af9' },
      ]),
      linearGradientDef('gradientD', [
          { offset: 0, color: '#f6ca75' },
          { offset: 100, color: '#8af98e' },
      ]),
  ]}
  // 2. defining rules to apply those gradients
  fill={[
      // match using object query
      { match: { id: 'sport' },           id: 'gradientA'},
      { match: { id: 'procrastination' }, id: 'gradientB'},
      { match: { id: 'meditation' },      id: 'gradientC'},
      { match: { id: 'studying' },        id: 'gradientD'},
      
      // match using function
      //{ match: d => d.id === 'vue', id: 'gradientB' },

      // Needs to be last on the list
      // match all, will only affect 'elm', because once a rule match,
      // others are skipped, so now it acts as a fallback
      { match: '*', id: 'gradientE' },
  ]}

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
/>);}
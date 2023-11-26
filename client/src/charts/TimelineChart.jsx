import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';

function TimelineChart() {
  const [chartData, setChartData] = useState([]);
  //const [dateMin, setDateMin] = useState([]);
  //const [dateMax, setDateMax] = useState([]);
  const location = useLocation();
  const userData = location.state?.user.user;
  const activities = userData?.activities;

  useEffect(() => {
    if (activities) {
      const convertedData = activities.map((activity) => {
        // Check if there are instances and at least one has a status of "completed"
        const completedInstances = activity.instances.filter((instance) => instance.status === "completed");

        if (completedInstances.length > 0) {
          return {
            name: activity.name,
            data: completedInstances.map(instance => {
              const startTime = new Date(instance.startTime);
              const endTime = new Date(instance.endTime);

              return {
                x: startTime.toISOString().split('T')[0],  // Extracting the date part
                y: [
                  Date.UTC(1970, 0, 1, startTime.getUTCHours(), startTime.getUTCMinutes()),
                  Date.UTC(1970, 0, 1, endTime.getUTCHours(), endTime.getUTCMinutes())
                ],
              };
            }),
          };
        } else {
          return {};
        }

      }).filter((activity) => Object.keys(activity).length !== 0); // Remove activities without data

      console.log(JSON.stringify(convertedData, null, 2));
      setChartData(convertedData);
    }
  }, [activities]);
  const { minY, maxY, tickAmount } = findMinMaxTime(activities);
  console.log("MinTime = "+minY + "; MaxTime = " + maxY + "; ticks = " + tickAmount);

  const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '80%',
        rangeBarGroupRows: true,
      },
    },
    colors: [
      "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
      "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
      "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
    ],
    fill: {
      type: 'solid',
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (value) {
          let date = new Date(value);

          return `${date.getMonth() + 1}/${date.getDate()}`;
        }
      }
    },

    yaxis: {
      type: 'datetime',
      min:minY,
      max: maxY,
      tickAmount: 7,
      labels: {
        formatter: function (value) {
          let date = new Date(value);
          return date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
        }
      },
    },

    legend: {
      position: 'right',
    },

  };

  return (
    <div className='p-4'>
      <Chart options={options} series={chartData} type='rangeBar' height={250} />
    </div>
  );
}

function findMinMaxTime(activities) {
  let minTime = new Date('1970-01-01T23:59:59Z').getTime(); // Set to latest possible time
  let maxTime = new Date('1970-01-01T00:00:00Z').getTime(); // Set to earliest possible time

  activities.forEach(activity => {
    activity.instances.forEach(instance => {
      // Extract and normalize the start and end times to a single day
      const startTime = normalizeTime(instance.startTime);
      const endTime = normalizeTime(instance.endTime);

      // Update min and max times
      minTime = Math.min(minTime, startTime);
      maxTime = Math.max(maxTime, endTime);
    });
  });

  return { minY: minTime, maxY: maxTime };
}

function normalizeTime(timeString) {
  const time = new Date(timeString);
  // Normalize the time to 1st Jan 1970
  return Date.UTC(1970, 0, 1, time.getUTCHours(), time.getUTCMinutes());
}


export default TimelineChart;


/*
series: [
  {
    name: 'Sport',
    data: [
      {
        x: '11/1',
        y: [
          new Date("2023-11-01T09:00:00Z").getTime(),
          new Date("2023-11-01T11:00:00Z").getTime()
        ]
      },
    ]
  },
  {
    name: 'Studying',
    data: [
      {
        x: '11/2',
        y: [
          new Date("2023-11-01T09:00:00Z").getTime(),
          new Date("2023-11-01T11:00:00Z").getTime()
        ]
      },
      {
        x: '11/2',
        y: [
          new Date("2023-11-01T12:00:00Z").getTime(),
          new Date("2023-11-01T12:30:00Z").getTime()
        ]
      },
      {
        x: '11/3',
        y: [
          new Date("2023-11-01T09:00:00Z").getTime(),
          new Date("2023-11-01T11:00:00Z").getTime()
        ]
      }
    ]
  },
  {
    name: 'Meditation',
    data: [
      {
        x: '11/1',
        y: [
          new Date("2023-11-01T06:00:00Z").getTime(),
          new Date("2023-11-01T06:30:00Z").getTime()
        ]
      },
      {
        x: '11/2',
        y: [
          new Date("2023-11-01T20:00:00Z").getTime(),
          new Date("2023-11-01T24:00:00Z").getTime()
        ]
      },
      {
        x: '11/3',
        y: [
          new Date("2023-11-01T04:00:00Z").getTime(),
          new Date("2023-11-01T06:45:00Z").getTime()
        ]
      }
    ]
  },
  {
    name: 'Procrastination',
    data: [
      {
        x: '11/1',
        y: [
          new Date("2023-11-01T14:00:00Z").getTime(),
          new Date("2023-11-01T16:10:00Z").getTime()
        ]
      }
    ]
  },
],
*/
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
            data: completedInstances.map((instance) => {
              const startTime = new Date(instance.startTime);
              const endTime = new Date(instance.endTime);
  
              // Create a consistent date with the same year, month, and day to focus only on time
              const consistentStartDate = new Date();
              consistentStartDate.setHours(startTime.getHours());
              consistentStartDate.setMinutes(startTime.getMinutes());
              consistentStartDate.setSeconds(startTime.getSeconds());

              const consistentEndDate = new Date();
              consistentEndDate.setHours(endTime.getHours());
              consistentEndDate.setMinutes(endTime.getMinutes());
              consistentEndDate.setSeconds(endTime.getSeconds());
  
              return {
                x: startTime.toLocaleDateString(),
                y: [
                  consistentStartDate.getTime(),
                  consistentEndDate.getTime(),
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
        horizontal: true,
        barHeight: '50%',
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
      type: 'datetime',
      formatter: function (value) {
        const date = new Date(value);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
    },
    yaxis: {
      type: 'datetime',
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
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import 'reactjs-popup/dist/index.css';

function TimelineChart({data, handleSelectedAct}) {
  if (data === undefined) return;
  else if (data.length == 0) return;

  // usable data for Timeline chart
  const [chartData, setChartData] = useState([]);

  // a map of dates (no dupes) that is used for x-axis (categories)
  const [dateList, setDateList] = useState(new Map());
  
  // if data changes, then auto update into usable data for Timeline chart
  useEffect(() => {
    if (data) {
      const convertedData = data.map((activity) => {
        // grab completed instances from activity data
        const completedInstances = activity.instances.filter((instance) => instance.status === "completed");

        // if the map (completed instances) is not empty, then return usable data, else return nothing
        if (completedInstances.length > 0) {
          return {
            name: activity.name,
            data: completedInstances.map(instance => {
              const startTime = new Date(instance.startTime);
              const endTime = new Date(instance.endTime);

              const dateStr = startTime.toISOString().split('T')[0];

              if (!dateList.has(dateStr)) {
                setDateList(prevDateList => new Map(prevDateList).set(dateStr, 1));
              }

              return {
                // YYYY-MM-DD
                x: dateStr, 

                // Day, 31 Dec 1899 00:00:00 GMT
                y: [
                  Date.UTC(1970, 0, 1, startTime.getUTCHours(), startTime.getUTCMinutes()),
                  Date.UTC(1970, 0, 1, endTime.getUTCHours(), endTime.getUTCMinutes())
                ],
              };
            }),
            color: `rgb(${activity.color.r}, ${activity.color.g}, ${activity.color.b})`, 
          };
        } else {
          return {};
        }

      }).filter((activity) => Object.keys(activity).length !== 0); // filter out activites that have no instances/recordings

      setChartData(convertedData);
    }
  }, [data, dateList]);
  const { minY, maxY, tickAmount } = findMinMaxTime(data);

  // auto sort date list if new dates are added to dateList or if dates are removed
  useEffect(() => {
    //console.log("Number: ", dateList.size)
    const sortedDateList = [...dateList.entries()].sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setDateList(new Map(sortedDateList));
  }, [dateList.size]);


  //console.log("Date List: ", Array.from(dateList.keys()))
  //console.log(JSON.stringify(chartData, null, 2));
  //console.log("MinTime = "+minY + "; MaxTime = " + maxY + "; ticks = " + tickAmount);

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
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
      },
      events: {
        // `seriesIndex` and `dataPointIndex`
        dataPointSelection: function(event, chartContext, config) {
          //console.log(config.w.config);
          handleSelectedAct({
              'name':       config.w.config.series[config.seriesIndex].name,
              'date':       config.w.config.series[config.seriesIndex].data[config.dataPointIndex].x,
              'startTime':  config.w.config.series[config.seriesIndex].data[config.dataPointIndex].y[0],
              'endTime':    config.w.config.series[config.seriesIndex].data[config.dataPointIndex].y[1],
          });
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '10%',
        rangeBarGroupRows: true,  // stacks logs of same date into one column
        //distributed: true,
        //rangeBarOverlap: true,
      },
    },
    fill: {
      type: 'solid',
    },
    xaxis: {
      tickPlacement: 'between',
      //tickAmount: 30,
      type: 'categories',
      categories: Array.from(dateList.keys()),
      //type: 'datetime',
    },
    yaxis: {
      type: 'datetime',
      min: minY,
      max: maxY,
      tickAmount: 10,
      labels: {
        formatter: function (value) {
          let date = new Date(value);
          return date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
        },
        show: true,
      },
    },
    legend: {
      position: 'left',
    },

  };

  return (
    <div>
      <Chart options={options} series={chartData} type='rangeBar' height={250} />      
    </div>
  );
}

function findMinMaxTime(data) {
  let minTime = new Date('1970-01-01T23:59:59Z').getTime(); // set to latest possible time
  let maxTime = new Date('1970-01-01T00:00:00Z').getTime(); // set to earliest possible time

  data.forEach(activity => {
    activity.instances.forEach(instance => {
      // extract and normalize the start and end times to a single day
      const startTime = normalizeTime(instance.startTime);
      const endTime = normalizeTime(instance.endTime);

      // update min and max times
      minTime = Math.min(minTime, startTime);
      maxTime = Math.max(maxTime, endTime);
    });
  });

  return { minY: minTime, maxY: maxTime };
}

// normalize the time to a set day for consistent y-axis data 
function normalizeTime(timeString) {
  const time = new Date(timeString);
  return Date.UTC(1970, 0, 1, time.getUTCHours(), time.getUTCMinutes());
}


export default TimelineChart;


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'react-apexcharts';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditLogForm from '../widgets/editLogForm';

function TimelineChart({data, activityNames}) {
  if (data === undefined) return;

  const [chartData, setChartData] = useState([]);

  const [dateList, setDateList] = useState(new Map());

  const contentStyle = { 
    background: 'transparent', 
    border: '0',
    closeOnEscape: 'false',
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    if (data) {
      const convertedData = data.map((activity) => {
        // Check if there are instances and at least one has a status of "completed"
        const completedInstances = activity.instances.filter((instance) => instance.status === "completed");

        if (completedInstances.length > 0) {
          return {
            name: activity.name,
            data: completedInstances.map(instance => {
              const startTime = new Date(instance.startTime);
              const endTime = new Date(instance.endTime);

              const strDate = startTime.toISOString().split('T')[0]

              if (!dateList.has(strDate)) {
                setDateList(prevDateList => new Map(prevDateList).set(strDate, 1));
              }

              return {
                x: strDate,  // Extracting the date part
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

      }).filter((activity) => Object.keys(activity).length !== 0); // Remove data without data

      setChartData(convertedData);
    }
  }, [data, dateList]);
  const { minY, maxY, tickAmount } = findMinMaxTime(data);

  // will only run if dateList size is changed (to avoid infinite loop)
  useEffect(() => {
    //console.log("Number: ", dateList.size)
    const sortedDateList = [...dateList.entries()].sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setDateList(new Map(sortedDateList));
  }, [dateList.size]);


  //console.log("Date List: ", dateList)
  //console.log(convertedData);
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
        dataPointSelection: function(event, chartContext, config) {
          setOpenEdit(true)
          console.log(config)
        }
      }
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
      categories: Array.from(dateList.keys()),
    },
    yaxis: {
      type: 'datetime',
      min: minY,
      max: maxY,
      tickAmount: 7,
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
      <Popup 
      open={openEdit} 
      contentStyle={contentStyle}
      onClose={handleCloseEdit}
      closeOnDocumentClick
      >
        <div id="parent" className="relative w-96">
            <button className="z-10 font-bold text-sm text-purple-500 bg-white rounded-full w-10 h-10 absolute right-1 m-1 hover:bg-purple-500 hover:text-white transition-colors duration-300" onClick={handleCloseEdit}>
                X
            </button>
            <EditLogForm className="z-0" activityNames={activityNames}/>
        </div>
      </Popup>

      <Chart options={options} series={chartData} type='rangeBar' height={250} />
      
    </div>
  );
}

function findMinMaxTime(data) {
  let minTime = new Date('1970-01-01T23:59:59Z').getTime(); // Set to latest possible time
  let maxTime = new Date('1970-01-01T00:00:00Z').getTime(); // Set to earliest possible time

  data.forEach(activity => {
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


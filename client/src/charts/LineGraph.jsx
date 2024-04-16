import React from 'react';
import Chart from 'react-apexcharts';

const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    return durationInHours;
}

const LineGraph = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Store total duration for each activity on each day
    const dailyDurationMap = new Map();

    // Calculate and add to dailyDurationMap
    data.forEach(activity => {
        activity.instances.forEach(instance => {
            const date = instance.startTime ? instance.startTime.slice(0, 10) : null;
            if (!date) return;
            const duration = calculateDuration(instance.startTime, instance.endTime);
            const totalDuration = dailyDurationMap.get(date) || {};
            totalDuration[activity.name] = (totalDuration[activity.name] || 0) + duration;
            dailyDurationMap.set(date, totalDuration);
        });
    });

    // get all distinct dates
    const allDates = Array.from(dailyDurationMap.keys());
    allDates.sort();

    const lineData = data.map(activity => ({
        id: activity.name,
        color: `rgb(${activity.color.r}, ${activity.color.g}, ${activity.color.b})`,
        data: allDates.map(date => ({
            x: date,
            y: (dailyDurationMap.get(date) && dailyDurationMap.get(date)[activity.name]) || 0
        }))
    }));
    
    const options = {
        chart: {
            type: 'line',
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
        },
        fill: {
            type: 'solid',
        },
        stroke: {
            width: 4,
            curve: 'straight',
        },
        markers: {
            size: 6,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 3
            }
        },
        xaxis: {
            tickPlacement: 'between',
            categories: allDates,
            type: 'datetime',
            title: {
                text: 'Dates'
            },
        },
        yaxis: {
            tickAmount: 12,
            title: {
                text: 'Hours'
            },
            labels: {
                formatter: function (value) {
                    return Math.round(value * 10) / 10;
                }
            }
        },
        legend: {
            show: false
        },
    };

    return (
        <div>
            <Chart options={options} series={lineData} type='line' height={400} />
        </div>
    );
}

export default LineGraph;

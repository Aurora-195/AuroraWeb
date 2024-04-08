import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    return durationInHours;
}

const LineGraph = ({ data }) => {
    if (!data || data.length === 0) return null;

    const lineData = data.map(activity => ({
        id: activity.name,
        color: `rgb(${activity.color.r}, ${activity.color.g}, ${activity.color.b})`,
        data: activity.instances.map(instance => ({
            x: instance.startTime ? instance.startTime.slice(0, 10) : null,
            y: instance.status === "completed" && instance.endTime 
                ? calculateDuration(instance.startTime, instance.endTime) 
                : 0,
            activity: activity.name // Add activity name to data point
        }))
    }));

    return (
        <div style={{ position: 'relative', height: '250px' }}> {/* Adjust the height here */}
            <ResponsiveLine
                data={lineData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false, tickValues: 5 }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Dates',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Hours',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={(d) => d.color}
                lineWidth={3}
                enablePoints={true}
                enableGridX={false}
                enableGridY={true}
                pointSize={10}
                useMesh={true}
                curve="monotoneX"
                onMouseMove={(event) => {
                    console.log(event);
                }}
                tooltip={({ point }) => (
                    <div style={{ background: 'white', padding: '5px', border: '1px solid black' }}>
                        <div>{point.data.activity}</div>
                        <div>Hours: {point.data.y}</div>
                    </div>
                )}
            />
        </div>
    );
}

export default LineGraph;

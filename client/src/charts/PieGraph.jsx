import { ResponsivePie } from '@nivo/pie'
import { useMemo } from 'react';

import { linearGradientDef } from '@nivo/core'

export default function PieGraph({data}) {
    if (data === undefined) return;
    else if (data.length == 0) return;

    const pieData = useMemo(() => {
        // Calculate total duration for each activity
        const activityDurations = data.map(activity => {
            const totalDuration = activity.instances.reduce((acc, instance) => {
                // Only calculate duration for completed instances
                if (instance.status === 'completed' && instance.endTime) {
                    const start = new Date(instance.startTime).getTime();
                    const end = new Date(instance.endTime).getTime();
                    return acc + (end - start);
                }
                return acc;
            }, 0);

            // Convert milliseconds to hours
            const durationInHours = (totalDuration / (1000 * 60 * 60)).toFixed(2);

            return {
                id: activity.name,
                label: activity.name,
                value: durationInHours,
                color: `rgb(${activity.color.r}, ${activity.color.g}, ${activity.color.b})`,
            };
        });

        return activityDurations;
    }, [data]);

    //console.log("PIE DATA");
    //console.log(pieData);

    return(<ResponsivePie
        data={pieData}
        margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={2}
        borderColor={'white'}
        enableArcLinkLabels={false}
        arcLabelsTextColor={"white"}

        // 1. defining gradients
        defs={[
            // using helpers
            // will inherit colors from current element
            linearGradientDef('gradientA', [        //purple emerald
                { offset: 40,    color: pieData[0].color },
                { offset: 100,  color: '#68EFC1'},
            ]),
            linearGradientDef('gradientB', [
                { offset: 40,    color: pieData[1].color },
                { offset: 100,  color: '#f583ff' },
            ]),
            linearGradientDef('gradientC', [
                { offset: 40,    color: pieData[2].color },
                { offset: 100,  color: '#a78af9' },
            ]),
            linearGradientDef('gradientD', [
                { offset: 40,    color: pieData[3].color },
                { offset: 100,  color: '#8af98e' },
            ]),
        ]}
        // 2. defining rules to apply those gradients
        fill={[
            // match using object query
            { match: { id: pieData[0].id }, id: 'gradientA'},
            { match: { id: pieData[1].id }, id: 'gradientB'},
            { match: { id: pieData[2].id }, id: 'gradientC'},
            { match: { id: pieData[3].id }, id: 'gradientD'},
            
            // match using function
            //{ match: d => d.id === 'vue', id: 'gradientB' },

            // Needs to be last on the list
            // match all, will only affect 'elm', because once a rule match,
            // others are skipped, so now it acts as a fallback
            { match: '*', id: 'gradientE' },
        ]}
        colors={[pieData[0].color,pieData[1].color,pieData[2].color,pieData[3].color]}
    />);
}
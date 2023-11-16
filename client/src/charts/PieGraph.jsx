import { ResponsivePie } from '@nivo/pie'
import { useMemo } from 'react';

import { linearGradientDef } from '@nivo/core'

export default function PieGraph({data}) {
    if (data===undefined) return;

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
            const durationInHours = totalDuration / (1000 * 60 * 60);

            return {
                id: activity.name,
                label: activity.name,
                value: durationInHours,
            };
        });

        return activityDurations;
    }, [data]);



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
/>);
}
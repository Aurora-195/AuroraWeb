import { ResponsivePie } from '@nivo/pie'
import { useMemo } from 'react';


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
                color: "hsl(" + Math.random() * 360 + ", 70%, 50%)",
            };
        });

        return activityDurations;
    }, [data]);



return(<ResponsivePie
    data={pieData}
    margin={{ top: 5, right: 5, bottom: 60, left: 5 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    enableArcLinkLabels={false}

    legends={[
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 55,
            itemsSpacing: 0,
            itemWidth: 0,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
/>);
}
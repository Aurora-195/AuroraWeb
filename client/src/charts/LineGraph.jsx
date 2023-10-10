import { ResponsiveLine } from '@nivo/line'

export default function LineGraph() {
const data = [
    {
      "id": "japan",
      "color": "hsl(194, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 298
        },
        {
          "x": "helicopter",
          "y": 132
        },
        {
          "x": "boat",
          "y": 275
        },
        {
          "x": "train",
          "y": 299
        },
        {
          "x": "subway",
          "y": 61
        },
        {
          "x": "bus",
          "y": 102
        },
        {
          "x": "car",
          "y": 151
        },
        {
          "x": "moto",
          "y": 218
        },
        {
          "x": "bicycle",
          "y": 202
        },
        {
          "x": "horse",
          "y": 36
        },
        {
          "x": "skateboard",
          "y": 258
        },
        {
          "x": "others",
          "y": 42
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(17, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 269
        },
        {
          "x": "helicopter",
          "y": 298
        },
        {
          "x": "boat",
          "y": 158
        },
        {
          "x": "train",
          "y": 168
        },
        {
          "x": "subway",
          "y": 92
        },
        {
          "x": "bus",
          "y": 246
        },
        {
          "x": "car",
          "y": 176
        },
        {
          "x": "moto",
          "y": 249
        },
        {
          "x": "bicycle",
          "y": 179
        },
        {
          "x": "horse",
          "y": 173
        },
        {
          "x": "skateboard",
          "y": 76
        },
        {
          "x": "others",
          "y": 159
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(181, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 216
        },
        {
          "x": "helicopter",
          "y": 278
        },
        {
          "x": "boat",
          "y": 225
        },
        {
          "x": "train",
          "y": 85
        },
        {
          "x": "subway",
          "y": 60
        },
        {
          "x": "bus",
          "y": 206
        },
        {
          "x": "car",
          "y": 49
        },
        {
          "x": "moto",
          "y": 81
        },
        {
          "x": "bicycle",
          "y": 50
        },
        {
          "x": "horse",
          "y": 43
        },
        {
          "x": "skateboard",
          "y": 250
        },
        {
          "x": "others",
          "y": 184
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(212, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 93
        },
        {
          "x": "helicopter",
          "y": 207
        },
        {
          "x": "boat",
          "y": 134
        },
        {
          "x": "train",
          "y": 168
        },
        {
          "x": "subway",
          "y": 241
        },
        {
          "x": "bus",
          "y": 107
        },
        {
          "x": "car",
          "y": 243
        },
        {
          "x": "moto",
          "y": 66
        },
        {
          "x": "bicycle",
          "y": 146
        },
        {
          "x": "horse",
          "y": 210
        },
        {
          "x": "skateboard",
          "y": 211
        },
        {
          "x": "others",
          "y": 90
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(299, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 41
        },
        {
          "x": "helicopter",
          "y": 152
        },
        {
          "x": "boat",
          "y": 148
        },
        {
          "x": "train",
          "y": 94
        },
        {
          "x": "subway",
          "y": 99
        },
        {
          "x": "bus",
          "y": 8
        },
        {
          "x": "car",
          "y": 237
        },
        {
          "x": "moto",
          "y": 144
        },
        {
          "x": "bicycle",
          "y": 294
        },
        {
          "x": "horse",
          "y": 198
        },
        {
          "x": "skateboard",
          "y": 86
        },
        {
          "x": "others",
          "y": 86
        }
      ]
    }
  ];

return (<ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
/>);
}
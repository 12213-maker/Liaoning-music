export const ContrastOpt = {
     color: ["#8534ff", "#027ffe", "#5cdbd2", "#4ff0c5", "#4ce692", "#e448af", "#fb7294", "#ff9f7f", "#ffdb5c"],
     tooltip: {
       trigger: 'item',
       backgroundColor: 'rgba(255,255,255)',
       textStyle: {
         color: "#262626"
       },
       extraCssText: 'box-shadow:0px 2px 8px 0px rgba(102, 61, 0, 0.16)'
     },
     title: {
       show: false,
       left: 10,
       subtext: '单位：条',
       subtextStyle: {
         fontSize: 12,
         color: '#a0a0a0',
       }
     },
     legend: {
       orient: 'vertical',
       icon: "circle",
       left: '30',
       bottom: '15',
       itemHeight: 14,
       itemGap: 15,
       data: []
     },
     series: [{
       name: '精选录音构成',
       type: 'pie',
       center: ['55%', 250],
       radius: [105, 140],
       avoidLabelOverlap: false,
       itemStyle: {
         borderRadius: 10,
         borderColor: '#fff',
         borderWidth: 2
       },
       label: {
         show: false,
         position: 'center'
       },
       emphasis: {
         label: {
           show: true,
           fontSize: '20',
           fontWeight: 'bold'
         }
       },
       labelLine: {
         show: false
       },
       data: []
     }]
   };

<template>
  <div>
    <div
      class="echart-box"
      :style="{ height: height, width: width, backgroundColor: 'pink' }"
      ref="chart"
      v-show="xName.length"
    ></div>
    <Blank v-show="!xName.length" />
  </div>
</template>

<script>
import Blank from "@/components/common/Blank";
export default {
  components: {
    Blank,
  },
  props: {
    height: String,
    width: String,
    xName: Array,
    PieValue: Array,
    colors: Array,
    legendsPie: Array,
    clickCb: Function,
    showSymbol: {
      default: true,
      type: Boolean,
    }
  },
  data() {
    return {
      chart: null,
      data: [
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },
        {
          value: 0,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
        },

        //??????????????????????????????
        {
          value: 1000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[0],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 1500,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[1],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 2000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[2],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 2500,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[3],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 3000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[4],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 3500,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[5],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 4000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[6],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 4500,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[7],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 5000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[8],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
        {
          value: 5000,
          name: "?????????",
          itemStyle: {
            normal: {
              color: this.piecolor[9],
              borderWidth: 1,
              borderColor: "white",
            },
          },
        },
      ],
    };
  },
  methods: {
    drawChart() {
      // let that = this;
      // if (this.chart) {
      //   this.chart.dispose();
      // }
      this.chart = this.$echarts.init(this.$refs.chart);

      // let option = {
      //   backgroundColor: "white",
      //   calculable: true,
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a}<br/>{b}:{c}/???",
      //   },
      //   legend: {
      //     data: [
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //       "?????????",
      //     ],
      //     textStyle: {
      //       color: "black",
      //     },
      //     orient: "vertical",
      //     left: "right",
      //   },
      //   calculable: true,
      //   series: [
      //     {
      //       name: "??????",
      //       type: "pie",
      //       //??????????????????,????????????0.2%???
      //       radius: ["4.8%", "5%"],
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "??????",
      //           label: {
      //             show: false,
      //           },
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       radius: ["14.8%", "15%"],
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //           label: {
      //             show: false,
      //           },
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       startAngle: -180,
      //       center: ["25%", "65%"],
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["24.8%", "25%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["34.8%", "35%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["44.8%", "45%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["54.8%", "55%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["64.8%", "65%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       name: "???????????????",
      //       type: "pie",
      //       center: ["25%", "65%"],
      //       startAngle: -180,
      //       hoverAnimation: false,
      //       legendHoverLink: true,
      //       radius: ["74.8%", "75%"],
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       data: [
      //         {
      //           value: "500",
      //           name: "???????????????",
      //         },
      //         {
      //           value: "500",
      //           itemStyle: {
      //             normal: {
      //               color: "transparent",
      //             },
      //           },
      //         },
      //       ],
      //     },

      //     //?????????????????????
      //     {
      //       name: "????????????",
      //       type: "pie",
      //       radius: [37, 255],
      //       avoidLabelOverlap: false,
      //       startAngle: 0,
      //       center: ["25%", "65%"],
      //       roseType: "area",
      //       selectedMode: "single",
      //       labelLine: {
      //         normal: {
      //           show: false,
      //         },
      //       },
      //       label: {
      //         show: false,
      //       },
      //       data: [
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },
      //         {
      //           value: 0,
      //           name: "",
      //           label: {
      //             normal: {
      //               show: false,
      //             },
      //           },
      //         },

      //         //??????????????????????????????
      //         {
      //           value: 1000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[0],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 1500,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[1],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 2000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[2],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 2500,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[3],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 3000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[4],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 3500,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[5],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 4000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[6],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 4500,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[7],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 5000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[8],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //         {
      //           value: 5000,
      //           name: "?????????",
      //           itemStyle: {
      //             normal: {
      //               color: this.piecolor[9],
      //               borderWidth: 1,
      //               borderColor: "white",
      //             },
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // };

      let option = {
        backgroundColor: "white",
        calculable: true,
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c}/???",
        },
        // title: {
        //   text: "??????????????????",
        //   left: "center",
        //   top: 40,
        //   textStyle: {
        //     color: "#ccc",
        //     fontSize: 40,
        //   },
        // },
        legend: {
          data: [
            "?????????",
            "?????????",
            "?????????",
            "?????????",
            "?????????",
            "?????????",
            "?????????",
            "?????????",
            "?????????",
          ],
          textStyle: {
            color: "black",
          },
          orient: "vertical",
          left: "right",
        },
        calculable: true,
        series: [
          {
            name: "??????",
            type: "pie",
            //??????????????????,????????????0.2%???
            radius: ["4.8%", "5%"],
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "??????",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            radius: ["14.8%", "15%"],
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            startAngle: -180,
            center: ["25%", "65%"],
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["24.8%", "25%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["34.8%", "35%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["44.8%", "45%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["54.8%", "55%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["64.8%", "65%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "???????????????",
            type: "pie",
            center: ["25%", "65%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["74.8%", "75%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "???????????????",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },

          //?????????????????????
          {
            name: "????????????",
            type: "pie",
            radius: [37, 255],
            avoidLabelOverlap: false,
            startAngle: 0,
            center: ["25%", "65%"],
            roseType: "area",
            selectedMode: "single",
            // label: {
            //   normal: {
            //     show: true,
            //     formatter: "{c}/???",
            //     position: "inside",
            //   },
            //   emphasis: {
            //     show: true,
            //   },
            // },
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },

              //??????????????????????????????
              {
                value: 1000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[0],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 1500,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[1],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[2],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2500,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[3],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[4],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3500,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[5],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[6],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4500,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[7],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[8],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: "?????????",
                itemStyle: {
                  normal: {
                    color: this.piecolor[9],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
            ],
          },
        ],
      };
      // this.chart.clear();
      this.chart.setOption(option);
      // if (this.clickCb) {
      //   this.chart.on("click", (params) => {
      //     this.clickCb(params);
      //   });
      // }

      // window.onresize = () => {
      //   this.chart.resize();
      // };
    },
  },
};
</script>

<style>
</style>
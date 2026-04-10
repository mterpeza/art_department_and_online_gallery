import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assets";

const paintingSections = [
  {
    id: "dot-series",
    label: "Dot Series",
    thumb:
      "/images/portfolio/paintings/paintings%20feature%20section/ds_1a.jpeg",
    dotSeriesGroups: [
      {
        id: "ds_5",
        label: "Dot Series 5",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_front.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_front.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_side.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_bot.jpeg",
        ],
      },
      {
        id: "ds_4",
        label: "Dot Series 4",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_front.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_front.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_side.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_stacked.jpeg",
        ],
      },
      {
        id: "ds_3",
        label: "Dot Series 3",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_front.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_front.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_detail.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_side.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_glowDark.jpeg",
        ],
      },
      {
        id: "ds_2",
        label: "Dot Series 2",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_2/ds_2_detail.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_2/ds_2_detail.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_2/ds_2_front.jpeg",
        ],
      },
      {
        id: "ds_1",
        label: "Dot Series 1",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_1/ds_1_detail.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_1/ds_1_detail.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_1/ds_1_frontCropped.jpeg",
        ],
      },
    ],
    images: [
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_5/ds_5_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_4/ds_4_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_3/ds_3_front.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_2/ds_2_detail.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/dot%20series/ds_1/ds_1_detail.jpeg",
    ],
    imageTitles: [
      "Dot Series 5",
      "Dot Series 4",
      "Dot Series 3",
      "Dot Series 2",
      "Dot Series 1",
    ],
  },
  {
    id: "landscape-series",
    label: "Landscape Series",
    thumb:
      "/images/portfolio/paintings/paintings%20feature%20section/ls_1a.jpeg",
    landscapeSeriesGroups: [
      {
        id: "ls_5",
        label: "Landscape Series 5",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5.jpeg",
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5_detail.jpeg",
        ],
      },
      {
        id: "ls_4",
        label: "Landscape Series 4",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_4/landscape_4.jpeg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_4/landscape_4.jpeg",
        ],
      },
      {
        id: "ls_3",
        label: "Landscape Series 3",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_3/Landescape_3.jpg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_3/Landescape_3.jpg",
        ],
      },
      {
        id: "ls_2",
        label: "Landscape Series 2",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_2/Landescape_2.jpg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_2/Landescape_2.jpg",
        ],
      },
      {
        id: "ls_1",
        label: "Landscape Series 1",
        thumb:
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_1/Landescape_1.jpg",
        images: [
          "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_1/Landescape_1.jpg",
        ],
      },
    ],
    images: [
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_5/Landscape_5.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_4/landscape_4.jpeg",
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_3/Landescape_3.jpg",
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_2/Landescape_2.jpg",
      "/images/portfolio/paintings/paintings%20feature%20section/landscapes/ls_1/Landescape_1.jpg",
    ],
  },
  {
    id: "square-signs",
    label: "Square Signs",
    thumb: "/images/portfolio/paintings/royOilsp/IMG_1609.jpeg",
    squareSignsGroups: [
      {
        id: "sps_2",
        label: "Royal Oils",
        thumb: "/images/portfolio/paintings/royOilsp/IMG_1609.jpeg",
        images: ["/images/portfolio/paintings/royOilsp/IMG_1609.jpeg"],
      },
      {
        id: "sps_3",
        label: "Shedd's PBnJ",
        thumb: "/images/portfolio/paintings/spb/IMG_1570.jpeg",
        images: ["/images/portfolio/paintings/spb/IMG_1570.jpeg"],
      },
      {
        id: "sps_4",
        label: "Graffs Pop",
        thumb: "/images/portfolio/paintings/gsp/IMG_1721.jpeg",
        images: ["/images/portfolio/paintings/gsp/IMG_1721.jpeg"],
      },
      {
        id: "sps_5",
        label: "Turkish Coffee",
        thumb: "/images/portfolio/paintings/tcp/TurkishCoffee_wCal.jpg",
        images: ["/images/portfolio/paintings/tcp/TurkishCoffee_wCal.jpg"],
      },
    ],
    images: [
      "/images/portfolio/paintings/royOilsp/IMG_1609.jpeg",
      "/images/portfolio/paintings/spb/IMG_1570.jpeg",
      "/images/portfolio/paintings/gsp/IMG_1721.jpeg",
      "/images/portfolio/paintings/tcp/TurkishCoffee_wCal.jpg",
    ],
  },
  {
    id: "six-ways-from-sunday",
    label: "Six Ways from Sunday",
    thumb:
      "/images/portfolio/paintings/paintings%20feature%20section/swfs_1a.jpeg",
    images: [
      "/images/portfolio/paintings/paintings%20feature%20section/swfs/thursday/thursday.JPG",
      "/images/portfolio/paintings/paintings%20feature%20section/swfs/friday/6_Ways%20from%20Sunday_Friday.jpg",
      "/images/portfolio/paintings/paintings%20feature%20section/swfs/saturday/6_Ways%20from%20Sunday_Saturday_MAIN.jpg",
    ],
    imageTitles: ["Thursday", "Friday", "Saturday"],
  },
  {
    id: "lettering",
    label: "Lettering",
    thumb: "/images/portfolio/paintings/Lettering/depth/Depth_1.jpg",
    letteringGroups: [
      {
        id: "depth",
        label: "Depth",
        thumb: "/images/portfolio/paintings/Lettering/depth/Depth_1.jpg",
        images: [
          "/images/portfolio/paintings/Lettering/depth/Depth_1.jpg",
          "/images/portfolio/paintings/Lettering/depth/Depth_Detail_2.jpg",
          "/images/portfolio/paintings/Lettering/depth/Depth_Detail_3.jpg",
        ],
      },
      {
        id: "harvest",
        label: "Harvest",
        thumb:
          "/images/portfolio/paintings/Lettering/harvest/harvest_complete.JPG",
        images: [
          "/images/portfolio/paintings/Lettering/harvest/harvest_complete.JPG",
          "/images/portfolio/paintings/Lettering/harvest/harvest_incomplete.JPG",
        ],
      },
      {
        id: "syllable",
        label: "Syllable",
        thumb:
          "/images/portfolio/paintings/Lettering/syllable/syllable_front.JPG",
        images: [
          "/images/portfolio/paintings/Lettering/syllable/syllable_front.JPG",
          "/images/portfolio/paintings/Lettering/syllable/syllable_side.JPG",
        ],
      },
      {
        id: "thef",
        label: "Thef",
        thumb: "/images/portfolio/paintings/Lettering/thef/Thef_ish_MAIN_1.jpg",
        images: [
          "/images/portfolio/paintings/Lettering/thef/Thef_ish_MAIN_1.jpg",
          "/images/portfolio/paintings/Lettering/thef/Thef_ish_Detail_2.jpg",
          "/images/portfolio/paintings/Lettering/thef/Thef_ish_Detail_3.jpg",
        ],
      },
      {
        id: "thef_landscape",
        label: "Thef_Landscape",
        thumb: "/images/portfolio/paintings/Lettering/thef_long/thef_long.JPG",
        images: [
          "/images/portfolio/paintings/Lettering/thef_long/thef_long.JPG",
        ],
      },
    ],
    images: [
      "/images/portfolio/paintings/Lettering/depth/Depth_1.jpg",
      "/images/portfolio/paintings/Lettering/depth/Depth_Detail_2.jpg",
      "/images/portfolio/paintings/Lettering/depth/Depth_Detail_3.jpg",
      "/images/portfolio/paintings/Lettering/harvest/harvest_complete.JPG",
      "/images/portfolio/paintings/Lettering/thef/Thef_ish_MAIN_1.jpg",
      "/images/portfolio/paintings/Lettering/thef/Thef_ish_Detail_2.jpg",
      "/images/portfolio/paintings/Lettering/thef/Thef_ish_Detail_3.jpg",
      "/images/portfolio/paintings/Lettering/syllable/syllable_front.JPG",
      "/images/portfolio/paintings/Lettering/thef_long/thef_long.JPG",
    ],
  },
  {
    id: "archived",
    label: "Archived",
    thumb: "/images/portfolio/paintings/aw/IMG_8241.JPG",
    images: [
      "/images/portfolio/paintings/aw/IMG_8241.JPG",
      "/images/portfolio/paintings/aw/IMG_8267.JPG",
      "/images/portfolio/paintings/aw/IMG_8305.JPG",
      "/images/portfolio/paintings/aw/IMG_4222.JPG",
      "/images/portfolio/paintings/aw/new.jpg",
    ],
  },
  {
    id: "spray-it",
    label: "Other",
    thumb:
      "/images/portfolio/paintings/color%20theory%20sequence/color_theory_sequence.jpg",
    images: [
      "/images/portfolio/paintings/color%20theory%20sequence/color_theory_sequence.jpg",
      "/images/portfolio/paintings/untitled/IMG_1565.jpeg",
      "/images/portfolio/paintings/untitled/untitled_right.jpeg",
    ],
  },
];

const printSections = [
  {
    id: "clothing",
    label: "Clothing",
    comingSoon: true,
    thumb: "/images/portfolio/print/print%20feature%20section/tc_1a.jpg",
    images: [],
  },
  {
    id: "screenprint",
    label: "Screenprint",
    comingSoon: true,
    thumb: "/images/portfolio/print/print%20feature%20section/tp_1a.jpg",
    images: [],
  },
];

const photographyGroups = [
  {
    id: "digital",
    label: "Digital",
    thumb:
      "/images/portfolio/photography/photography%20feature%20section/digi_1a.JPG",
    folders: [
      {
        id: "digital-color",
        label: "Color",
        thumb:
          "/images/portfolio/photography/photography%20feature%20section/color_1a.jpg",
        images: [
          "/images/portfolio/photography/digital/color/100_0001.JPG",
          "/images/portfolio/photography/digital/color/100_0037.JPG",
          "/images/portfolio/photography/digital/color/5343786899_7b65bd8858_o.jpg",
          "/images/portfolio/photography/digital/color/6A46D84E-6B88-480A-91F5-A1B1BBF82843.jpg",
          "/images/portfolio/photography/digital/color/IMG_0294.JPG",
          "/images/portfolio/photography/digital/color/IMG_2310.JPG",
          "/images/portfolio/photography/digital/color/IMG_2876.JPG",
          "/images/portfolio/photography/digital/color/IMG_3205.JPG",
          "/images/portfolio/photography/digital/color/IMG_3308.JPG",
          "/images/portfolio/photography/digital/color/IMG_3310.JPG",
          "/images/portfolio/photography/digital/color/IMG_3524.JPG",
          "/images/portfolio/photography/digital/color/IMG_3555.JPG",
          "/images/portfolio/photography/digital/color/IMG_3958.JPG",
          "/images/portfolio/photography/digital/color/IMG_4597.JPG",
          "/images/portfolio/photography/digital/color/IMG_5071.JPG",
          "/images/portfolio/photography/digital/color/IMG_5403.JPG",
          "/images/portfolio/photography/digital/color/IMG_5503.JPG",
          "/images/portfolio/photography/digital/color/IMG_5672.JPG",
          "/images/portfolio/photography/digital/color/IMG_5796.JPG",
          "/images/portfolio/photography/digital/color/IMG_6409.JPG",
        ],
      },
      {
        id: "digital-bw",
        label: "B/W",
        thumb:
          "/images/portfolio/photography/photography%20feature%20section/bw_1a.jpg",
        images: [
          "/images/portfolio/photography/digital/bw/100_0049.JPG",
          "/images/portfolio/photography/digital/bw/100_0050.JPG",
          "/images/portfolio/photography/digital/bw/100_0051.JPG",
          "/images/portfolio/photography/digital/bw/100_0098.JPG",
          "/images/portfolio/photography/digital/bw/100_0100.JPG",
          "/images/portfolio/photography/digital/bw/100_0110.JPG",
          "/images/portfolio/photography/digital/bw/100_0111.JPG",
          "/images/portfolio/photography/digital/bw/100_0112.JPG",
          "/images/portfolio/photography/digital/bw/100_0115.JPG",
          "/images/portfolio/photography/digital/bw/100_0116.JPG",
          "/images/portfolio/photography/digital/bw/100_0170.JPG",
          "/images/portfolio/photography/digital/bw/3E391DF6-5AA7-41D2-B219-E50505066725.jpg",
          "/images/portfolio/photography/digital/bw/4158599145_1ed280ece5_o.jpg",
          "/images/portfolio/photography/digital/bw/4519411710_993bebb21d_o.jpg",
          "/images/portfolio/photography/digital/bw/4519412448_def2c87dd9_o.jpg",
          "/images/portfolio/photography/digital/bw/4519413288_eec9d6f2fe_o.jpg",
          "/images/portfolio/photography/digital/bw/4519413980_0cbab84301_o.jpg",
          "/images/portfolio/photography/digital/bw/6942883B-6938-4C12-9262-D69C32C059F8.jpg",
          "/images/portfolio/photography/digital/bw/84659121-0981-4EE5-861B-1693309759DC.jpg",
          "/images/portfolio/photography/digital/bw/9B7F34D4-9861-4EC3-9F8B-FD60C64E4D38.jpg",
          "/images/portfolio/photography/digital/bw/IMG_1884.JPG",
          "/images/portfolio/photography/digital/bw/IMG_2215.JPG",
          "/images/portfolio/photography/digital/bw/IMG_2892.JPG",
          "/images/portfolio/photography/digital/bw/IMG_3250.JPG",
          "/images/portfolio/photography/digital/bw/IMG_4445.JPG",
          "/images/portfolio/photography/digital/bw/IMG_4446.JPG",
          "/images/portfolio/photography/digital/bw/IMG_5494.JPG",
          "/images/portfolio/photography/digital/bw/IMG_6282.JPG",
          "/images/portfolio/photography/digital/bw/IMG_6288.JPG",
          "/images/portfolio/photography/digital/bw/IMG_6289.JPG",
          "/images/portfolio/photography/digital/bw/IMG_8270.JPG",
          "/images/portfolio/photography/digital/bw/dig_bw_1.JPG",
          "/images/portfolio/photography/digital/bw/dig_bw_2.JPG",
          "/images/portfolio/photography/digital/bw/dig_bw_3.JPG",
          "/images/portfolio/photography/digital/bw/dig_bw_4.JPG",
          "/images/portfolio/photography/digital/bw/dig_bw_5.JPG",
        ],
      },
    ],
  },
  {
    id: "analog",
    label: "Analog",
    thumb:
      "/images/portfolio/photography/photography%20feature%20section/analog_1a.JPG",
    folders: [
      {
        id: "analog-color",
        label: "Color",
        thumb: "/images/portfolio/photography/analog/color/ana_color_1.JPG",
        images: [
          "/images/portfolio/photography/analog/color/5129249167_d2bc29d517_o.jpg",
          "/images/portfolio/photography/analog/color/8135445159_9af2e1297d_o.jpg",
          "/images/portfolio/photography/analog/color/IMG_2825.JPG",
          "/images/portfolio/photography/analog/color/IMG_2826.JPG",
          "/images/portfolio/photography/analog/color/IMG_3916.JPG",
          "/images/portfolio/photography/analog/color/ana_color_1.JPG",
        ],
      },
      {
        id: "analog-bw",
        label: "B/W",
        thumb: "/images/portfolio/photography/analog/bw/ana_bw_1.JPG",
        images: [
          "/images/portfolio/photography/analog/bw/IMG_2962.JPG",
          "/images/portfolio/photography/analog/bw/ana_bw_1.JPG",
          "/images/portfolio/photography/analog/bw/IMG_3918.JPG",
        ],
      },
    ],
  },
  {
    id: "cameras",
    label: "Cameras",
    thumb:
      "/images/portfolio/photography/photography%20feature%20section/cam_1a.JPG",
    images: [
      "/images/portfolio/photography/cameras/polaroid_250LC.JPG",
      "/images/portfolio/photography/cameras/yashica.JPG",
    ],
  },
  {
    id: "bbart",
    label: "BB Art",
    thumb: "/images/portfolio/photography/bbart/IMG_1508.jpeg",
    images: [
      "/images/portfolio/photography/bbart/IMG_1508.jpeg",
      "/images/portfolio/photography/bbart/IMG_1509.jpeg",
      "/images/portfolio/photography/bbart/IMG_1511.jpeg",
    ],
  },
  {
    id: "sitw",
    label: "Shot in the Wild",
    thumb: "/images/portfolio/photography/sitw/IMG_0512.JPG",
    images: [
      "/images/portfolio/photography/sitw/IMG_0512.JPG",
      "/images/portfolio/photography/sitw/IMG_1282.JPG",
      "/images/portfolio/photography/sitw/IMG_1778.JPG",
    ],
  },
];

const msPaintImages = [
  "/images/portfolio/mspaint/IMG_0071.jpeg",
  "/images/portfolio/mspaint/IMG_0766.JPG",
  "/images/portfolio/mspaint/IMG_0767.JPG",
  "/images/portfolio/mspaint/IMG_0786.JPG",
  "/images/portfolio/mspaint/IMG_0787.JPG",
  "/images/portfolio/mspaint/IMG_0802.JPG",
  "/images/portfolio/mspaint/IMG_0920.JPG",
  "/images/portfolio/mspaint/IMG_0969.JPG",
  "/images/portfolio/mspaint/IMG_0970.JPG",
  "/images/portfolio/mspaint/IMG_0971.JPG",
  "/images/portfolio/mspaint/IMG_0978.JPG",
  "/images/portfolio/mspaint/IMG_1100.JPG",
  "/images/portfolio/mspaint/IMG_1120.JPG",
  "/images/portfolio/mspaint/IMG_1121.JPG",
  "/images/portfolio/mspaint/IMG_1136.JPG",
  "/images/portfolio/mspaint/IMG_1138.JPG",
  "/images/portfolio/mspaint/IMG_1139.JPG",
  "/images/portfolio/mspaint/IMG_1172.BMP",
  "/images/portfolio/mspaint/IMG_1173.JPG",
  "/images/portfolio/mspaint/IMG_1174.JPG",
  "/images/portfolio/mspaint/IMG_1175.JPG",
  "/images/portfolio/mspaint/IMG_1177.BMP",
  "/images/portfolio/mspaint/IMG_1181.PNG",
  "/images/portfolio/mspaint/IMG_1185.PNG",
  "/images/portfolio/mspaint/IMG_1226.BMP",
  "/images/portfolio/mspaint/IMG_1270.PNG",
  "/images/portfolio/mspaint/IMG_1271.PNG",
  "/images/portfolio/mspaint/IMG_1272.PNG",
  "/images/portfolio/mspaint/IMG_1280.PNG",
  "/images/portfolio/mspaint/IMG_1283.JPG",
  "/images/portfolio/mspaint/IMG_1284.JPG",
  "/images/portfolio/mspaint/IMG_1285.JPG",
  "/images/portfolio/mspaint/IMG_1286.JPG",
  "/images/portfolio/mspaint/IMG_1287.JPG",
  "/images/portfolio/mspaint/IMG_1304.JPG",
  "/images/portfolio/mspaint/IMG_1306.JPG",
  "/images/portfolio/mspaint/IMG_1307.JPG",
  "/images/portfolio/mspaint/IMG_1308.JPG",
  "/images/portfolio/mspaint/IMG_1309.JPG",
  "/images/portfolio/mspaint/IMG_1737.JPG",
  "/images/portfolio/mspaint/IMG_1784.PNG",
  "/images/portfolio/mspaint/IMG_1788.PNG",
  "/images/portfolio/mspaint/IMG_2024.PNG",
  "/images/portfolio/mspaint/IMG_2563.JPG",
  "/images/portfolio/mspaint/IMG_2649.JPG",
  "/images/portfolio/mspaint/IMG_2652.JPG",
  "/images/portfolio/mspaint/IMG_2665.PNG",
  "/images/portfolio/mspaint/IMG_2666.PNG",
  "/images/portfolio/mspaint/IMG_2716.JPG",
  "/images/portfolio/mspaint/IMG_2821.JPG",
  "/images/portfolio/mspaint/IMG_2823.JPG",
  "/images/portfolio/mspaint/IMG_2874.JPG",
  "/images/portfolio/mspaint/IMG_2926.JPG",
  "/images/portfolio/mspaint/IMG_2927.JPG",
  "/images/portfolio/mspaint/IMG_3262.PNG",
  "/images/portfolio/mspaint/IMG_3690.PNG",
  "/images/portfolio/mspaint/IMG_3699.PNG",
  "/images/portfolio/mspaint/IMG_3963.PNG",
  "/images/portfolio/mspaint/IMG_3971.PNG",
  "/images/portfolio/mspaint/IMG_4038.PNG",
  "/images/portfolio/mspaint/IMG_4264.JPG",
  "/images/portfolio/mspaint/IMG_4656.PNG",
  "/images/portfolio/mspaint/IMG_4720.PNG",
  "/images/portfolio/mspaint/IMG_4831.PNG",
  "/images/portfolio/mspaint/IMG_4839.PNG",
  "/images/portfolio/mspaint/IMG_4842.PNG",
  "/images/portfolio/mspaint/IMG_5087.PNG",
  "/images/portfolio/mspaint/IMG_5092.PNG",
  "/images/portfolio/mspaint/IMG_5184.PNG",
  "/images/portfolio/mspaint/IMG_5215.PNG",
  "/images/portfolio/mspaint/IMG_5348.PNG",
  "/images/portfolio/mspaint/IMG_5366.JPG",
  "/images/portfolio/mspaint/IMG_5390.JPG",
  "/images/portfolio/mspaint/IMG_6070.JPG",
  "/images/portfolio/mspaint/IMG_7215.JPG",
  "/images/portfolio/mspaint/IMG_8688.jpeg",
];

const msPaintPriorityImages = [
  "/images/portfolio/mspaint/IMG_5087.PNG",
  "/images/portfolio/mspaint/IMG_3690.PNG",
  "/images/portfolio/mspaint/IMG_1270.PNG",
  "/images/portfolio/mspaint/IMG_4656.PNG",
  "/images/portfolio/mspaint/IMG_3262.PNG",
  "/images/portfolio/mspaint/IMG_1784.PNG",
  "/images/portfolio/mspaint/IMG_5092.PNG",
  "/images/portfolio/mspaint/IMG_3971.PNG",
  "/images/portfolio/mspaint/IMG_2665.PNG",
  "/images/portfolio/mspaint/IMG_5184.PNG",
  "/images/portfolio/mspaint/IMG_4720.PNG",
  "/images/portfolio/mspaint/IMG_2024.PNG",
  "/images/portfolio/mspaint/IMG_5215.PNG",
  "/images/portfolio/mspaint/IMG_4038.PNG",
  "/images/portfolio/mspaint/IMG_1788.PNG",
  "/images/portfolio/mspaint/IMG_5348.PNG",
  "/images/portfolio/mspaint/IMG_2666.PNG",
  "/images/portfolio/mspaint/IMG_1271.PNG",
  "/images/portfolio/mspaint/IMG_4831.PNG",
  "/images/portfolio/mspaint/IMG_3699.PNG",
  "/images/portfolio/mspaint/IMG_1272.PNG",
  "/images/portfolio/mspaint/IMG_4839.PNG",
  "/images/portfolio/mspaint/IMG_3963.PNG",
  "/images/portfolio/mspaint/IMG_1280.PNG",
  "/images/portfolio/mspaint/IMG_4842.PNG",
];

const orderedMsPaintImages = [
  ...msPaintPriorityImages,
  ...msPaintImages.filter((image) => !msPaintPriorityImages.includes(image)),
];

const MS_PAINT_BATCH_SIZE = 16;

const collaborationGroups = [
  {
    id: "op-characters",
    label: "Cooper Diers: Ordinary Pals",
    thumb:
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2003.jpeg",
    images: [
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2001.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2002.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2003.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2004.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2005.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2006.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/_Char%2007.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2008.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2009.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2010.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2011.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2001.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2002.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2003.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2005.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2006.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Small%2007.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/_SURE!.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/_Stevies.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/art_show.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/art_show_2.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_0033.jpg",
    ],
  },
];

const websiteCodingProjects = [
  {
    id: "random-albers",
    label: "Random Albers",
    image: "/images/portfolio/website/6_randomAlbers.png",
    href: "https://random-albers.s3.us-east-2.amazonaws.com/index.html",
  },
  {
    id: "ordinary-pals",
    label: "Ordinary Pals",
    image: "/images/portfolio/website/5_op.png",
    href: "https://s3.us-east-2.amazonaws.com/www.theordinaries.com/index.html",
  },
  {
    id: "the-colored-nail",
    label: "The Colored Nail",
    image: "/images/portfolio/website/4_coloredNail.jpg",
    href: "https://thecolorednail.com/",
  },
  {
    id: "pinterested",
    label: "Pinterested",
    image: "/images/portfolio/website/3_pinteresting.jpg",
  },
  {
    id: "derek-scot",
    label: "Derek Scot",
    image: "/images/portfolio/website/2_derekScot.jpg",
  },
  {
    id: "ombeha",
    label: "Ombeha",
    image: "/images/portfolio/website/1_ombeha.jpg",
  },
];

const collageWorkImages = ["/images/collageWork/canvas/IMG_5803.JPG"];

const calligraphyGroups = [
  {
    id: "artwork-within-reach",
    label: "Artwork Within Reach",
    thumb:
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/awr_nelson_thumbnail.JPG",
    images: [
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1390.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1391.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1393.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1394.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1395.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1396.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1397.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1398.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1399.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1400.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1401.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1402.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1953.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1962.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1977.jpeg",
    ],
  },
  {
    id: "handstyles",
    label: "Handstyles",
    thumb: "/images/letteringCalligraphy/handstyles/handstyles_CL_1.JPG",
    images: [
      "/images/letteringCalligraphy/handstyles/IMG_1785.PNG",
      "/images/letteringCalligraphy/handstyles/IMG_2076.JPG",
      "/images/letteringCalligraphy/handstyles/IMG_2078.JPG",
      "/images/letteringCalligraphy/handstyles/IMG_2079.JPG",
      "/images/letteringCalligraphy/handstyles/IMG_4588.JPG",
      "/images/letteringCalligraphy/handstyles/IMG_5503.JPG",
      "/images/letteringCalligraphy/handstyles/IMG_8571.JPG",
      "/images/letteringCalligraphy/handstyles/handstyles_CL_1.JPG",
      "/images/letteringCalligraphy/handstyles/handstyles_CL_2.JPG",
      "/images/letteringCalligraphy/handstyles/handstyles_CL_3.JPG",
    ],
  },
  {
    id: "calligraphy",
    label: "Calligraphy",
    thumb: "/images/letteringCalligraphy/traditionalCal/IMG_3220.JPG",
    images: [
      "/images/letteringCalligraphy/traditionalCal/IMG_3220.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3221.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3235.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3236.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3237.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3238.JPG",
      "/images/letteringCalligraphy/traditionalCal/IMG_3239.JPG",
    ],
  },
];

const illustrationGroups = [
  {
    id: "black-book",
    label: "Black Book Art",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/bbi_1a.jpg",
    images: ["/images/portfolio/Illustrations/blackbookArt/bbi_1a.jpg"],
  },
  {
    id: "cdt",
    label: "CDT Illustrations",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/Cover.jpg",
    images: [
      "/images/portfolio/Illustrations/cdtIll/Cover.jpg",
      "/images/portfolio/Illustrations/cdtIll/1.jpg",
      "/images/portfolio/Illustrations/cdtIll/2.jpg",
      "/images/portfolio/Illustrations/cdtIll/3.jpg",
      "/images/portfolio/Illustrations/cdtIll/4.jpg",
      "/images/portfolio/Illustrations/cdtIll/5.jpg",
      "/images/portfolio/Illustrations/cdtIll/6.jpg",
      "/images/portfolio/Illustrations/cdtIll/7.jpg",
    ],
  },
  {
    id: "digital",
    label: "Digital",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/di_1a.jpg",
    images: [
      "/images/portfolio/Illustrations/digitialIllustrations/CMYK.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/Collage.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/Colorbrain.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/IMG_5718.JPG",
      "/images/portfolio/Illustrations/digitialIllustrations/IMG_5765.PNG",
      "/images/portfolio/Illustrations/digitialIllustrations/IMG_5768.PNG",
      "/images/portfolio/Illustrations/digitialIllustrations/PRE%20i.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/PRINT2.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/Photo-Illust.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/Zebra%20POST.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/black.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/blaze.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/face.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/im_not_looking_for_a_chef.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/plainfine.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/print.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/wearethepeople.jpg",
    ],
  },
  {
    id: "mixed",
    label: "Mixed",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/mmi_1a.jpg",
    images: ["/images/portfolio/Illustrations/mixed/mmi_1a.jpg"],
  },
  {
    id: "patterns",
    label: "Patterns",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/pi_1a.jpg",
    images: [
      "/images/portfolio/Illustrations/patterns/gp_patterns_1.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2071.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2072.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2076.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2078.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2079.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2080.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2081.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2082.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2083.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2084.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2085.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2086.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2088.jpeg",
    ],
  },
  {
    id: "mock-roadside-signage",
    label: "Mock Roadside Signage",
    thumb:
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/motel_signs.jpg",
    images: [
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/motel_signs.jpg",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1579.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1588.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1600.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1601.JPG",
    ],
  },
];

const otherPortfolioSections = [
  {
    id: "illustrations",
    label: "Illustrations",
    comingSoon: false,
    images: [],
  },
  {
    id: "ms-paint",
    label: "MS Paint",
    comingSoon: false,
    images: orderedMsPaintImages,
  },
  {
    id: "website-coding",
    label: "Website / Coding",
    comingSoon: false,
    images: [],
  },
  {
    id: "collaborations",
    label: "Collaborations",
    comingSoon: false,
    images: [],
  },
  { id: "furniture", label: "Furniture", comingSoon: true, images: [] },
  {
    id: "calligraphy-lettering",
    label: "Calligraphy / Lettering",
    comingSoon: false,
    images: [],
  },
  { id: "collage-work", label: "Collage Work", comingSoon: false, images: [] },
  { id: "junk-drawer", label: "Junk Drawer", comingSoon: true, images: [] },
];

export default function Portfolio() {
  const location = useLocation();
  const thumbnailRailRef = useRef(null);
  const websiteRailRef = useRef(null);
  const paintingContentRef = useRef(null);
  const printContentRef = useRef(null);
  const photographyContentRef = useRef(null);
  const illustrationContentRef = useRef(null);
  const calligraphyContentRef = useRef(null);
  const collaborationContentRef = useRef(null);
  const paintingTouchStartXRef = useRef(null);
  const photographyTouchStartXRef = useRef(null);
  const msPaintTouchStartXRef = useRef(null);
  const illustrationTouchStartXRef = useRef(null);
  const illustrationRailRef = useRef(null);
  const collaborationTouchStartXRef = useRef(null);
  const swipeThreshold = 40;
  const [activeSectionId, setActiveSectionId] = useState(
    paintingSections[0].id,
  );
  const [showSeriesThumbnails, setShowSeriesThumbnails] = useState({
    "dot-series": false,
    "landscape-series": false,
    "square-signs": false,
    lettering: false,
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeDotSeriesId, setActiveDotSeriesId] = useState("ds_5");
  const [activeLandscapeSeriesId, setActiveLandscapeSeriesId] =
    useState("ls_5");
  const [activeSquareSignsId, setActiveSquareSignsId] = useState("sps_5");
  const [activeLetteringId, setActiveLetteringId] = useState("depth");
  const [activePrintSectionId, setActivePrintSectionId] = useState(
    printSections[0].id,
  );
  const [showPrintContent, setShowPrintContent] = useState(false);
  const [activePhotographyId, setActivePhotographyId] = useState(
    photographyGroups[0].id,
  );
  const [activePhotographyFolderId, setActivePhotographyFolderId] = useState(
    photographyGroups[0].folders?.[0]?.id || null,
  );
  const [showPhotographyContent, setShowPhotographyContent] = useState(false);
  const [showNonSeriesContent, setShowNonSeriesContent] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [photographyLightboxIndex, setPhotographyLightboxIndex] =
    useState(null);
  const [msPaintLightboxIndex, setMsPaintLightboxIndex] = useState(null);
  const [visibleMsPaintCount, setVisibleMsPaintCount] =
    useState(MS_PAINT_BATCH_SIZE);
  const [isLoadingMoreMsPaint, setIsLoadingMoreMsPaint] = useState(false);
  const [activeIllustrationGroupId, setActiveIllustrationGroupId] = useState(
    illustrationGroups[0].id,
  );
  const [showIllustrationContent, setShowIllustrationContent] = useState(false);
  const [illustrationLightboxIndex, setIllustrationLightboxIndex] =
    useState(null);
  const [canIllustrationScrollLeft, setCanIllustrationScrollLeft] =
    useState(false);
  const [canIllustrationScrollRight, setCanIllustrationScrollRight] =
    useState(false);
  const [activeCollaborationGroupId, setActiveCollaborationGroupId] = useState(
    collaborationGroups[0].id,
  );
  const [showCollaborationContent, setShowCollaborationContent] =
    useState(false);
  const [collaborationLightboxIndex, setCollaborationLightboxIndex] =
    useState(null);
  const [websiteLightboxIndex, setWebsiteLightboxIndex] = useState(null);
  const [activeWebsiteProjectId, setActiveWebsiteProjectId] = useState(
    websiteCodingProjects[0].id,
  );
  const [canWebsiteScrollLeft, setCanWebsiteScrollLeft] = useState(false);
  const [canWebsiteScrollRight, setCanWebsiteScrollRight] = useState(false);
  const [collageWorkLightboxIndex, setCollageWorkLightboxIndex] =
    useState(null);
  const [activeCalligraphyGroupId, setActiveCalligraphyGroupId] = useState(
    calligraphyGroups[0].id,
  );
  const [showCalligraphyContent, setShowCalligraphyContent] = useState(false);
  const [calligraphyLightboxIndex, setCalligraphyLightboxIndex] =
    useState(null);
  const [openSections, setOpenSections] = useState(() => ({
    painting: false,
    print: false,
    photography: false,
    ...Object.fromEntries(
      otherPortfolioSections.map((section) => [section.id, false]),
    ),
  }));

  const activeSection = useMemo(
    () =>
      paintingSections.find((section) => section.id === activeSectionId) ||
      paintingSections[0],
    [activeSectionId],
  );

  const activeDotSeriesGroup = useMemo(() => {
    if (activeSection.id !== "dot-series") return null;
    const groups = activeSection.dotSeriesGroups || [];
    return groups.find((group) => group.id === activeDotSeriesId) || groups[0];
  }, [activeDotSeriesId, activeSection]);

  const activeLandscapeSeriesGroup = useMemo(() => {
    if (activeSection.id !== "landscape-series") return null;
    const groups = activeSection.landscapeSeriesGroups || [];
    return (
      groups.find((group) => group.id === activeLandscapeSeriesId) || groups[0]
    );
  }, [activeLandscapeSeriesId, activeSection]);

  const activeSquareSignsGroup = useMemo(() => {
    if (activeSection.id !== "square-signs") return null;
    const groups = activeSection.squareSignsGroups || [];
    return (
      groups.find((group) => group.id === activeSquareSignsId) || groups[0]
    );
  }, [activeSquareSignsId, activeSection]);

  const activeLetteringGroup = useMemo(() => {
    if (activeSection.id !== "lettering") return null;
    const groups = activeSection.letteringGroups || [];
    return groups.find((group) => group.id === activeLetteringId) || groups[0];
  }, [activeLetteringId, activeSection]);

  const activePrintSection = useMemo(
    () =>
      printSections.find((s) => s.id === activePrintSectionId) ||
      printSections[0],
    [activePrintSectionId],
  );

  const activePhotographyGroup = useMemo(
    () =>
      photographyGroups.find((group) => group.id === activePhotographyId) ||
      photographyGroups[0],
    [activePhotographyId],
  );

  const activePhotographyFolder = useMemo(() => {
    if (!activePhotographyGroup?.folders?.length) return null;
    return (
      activePhotographyGroup.folders.find(
        (folder) => folder.id === activePhotographyFolderId,
      ) || activePhotographyGroup.folders[0]
    );
  }, [activePhotographyFolderId, activePhotographyGroup]);

  const displayedPhotographyImages = activePhotographyFolder
    ? activePhotographyFolder.images
    : activePhotographyGroup.images || [];

  const displayedPhotographyTitle = activePhotographyFolder
    ? `${activePhotographyGroup.label} - ${activePhotographyFolder.label}`
    : activePhotographyGroup.label;

  const displayedMsPaintImages = useMemo(
    () => orderedMsPaintImages.slice(0, visibleMsPaintCount),
    [visibleMsPaintCount],
  );
  const hasMoreMsPaintImages =
    visibleMsPaintCount < orderedMsPaintImages.length;

  const activeIllustrationGroup = useMemo(
    () =>
      illustrationGroups.find(
        (group) => group.id === activeIllustrationGroupId,
      ) || illustrationGroups[0],
    [activeIllustrationGroupId],
  );

  const activeCollaborationGroup = useMemo(
    () =>
      collaborationGroups.find(
        (group) => group.id === activeCollaborationGroupId,
      ) || collaborationGroups[0],
    [activeCollaborationGroupId],
  );

  const activeCalligraphyGroup = useMemo(
    () =>
      calligraphyGroups.find(
        (group) => group.id === activeCalligraphyGroupId,
      ) || calligraphyGroups[0],
    [activeCalligraphyGroupId],
  );

  const displayedImages =
    activeSection.id === "dot-series" && activeDotSeriesGroup
      ? activeDotSeriesGroup.images
      : activeSection.id === "landscape-series" && activeLandscapeSeriesGroup
        ? activeLandscapeSeriesGroup.images
        : activeSection.id === "square-signs" && activeSquareSignsGroup
          ? activeSquareSignsGroup.images
          : activeSection.id === "lettering" && activeLetteringGroup
            ? activeLetteringGroup.images
            : activeSection.images;

  const displayedTitle =
    activeSection.id === "dot-series" && activeDotSeriesGroup
      ? activeDotSeriesGroup.label
      : activeSection.id === "landscape-series" && activeLandscapeSeriesGroup
        ? activeLandscapeSeriesGroup.label
        : activeSection.id === "square-signs"
          ? "Square Signs"
          : activeSection.id === "lettering" && activeLetteringGroup
            ? activeLetteringGroup.label
            : activeSection.label;

  const isSeriesSection =
    activeSection.id === "dot-series" ||
    activeSection.id === "landscape-series" ||
    activeSection.id === "square-signs" ||
    activeSection.id === "lettering";
  const isSeriesRevealed =
    activeSection.id === "dot-series"
      ? showSeriesThumbnails["dot-series"]
      : activeSection.id === "landscape-series"
        ? showSeriesThumbnails["landscape-series"]
        : activeSection.id === "square-signs"
          ? showSeriesThumbnails["square-signs"]
          : activeSection.id === "lettering"
            ? showSeriesThumbnails.lettering
            : true;

  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex === null || !displayedImages.length) return;
    setLightboxIndex((lightboxIndex + 1) % displayedImages.length);
  };
  const prevImage = () => {
    if (lightboxIndex === null || !displayedImages.length) return;
    setLightboxIndex(
      (lightboxIndex - 1 + displayedImages.length) % displayedImages.length,
    );
  };

  const closePhotographyLightbox = () => setPhotographyLightboxIndex(null);
  const nextPhotographyImage = () => {
    if (photographyLightboxIndex === null || !displayedPhotographyImages.length)
      return;
    setPhotographyLightboxIndex(
      (photographyLightboxIndex + 1) % displayedPhotographyImages.length,
    );
  };
  const prevPhotographyImage = () => {
    if (photographyLightboxIndex === null || !displayedPhotographyImages.length)
      return;
    setPhotographyLightboxIndex(
      (photographyLightboxIndex - 1 + displayedPhotographyImages.length) %
        displayedPhotographyImages.length,
    );
  };

  const closeMsPaintLightbox = () => setMsPaintLightboxIndex(null);
  const nextMsPaintImage = () => {
    if (msPaintLightboxIndex === null || !orderedMsPaintImages.length) return;
    setMsPaintLightboxIndex(
      (msPaintLightboxIndex + 1) % orderedMsPaintImages.length,
    );
  };
  const prevMsPaintImage = () => {
    if (msPaintLightboxIndex === null || !orderedMsPaintImages.length) return;
    setMsPaintLightboxIndex(
      (msPaintLightboxIndex - 1 + orderedMsPaintImages.length) %
        orderedMsPaintImages.length,
    );
  };

  const closeIllustrationLightbox = () => setIllustrationLightboxIndex(null);
  const nextIllustrationImage = () => {
    if (
      illustrationLightboxIndex === null ||
      !activeIllustrationGroup.images.length
    )
      return;
    setIllustrationLightboxIndex(
      (illustrationLightboxIndex + 1) % activeIllustrationGroup.images.length,
    );
  };
  const prevIllustrationImage = () => {
    if (
      illustrationLightboxIndex === null ||
      !activeIllustrationGroup.images.length
    )
      return;
    setIllustrationLightboxIndex(
      (illustrationLightboxIndex - 1 + activeIllustrationGroup.images.length) %
        activeIllustrationGroup.images.length,
    );
  };

  const closeCollaborationLightbox = () => setCollaborationLightboxIndex(null);
  const nextCollaborationImage = () => {
    if (
      collaborationLightboxIndex === null ||
      !activeCollaborationGroup.images.length
    )
      return;
    setCollaborationLightboxIndex(
      (collaborationLightboxIndex + 1) % activeCollaborationGroup.images.length,
    );
  };
  const prevCollaborationImage = () => {
    if (
      collaborationLightboxIndex === null ||
      !activeCollaborationGroup.images.length
    )
      return;
    setCollaborationLightboxIndex(
      (collaborationLightboxIndex -
        1 +
        activeCollaborationGroup.images.length) %
        activeCollaborationGroup.images.length,
    );
  };

  const closeWebsiteLightbox = () => setWebsiteLightboxIndex(null);
  const nextWebsiteImage = () => {
    if (websiteLightboxIndex === null) return;
    setWebsiteLightboxIndex(
      (websiteLightboxIndex + 1) % websiteCodingProjects.length,
    );
  };
  const prevWebsiteImage = () => {
    if (websiteLightboxIndex === null) return;
    setWebsiteLightboxIndex(
      (websiteLightboxIndex - 1 + websiteCodingProjects.length) %
        websiteCodingProjects.length,
    );
  };

  const closeCollageWorkLightbox = () => setCollageWorkLightboxIndex(null);
  const nextCollageWorkImage = () => {
    if (collageWorkLightboxIndex === null) return;
    setCollageWorkLightboxIndex(
      (collageWorkLightboxIndex + 1) % collageWorkImages.length,
    );
  };
  const prevCollageWorkImage = () => {
    if (collageWorkLightboxIndex === null) return;
    setCollageWorkLightboxIndex(
      (collageWorkLightboxIndex - 1 + collageWorkImages.length) %
        collageWorkImages.length,
    );
  };

  const closeCalligraphyLightbox = () => setCalligraphyLightboxIndex(null);
  const nextCalligraphyImage = () => {
    if (
      calligraphyLightboxIndex === null ||
      !activeCalligraphyGroup.images.length
    )
      return;
    setCalligraphyLightboxIndex(
      (calligraphyLightboxIndex + 1) % activeCalligraphyGroup.images.length,
    );
  };
  const prevCalligraphyImage = () => {
    if (
      calligraphyLightboxIndex === null ||
      !activeCalligraphyGroup.images.length
    )
      return;
    setCalligraphyLightboxIndex(
      (calligraphyLightboxIndex - 1 + activeCalligraphyGroup.images.length) %
        activeCalligraphyGroup.images.length,
    );
  };

  const handleLightboxTouchStart = (event, ref) => {
    ref.current = event.touches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event, ref, onPrev, onNext) => {
    if (ref.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;
    const deltaX = touchEndX - ref.current;
    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX > 0) {
      onPrev();
    } else {
      onNext();
    }
    ref.current = null;
  };

  const loadMoreMsPaintImages = () => {
    if (isLoadingMoreMsPaint || !hasMoreMsPaintImages) return;
    setIsLoadingMoreMsPaint(true);
    window.setTimeout(() => {
      setVisibleMsPaintCount((prev) =>
        Math.min(prev + MS_PAINT_BATCH_SIZE, orderedMsPaintImages.length),
      );
      setIsLoadingMoreMsPaint(false);
    }, 300);
  };

  const toggleSectionOpen = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollThumbnails = (direction) => {
    if (!thumbnailRailRef.current) return;
    thumbnailRailRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const scrollIllustrationThumbnails = (direction) => {
    if (!illustrationRailRef.current) return;
    illustrationRailRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const scrollWebsiteThumbnails = (direction) => {
    if (!websiteRailRef.current) return;
    websiteRailRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    if (!rail) return;

    const updateScrollButtons = () => {
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const epsilon = 1;
      setCanScrollLeft(rail.scrollLeft > epsilon);
      setCanScrollRight(rail.scrollLeft < maxScrollLeft - epsilon);
    };

    updateScrollButtons();
    rail.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      rail.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [activeSectionId]);

  useEffect(() => {
    const rail = illustrationRailRef.current;
    if (!rail) return;

    const updateScrollButtons = () => {
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const epsilon = 1;
      setCanIllustrationScrollLeft(rail.scrollLeft > epsilon);
      setCanIllustrationScrollRight(rail.scrollLeft < maxScrollLeft - epsilon);
    };

    updateScrollButtons();
    rail.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      rail.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [openSections.illustrations]);

  useEffect(() => {
    const rail = websiteRailRef.current;
    if (!rail) return;

    const updateScrollButtons = () => {
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const epsilon = 1;
      setCanWebsiteScrollLeft(rail.scrollLeft > epsilon);
      setCanWebsiteScrollRight(rail.scrollLeft < maxScrollLeft - epsilon);
    };

    updateScrollButtons();
    rail.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      rail.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [openSections["website-coding"]]);

  useEffect(() => {
    if (location.hash !== "#ms-paint") return;

    setOpenSections((prev) => ({
      ...prev,
      "ms-paint": true,
    }));

    requestAnimationFrame(() => {
      const target = document.getElementById("ms-paint");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  useEffect(() => {
    if (window.innerWidth >= 967) return;
    const seriesIds = [
      "dot-series",
      "landscape-series",
      "square-signs",
      "lettering",
    ];
    const isSeries = seriesIds.includes(activeSectionId);
    const isVisible = isSeries
      ? showSeriesThumbnails[activeSectionId]
      : showNonSeriesContent;
    if (!isVisible) return;
    requestAnimationFrame(() => {
      paintingContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [activeSectionId, showNonSeriesContent, showSeriesThumbnails]);

  useEffect(() => {
    if (!showPrintContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      printContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [showPrintContent]);

  useEffect(() => {
    if (!showPhotographyContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      photographyContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [showPhotographyContent]);

  useEffect(() => {
    if (!showIllustrationContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      illustrationContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [showIllustrationContent]);

  useEffect(() => {
    if (!showCalligraphyContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      calligraphyContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [showCalligraphyContent]);

  useEffect(() => {
    if (!showCollaborationContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      collaborationContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [showCollaborationContent]);

  return (
    <>
      <main className="fade-in container mx-auto p-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Portfolio</h2>
        <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => toggleSectionOpen("painting")}
            className="w-full flex items-center justify-between mb-3"
            aria-expanded={openSections.painting}
            aria-controls="portfolio-painting-content"
          >
            <h3
              className={`text-lg md:text-xl font-semibold transition-colors ${
                openSections.painting
                  ? "text-[#d49a35] dark:text-[#f2c86e]"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              Painting
            </h3>
            <span
              className={`text-xl transition-transform ${
                openSections.painting ? "rotate-0" : "-rotate-90"
              } text-[#d49a35] dark:text-[#f2c86e]`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {openSections.painting ? (
            <div id="portfolio-painting-content">
              <div className="mb-5">
                <div className="flex items-center gap-2">
                  {canScrollLeft ? (
                    <button
                      type="button"
                      onClick={() => scrollThumbnails("left")}
                      className="shrink-0 h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                      aria-label="Scroll painting sections left"
                    >
                      ‹
                    </button>
                  ) : null}

                  <div
                    ref={thumbnailRailRef}
                    className="paintings-scrollbar grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2 scroll-smooth"
                  >
                    {paintingSections.map((section) => {
                      const isActive = section.id === activeSection.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => {
                            const alreadyActive =
                              section.id === activeSectionId;
                            if (section.id === "dot-series") {
                              setActiveSectionId(section.id);
                              const revealed =
                                alreadyActive &&
                                showSeriesThumbnails["dot-series"];
                              setActiveDotSeriesId("ds_5");
                              setShowSeriesThumbnails((prev) => ({
                                ...prev,
                                "dot-series": !revealed,
                              }));
                            } else if (section.id === "landscape-series") {
                              setActiveSectionId(section.id);
                              const revealed =
                                alreadyActive &&
                                showSeriesThumbnails["landscape-series"];
                              setActiveLandscapeSeriesId("ls_5");
                              setShowSeriesThumbnails((prev) => ({
                                ...prev,
                                "landscape-series": !revealed,
                              }));
                            } else if (section.id === "square-signs") {
                              setActiveSectionId(section.id);
                              const revealed =
                                alreadyActive &&
                                showSeriesThumbnails["square-signs"];
                              setActiveSquareSignsId("sps_5");
                              setShowSeriesThumbnails((prev) => ({
                                ...prev,
                                "square-signs": !revealed,
                              }));
                            } else if (section.id === "lettering") {
                              setActiveSectionId(section.id);
                              const revealed =
                                alreadyActive && showSeriesThumbnails.lettering;
                              setActiveLetteringId("depth");
                              setShowSeriesThumbnails((prev) => ({
                                ...prev,
                                lettering: !revealed,
                              }));
                            } else {
                              if (alreadyActive) {
                                setShowNonSeriesContent((prev) => !prev);
                              } else {
                                setActiveSectionId(section.id);
                                setShowNonSeriesContent(true);
                              }
                            }
                            closeLightbox();
                          }}
                          className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                            isActive
                              ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                              : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                          }`}
                        >
                          <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            {section.thumb ? (
                              <img
                                src={assetUrl(section.thumb)}
                                alt={section.label}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                                Coming Soon
                              </div>
                            )}
                          </div>
                          <div
                            className={`px-2.5 py-2 text-xs font-semibold whitespace-nowrap ${
                              isActive
                                ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {section.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {canScrollRight ? (
                    <button
                      type="button"
                      onClick={() => scrollThumbnails("right")}
                      className="shrink-0 h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                      aria-label="Scroll painting sections right"
                    >
                      ›
                    </button>
                  ) : null}
                </div>
              </div>

              {(isSeriesSection ? isSeriesRevealed : showNonSeriesContent) ? (
                <div
                  ref={paintingContentRef}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                >
                  <h4 className="text-2xl font-semibold mb-3">
                    {displayedTitle}
                  </h4>

                  {activeSection.comingSoon ? (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/25 dark:border-amber-700 p-4 text-sm">
                      {activeSection.label} is coming soon.
                    </div>
                  ) : (
                    <>
                      {activeSection.id === "dot-series" &&
                      showSeriesThumbnails["dot-series"] &&
                      activeSection.dotSeriesGroups ? (
                        <div className="mb-4 grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeSection.dotSeriesGroups.map((group) => {
                            const isGroupActive =
                              group.id === activeDotSeriesId;
                            return (
                              <button
                                key={group.id}
                                type="button"
                                onClick={() => {
                                  setActiveDotSeriesId(group.id);
                                  setLightboxIndex(0);
                                }}
                                className={`rounded-lg overflow-hidden border text-left transition-all ${
                                  isGroupActive
                                    ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                    : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                                }`}
                              >
                                <div className="relative">
                                  <img
                                    src={assetUrl(group.thumb)}
                                    alt={group.label}
                                    className="w-full aspect-square object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                                  {group.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {activeSection.id === "landscape-series" &&
                      showSeriesThumbnails["landscape-series"] &&
                      activeSection.landscapeSeriesGroups ? (
                        <div className="mb-4 grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeSection.landscapeSeriesGroups.map((group) => {
                            const isGroupActive =
                              group.id === activeLandscapeSeriesId;
                            return (
                              <button
                                key={group.id}
                                type="button"
                                onClick={() => {
                                  setActiveLandscapeSeriesId(group.id);
                                  setLightboxIndex(0);
                                }}
                                className={`rounded-lg overflow-hidden border text-left transition-all ${
                                  isGroupActive
                                    ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                    : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                                }`}
                              >
                                <div className="relative">
                                  <img
                                    src={assetUrl(group.thumb)}
                                    alt={group.label}
                                    className="w-full aspect-square object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                                  {group.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {activeSection.id === "square-signs" &&
                      showSeriesThumbnails["square-signs"] &&
                      activeSection.squareSignsGroups ? (
                        <div className="mb-4 grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeSection.squareSignsGroups.map((group) => {
                            const isGroupActive =
                              group.id === activeSquareSignsId;
                            return (
                              <button
                                key={group.id}
                                type="button"
                                onClick={() => {
                                  setActiveSquareSignsId(group.id);
                                  setLightboxIndex(0);
                                }}
                                className={`rounded-lg overflow-hidden border text-left transition-all ${
                                  isGroupActive
                                    ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                    : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                                }`}
                              >
                                <div className="relative">
                                  <img
                                    src={assetUrl(group.thumb)}
                                    alt={group.label}
                                    className="w-full aspect-square object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                                  {group.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {activeSection.id === "lettering" &&
                      showSeriesThumbnails.lettering &&
                      activeSection.letteringGroups ? (
                        <div className="mb-4 grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeSection.letteringGroups.map((group) => {
                            const isGroupActive =
                              group.id === activeLetteringId;
                            return (
                              <button
                                key={group.id}
                                type="button"
                                onClick={() => {
                                  setActiveLetteringId(group.id);
                                  setLightboxIndex(0);
                                }}
                                className={`rounded-lg overflow-hidden border text-left transition-all ${
                                  isGroupActive
                                    ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                    : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                                }`}
                              >
                                <div className="relative">
                                  <img
                                    src={assetUrl(group.thumb)}
                                    alt={group.label}
                                    className="w-full aspect-square object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                                  {group.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {activeSection.id !== "dot-series" &&
                      activeSection.id !== "landscape-series" &&
                      activeSection.id !== "square-signs" &&
                      activeSection.id !== "lettering" ? (
                        <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                          {displayedImages.map((image, index) => (
                            <button
                              key={`${activeSection.id}-${displayedTitle}-${image}`}
                              type="button"
                              onClick={() => setLightboxIndex(index)}
                              className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                            >
                              <div className="relative">
                                <img
                                  src={assetUrl(image)}
                                  alt={`${displayedTitle} ${index + 1}`}
                                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                              {activeSection.imageTitles?.[index] ? (
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
                                  {activeSection.imageTitles[index]}
                                </div>
                              ) : null}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* Print section */}
        <section className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => toggleSectionOpen("print")}
            className="w-full flex items-center justify-between mb-3"
            aria-expanded={openSections.print}
            aria-controls="portfolio-print-content"
          >
            <h3
              className={`text-lg md:text-xl font-semibold transition-colors ${
                openSections.print
                  ? "text-[#d49a35] dark:text-[#f2c86e]"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              Print
            </h3>
            <span
              className={`text-xl transition-transform ${
                openSections.print ? "rotate-0" : "-rotate-90"
              } text-[#d49a35] dark:text-[#f2c86e]`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openSections.print ? (
            <div id="portfolio-print-content">
              <div className="mb-5">
                <div className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2">
                  {printSections.map((ps) => {
                    const isActive = ps.id === activePrintSection.id;
                    return (
                      <button
                        key={ps.id}
                        type="button"
                        onClick={() => {
                          if (isActive && showPrintContent) {
                            setShowPrintContent(false);
                          } else {
                            setActivePrintSectionId(ps.id);
                            setShowPrintContent(true);
                          }
                        }}
                        className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                          isActive
                            ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                            : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                        }`}
                      >
                        <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {ps.thumb ? (
                            <img
                              src={assetUrl(ps.thumb)}
                              alt={ps.label}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                              Coming Soon
                            </div>
                          )}
                        </div>
                        <div
                          className={`px-2.5 py-2 text-xs font-semibold whitespace-nowrap ${
                            isActive
                              ? "text-[#7a4f00] dark:text-[#f4d78b]"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {ps.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              {showPrintContent ? (
                <div
                  ref={printContentRef}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                >
                  <h4 className="text-xl font-semibold mb-3">
                    {activePrintSection.label}
                  </h4>
                  {activePrintSection.comingSoon ? (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/25 dark:border-amber-700 p-4 text-sm">
                      {activePrintSection.label} is coming soon.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                      {activePrintSection.images.map((image, index) => (
                        <div
                          key={image}
                          className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <img
                            src={assetUrl(image)}
                            alt={`${activePrintSection.label} ${index + 1}`}
                            className="w-full aspect-square object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => toggleSectionOpen("photography")}
            className="w-full flex items-center justify-between mb-3"
            aria-expanded={openSections.photography}
            aria-controls="portfolio-photography-content"
          >
            <h3
              className={`text-lg md:text-xl font-semibold transition-colors ${
                openSections.photography
                  ? "text-[#d49a35] dark:text-[#f2c86e]"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              Photography
            </h3>
            <span
              className={`text-xl transition-transform ${
                openSections.photography ? "rotate-0" : "-rotate-90"
              } text-[#d49a35] dark:text-[#f2c86e]`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openSections.photography ? (
            <div id="portfolio-photography-content">
              <div className="mb-5">
                <div className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2">
                  {photographyGroups.map((group) => {
                    const isActive = group.id === activePhotographyGroup.id;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => {
                          if (isActive && showPhotographyContent) {
                            setShowPhotographyContent(false);
                          } else {
                            setActivePhotographyId(group.id);
                            setActivePhotographyFolderId(
                              group.folders?.[0]?.id || null,
                            );
                            setShowPhotographyContent(true);
                          }
                          closePhotographyLightbox();
                        }}
                        className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                          isActive
                            ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                            : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                        }`}
                      >
                        <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img
                            src={assetUrl(group.thumb)}
                            alt={group.label}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div
                          className={`px-2.5 py-2 text-xs font-semibold whitespace-nowrap ${
                            isActive
                              ? "text-[#7a4f00] dark:text-[#f4d78b]"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {group.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showPhotographyContent ? (
                <div
                  ref={photographyContentRef}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                >
                  <h4 className="text-xl font-semibold mb-3">
                    {displayedPhotographyTitle}
                  </h4>
                  {activePhotographyGroup.folders?.length ? (
                    <div className="mb-4 grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                      {activePhotographyGroup.folders.map((folder) => {
                        const isFolderActive =
                          folder.id === activePhotographyFolder?.id;
                        return (
                          <button
                            key={folder.id}
                            type="button"
                            onClick={() => {
                              setActivePhotographyFolderId(folder.id);
                              setPhotographyLightboxIndex(0);
                            }}
                            className={`group rounded-lg overflow-hidden border text-left transition-all ${
                              isFolderActive
                                ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                            }`}
                          >
                            <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <img
                                src={assetUrl(folder.thumb)}
                                alt={folder.label}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div
                              className={`px-2 py-1.5 text-xs font-semibold bg-white dark:bg-gray-900 ${
                                isFolderActive
                                  ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {folder.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  {!activePhotographyGroup.folders?.length ? (
                    <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                      {displayedPhotographyImages.map((image, index) => (
                        <button
                          key={`${activePhotographyGroup.id}-${displayedPhotographyTitle}-${image}`}
                          type="button"
                          onClick={() => setPhotographyLightboxIndex(index)}
                          className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                        >
                          <div className="relative">
                            <img
                              src={assetUrl(image)}
                              alt={`${displayedPhotographyTitle} ${index + 1}`}
                              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {otherPortfolioSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5"
          >
            <button
              type="button"
              onClick={() => toggleSectionOpen(section.id)}
              className="w-full flex items-center justify-between mb-3"
              aria-expanded={Boolean(openSections[section.id])}
              aria-controls={`portfolio-${section.id}-content`}
            >
              <h3
                className={`text-lg md:text-xl font-semibold transition-colors ${
                  openSections[section.id]
                    ? "text-[#d49a35] dark:text-[#f2c86e]"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {section.label}
              </h3>
              <span
                className={`text-xl transition-transform ${
                  openSections[section.id] ? "rotate-0" : "-rotate-90"
                } text-[#d49a35] dark:text-[#f2c86e]`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {openSections[section.id] ? (
              section.id === "illustrations" ? (
                <div id={`portfolio-${section.id}-content`}>
                  <div className="mb-5">
                    <div className="flex items-center gap-2">
                      {canIllustrationScrollLeft ? (
                        <button
                          type="button"
                          onClick={() => scrollIllustrationThumbnails("left")}
                          className="shrink-0 h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                          aria-label="Scroll illustrations left"
                        >
                          ‹
                        </button>
                      ) : null}
                      <div
                        ref={illustrationRailRef}
                        className="paintings-scrollbar grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2 scroll-smooth"
                      >
                        {illustrationGroups.map((group) => {
                          const isActive =
                            group.id === activeIllustrationGroup.id;
                          return (
                            <button
                              key={group.id}
                              type="button"
                              onClick={() => {
                                if (isActive && showIllustrationContent) {
                                  setShowIllustrationContent(false);
                                } else {
                                  setActiveIllustrationGroupId(group.id);
                                  setShowIllustrationContent(true);
                                }
                                closeIllustrationLightbox();
                              }}
                              className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                                isActive
                                  ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                  : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                              }`}
                            >
                              <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                  src={assetUrl(group.thumb)}
                                  alt={group.label}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div
                                className={`px-2.5 py-2 text-xs font-semibold whitespace-nowrap ${
                                  isActive
                                    ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                    : "text-gray-700 dark:text-gray-200"
                                }`}
                              >
                                {group.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {canIllustrationScrollRight ? (
                        <button
                          type="button"
                          onClick={() => scrollIllustrationThumbnails("right")}
                          className="shrink-0 h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                          aria-label="Scroll illustrations right"
                        >
                          ›
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {showIllustrationContent ? (
                    <div
                      ref={illustrationContentRef}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                    >
                      <h4 className="text-xl font-semibold mb-3">
                        {activeIllustrationGroup.label}
                      </h4>
                      <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                        {activeIllustrationGroup.images.map((image, index) => (
                          <button
                            key={`${activeIllustrationGroup.id}-${image}`}
                            type="button"
                            onClick={() => setIllustrationLightboxIndex(index)}
                            className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                          >
                            <div className="relative">
                              <img
                                src={assetUrl(image)}
                                alt={`${activeIllustrationGroup.label} ${index + 1}`}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : section.id === "website-coding" ? (
                <div id={`portfolio-${section.id}-content`}>
                  <div className="flex items-center gap-2">
                    {canWebsiteScrollLeft ? (
                      <button
                        type="button"
                        onClick={() => scrollWebsiteThumbnails("left")}
                        className="hidden min-[967px]:inline-flex shrink-0 h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                        aria-label="Scroll website and coding thumbnails left"
                      >
                        ‹
                      </button>
                    ) : null}

                    <div
                      ref={websiteRailRef}
                      className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:pb-1 paintings-scrollbar"
                    >
                      {websiteCodingProjects.map((project, index) => {
                        const isActive = project.id === activeWebsiteProjectId;
                        return (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() =>
                              setActiveWebsiteProjectId(project.id)
                            }
                            className={`group w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left overflow-hidden transition-all ${
                              isActive
                                ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                            }`}
                          >
                            <div className="relative bg-gray-100 dark:bg-gray-800">
                              <img
                                src={assetUrl(project.image)}
                                alt={project.label}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div
                              className={`px-2.5 py-2 text-xs font-semibold whitespace-nowrap ${
                                isActive
                                  ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {project.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {canWebsiteScrollRight ? (
                      <button
                        type="button"
                        onClick={() => scrollWebsiteThumbnails("right")}
                        className="hidden min-[967px]:inline-flex shrink-0 h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-[#d49a35] hover:text-[#d49a35]"
                        aria-label="Scroll website and coding thumbnails right"
                      >
                        ›
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : section.id === "collage-work" ? (
                <div
                  id={`portfolio-${section.id}-content`}
                  className="grid grid-cols-2 min-[967px]:grid-cols-4 gap-3"
                >
                  {collageWorkImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setCollageWorkLightboxIndex(index)}
                      className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                    >
                      <img
                        src={assetUrl(image)}
                        alt={`Collage Work ${index + 1}`}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              ) : section.id === "calligraphy-lettering" ? (
                <div id={`portfolio-${section.id}-content`}>
                  <div className="mb-5">
                    <div className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2 paintings-scrollbar scroll-smooth">
                      {calligraphyGroups.map((group) => {
                        const isActive = group.id === activeCalligraphyGroup.id;
                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              if (isActive && showCalligraphyContent) {
                                setShowCalligraphyContent(false);
                              } else {
                                setActiveCalligraphyGroupId(group.id);
                                setShowCalligraphyContent(true);
                              }
                              closeCalligraphyLightbox();
                            }}
                            className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                              isActive
                                ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                            }`}
                          >
                            <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <img
                                src={assetUrl(group.thumb)}
                                alt={group.label}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div
                              className={`px-2.5 py-2 text-xs font-semibold leading-tight break-words ${
                                isActive
                                  ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {group.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {showCalligraphyContent ? (
                    <div
                      ref={calligraphyContentRef}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                    >
                      <h4 className="text-xl font-semibold mb-3">
                        {activeCalligraphyGroup.label}
                      </h4>
                      <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                        {activeCalligraphyGroup.images.map((image, index) => (
                          <button
                            key={`${activeCalligraphyGroup.id}-${image}`}
                            type="button"
                            onClick={() => setCalligraphyLightboxIndex(index)}
                            className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                          >
                            <div className="relative">
                              <img
                                src={assetUrl(image)}
                                alt={`${activeCalligraphyGroup.label} ${index + 1}`}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : section.id === "collaborations" ? (
                <div id={`portfolio-${section.id}-content`}>
                  <div className="mb-5">
                    <div className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2 paintings-scrollbar scroll-smooth">
                      {collaborationGroups.map((group) => {
                        const isActive =
                          group.id === activeCollaborationGroup.id;
                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              if (isActive && showCollaborationContent) {
                                setShowCollaborationContent(false);
                              } else {
                                setActiveCollaborationGroupId(group.id);
                                setShowCollaborationContent(true);
                              }
                              closeCollaborationLightbox();
                            }}
                            className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                              isActive
                                ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                : "border-gray-200 dark:border-gray-700 hover:border-[#d49a35]/70"
                            }`}
                          >
                            <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <img
                                src={assetUrl(group.thumb)}
                                alt={group.label}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div
                              className={`px-2.5 py-2 text-xs font-semibold leading-tight break-words ${
                                isActive
                                  ? "text-[#7a4f00] dark:text-[#f4d78b]"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {group.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {showCollaborationContent ? (
                    <div
                      ref={collaborationContentRef}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                    >
                      <h4 className="text-xl font-semibold mb-3">
                        {activeCollaborationGroup.label}
                      </h4>
                      <div className="grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                        {activeCollaborationGroup.images.map((image, index) => (
                          <button
                            key={`${activeCollaborationGroup.id}-${image}`}
                            type="button"
                            onClick={() => setCollaborationLightboxIndex(index)}
                            className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                          >
                            <div className="relative">
                              <img
                                src={assetUrl(image)}
                                alt={`${activeCollaborationGroup.label} ${index + 1}`}
                                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : section.id === "ms-paint" ? (
                <div
                  id={`portfolio-${section.id}-content`}
                  className="columns-2 sm:columns-3 lg:columns-4 gap-3"
                >
                  {displayedMsPaintImages.map((image, index) => (
                    <button
                      key={`mspaint-${image}`}
                      type="button"
                      onClick={() => setMsPaintLightboxIndex(index)}
                      className="group mb-3 w-full break-inside-avoid overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-left"
                    >
                      <img
                        src={assetUrl(image)}
                        alt={`MS Paint ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </button>
                  ))}

                  {hasMoreMsPaintImages ? (
                    <div className="mt-3 flex items-center justify-center [column-span:all]">
                      <button
                        type="button"
                        onClick={loadMoreMsPaintImages}
                        disabled={isLoadingMoreMsPaint}
                        className="px-4 py-2 rounded-md border border-[#d49a35] text-[#7a4f00] dark:text-[#f4d78b] font-semibold text-sm hover:bg-[#f2c86e]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoadingMoreMsPaint ? "Loading more..." : "Load more"}
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div
                  id={`portfolio-${section.id}-content`}
                  className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/25 dark:border-amber-700 p-4 text-sm"
                >
                  {section.label} is coming soon.
                </div>
              )
            ) : null}
          </section>
        ))}
      </main>

      {lightboxIndex !== null && !activeSection.comingSoon && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Painting image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className=""
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) =>
              handleLightboxTouchStart(event, paintingTouchStartXRef)
            }
            onTouchEnd={(event) =>
              handleLightboxTouchEnd(
                event,
                paintingTouchStartXRef,
                prevImage,
                nextImage,
              )
            }
          >
            <img
              src={assetUrl(displayedImages[lightboxIndex])}
              alt={`${displayedTitle} large view`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      {photographyLightboxIndex !== null && activePhotographyGroup ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closePhotographyLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closePhotographyLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Photography image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevPhotographyImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className=""
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) =>
              handleLightboxTouchStart(event, photographyTouchStartXRef)
            }
            onTouchEnd={(event) =>
              handleLightboxTouchEnd(
                event,
                photographyTouchStartXRef,
                prevPhotographyImage,
                nextPhotographyImage,
              )
            }
          >
            <img
              src={assetUrl(
                displayedPhotographyImages[photographyLightboxIndex],
              )}
              alt={`${displayedPhotographyTitle} large view`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextPhotographyImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {msPaintLightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeMsPaintLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeMsPaintLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="MS Paint image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevMsPaintImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className=""
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) =>
              handleLightboxTouchStart(event, msPaintTouchStartXRef)
            }
            onTouchEnd={(event) =>
              handleLightboxTouchEnd(
                event,
                msPaintTouchStartXRef,
                prevMsPaintImage,
                nextMsPaintImage,
              )
            }
          >
            <img
              src={assetUrl(orderedMsPaintImages[msPaintLightboxIndex])}
              alt="MS Paint large view"
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextMsPaintImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {illustrationLightboxIndex !== null && activeIllustrationGroup ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeIllustrationLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeIllustrationLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Illustration image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevIllustrationImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className=""
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) =>
              handleLightboxTouchStart(event, illustrationTouchStartXRef)
            }
            onTouchEnd={(event) =>
              handleLightboxTouchEnd(
                event,
                illustrationTouchStartXRef,
                prevIllustrationImage,
                nextIllustrationImage,
              )
            }
          >
            <img
              src={assetUrl(
                activeIllustrationGroup.images[illustrationLightboxIndex],
              )}
              alt={`${activeIllustrationGroup.label} large view`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextIllustrationImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {collaborationLightboxIndex !== null && activeCollaborationGroup ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeCollaborationLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeCollaborationLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Collaboration image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevCollaborationImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className=""
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) =>
              handleLightboxTouchStart(event, collaborationTouchStartXRef)
            }
            onTouchEnd={(event) =>
              handleLightboxTouchEnd(
                event,
                collaborationTouchStartXRef,
                prevCollaborationImage,
                nextCollaborationImage,
              )
            }
          >
            <img
              src={assetUrl(
                activeCollaborationGroup.images[collaborationLightboxIndex],
              )}
              alt={`${activeCollaborationGroup.label} large view`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextCollaborationImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {websiteLightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeWebsiteLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeWebsiteLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Website / Coding image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevWebsiteImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="" onClick={(event) => event.stopPropagation()}>
            <img
              src={assetUrl(websiteCodingProjects[websiteLightboxIndex].image)}
              alt={websiteCodingProjects[websiteLightboxIndex].label}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextWebsiteImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {collageWorkLightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeCollageWorkLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeCollageWorkLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Collage Work image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevCollageWorkImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="" onClick={(event) => event.stopPropagation()}>
            <img
              src={assetUrl(collageWorkImages[collageWorkLightboxIndex])}
              alt={`Collage Work ${collageWorkLightboxIndex + 1}`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextCollageWorkImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}

      {calligraphyLightboxIndex !== null && activeCalligraphyGroup ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeCalligraphyLightbox}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) closeCalligraphyLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Calligraphy / Lettering image viewer"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prevCalligraphyImage();
            }}
            className="absolute left-2 sm:left-4 md:left-8 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="" onClick={(event) => event.stopPropagation()}>
            <img
              src={assetUrl(
                activeCalligraphyGroup.images[calligraphyLightboxIndex],
              )}
              alt={`${activeCalligraphyGroup.label} large view`}
              className="block max-h-[90dvh] max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-10rem)] rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextCalligraphyImage();
            }}
            className="absolute right-2 sm:right-4 md:right-8 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}

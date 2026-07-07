import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assets";
import { trackEvent } from "../utils/analytics";
import GalleryLightbox from "../components/GalleryLightbox";

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
    label: "From the archive",
    thumb: "/images/portfolio/paintings/aw/untitled_full.png",
    images: [
      "/images/portfolio/paintings/aw/untitled_full.png",
      "/images/portfolio/paintings/aw/untitled_right.jpeg",
      "/images/portfolio/paintings/aw/IMG_8362.jpeg",
      "/images/portfolio/paintings/color%20theory%20sequence/color_theory_sequence.jpg",
      "/images/portfolio/paintings/aw/IMG_8241.JPG",
      "/images/portfolio/paintings/aw/IMG_8267.JPG",
      "/images/portfolio/paintings/aw/IMG_8305.JPG",
      "/images/portfolio/paintings/aw/IMG_8319.jpeg",
      "/images/portfolio/paintings/aw/IMG_4222.JPG",
      "/images/portfolio/paintings/aw/IMG_5028.JPG",
      "/images/portfolio/paintings/aw/IMG_5068.JPG",
      "/images/portfolio/paintings/aw/IMG_5128.JPG",
      "/images/portfolio/paintings/aw/IMG_5803.JPG",
      "/images/portfolio/paintings/aw/IMG_5856.JPG",
      "/images/portfolio/paintings/aw/IMG_1395.JPG",
      "/images/portfolio/paintings/aw/front_1488.jpg",
      "/images/portfolio/paintings/aw/new.jpg",
      "/images/portfolio/paintings/aw/DSC01122.JPG",
      "/images/portfolio/paintings/aw/DSC01123.JPG",
      "/images/portfolio/paintings/aw/IMG_0041.JPG",
      "/images/portfolio/paintings/aw/IMG_0042.JPG",
      "/images/portfolio/paintings/aw/IMG_0043.JPG",
      "/images/portfolio/paintings/aw/Canvas_3.jpg",
      "/images/portfolio/paintings/aw/78.jpg",
      "/images/portfolio/paintings/aw/IMG_1321.JPG",
    ],
  },
];

const printSections = [
  {
    id: "clothing",
    label: "Clothing",
    comingSoon: true,
    thumb:
      "/images/portfolio/print/print%20feature%20section/thumbnail_images/tc_1a.jpg",
    images: [],
  },
  {
    id: "screenprint",
    label: "Screenprint",
    thumb:
      "/images/portfolio/print/print%20feature%20section/thumbnail_images/screenprint_thumb.jpeg",
    folders: [
      {
        id: "screenprint-canvas",
        label: "Canvas",
        thumb:
          "/images/portfolio/print/print%20feature%20section/screenprint/Canvas/IMG_1565.jpeg",
        images: [
          "/images/portfolio/print/print%20feature%20section/screenprint/Canvas/IMG_1565.jpeg",
        ],
      },
      {
        id: "screenprint-paper",
        label: "Paper",
        thumb:
          "/images/portfolio/print/print%20feature%20section/thumbnail_images/pp_1a.jpg",
        images: [
          "/images/portfolio/print/print%20feature%20section/screenprint/Paper/illustrativePrint_1.JPG",
          "/images/portfolio/print/print%20feature%20section/screenprint/Paper/illustrativePrint_2.JPG",
          "/images/portfolio/print/print%20feature%20section/screenprint/Paper/tp_1a.jpg",
          "/images/portfolio/print/print%20feature%20section/screenprint/Paper/ap_1a.jpg",
          "/images/portfolio/print/print%20feature%20section/screenprint/Paper/angalossy_pinkBlack.jpeg",
        ],
      },
    ],
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
          "/images/portfolio/photography/digital/color/IMG_0059.JPG",
          "/images/portfolio/photography/digital/color/IMG_0067.JPG",
          "/images/portfolio/photography/digital/color/IMG_0072.jpeg",
          "/images/portfolio/photography/digital/color/IMG_0187.jpeg",
          "/images/portfolio/photography/digital/color/IMG_0294.JPG",
          "/images/portfolio/photography/digital/color/IMG_0428.jpeg",
          "/images/portfolio/photography/digital/color/IMG_0730.JPG",
          "/images/portfolio/photography/digital/color/IMG_0754.jpeg",
          "/images/portfolio/photography/digital/color/IMG_0785.JPG",
          "/images/portfolio/photography/digital/color/IMG_0903.JPG",
          "/images/portfolio/photography/digital/color/IMG_1051.JPG",
          "/images/portfolio/photography/digital/color/IMG_1275.JPG",
          "/images/portfolio/photography/digital/color/IMG_1283.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1305.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1317.JPG",
          "/images/portfolio/photography/digital/color/IMG_1337.JPG",
          "/images/portfolio/photography/digital/color/IMG_1492.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1511.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1532.JPG",
          "/images/portfolio/photography/digital/color/IMG_1612.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1654.JPG",
          "/images/portfolio/photography/digital/color/IMG_1667.JPG",
          "/images/portfolio/photography/digital/color/IMG_1670.JPG",
          "/images/portfolio/photography/digital/color/IMG_1820.jpeg",
          "/images/portfolio/photography/digital/color/IMG_1838.JPG",
          "/images/portfolio/photography/digital/color/IMG_1849.jpeg",
          "/images/portfolio/photography/digital/color/IMG_2167.JPG",
          "/images/portfolio/photography/digital/color/IMG_2203.JPG",
          "/images/portfolio/photography/digital/color/IMG_2310.JPG",
          "/images/portfolio/photography/digital/color/IMG_2783.JPG",
          "/images/portfolio/photography/digital/color/IMG_2876.JPG",
          "/images/portfolio/photography/digital/color/IMG_2879.JPG",
          "/images/portfolio/photography/digital/color/IMG_2951.PNG",
          "/images/portfolio/photography/digital/color/IMG_2961.JPG",
          "/images/portfolio/photography/digital/color/IMG_3076.JPG",
          "/images/portfolio/photography/digital/color/IMG_3202.JPG",
          "/images/portfolio/photography/digital/color/IMG_3205.JPG",
          "/images/portfolio/photography/digital/color/IMG_3308.JPG",
          "/images/portfolio/photography/digital/color/IMG_3310.JPG",
          "/images/portfolio/photography/digital/color/IMG_3358.JPG",
          "/images/portfolio/photography/digital/color/IMG_3413.JPG",
          "/images/portfolio/photography/digital/color/IMG_3524.JPG",
          "/images/portfolio/photography/digital/color/IMG_3528.JPG",
          "/images/portfolio/photography/digital/color/IMG_3547.jpeg",
          "/images/portfolio/photography/digital/color/IMG_3555.JPG",
          "/images/portfolio/photography/digital/color/IMG_3568.JPG",
          "/images/portfolio/photography/digital/color/IMG_3569.JPG",
          "/images/portfolio/photography/digital/color/IMG_3613.JPG",
          "/images/portfolio/photography/digital/color/IMG_3626.JPG",
          "/images/portfolio/photography/digital/color/IMG_3760.JPG",
          "/images/portfolio/photography/digital/color/IMG_3762.JPG",
          "/images/portfolio/photography/digital/color/IMG_3763.JPG",
          "/images/portfolio/photography/digital/color/IMG_3764.JPG",
          "/images/portfolio/photography/digital/color/IMG_3944.JPG",
          "/images/portfolio/photography/digital/color/IMG_3954.JPG",
          "/images/portfolio/photography/digital/color/IMG_3958.JPG",
          "/images/portfolio/photography/digital/color/IMG_4288.JPG",
          "/images/portfolio/photography/digital/color/IMG_4289.JPG",
          "/images/portfolio/photography/digital/color/IMG_4314.JPG",
          "/images/portfolio/photography/digital/color/IMG_4460.JPG",
          "/images/portfolio/photography/digital/color/IMG_4597.JPG",
          "/images/portfolio/photography/digital/color/IMG_5071.JPG",
          "/images/portfolio/photography/digital/color/IMG_5094.JPG",
          "/images/portfolio/photography/digital/color/IMG_5163.JPG",
          "/images/portfolio/photography/digital/color/IMG_5195.JPG",
          "/images/portfolio/photography/digital/color/IMG_5403.JPG",
          "/images/portfolio/photography/digital/color/IMG_5442.JPG",
          "/images/portfolio/photography/digital/color/IMG_5478.JPG",
          "/images/portfolio/photography/digital/color/IMG_5503.JPG",
          "/images/portfolio/photography/digital/color/IMG_5672.JPG",
          "/images/portfolio/photography/digital/color/IMG_5773.JPG",
          "/images/portfolio/photography/digital/color/IMG_5796.JPG",
          "/images/portfolio/photography/digital/color/IMG_5878.JPG",
          "/images/portfolio/photography/digital/color/IMG_5881.JPG",
          "/images/portfolio/photography/digital/color/IMG_5893.JPG",
          "/images/portfolio/photography/digital/color/IMG_5935.JPG",
          "/images/portfolio/photography/digital/color/IMG_5987.JPG",
          "/images/portfolio/photography/digital/color/IMG_6005.JPG",
          "/images/portfolio/photography/digital/color/IMG_6092.JPG",
          "/images/portfolio/photography/digital/color/IMG_6243.JPG",
          "/images/portfolio/photography/digital/color/IMG_6253.JPG",
          "/images/portfolio/photography/digital/color/IMG_6409.JPG",
          "/images/portfolio/photography/digital/color/IMG_6483.JPG",
          "/images/portfolio/photography/digital/color/IMG_6799.JPG",
          "/images/portfolio/photography/digital/color/IMG_6818.JPG",
          "/images/portfolio/photography/digital/color/IMG_6826.JPG",
          "/images/portfolio/photography/digital/color/IMG_6869.JPG",
          "/images/portfolio/photography/digital/color/IMG_6875.JPG",
          "/images/portfolio/photography/digital/color/IMG_6925.JPG",
          "/images/portfolio/photography/digital/color/IMG_6931.JPG",
          "/images/portfolio/photography/digital/color/IMG_7056.JPG",
          "/images/portfolio/photography/digital/color/IMG_7187.JPG",
          "/images/portfolio/photography/digital/color/IMG_7289.JPG",
          "/images/portfolio/photography/digital/color/IMG_7311.JPG",
          "/images/portfolio/photography/digital/color/IMG_7563.JPG",
          "/images/portfolio/photography/digital/color/IMG_8254.JPG",
          "/images/portfolio/photography/digital/color/IMG_8261.JPG",
          "/images/portfolio/photography/digital/color/IMG_8326.JPG",
          "/images/portfolio/photography/digital/color/IMG_8346.JPG",
          "/images/portfolio/photography/digital/color/IMG_8550.JPG",
        ],
      },
      {
        id: "digital-bw",
        label: "B/W",
        thumb:
          "/images/portfolio/photography/photography%20feature%20section/bw_1a.jpg",
        images: [
          "/images/portfolio/photography/digital/bw/4193244551_b855b55275_o.jpg",
          "/images/portfolio/photography/digital/bw/4193244935_11a4240255_o.jpg",
          "/images/portfolio/photography/digital/bw/IMG_3067.jpeg",
          "/images/portfolio/photography/digital/bw/IMG_3086.jpeg",
          "/images/portfolio/photography/digital/bw/IMG_3088.jpeg",
          "/images/portfolio/photography/digital/bw/IMG_3323.JPG",
          "/images/portfolio/photography/digital/bw/IMG_4491.JPG",
          "/images/portfolio/photography/digital/bw/IMG_5454.JPG",
          "/images/portfolio/photography/digital/bw/IMG_5717.JPG",
          "/images/portfolio/photography/digital/bw/IMG_6498.JPG",
          "/images/portfolio/photography/digital/bw/IMG_7051.JPG",
          "/images/portfolio/photography/digital/bw/IMG_7217.jpeg",
          "/images/portfolio/photography/digital/bw/IMG_8297.jpeg",
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
        thumb:
          "https://artdept-portfolio-test.s3.us-east-1.amazonaws.com/images/portfolio/photography/analog/color/IMG_3916.JPG",
        images: [
          "/images/portfolio/photography/analog/color/5129249167_d2bc29d517_o.jpg",
          "/images/portfolio/photography/analog/color/8135445159_9af2e1297d_o.jpg",
          "/images/portfolio/photography/analog/color/IMG_2825.JPG",
          "/images/portfolio/photography/analog/color/IMG_2826.JPG",
          "/images/portfolio/photography/analog/color/IMG_3916.JPG",
          "/images/portfolio/photography/analog/color/IMG_3917.JPG",
          "/images/portfolio/photography/analog/color/IMG_5943.JPG",
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
      "/images/portfolio/photography/cameras/IMG_0431.JPG",
      "/images/portfolio/photography/cameras/IMG_0549.JPG",
      "/images/portfolio/photography/cameras/IMG_0550.JPG",
      "/images/portfolio/photography/cameras/IMG_0551.JPG",
      "/images/portfolio/photography/cameras/IMG_3086.JPG",
      "/images/portfolio/photography/cameras/IMG_3771.JPG",
      "/images/portfolio/photography/cameras/IMG_4384.JPG",
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
  "/images/portfolio/mspaint/BEAST.bmp",
  "/images/portfolio/mspaint/HELLETH.bmp",
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
  "/images/portfolio/mspaint/JANITOR.bmp",
  "/images/portfolio/mspaint/LANDYAY.bmp",
  "/images/portfolio/mspaint/RAWK.bmp",
  "/images/portfolio/mspaint/baby2.bmp",
  "/images/portfolio/mspaint/butcher.bmp",
  "/images/portfolio/mspaint/dontYou.png",
  "/images/portfolio/mspaint/fat.bmp",
  "/images/portfolio/mspaint/janet.png",
];

const msPaintPriorityImages = [
  "/images/portfolio/mspaint/IMG_5087.PNG",
  "/images/portfolio/mspaint/IMG_3690.PNG",
  "/images/portfolio/mspaint/IMG_1270.PNG",
  "/images/portfolio/mspaint/dontYou.png",
  "/images/portfolio/mspaint/IMG_4656.PNG",
  "/images/portfolio/mspaint/IMG_3262.PNG",
  "/images/portfolio/mspaint/IMG_1784.PNG",
  "/images/portfolio/mspaint/IMG_5092.PNG",
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

const msPaintTileBackgrounds = [
  "bg-[#fde2e4] dark:bg-[#4a2b33]",
  "bg-[#dff4ff] dark:bg-[#1f3643]",
  "bg-[#fff1c7] dark:bg-[#4a3d1f]",
  "bg-[#e7f6df] dark:bg-[#253c2a]",
  "bg-[#efe7ff] dark:bg-[#2f2843]",
  "bg-[#ffe7cf] dark:bg-[#4a3223]",
  "bg-[#d9f6f2] dark:bg-[#1f3e3b]",
  "bg-[#f9e3f6] dark:bg-[#482d45]",
  "bg-[#e7ecff] dark:bg-[#273150]",
];

const getMsPaintTileBackgroundClass = (index) =>
  msPaintTileBackgrounds[(index * 7) % msPaintTileBackgrounds.length];

const MS_PAINT_BATCH_SIZE = 16;
const SECTION_BATCH_SIZE = 20;

const collaborationGroups = [
  {
    id: "op-characters",
    label: "Cooper Diers: Ordinary Pals",
    thumb:
      "/images/portfolio/collaboration/ordinary%20pals/dudes/Char%2003.jpeg",
    images: [
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_3077.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_3078.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_3079.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_3080.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_3081.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_9321.jpeg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_9375.jpeg",
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
      "/images/portfolio/collaboration/ordinary%20pals/dudes/art_show_2.jpg",
      "/images/portfolio/collaboration/ordinary%20pals/dudes/IMG_0033.jpg",
    ],
  },
];

const websiteCodingProjects = [
  {
    id: "na",
    label: "Neurotech Analysis",
    image: "/images/portfolio/website/na/1_AnalysisHomePage.jpg",
    images: [
      "/images/portfolio/website/na/1_AnalysisHomePage.jpg",
      "/images/portfolio/website/na/2_AnalysisLoggedIn.jpg",
      "/images/portfolio/website/na/3_AnalysisPatientVolumeEstimator.jpg",
    ],
  },
  {
    id: "revere",
    label: "Revere - Neurotech",
    image: "/images/portfolio/website/revere/1_RevereLogon.jpg",
    images: [
      "/images/portfolio/website/revere/1_RevereLogon.jpg",
      "/images/portfolio/website/revere/2_RevereOrders.jpg",
      "/images/portfolio/website/revere/3_RevereMonitoringLogOptions.jpg",
      "/images/portfolio/website/revere/4_RevereEditMonitoringLogOption.jpg",
    ],
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

const rabbitHoleImageGroups = {
  shirts: [
    "/images/portfolio/rabbitHole/shirts/4163332707_de007801dc_o.png",
    "/images/portfolio/rabbitHole/shirts/4163335303_e15850e704_o.png",
    "/images/portfolio/rabbitHole/shirts/4163374501_e1f11f3135_o.png",
    "/images/portfolio/rabbitHole/shirts/4163376755_dd9c8b72e4_o.png",
    "/images/portfolio/rabbitHole/shirts/4163404267_ed58aa53a1_o.png",
    "/images/portfolio/rabbitHole/shirts/4163406737_edbdc6c751_o.png",
    "/images/portfolio/rabbitHole/shirts/4163413847_273bf12360_o.png",
    "/images/portfolio/rabbitHole/shirts/4163420305_e9f80a2a53_o.png",
    "/images/portfolio/rabbitHole/shirts/4163427187_e7914b0798_o.png",
    "/images/portfolio/rabbitHole/shirts/4163434717_f33aabfd9e_o.png",
    "/images/portfolio/rabbitHole/shirts/4163437641_223322feb8_o.png",
    "/images/portfolio/rabbitHole/shirts/4163467621_97279048ca_o.png",
    "/images/portfolio/rabbitHole/shirts/4163471551_2e82ac64f7_o.png",
    "/images/portfolio/rabbitHole/shirts/4163474273_c56c551e72_o.png",
    "/images/portfolio/rabbitHole/shirts/4163478149_e7b05fd482_o.png",
    "/images/portfolio/rabbitHole/shirts/4163491773_6c46de78d1_o.png",
    "/images/portfolio/rabbitHole/shirts/4163492573_28f8df3112_o.png",
    "/images/portfolio/rabbitHole/shirts/4163493565_7bc07d3052_o.png",
    "/images/portfolio/rabbitHole/shirts/4163495283_078a326a28_o.png",
    "/images/portfolio/rabbitHole/shirts/4163495695_373721e375_o.png",
    "/images/portfolio/rabbitHole/shirts/4163496895_8c40bd22b0_o.png",
    "/images/portfolio/rabbitHole/shirts/4163498143_6e2f7856b4_o.png",
    "/images/portfolio/rabbitHole/shirts/4163500583_53a0fdaa3b_o.png",
    "/images/portfolio/rabbitHole/shirts/4163502383_c06596901d_o.png",
    "/images/portfolio/rabbitHole/shirts/4164088928_177886379f_o.png",
    "/images/portfolio/rabbitHole/shirts/4164098598_2778e038f1_o.png",
    "/images/portfolio/rabbitHole/shirts/4164115029_c79969644e_o.png",
    "/images/portfolio/rabbitHole/shirts/4164115823_820365129b_o.png",
    "/images/portfolio/rabbitHole/shirts/4164117205_0747f57872_o.png",
    "/images/portfolio/rabbitHole/shirts/4164117589_56424e1f60_o.png",
    "/images/portfolio/rabbitHole/shirts/4164117925_0d9b73a98b_o.png",
    "/images/portfolio/rabbitHole/shirts/4164118385_2e4c496c0f_o.png",
    "/images/portfolio/rabbitHole/shirts/4164119359_1036e24762_o.png",
    "/images/portfolio/rabbitHole/shirts/4164120261_9bc85d4480_o.png",
    "/images/portfolio/rabbitHole/shirts/4164120765_4e57cb5375_o.png",
    "/images/portfolio/rabbitHole/shirts/4164121639_94349bd2d1_o.png",
    "/images/portfolio/rabbitHole/shirts/4164122689_76b1711612_o.png",
    "/images/portfolio/rabbitHole/shirts/4164123263_abb1a4f0d6_o.png",
    "/images/portfolio/rabbitHole/shirts/4164124021_80ee161f59_o.png",
    "/images/portfolio/rabbitHole/shirts/4164126880_8708ec0121_o.png",
    "/images/portfolio/rabbitHole/shirts/4164129854_e3b4414312_o.png",
    "/images/portfolio/rabbitHole/shirts/4164130485_932c547ba4_o.png",
    "/images/portfolio/rabbitHole/shirts/4164132036_6af60b68c3_o.png",
    "/images/portfolio/rabbitHole/shirts/4164132545_c3bd4445f4_o.png",
    "/images/portfolio/rabbitHole/shirts/4164139184_1d8d2a7057_o.png",
    "/images/portfolio/rabbitHole/shirts/4164141542_9c5b984331_o.png",
    "/images/portfolio/rabbitHole/shirts/4164143896_c14772b7b5_o.png",
    "/images/portfolio/rabbitHole/shirts/4164169128_aaac8d227c_o.png",
    "/images/portfolio/rabbitHole/shirts/4164171562_e944b28824_o.png",
    "/images/portfolio/rabbitHole/shirts/4164177322_358d7b5c37_o.png",
    "/images/portfolio/rabbitHole/shirts/4164192084_92ac62e9c5_o.png",
    "/images/portfolio/rabbitHole/shirts/4164222314_8ba24e33d9_o.png",
    "/images/portfolio/rabbitHole/shirts/4164224740_932e1bcc63_o.png",
    "/images/portfolio/rabbitHole/shirts/4164254270_294936acff_o.png",
    "/images/portfolio/rabbitHole/shirts/4164256608_db96bc49c4_o.png",
    "/images/portfolio/rabbitHole/shirts/4164257740_9bb86e9454_o.png",
    "/images/portfolio/rabbitHole/shirts/4164259476_b0285cdd3b_o.png",
    "/images/portfolio/rabbitHole/shirts/4164260182_4b41f6a59d_o.png",
    "/images/portfolio/rabbitHole/shirts/4164261524_e29e0fda57_o.png",
    "/images/portfolio/rabbitHole/shirts/4164262098_e8d67175c5_o.png",
    "/images/portfolio/rabbitHole/shirts/4164873352_8705e4e8e7_o.png",
    "/images/portfolio/rabbitHole/shirts/4164873976_b6ccced5e7_o.png",
    "/images/portfolio/rabbitHole/shirts/4164875788_2b8b553dac_o.png",
    "/images/portfolio/rabbitHole/shirts/4164876796_2044e25bdb_o.png",
    "/images/portfolio/rabbitHole/shirts/4164883784_c5664442d9_o.png",
    "/images/portfolio/rabbitHole/shirts/4164884568_ed79062b3b_o.png",
    "/images/portfolio/rabbitHole/shirts/4164886494_fa71b22718_o.png",
    "/images/portfolio/rabbitHole/shirts/4164886846_07b258a452_o.png",
    "/images/portfolio/rabbitHole/shirts/4164888190_36208bbffa_o.png",
    "/images/portfolio/rabbitHole/shirts/4164888710_d6d7b7890a_o.png",
    "/images/portfolio/rabbitHole/shirts/IMG_0411.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0415.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0420.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0877.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0884.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0889.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_0891.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_1067.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_2839.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_3127.jpeg",
    "/images/portfolio/rabbitHole/shirts/IMG_3131.jpeg",
  ],
  ticketStubs: [
    "/images/portfolio/rabbitHole/ticketStubs/09583599-9CCE-4A14-A048-406D1B56B58F.jpg",
    "/images/portfolio/rabbitHole/ticketStubs/IMG_1485.jpeg",
    "/images/portfolio/rabbitHole/ticketStubs/IMG_1486.jpeg",
    "/images/portfolio/rabbitHole/ticketStubs/IMG_1500.jpeg",
  ],
  other: [
    "/images/portfolio/rabbitHole/Other/IMG_0258.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_0259.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_0260.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_0691.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_0692.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_1293.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_3129.jpeg",
    "/images/portfolio/rabbitHole/Other/IMG_4380.JPG",
    "/images/portfolio/rabbitHole/Other/IMG_7084.JPG",
  ],
};

const rabbitHoleProjects = [
  {
    id: "random-albers",
    label: "Random Albers",
    href: "/random-albers/index.html",
  },
  {
    id: "t-shirts",
    label: "T-shirt Collection",
    thumb: "/images/portfolio/rabbitHole/shirts/4164129854_e3b4414312_o.png",
    images: rabbitHoleImageGroups.shirts,
    blurb:
      "I didn't design these — just sharing shirts from my personal collection over the years. Band tees, skate brands, random finds. More of a documentation than a portfolio.",
  },
  {
    id: "cooking",
    label: "Cooking",
    thumb: "/images/portfolio/rabbitHole/Cooking/IMG_0094.jpeg",
    images: [
      "/images/portfolio/rabbitHole/Cooking/59364947612__A8A4669C-29CF-4639-BD1B-CD8AFB55EE35.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_0094.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0096.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0097.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0416.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0513.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0514.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0522.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0534.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0537.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0543.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0545.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0574.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0576.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0648.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_0998.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1048.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1049.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1101.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1102.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1104.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1123.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1194.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1295.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1510.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1604.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_1640.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1890.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1896.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1898.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1900.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_1902.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_2092.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_3049.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_3084.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_3538.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_3539.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_3574.jpeg",
      "/images/portfolio/rabbitHole/Cooking/IMG_4063.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4385.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4503.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4504.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4517.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4695.PNG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4946.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_4947.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_5062.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_5363.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_5397.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_5885.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_5957.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_6014.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_6074.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_6804.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_6805.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_6898.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_7066.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_7088.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_7477.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_7478.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_8022.JPG",
      "/images/portfolio/rabbitHole/Cooking/IMG_8251.JPG",
    ],
  },
  {
    id: "concert-tickets-events",
    label: "Concert tickets & local show souvenirs",
    blurb:
      "A collection of concert tickets and local show souvenirs from growing up. I am not the designer of any content, flyers, or photography shown — with the exception of the Franklin Legion Hall flyer.",
    thumb: "/images/portfolio/rabbitHole/ticketStubs/IMG_1485.jpeg",
    images: rabbitHoleImageGroups.ticketStubs,
  },
  {
    id: "other",
    label: "Wayback machine",
    thumb: "/images/portfolio/rabbitHole/Other/IMG_7084.JPG",
    images: rabbitHoleImageGroups.other,
  },
];

const collageWorkImages = ["/images/collageWork/canvas/IMG_5803.JPG"];

const letteringCalligraphyGroups = [
  {
    id: "digital-lettering",
    label: "Digital Lettering",
    thumb:
      "/images/letteringCalligraphy/digitalLettering/Screenshot%202026-04-24%20at%203.23.17%E2%80%AFPM.png",
    images: [
      "/images/letteringCalligraphy/digitalLettering/IMG_1065.JPG",
      "/images/letteringCalligraphy/digitalLettering/IMG_1693.JPG",
      "/images/letteringCalligraphy/digitalLettering/angalossyr4.1.jpg",
      "/images/letteringCalligraphy/digitalLettering/IMG_7114.PNG",
    ],
  },
  {
    id: "artwork-within-reach",
    label: "Artwork Within Reach",
    thumb:
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/awr_nelson_thumbnail.JPG",
    images: [
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1164.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1167.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1169.jpeg",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_1171.jpeg",
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
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_4583.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6121.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6267.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6417.PNG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6493.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6539.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6788.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_6881.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8044.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8079.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8080.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8097.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8105.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8106.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8223.JPG",
      "/images/letteringCalligraphy/Artwork%20Within%20Reach/IMG_8225.JPG",
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
    id: "blackbook-art",
    label: "Blackbook",
    thumb: "/images/letteringCalligraphy/blackbook/IMG_1511.jpeg",
    images: [
      "/images/letteringCalligraphy/blackbook/03C94B52-1C5F-4E01-B7A5-4A968143B169.jpg",
      "/images/letteringCalligraphy/blackbook/5107931381_e4a8a06e0b_o.jpg",
      "/images/letteringCalligraphy/blackbook/IMG_0712.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0841.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0930.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0977.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0981.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0988.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_0999.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1001.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1002.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1005.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1044.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_1105.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1119.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1138.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1429.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1430.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1504.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1508.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1509.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_1511.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_2047.jpeg",
      "/images/letteringCalligraphy/blackbook/IMG_2307.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3001.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3007.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3015.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3072.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3074.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3120.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3644.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_3729.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4321.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4379.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4382.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4406.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4523.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4530.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4533.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4589.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4593.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4634.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_4691.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5041.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5042.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5105.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5106.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5114.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5120.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5228.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5388.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5434.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5450.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5492.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5497.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5498.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5500.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5503.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5570.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5740.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5759.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_5874.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_6039.JPG",
      "/images/letteringCalligraphy/blackbook/IMG_8184.JPG",
    ],
  },
  {
    id: "calligraphy",
    label: "Calligraphy",
    thumb: "/images/letteringCalligraphy/traditionalCal/IMG_1589.jpeg",
    images: [
      "/images/letteringCalligraphy/traditionalCal/IMG_1589.jpeg",
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
    id: "digital",
    label: "Digital",
    thumb: "/images/portfolio/Illustrations/digitialIllustrations/IMG_5718.JPG",
    images: [
      "/images/portfolio/Illustrations/digitialIllustrations/IMG_5712.JPG",
      "/images/portfolio/Illustrations/digitialIllustrations/IMG_1245.JPG",
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
      "/images/portfolio/Illustrations/digitialIllustrations/Tom_Zack.jpg",
      "/images/portfolio/Illustrations/digitialIllustrations/wearethepeople.jpg",
    ],
  },
  {
    id: "black-book",
    label: "Blackbook Art",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/bbi_1a.jpg",
    images: [
      "/images/portfolio/Illustrations/blackbookArt/bbi_1a.jpg",
      "/images/portfolio/Illustrations/blackbookArt/4480798602_7cf8a9c0d7_o.jpg",
      "/images/portfolio/Illustrations/blackbookArt/4488032681_05d3cbf0ac_o.jpg",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0080.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0108.jpeg",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0151.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0176.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0258.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0526.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0627.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0683.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0836.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_0940.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_2292.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_2545.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_2955.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_2956.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_3365.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_4646.PNG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_5767.PNG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_5868.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_5875.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_6028.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_6046.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_7087.JPG",
      "/images/portfolio/Illustrations/blackbookArt/IMG_7539.JPG",
    ],
  },
  {
    id: "mock-roadside-signage",
    label: "Mock Roadside Signage",
    thumb:
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1600.JPG",
    images: [
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/motel_signs.jpg",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1600.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1579.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1588.JPG",
      "/images/portfolio/Illustrations/Mock%20Roadside%20Signage/IMG_1601.JPG",
    ],
  },
  {
    id: "mixed",
    label: "Mixed",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/mmi_1a.jpg",
    images: [
      "/images/portfolio/Illustrations/mixed/mmi_1a.jpg",
      "/images/portfolio/Illustrations/mixed/also.jpg",
    ],
  },
  {
    id: "cdt",
    label: "Common Daily Thoughts",
    thumb: "/images/portfolio/Illustrations/cdtIll/1.jpg",
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
    id: "patterns",
    label: "Patterns",
    thumb:
      "/images/portfolio/Illustrations/illustrations%20feature%20section/pi_1a.jpg",
    images: [
      "/images/portfolio/Illustrations/patterns/gp_patterns_1.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2019.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2020.jpeg",
      "/images/portfolio/Illustrations/patterns/IMG_2021.jpeg",
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
      "/images/portfolio/Illustrations/patterns/IMG_2899.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_2934.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_2935.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_2957.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_2958.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_2997.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3003.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3004.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3005.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3192.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3193.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_3248.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_4441.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_5664.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_5665.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_6375.JPG",
      "/images/portfolio/Illustrations/patterns/IMG_0963.jpeg",
    ],
  },
  {
    id: "graffiter",
    label: "Graffiter",
    thumb: "/images/portfolio/Illustrations/Graffiter/IMG_0909.JPG",
    images: [
      "/images/portfolio/Illustrations/Graffiter/IMG_0909.JPG",
      "/images/portfolio/Illustrations/Graffiter/IMG_0918.PNG",
      "/images/portfolio/Illustrations/Graffiter/IMG_0923.JPG",
      "/images/portfolio/Illustrations/Graffiter/IMG_2018.JPG",
      "/images/portfolio/Illustrations/Graffiter/IMG_3354.JPG",
      "/images/portfolio/Illustrations/Graffiter/Screen Shot 2020-02-09 at 10.42.53 PM.png",
      "/images/portfolio/Illustrations/Graffiter/Screen Shot 2020-03-10 at 7.13.28 AM.png",
    ],
  },
];

const otherPortfolioSections = [
  {
    id: "illustrations",
    label: "Illustration",
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
    label: "Web",
    comingSoon: false,
    images: [],
  },
  {
    id: "collaborations",
    label: "Collaborations",
    comingSoon: false,
    images: [],
  },
  {
    id: "lettering-calligraphy",
    label: "Lettering / Calligraphy",
    comingSoon: false,
    images: [],
  },
  { id: "collage-work", label: "Collage", comingSoon: true, images: [] },
  { id: "furniture", label: "Furniture", comingSoon: true, images: [] },
  { id: "junk-drawer", label: "Rabbit hole", comingSoon: false, images: [] },
];

export default function Portfolio({ onBreadcrumbChange }) {
  // State for active painting section
  const [activeSectionId, setActiveSectionId] = useState(
    paintingSections[0].id,
  );
  // Determine the currently active painting section
  const activeSection = useMemo(
    () =>
      paintingSections.find((section) => section.id === activeSectionId) ||
      paintingSections[0],
    [activeSectionId],
  );
  const location = useLocation();
  const paintingLightboxOverlayRef = useRef(null);
  const thumbnailRailRef = useRef(null);
  const websiteRailRef = useRef(null);
  const paintingContentRef = useRef(null);
  const printContentRef = useRef(null);
  const photographyContentRef = useRef(null);
  const illustrationContentRef = useRef(null);
  const calligraphyContentRef = useRef(null);
  const collaborationContentRef = useRef(null);
  const paintingTouchStartXRef = useRef(null);
  const printTouchStartXRef = useRef(null);
  const photographyTouchStartXRef = useRef(null);
  const msPaintTouchStartXRef = useRef(null);
  const illustrationTouchStartXRef = useRef(null);
  const illustrationRailRef = useRef(null);
  const collaborationTouchStartXRef = useRef(null);
  const rabbitHoleTouchStartXRef = useRef(null);
  const rabbitHoleIframeRefs = useRef({});
  const portfolioHeaderRef = useRef(null);
  const swipeThreshold = 40;
  // (duplicate removed above)
  const [showStickyBreadcrumb, setShowStickyBreadcrumb] = useState(false);
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
  const [activePrintFolderId, setActivePrintFolderId] = useState(null);
  const [showPrintContent, setShowPrintContent] = useState(false);
  const [printLightboxIndex, setPrintLightboxIndex] = useState(null);
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
  const [visiblePhotographyCount, setVisiblePhotographyCount] =
    useState(SECTION_BATCH_SIZE);
  const [isLoadingMorePhotography, setIsLoadingMorePhotography] =
    useState(false);
  const [visibleIllustrationCount, setVisibleIllustrationCount] =
    useState(SECTION_BATCH_SIZE);
  const [isLoadingMoreIllustration, setIsLoadingMoreIllustration] =
    useState(false);
  const [
    visibleLetteringCalligraphyCount,
    setVisibleLetteringCalligraphyCount,
  ] = useState(SECTION_BATCH_SIZE);
  const [
    isLoadingMoreLetteringCalligraphy,
    setIsLoadingMoreLetteringCalligraphy,
  ] = useState(false);
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
  const [websiteSubImages, setWebsiteSubImages] = useState(null);
  const [websiteSubLightboxIndex, setWebsiteSubLightboxIndex] = useState(null);
  const [activeWebsiteProjectId, setActiveWebsiteProjectId] = useState(
    websiteCodingProjects[0].id,
  );
  const [canWebsiteScrollLeft, setCanWebsiteScrollLeft] = useState(false);
  const [canWebsiteScrollRight, setCanWebsiteScrollRight] = useState(false);
  const [collageWorkLightboxIndex, setCollageWorkLightboxIndex] =
    useState(null);
  const [
    activeLetteringCalligraphyGroupId,
    setActiveLetteringCalligraphyGroupId,
  ] = useState(letteringCalligraphyGroups[0].id);
  const [showLetteringCalligraphyContent, setShowLetteringCalligraphyContent] =
    useState(false);
  const [
    letteringCalligraphyLightboxIndex,
    setLetteringCalligraphyLightboxIndex,
  ] = useState(null);
  const [rabbitHoleLightboxIndex, setRabbitHoleLightboxIndex] = useState(null);
  const [activeRabbitHoleProjectId, setActiveRabbitHoleProjectId] =
    useState(null);
  const [selectedRabbitHoleCardId, setSelectedRabbitHoleCardId] =
    useState(null);
  const [openSections, setOpenSections] = useState(() => ({
    painting: false,
    print: false,
    photography: false,
    ...Object.fromEntries(
      otherPortfolioSections.map((section) => [section.id, false]),
    ),
  }));

  // ...existing code...

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

  const activePrintFolder = useMemo(() => {
    if (!activePrintSection.folders?.length) return null;
    return (
      activePrintSection.folders.find((f) => f.id === activePrintFolderId) ||
      activePrintSection.folders[0]
    );
  }, [activePrintSection, activePrintFolderId]);

  const displayedPrintImages = activePrintFolder
    ? activePrintFolder.images
    : activePrintSection.images || [];

  const displayedPrintTitle = activePrintFolder
    ? `${activePrintSection.label} - ${activePrintFolder.label}`
    : activePrintSection.label;

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

  const activeLetteringCalligraphyGroup = useMemo(
    () =>
      letteringCalligraphyGroups.find(
        (group) => group.id === activeLetteringCalligraphyGroupId,
      ) || letteringCalligraphyGroups[0],
    [activeLetteringCalligraphyGroupId],
  );

  const activeRabbitHoleProject = useMemo(() => {
    if (!activeRabbitHoleProjectId) return null;
    return (
      rabbitHoleProjects.find(
        (project) => project.id === activeRabbitHoleProjectId,
      ) || null
    );
  }, [activeRabbitHoleProjectId]);

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
  const paintingGalleryImages = displayedImages || [];
  const websiteGalleryImages = websiteCodingProjects.map(
    (project) => project.image,
  );

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
  const isAnyLightboxOpen =
    lightboxIndex !== null ||
    printLightboxIndex !== null ||
    photographyLightboxIndex !== null ||
    msPaintLightboxIndex !== null ||
    illustrationLightboxIndex !== null ||
    collaborationLightboxIndex !== null ||
    websiteLightboxIndex !== null ||
    websiteSubLightboxIndex !== null ||
    collageWorkLightboxIndex !== null ||
    letteringCalligraphyLightboxIndex !== null ||
    rabbitHoleLightboxIndex !== null;

  const sectionOrder = useMemo(
    () => [
      "painting",
      "print",
      "photography",
      ...otherPortfolioSections.map((section) => section.id),
    ],
    [],
  );

  const sectionLabelMap = useMemo(
    () => ({
      painting: "Painting",
      print: "Print",
      photography: "Photography",
      ...Object.fromEntries(
        otherPortfolioSections.map((section) => [section.id, section.label]),
      ),
    }),
    [],
  );

  const activeTopSectionId = useMemo(
    () => sectionOrder.find((sectionId) => openSections[sectionId]),
    [openSections, sectionOrder],
  );

  const activeTopSectionLabel = activeTopSectionId
    ? sectionLabelMap[activeTopSectionId] || "Portfolio"
    : "Overview";

  const activeSubSectionLabel = useMemo(() => {
    if (!activeTopSectionId) return null;

    if (activeTopSectionId === "painting") return displayedTitle;
    if (activeTopSectionId === "print") return displayedPrintTitle;
    if (activeTopSectionId === "photography") return displayedPhotographyTitle;
    if (activeTopSectionId === "illustrations")
      return activeIllustrationGroup?.label || null;
    if (activeTopSectionId === "collaborations")
      return activeCollaborationGroup?.label || null;
    if (activeTopSectionId === "calligraphy-lettering")
      return activeLetteringCalligraphyGroup?.label || null;
    if (activeTopSectionId === "website-coding") {
      const currentProject = websiteCodingProjects.find(
        (project) => project.id === activeWebsiteProjectId,
      );
      return currentProject?.label || null;
    }

    return null;
  }, [
    activeTopSectionId,
    displayedTitle,
    displayedPrintTitle,
    displayedPhotographyTitle,
    activeIllustrationGroup,
    activeCollaborationGroup,
    activeLetteringCalligraphyGroup,
    activeWebsiteProjectId,
  ]);

  useEffect(() => {
    const el = portfolioHeaderRef.current;
    if (!el) return;
    // rootMargin matches the actual sticky navbar height per breakpoint:
    // mobile (<768px): single nav row ~60px
    // md+ (tablet/desktop): nav row + toggle bar ~109px
    const getNavHeight = () => (window.innerWidth >= 768 ? 109 : 60);
    const buildObserver = () => {
      const margin = `-${getNavHeight()}px 0px 0px 0px`;
      const observer = new IntersectionObserver(
        ([entry]) => setShowStickyBreadcrumb(!entry.isIntersecting),
        { threshold: 0, rootMargin: margin },
      );
      observer.observe(el);
      return observer;
    };
    let observer = buildObserver();
    const onResize = () => {
      observer.disconnect();
      observer = buildObserver();
    };
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Publish breadcrumb text into the Navbar toggle bar (desktop) via App state.
  // On mobile/tablet the sticky subnav handles it instead.
  useEffect(() => {
    if (!onBreadcrumbChange) return;
    if (!showStickyBreadcrumb) {
      onBreadcrumbChange(null);
      return;
    }
    let text = "Portfolio";
    if (activeTopSectionId) {
      text += ` / ${activeTopSectionLabel}`;
      if (activeSubSectionLabel) text += ` / ${activeSubSectionLabel}`;
    }
    onBreadcrumbChange(text);
  }, [
    showStickyBreadcrumb,
    activeTopSectionId,
    activeTopSectionLabel,
    activeSubSectionLabel,
    onBreadcrumbChange,
  ]);

  // Clear breadcrumb in Navbar when navigating away from Portfolio
  useEffect(() => {
    return () => {
      if (onBreadcrumbChange) onBreadcrumbChange(null);
    };
  }, [onBreadcrumbChange]);

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

  const closePrintLightbox = () => setPrintLightboxIndex(null);
  const nextPrintImage = () => {
    if (printLightboxIndex === null || !displayedPrintImages.length) return;
    setPrintLightboxIndex(
      (printLightboxIndex + 1) % displayedPrintImages.length,
    );
  };
  const prevPrintImage = () => {
    if (printLightboxIndex === null || !displayedPrintImages.length) return;
    setPrintLightboxIndex(
      (printLightboxIndex - 1 + displayedPrintImages.length) %
        displayedPrintImages.length,
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
  const closeWebsiteSubLightbox = () => {
    setWebsiteSubLightboxIndex(null);
    setWebsiteSubImages(null);
  };
  const handleWebsiteProjectClick = (project, index) => {
    setActiveWebsiteProjectId(project.id);
    trackEvent("website_project_view", {
      project_id: project.id,
      project_label: project.label,
    });
    if (project.images) {
      setWebsiteSubImages(project.images);
      setWebsiteSubLightboxIndex(0);
    } else {
      setWebsiteLightboxIndex(index);
    }
  };

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
  const nextWebsiteSubImage = () => {
    if (websiteSubLightboxIndex === null || !websiteSubImages) return;
    setWebsiteSubLightboxIndex(
      (websiteSubLightboxIndex + 1) % websiteSubImages.length,
    );
  };
  const prevWebsiteSubImage = () => {
    if (websiteSubLightboxIndex === null || !websiteSubImages) return;
    setWebsiteSubLightboxIndex(
      (websiteSubLightboxIndex - 1 + websiteSubImages.length) %
        websiteSubImages.length,
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

  const closeCalligraphyLightbox = () =>
    setLetteringCalligraphyLightboxIndex(null);
  const nextCalligraphyImage = () => {
    if (
      letteringCalligraphyLightboxIndex === null ||
      !activeLetteringCalligraphyGroup.images.length
    )
      return;
    setLetteringCalligraphyLightboxIndex(
      (letteringCalligraphyLightboxIndex + 1) %
        activeLetteringCalligraphyGroup.images.length,
    );
  };
  const prevCalligraphyImage = () => {
    if (
      letteringCalligraphyLightboxIndex === null ||
      !activeLetteringCalligraphyGroup.images.length
    )
      return;
    setLetteringCalligraphyLightboxIndex(
      (letteringCalligraphyLightboxIndex -
        1 +
        activeLetteringCalligraphyGroup.images.length) %
        activeLetteringCalligraphyGroup.images.length,
    );
  };

  const openRabbitHoleGallery = (project, index = 0) => {
    if (!project?.images?.length) return;
    setActiveRabbitHoleProjectId(project.id);
    setRabbitHoleLightboxIndex(index);
  };

  const closeRabbitHoleLightbox = () => {
    setRabbitHoleLightboxIndex(null);
    setActiveRabbitHoleProjectId(null);
  };

  const nextRabbitHoleImage = () => {
    const imageCount = activeRabbitHoleProject?.images?.length || 0;
    if (rabbitHoleLightboxIndex === null || !imageCount) return;
    setRabbitHoleLightboxIndex((rabbitHoleLightboxIndex + 1) % imageCount);
  };

  const prevRabbitHoleImage = () => {
    const imageCount = activeRabbitHoleProject?.images?.length || 0;
    if (rabbitHoleLightboxIndex === null || !imageCount) return;
    setRabbitHoleLightboxIndex(
      (rabbitHoleLightboxIndex - 1 + imageCount) % imageCount,
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

  const loadMorePhotographyImages = () => {
    if (isLoadingMorePhotography) return;
    setIsLoadingMorePhotography(true);
    window.setTimeout(() => {
      setVisiblePhotographyCount((prev) =>
        Math.min(prev + SECTION_BATCH_SIZE, displayedPhotographyImages.length),
      );
      setIsLoadingMorePhotography(false);
    }, 300);
  };

  const loadMoreIllustrationImages = () => {
    if (isLoadingMoreIllustration) return;
    setIsLoadingMoreIllustration(true);
    window.setTimeout(() => {
      setVisibleIllustrationCount((prev) =>
        Math.min(
          prev + SECTION_BATCH_SIZE,
          activeIllustrationGroup.images.length,
        ),
      );
      setIsLoadingMoreIllustration(false);
    }, 300);
  };

  const loadMoreLetteringCalligraphyImages = () => {
    if (isLoadingMoreLetteringCalligraphy) return;
    setIsLoadingMoreLetteringCalligraphy(true);
    window.setTimeout(() => {
      setVisibleLetteringCalligraphyCount((prev) =>
        Math.min(
          prev + SECTION_BATCH_SIZE,
          activeLetteringCalligraphyGroup.images.length,
        ),
      );
      setIsLoadingMoreLetteringCalligraphy(false);
    }, 300);
  };

  useEffect(() => {
    setVisiblePhotographyCount(SECTION_BATCH_SIZE);
  }, [activePhotographyId, activePhotographyFolderId]);

  useEffect(() => {
    setVisibleIllustrationCount(SECTION_BATCH_SIZE);
  }, [activeIllustrationGroupId]);

  useEffect(() => {
    setVisibleLetteringCalligraphyCount(SECTION_BATCH_SIZE);
  }, [activeLetteringCalligraphyGroupId]);

  const toggleSectionOpen = (sectionId) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = prev[sectionId];
      const willOpen = !isCurrentlyOpen;
      // Close all sections, then open the clicked one (unless it was already open)
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      if (willOpen) {
        trackEvent("portfolio_section_open", { section: sectionId });
        requestAnimationFrame(() => {
          const el = document.getElementById(`portfolio-section-${sectionId}`);
          if (el) {
            const navHeight = window.innerWidth >= 768 ? 109 : 62;
            const offset =
              el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        });
      }
      return { ...allClosed, [sectionId]: willOpen };
    });
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
    const detachFns = [];

    const attachIframeSelectionHandlers = (projectId, iframeEl) => {
      if (!iframeEl) return;

      const bindDocumentHandlers = () => {
        try {
          const doc =
            iframeEl.contentDocument || iframeEl.contentWindow?.document;
          if (!doc) return;

          const selectCard = () => setSelectedRabbitHoleCardId(projectId);
          doc.addEventListener("pointerdown", selectCard, { passive: true });
          doc.addEventListener("touchstart", selectCard, { passive: true });
          doc.addEventListener("mousedown", selectCard);

          detachFns.push(() => {
            doc.removeEventListener("pointerdown", selectCard);
            doc.removeEventListener("touchstart", selectCard);
            doc.removeEventListener("mousedown", selectCard);
          });
        } catch {
          // Ignore cross-document access issues.
        }
      };

      const onLoad = () => bindDocumentHandlers();
      iframeEl.addEventListener("load", onLoad);
      detachFns.push(() => iframeEl.removeEventListener("load", onLoad));

      bindDocumentHandlers();
    };

    Object.entries(rabbitHoleIframeRefs.current).forEach(
      ([projectId, iframeEl]) => {
        attachIframeSelectionHandlers(projectId, iframeEl);
      },
    );

    return () => {
      detachFns.forEach((fn) => fn());
    };
  }, []);

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
    const sectionMap = {
      "#ms-paint": "ms-paint",
      "#collaborations": "collaborations",
      "#junk-drawer": "junk-drawer",
    };
    const targetId = sectionMap[location.hash];
    if (!targetId) return;

    setOpenSections((prev) => ({
      ...prev,
      [targetId]: true,
    }));

    setTimeout(() => {
      const target =
        document.getElementById(`portfolio-section-${targetId}`) ||
        document.getElementById(targetId);
      if (!target) return;
      const navHeight = window.innerWidth >= 768 ? 109 : 110;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }, 150);
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
        block: "start",
      });
    });
  }, [activeSectionId, showNonSeriesContent, showSeriesThumbnails]);

  useEffect(() => {
    if (!showPrintContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      printContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showPrintContent]);

  useEffect(() => {
    if (!showPhotographyContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      photographyContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showPhotographyContent]);

  useEffect(() => {
    if (!showIllustrationContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      illustrationContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showIllustrationContent]);

  useEffect(() => {
    if (!showLetteringCalligraphyContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      calligraphyContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showLetteringCalligraphyContent]);

  useEffect(() => {
    if (!showCollaborationContent || window.innerWidth >= 967) return;
    requestAnimationFrame(() => {
      collaborationContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [showCollaborationContent]);

  useEffect(() => {
    if (!isAnyLightboxOpen) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      paintingLightboxOverlayRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [
    isAnyLightboxOpen,
    lightboxIndex,
    printLightboxIndex,
    photographyLightboxIndex,
    msPaintLightboxIndex,
    illustrationLightboxIndex,
    collaborationLightboxIndex,
    websiteLightboxIndex,
    websiteSubLightboxIndex,
    collageWorkLightboxIndex,
    letteringCalligraphyLightboxIndex,
  ]);

  useEffect(() => {
    if (!isAnyLightboxOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscroll;
    };
  }, [isAnyLightboxOpen]);

  return (
    <>
      {/* Sticky breadcrumb subnav — mobile & tablet only (md:hidden). Desktop uses the Navbar toggle bar instead. */}
      {/* top-[60px] clears the single-row mobile navbar */}
      <div
        aria-hidden={!showStickyBreadcrumb}
        className="md:hidden sticky top-[62px] z-40 w-full h-[44px] flex items-end justify-center pb-2.5 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        style={{
          opacity: showStickyBreadcrumb ? 1 : 0,
          transform: showStickyBreadcrumb
            ? "translateY(0)"
            : "translateY(-6px)",
          pointerEvents: showStickyBreadcrumb ? "auto" : "none",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-center">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff4000] dark:text-[#6cebe4] font-semibold truncate text-center leading-none">
            Portfolio
            {activeTopSectionId ? (
              <>
                <span className="mx-1.5 opacity-40">/</span>
                {activeTopSectionLabel}
              </>
            ) : null}
            {activeSubSectionLabel ? (
              <>
                <span className="mx-1.5 opacity-40">/</span>
                {activeSubSectionLabel}
              </>
            ) : null}
          </p>
        </div>
      </div>

      <main className="fade-in container mx-auto px-6 pt-4 pb-6 md:p-6">
        <header className="mb-3 md:mb-6" ref={portfolioHeaderRef}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Portfolio</h1>
        </header>
        <section
          id="portfolio-section-painting"
          className={`rounded-xl border bg-white dark:bg-gray-900 p-4 sm:p-5 transition-colors ${
            openSections.painting
              ? "border-[#d49a35] dark:border-[#f2c86e]"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
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
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                >
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
                        <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
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

        {/* Illustrations section */}
        <section
          id="portfolio-section-illustrations"
          className={`mt-6 rounded-xl border bg-white dark:bg-gray-900 p-4 sm:p-5 transition-colors ${
            openSections["illustrations"]
              ? "border-[#d49a35] dark:border-[#f2c86e]"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <button
            type="button"
            onClick={() => toggleSectionOpen("illustrations")}
            className="w-full flex items-center justify-between mb-3"
            aria-expanded={Boolean(openSections["illustrations"])}
            aria-controls="portfolio-illustrations-content"
          >
            <h3
              className={`text-lg md:text-xl font-semibold transition-colors ${
                openSections["illustrations"]
                  ? "text-[#d49a35] dark:text-[#f2c86e]"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              Illustration
            </h3>
            <span
              className={`text-xl transition-transform ${
                openSections["illustrations"] ? "rotate-0" : "-rotate-90"
              } text-[#d49a35] dark:text-[#f2c86e]`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openSections["illustrations"] ? (
            <div id="portfolio-illustrations-content">
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
                      const isActive = group.id === activeIllustrationGroup.id;
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
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                >
                  <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                    {activeIllustrationGroup.images
                      .slice(0, visibleIllustrationCount)
                      .map((image, index) => (
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
                    {visibleIllustrationCount <
                    activeIllustrationGroup.images.length ? (
                      <div className="col-span-full mt-3 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={loadMoreIllustrationImages}
                          disabled={isLoadingMoreIllustration}
                          className="px-4 py-2 rounded-md border border-[#d49a35] text-[#7a4f00] dark:text-[#f4d78b] font-semibold text-sm hover:bg-[#f2c86e]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isLoadingMoreIllustration
                            ? "Loading more..."
                            : "Load more"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* Print section */}
        <section
          id="portfolio-section-print"
          className={`mt-6 rounded-xl border bg-white dark:bg-gray-900 p-4 sm:p-5 transition-colors ${
            openSections.print
              ? "border-[#d49a35] dark:border-[#f2c86e]"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
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
                            setActivePrintFolderId(ps.folders?.[0]?.id || null);
                            setPrintLightboxIndex(null);
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
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                >
                  {activePrintSection.comingSoon ? (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/25 dark:border-amber-700 p-4 text-sm">
                      {activePrintSection.label} is coming soon.
                    </div>
                  ) : activePrintSection.folders?.length ? (
                    <>
                      <div className="mb-4 grid grid-cols-2 min-[967px]:grid-cols-5 gap-3">
                        {activePrintSection.folders.map((folder) => {
                          const isFolderActive =
                            folder.id === activePrintFolder?.id;
                          return (
                            <button
                              key={folder.id}
                              type="button"
                              onClick={() => {
                                setActivePrintFolderId(folder.id);
                                setPrintLightboxIndex(null);
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
                      {activePrintFolder ? (
                        <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activePrintFolder.images.map((image, index) => (
                            <button
                              key={image}
                              type="button"
                              onClick={() => setPrintLightboxIndex(index)}
                              className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                              <img
                                src={assetUrl(image)}
                                alt={`${activePrintFolder.label} ${index + 1}`}
                                className="w-full aspect-square object-cover"
                                loading="lazy"
                              />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                      {activePrintSection.images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setPrintLightboxIndex(index)}
                          className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <img
                            src={assetUrl(image)}
                            alt={`${activePrintSection.label} ${index + 1}`}
                            className="w-full aspect-square object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* Photography section */}
        <section
          id="portfolio-section-photography"
          className={`mt-6 rounded-xl border bg-white dark:bg-gray-900 p-4 sm:p-5 transition-colors ${
            openSections.photography
              ? "border-[#d49a35] dark:border-[#f2c86e]"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
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
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                >
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
                    <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                      {displayedPhotographyImages
                        .slice(0, visiblePhotographyCount)
                        .map((image, index) => (
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
                      {visiblePhotographyCount <
                      displayedPhotographyImages.length ? (
                        <div className="col-span-full mt-3 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={loadMorePhotographyImages}
                            disabled={isLoadingMorePhotography}
                            className="px-4 py-2 rounded-md border border-[#d49a35] text-[#7a4f00] dark:text-[#f4d78b] font-semibold text-sm hover:bg-[#f2c86e]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isLoadingMorePhotography
                              ? "Loading more..."
                              : "Load more"}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {otherPortfolioSections
          .filter((s) => s.id !== "illustrations")
          .map((section) => (
            <section
              key={section.id}
              id={`portfolio-section-${section.id}`}
              className={`mt-6 rounded-xl border bg-white dark:bg-gray-900 p-4 sm:p-5 transition-colors ${
                openSections[section.id]
                  ? "border-[#d49a35] dark:border-[#f2c86e]"
                  : "border-gray-200 dark:border-gray-700"
              }`}
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
                            onClick={() =>
                              scrollIllustrationThumbnails("right")
                            }
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
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                      >
                        <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeIllustrationGroup.images
                            .slice(0, visibleIllustrationCount)
                            .map((image, index) => (
                              <button
                                key={`${activeIllustrationGroup.id}-${image}`}
                                type="button"
                                onClick={() =>
                                  setIllustrationLightboxIndex(index)
                                }
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
                          {visibleIllustrationCount <
                          activeIllustrationGroup.images.length ? (
                            <div className="col-span-full mt-3 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={loadMoreIllustrationImages}
                                disabled={isLoadingMoreIllustration}
                                className="px-4 py-2 rounded-md border border-[#d49a35] text-[#7a4f00] dark:text-[#f4d78b] font-semibold text-sm hover:bg-[#f2c86e]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                {isLoadingMoreIllustration
                                  ? "Loading more..."
                                  : "Load more"}
                              </button>
                            </div>
                          ) : null}
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
                          const isActive =
                            project.id === activeWebsiteProjectId;
                          return (
                            <button
                              key={project.id}
                              type="button"
                              onClick={() =>
                                handleWebsiteProjectClick(project, index)
                              }
                              className={`group w-full min-[967px]:w-48 min-[967px]:shrink-0 rounded-lg border text-left overflow-hidden transition-all ${
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
                ) : section.id === "junk-drawer" ? (
                  <div id={`portfolio-${section.id}-content`}>
                    <div className="grid w-full grid-cols-1 gap-4 min-[769px]:grid-cols-2">
                      {rabbitHoleProjects.map((project) => {
                        const isSelected =
                          selectedRabbitHoleCardId === project.id;
                        return (
                          <div
                            key={project.id}
                            onClick={() => {
                              setSelectedRabbitHoleCardId(project.id);
                              if (!project.href) {
                                openRabbitHoleGallery(project, 0);
                              }
                            }}
                            className={`group w-full min-[967px]:max-w-[30rem] rounded-lg border text-left overflow-hidden transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#d49a35] ring-1 ring-[#f2c86e] bg-[#f2c86e]/25"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-[#d49a35]/70"
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden">
                              {project.href ? (
                                <iframe
                                  ref={(node) => {
                                    if (node) {
                                      rabbitHoleIframeRefs.current[project.id] =
                                        node;
                                    } else {
                                      delete rabbitHoleIframeRefs.current[
                                        project.id
                                      ];
                                    }
                                  }}
                                  onPointerDown={() =>
                                    setSelectedRabbitHoleCardId(project.id)
                                  }
                                  onTouchStart={() =>
                                    setSelectedRabbitHoleCardId(project.id)
                                  }
                                  src={project.href}
                                  title={`${project.label} app`}
                                  className="h-[160%] w-[160%] origin-top-left scale-[0.64] sm:h-[152%] sm:w-[152%] sm:scale-[0.66] md:h-[144%] md:w-[144%] md:scale-[0.69] lg:h-[138%] lg:w-[138%] lg:scale-[0.72] bg-transparent"
                                  loading="lazy"
                                />
                              ) : project.thumb ? (
                                <img
                                  src={assetUrl(project.thumb)}
                                  alt={project.label}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Coming Soon
                                  </p>
                                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                    {project.label}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="px-2.5 py-2 text-xs font-semibold whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {project.label}
                            </div>
                            {project.href || project.blurb ? (
                              <div className="mx-2.5 mb-2 rounded-md border border-gray-300/80 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-2.5 py-2">
                                <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
                                  {project.blurb ? (
                                    project.blurb
                                  ) : (
                                    <>
                                      A simple app and a nod to Josef Albers'
                                      <span className="italic">
                                        {" "}
                                        Homage to the Square
                                      </span>
                                      . Click the square and a random color
                                      combination is generated. It is very
                                      unlikely to recreate the exact same colors
                                      again unless the app is refreshed.
                                    </>
                                  )}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : section.id === "lettering-calligraphy" ? (
                  <div id={`portfolio-${section.id}-content`}>
                    <div className="mb-5">
                      <div className="grid w-full grid-cols-2 gap-3 min-[967px]:flex min-[967px]:gap-3 min-[967px]:overflow-x-auto min-[967px]:py-2 paintings-scrollbar scroll-smooth">
                        {letteringCalligraphyGroups.map((group) => {
                          const isActive =
                            group.id === activeLetteringCalligraphyGroup.id;
                          return (
                            <button
                              key={group.id}
                              type="button"
                              onClick={() => {
                                if (
                                  isActive &&
                                  showLetteringCalligraphyContent
                                ) {
                                  setShowLetteringCalligraphyContent(false);
                                } else {
                                  setActiveLetteringCalligraphyGroupId(
                                    group.id,
                                  );
                                  setShowLetteringCalligraphyContent(true);
                                }
                              }}
                              className={`w-full min-[967px]:w-40 min-[967px]:shrink-0 rounded-lg border text-left transition-all ${
                                isActive && showLetteringCalligraphyContent
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
                                  isActive && showLetteringCalligraphyContent
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

                    {showLetteringCalligraphyContent ? (
                      <div
                        ref={calligraphyContentRef}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                      >
                        <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeLetteringCalligraphyGroup.images
                            .slice(0, visibleLetteringCalligraphyCount)
                            .map((image, index) => (
                              <button
                                key={`${activeLetteringCalligraphyGroup.id}-${image}`}
                                type="button"
                                onClick={() =>
                                  setLetteringCalligraphyLightboxIndex(index)
                                }
                                className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left"
                              >
                                <div className="relative">
                                  <img
                                    src={assetUrl(image)}
                                    alt={`${activeLetteringCalligraphyGroup.label} ${index + 1}`}
                                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                              </button>
                            ))}
                          {visibleLetteringCalligraphyCount <
                          activeLetteringCalligraphyGroup.images.length ? (
                            <div className="col-span-full mt-3 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={loadMoreLetteringCalligraphyImages}
                                disabled={isLoadingMoreLetteringCalligraphy}
                                className="px-4 py-2 rounded-md border border-[#d49a35] text-[#7a4f00] dark:text-[#f4d78b] font-semibold text-sm hover:bg-[#f2c86e]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                {isLoadingMoreLetteringCalligraphy
                                  ? "Loading more..."
                                  : "Load more"}
                              </button>
                            </div>
                          ) : null}
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
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 scroll-mt-32 lg:scroll-mt-48"
                      >
                        <div className="grid grid-cols-1 min-[967px]:grid-cols-5 gap-3">
                          {activeCollaborationGroup.images.map(
                            (image, index) => (
                              <button
                                key={`${activeCollaborationGroup.id}-${image}`}
                                type="button"
                                onClick={() =>
                                  setCollaborationLightboxIndex(index)
                                }
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
                            ),
                          )}
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
                        className={`group mb-3 w-full break-inside-avoid overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 text-left ${getMsPaintTileBackgroundClass(
                          index,
                        )}`}
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
                          {isLoadingMoreMsPaint
                            ? "Loading more..."
                            : "Load more"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div
                    id={`portfolio-${section.id}-content`}
                    className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/25 dark:border-amber-700 p-4 text-sm"
                  >
                    Coming soon
                  </div>
                )
              ) : null}
            </section>
          ))}
      </main>

      <GalleryLightbox
        isOpen={lightboxIndex !== null && !activeSection.comingSoon}
        images={paintingGalleryImages}
        activeIndex={lightboxIndex}
        title={displayedTitle}
        viewerAriaLabel="Painting image viewer"
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
        onSelectIndex={setLightboxIndex}
        getImageAlt={(index) => `${displayedTitle} large view ${index + 1}`}
        overlayRef={paintingLightboxOverlayRef}
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, paintingTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            paintingTouchStartXRef,
            prevImage,
            nextImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={printLightboxIndex !== null && !activePrintSection.comingSoon}
        images={displayedPrintImages}
        activeIndex={printLightboxIndex}
        title={displayedPrintTitle}
        viewerAriaLabel="Print image viewer"
        onClose={closePrintLightbox}
        onPrev={prevPrintImage}
        onNext={nextPrintImage}
        onSelectIndex={setPrintLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${displayedPrintTitle} large view ${index + 1}`
        }
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, printTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            printTouchStartXRef,
            prevPrintImage,
            nextPrintImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={photographyLightboxIndex !== null && activePhotographyGroup}
        images={displayedPhotographyImages}
        activeIndex={photographyLightboxIndex}
        title={displayedPhotographyTitle}
        viewerAriaLabel="Photography image viewer"
        onClose={closePhotographyLightbox}
        onPrev={prevPhotographyImage}
        onNext={nextPhotographyImage}
        onSelectIndex={setPhotographyLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${displayedPhotographyTitle} large view ${index + 1}`
        }
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, photographyTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            photographyTouchStartXRef,
            prevPhotographyImage,
            nextPhotographyImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={msPaintLightboxIndex !== null}
        images={orderedMsPaintImages}
        activeIndex={msPaintLightboxIndex}
        title="MS Paint"
        viewerAriaLabel="MS Paint image viewer"
        onClose={closeMsPaintLightbox}
        onPrev={prevMsPaintImage}
        onNext={nextMsPaintImage}
        onSelectIndex={setMsPaintLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) => `MS Paint large view ${index + 1}`}
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, msPaintTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            msPaintTouchStartXRef,
            prevMsPaintImage,
            nextMsPaintImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={illustrationLightboxIndex !== null && activeIllustrationGroup}
        images={activeIllustrationGroup?.images || []}
        activeIndex={illustrationLightboxIndex}
        title={activeIllustrationGroup?.label || "Illustration"}
        viewerAriaLabel="Illustration image viewer"
        onClose={closeIllustrationLightbox}
        onPrev={prevIllustrationImage}
        onNext={nextIllustrationImage}
        onSelectIndex={setIllustrationLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${activeIllustrationGroup?.label || "Illustration"} large view ${index + 1}`
        }
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, illustrationTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            illustrationTouchStartXRef,
            prevIllustrationImage,
            nextIllustrationImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={collaborationLightboxIndex !== null && activeCollaborationGroup}
        images={activeCollaborationGroup?.images || []}
        activeIndex={collaborationLightboxIndex}
        title={activeCollaborationGroup?.label || "Collaboration"}
        viewerAriaLabel="Collaboration image viewer"
        onClose={closeCollaborationLightbox}
        onPrev={prevCollaborationImage}
        onNext={nextCollaborationImage}
        onSelectIndex={setCollaborationLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${activeCollaborationGroup?.label || "Collaboration"} large view ${index + 1}`
        }
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, collaborationTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            collaborationTouchStartXRef,
            prevCollaborationImage,
            nextCollaborationImage,
          )
        }
      />

      <GalleryLightbox
        isOpen={websiteLightboxIndex !== null}
        images={websiteGalleryImages}
        activeIndex={websiteLightboxIndex}
        title="Website / Coding"
        viewerAriaLabel="Website / Coding image viewer"
        onClose={closeWebsiteLightbox}
        onPrev={prevWebsiteImage}
        onNext={nextWebsiteImage}
        onSelectIndex={setWebsiteLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          websiteCodingProjects[index]?.label || `Website / Coding ${index + 1}`
        }
      />

      <GalleryLightbox
        isOpen={websiteSubLightboxIndex !== null}
        images={websiteSubImages || []}
        activeIndex={websiteSubLightboxIndex}
        title={
          websiteCodingProjects.find((p) => p.id === activeWebsiteProjectId)
            ?.label || "Website"
        }
        viewerAriaLabel="Website project image viewer"
        onClose={closeWebsiteSubLightbox}
        onPrev={prevWebsiteSubImage}
        onNext={nextWebsiteSubImage}
        onSelectIndex={setWebsiteSubLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) => {
          const project = websiteCodingProjects.find(
            (p) => p.id === activeWebsiteProjectId,
          );
          return `${project?.label || "Website"} ${index + 1}`;
        }}
      />

      <GalleryLightbox
        isOpen={collageWorkLightboxIndex !== null}
        images={collageWorkImages}
        activeIndex={collageWorkLightboxIndex}
        title="Collage Work"
        viewerAriaLabel="Collage Work image viewer"
        onClose={closeCollageWorkLightbox}
        onPrev={prevCollageWorkImage}
        onNext={nextCollageWorkImage}
        onSelectIndex={setCollageWorkLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) => `Collage Work ${index + 1}`}
      />

      <GalleryLightbox
        isOpen={
          letteringCalligraphyLightboxIndex !== null &&
          activeLetteringCalligraphyGroup
        }
        images={activeLetteringCalligraphyGroup?.images || []}
        activeIndex={letteringCalligraphyLightboxIndex}
        title={
          activeLetteringCalligraphyGroup?.label || "Calligraphy / Lettering"
        }
        viewerAriaLabel="Calligraphy / Lettering image viewer"
        onClose={closeCalligraphyLightbox}
        onPrev={prevCalligraphyImage}
        onNext={nextCalligraphyImage}
        onSelectIndex={setLetteringCalligraphyLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${activeLetteringCalligraphyGroup?.label || "Calligraphy / Lettering"} large view ${index + 1}`
        }
      />

      <GalleryLightbox
        isOpen={rabbitHoleLightboxIndex !== null && activeRabbitHoleProject}
        images={activeRabbitHoleProject?.images || []}
        activeIndex={rabbitHoleLightboxIndex}
        title={activeRabbitHoleProject?.label || "Rabbit Hole"}
        viewerAriaLabel="Rabbit Hole image viewer"
        onClose={closeRabbitHoleLightbox}
        onPrev={prevRabbitHoleImage}
        onNext={nextRabbitHoleImage}
        onSelectIndex={setRabbitHoleLightboxIndex}
        overlayRef={paintingLightboxOverlayRef}
        getImageAlt={(index) =>
          `${activeRabbitHoleProject?.label || "Rabbit Hole"} large view ${index + 1}`
        }
        onContentTouchStart={(event) =>
          handleLightboxTouchStart(event, rabbitHoleTouchStartXRef)
        }
        onContentTouchEnd={(event) =>
          handleLightboxTouchEnd(
            event,
            rabbitHoleTouchStartXRef,
            prevRabbitHoleImage,
            nextRabbitHoleImage,
          )
        }
      />
    </>
  );
}

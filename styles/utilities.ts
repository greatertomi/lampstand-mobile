import { fontSizes, fontWeights } from './typography';

const spaceUnit = 8;

const sizeUnit = (value: number) => value * spaceUnit;

export const utilities = {
  m_0: {
    margin: sizeUnit(0)
  },
  m_1: {
    margin: sizeUnit(1)
  },
  m_2: {
    margin: sizeUnit(2)
  },
  m_3: {
    margin: sizeUnit(3)
  },
  m_4: {
    margin: sizeUnit(4)
  },
  m_5: {
    margin: sizeUnit(5)
  },
  mn_1: {
    margin: sizeUnit(-1)
  },
  mn_2: {
    margin: sizeUnit(-2)
  },
  mn_3: {
    margin: sizeUnit(-3)
  },
  mn_4: {
    margin: sizeUnit(-4)
  },
  mn_5: {
    margin: sizeUnit(5)
  },
  ml_0: {
    marginLeft: sizeUnit(0)
  },
  ml_1: {
    marginLeft: sizeUnit(1)
  },
  ml_2: {
    marginLeft: sizeUnit(2)
  },
  ml_3: {
    marginLeft: sizeUnit(3)
  },
  ml_4: {
    marginLeft: sizeUnit(4)
  },
  ml_5: {
    marginLeft: sizeUnit(5)
  },
  mln_1: {
    marginLeft: sizeUnit(1)
  },
  mln_2: {
    marginLeft: sizeUnit(2)
  },
  mln_3: {
    marginLeft: sizeUnit(3)
  },
  mln_4: {
    marginLeft: sizeUnit(4)
  },
  mln_5: {
    marginLeft: sizeUnit(5)
  },
  mr_0: {
    marginRight: sizeUnit(0)
  },
  mr_1: {
    marginRight: sizeUnit(1)
  },
  mr_2: {
    marginRight: sizeUnit(2)
  },
  mr_3: {
    marginRight: sizeUnit(3)
  },
  mr_4: {
    marginRight: sizeUnit(4)
  },
  mr_5: {
    marginRight: sizeUnit(5)
  },
  mrn_1: {
    marginRight: -sizeUnit(-1)
  },
  mrn_2: {
    marginRight: sizeUnit(-2)
  },
  mrn_3: {
    marginRight: -sizeUnit(-3)
  },
  mrn_4: {
    marginRight: sizeUnit(-4)
  },
  mrn_5: {
    marginRight: sizeUnit(-5)
  },
  mx_0: {
    marginHorizontal: sizeUnit(0)
  },
  mx_1: {
    marginHorizontal: sizeUnit(1)
  },
  mx_2: {
    marginHorizontal: sizeUnit(2)
  },
  mx_3: {
    marginHorizontal: sizeUnit(3)
  },
  mx_4: {
    marginHorizontal: sizeUnit(4)
  },
  mx_5: {
    marginHorizontal: sizeUnit(5)
  },
  mxn_1: {
    marginHorizontal: sizeUnit(-1)
  },
  mxn_2: {
    marginHorizontal: sizeUnit(-2)
  },
  mxn_3: {
    marginHorizontal: sizeUnit(-3)
  },
  mxn_4: {
    marginHorizontal: sizeUnit(-4)
  },
  mxn_5: {
    marginHorizontal: sizeUnit(-5)
  },
  my_0: {
    marginVertical: sizeUnit(0)
  },
  my_1: {
    marginVertical: sizeUnit(1)
  },
  my_2: {
    marginVertical: sizeUnit(2)
  },
  my_3: {
    marginVertical: sizeUnit(3)
  },
  my_4: {
    marginVertical: sizeUnit(4)
  },
  my_5: {
    marginVertical: sizeUnit(5)
  },
  myn_1: {
    marginVertical: sizeUnit(-1)
  },
  myn_2: {
    marginVertical: sizeUnit(-2)
  },
  myn_3: {
    marginVertical: sizeUnit(-3)
  },
  myn_4: {
    marginVertical: sizeUnit(-4)
  },
  myn_5: {
    marginVertical: sizeUnit(-5)
  },
  mt_0: {
    marginTop: sizeUnit(0)
  },
  mt_1: {
    marginTop: sizeUnit(1)
  },
  mt_2: {
    marginTop: sizeUnit(2)
  },
  mt_3: {
    marginTop: sizeUnit(3)
  },
  mt_4: {
    marginTop: sizeUnit(4)
  },
  mt_5: {
    marginTop: sizeUnit(5)
  },
  mtn_1: {
    marginTop: sizeUnit(-1)
  },
  mtn_2: {
    marginTop: sizeUnit(-2)
  },
  mtn_3: {
    marginTop: sizeUnit(-3)
  },
  mtn_4: {
    marginTop: sizeUnit(-4)
  },
  mtn_5: {
    marginTop: sizeUnit(-5)
  },
  mb_0: {
    marginBottom: sizeUnit(0)
  },
  mb_1: {
    marginBottom: sizeUnit(1)
  },
  mb_2: {
    marginBottom: sizeUnit(2)
  },
  mb_3: {
    marginBottom: sizeUnit(3)
  },
  mb_4: {
    marginBottom: sizeUnit(4)
  },
  mb_5: {
    marginBottom: sizeUnit(5)
  },
  mbn_1: {
    marginBottom: sizeUnit(-1)
  },
  mbn_2: {
    marginBottom: sizeUnit(-2)
  },
  mbn_3: {
    marginBottom: sizeUnit(-3)
  },
  mbn_4: {
    marginBottom: sizeUnit(-4)
  },
  mbn_5: {
    marginBottom: sizeUnit(-5)
  },
  p_0: {
    padding: sizeUnit(0)
  },
  p_1: {
    padding: sizeUnit(1)
  },
  p_2: {
    padding: sizeUnit(2)
  },
  p_3: {
    padding: sizeUnit(3)
  },
  p_4: {
    padding: sizeUnit(4)
  },
  p_5: {
    padding: sizeUnit(5)
  },
  pn_1: {
    padding: sizeUnit(-1)
  },
  pn_2: {
    padding: sizeUnit(-2)
  },
  pn_3: {
    padding: sizeUnit(-3)
  },
  pn_4: {
    padding: sizeUnit(-4)
  },
  pn_5: {
    padding: sizeUnit(-5)
  },
  pl_0: {
    paddingLeft: 0
  },
  pl_1: {
    paddingLeft: sizeUnit(1)
  },
  pl_2: {
    paddingLeft: sizeUnit(2)
  },
  pl_3: {
    paddingLeft: sizeUnit(3)
  },
  pl_4: {
    paddingLeft: sizeUnit(4)
  },
  pl_5: {
    paddingLeft: sizeUnit(5)
  },
  pln_1: {
    padding: sizeUnit(-1)
  },
  pln_2: {
    padding: sizeUnit(-2)
  },
  pln_3: {
    padding: sizeUnit(-3)
  },
  pln_4: {
    padding: sizeUnit(-4)
  },
  pln_5: {
    padding: sizeUnit(-5)
  },
  pr_0: {
    paddingRight: sizeUnit(0)
  },
  pr_1: {
    paddingRight: sizeUnit(1)
  },
  pr_2: {
    paddingRight: sizeUnit(2)
  },
  pr_3: {
    paddingRight: sizeUnit(3)
  },
  pr_4: {
    paddingRight: sizeUnit(4)
  },
  pr_5: {
    paddingRight: sizeUnit(5)
  },
  prn_1: {
    paddingRight: sizeUnit(-1)
  },
  prn_2: {
    paddingRight: sizeUnit(-2)
  },
  prn_3: {
    paddingRight: sizeUnit(-3)
  },
  prn_4: {
    paddingRight: sizeUnit(-4)
  },
  prn_5: {
    paddingRight: sizeUnit(-5)
  },
  px_0: {
    paddingHorizontal: sizeUnit(0)
  },
  px_1: {
    paddingHorizontal: sizeUnit(1)
  },
  px_2: {
    paddingHorizontal: sizeUnit(2)
  },
  px_3: {
    paddingHorizontal: sizeUnit(3)
  },
  px_4: {
    paddingHorizontal: sizeUnit(4)
  },
  px_5: {
    paddingHorizontal: sizeUnit(5)
  },
  pxn_1: {
    paddingHorizontal: sizeUnit(-1)
  },
  pxn_2: {
    paddingHorizontal: sizeUnit(-2)
  },
  pxn_3: {
    paddingHorizontal: sizeUnit(-3)
  },
  pxn_4: {
    paddingHorizontal: sizeUnit(-4)
  },
  pxn_5: {
    paddingHorizontal: sizeUnit(-5)
  },
  py_0: {
    paddingVertical: sizeUnit(0)
  },
  py_1: {
    paddingVertical: sizeUnit(1)
  },
  py_2: {
    paddingVertical: sizeUnit(2)
  },
  py_3: {
    paddingVertical: sizeUnit(3)
  },
  py_4: {
    paddingVertical: sizeUnit(4)
  },
  py_5: {
    paddingVertical: sizeUnit(5)
  },
  pyn_1: {
    paddingVertical: sizeUnit(-1)
  },
  pyn_2: {
    paddingVertical: sizeUnit(-2)
  },
  pyn_3: {
    paddingVertical: sizeUnit(-3)
  },
  pyn_4: {
    paddingVertical: sizeUnit(-4)
  },
  pyn_5: {
    paddingVertical: sizeUnit(-5)
  },
  pt_0: {
    paddingTop: sizeUnit(0)
  },
  pt_1: {
    paddingTop: sizeUnit(1)
  },
  pt_2: {
    paddingTop: sizeUnit(2)
  },
  pt_3: {
    paddingTop: sizeUnit(3)
  },
  pt_4: {
    paddingTop: sizeUnit(4)
  },
  pt_5: {
    paddingTop: sizeUnit(5)
  },
  ptn_1: {
    paddingTop: sizeUnit(-1)
  },
  ptn_2: {
    paddingTop: sizeUnit(-2)
  },
  ptn_3: {
    paddingTop: sizeUnit(-3)
  },
  ptn_4: {
    paddingTop: sizeUnit(-4)
  },
  ptn_5: {
    paddingTop: sizeUnit(-5)
  },
  pb_0: {
    paddingBottom: sizeUnit(0)
  },
  pb_1: {
    paddingBottom: sizeUnit(1)
  },
  pb_2: {
    paddingBottom: sizeUnit(2)
  },
  pb_3: {
    paddingBottom: sizeUnit(3)
  },
  pb_4: {
    paddingBottom: sizeUnit(4)
  },
  pb_5: {
    paddingBottom: sizeUnit(5)
  },
  pbn_1: {
    paddingBottom: sizeUnit(-1)
  },
  pbn_2: {
    paddingBottom: sizeUnit(-2)
  },
  pbn_3: {
    paddingBottom: sizeUnit(-3)
  },
  pbn_4: {
    paddingBottom: sizeUnit(-4)
  },
  pbn_5: {
    paddingBottom: sizeUnit(-5)
  },
  text_center: {
    textAlign: 'center'
  },
  text_right: {
    textAlign: 'right'
  },
  text_left: {
    textAlign: 'left'
  },
  text_justify: {
    textAlign: 'justify'
  },
  font_weight_bold: {
    fontWeight: 'bold'
  },
  font_weight_bolder: {
    fontWeight: 'bolder'
  },
  font_weight_lighter: {
    fontWeight: 'lighter'
  },
  font_larger: {
    fontSize: fontSizes.h1
  },
  font_large: {
    fontSize: fontSizes.h2
  },
  font_semi_large: {
    fontSize: fontSizes.h3
  },
  font_normal: {
    fontSize: fontSizes.body
  },
  // font_small {
  //   fontSize: fontSizes.small
  // }
  font_smaller: {
    fontSize: fontSizes.caption
  },
  font_style_italic: {
    fontStyle: 'italic'
  },
  d_flex: {
    display: 'flex'
  },
  flex_dir_row: {
    flexDirection: 'row'
  },
  flex_dir_column: {
    flexDirection: 'column'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  justify_content_center: {
    justifyContent: 'center'
  },
  justify_content_between: {
    justifyContent: 'space-between'
  },
  justify_content_around: {
    justifyContent: 'space-around'
  },
  justify_content_evenly: {
    justifyContent: 'space-evenly'
  },
  justify_content_end: {
    justifyContent: 'end'
  },
  align_items_center: {
    alignItems: 'center'
  },
  align_items_start: {
    alignItems: 'flex-start'
  },
  align_items_end: {
    alignItems: 'flex-end'
  },
  align_items_baseline: {
    alignI: 'baseline'
  },
  align_self_start: {
    alignSelf: 'flex-start'
  },
  align_self_center: {
    alignSelf: 'center'
  },
  align_self_end: {
    alignSelf: 'flex-end'
  },
  gap_1: {
    gap: sizeUnit(1)
  },
  gap_2: {
    gap: sizeUnit(2)
  },
  gap_3: {
    gap: sizeUnit(3)
  },
  gap_4: {
    gap: sizeUnit(4)
  },
  gap_5: {
    gap: sizeUnit(5)
  },
  fw_regular: {
    fontWeight: fontWeights.regular
  },
  fw_medium: {
    fontWeight: fontWeights.medium
  },
  fw_semibold: {
    fontWeight: fontWeights.semibold
  },
  fw_bold: {
    fontWeight: fontWeights.bold
  },
  cursor_pointer: {
    cursor: 'pointer'
  },
  width_100: {
    width: '100%'
  },
  width_75: {
    width: '75%'
  },
  width_50: {
    width: '50%'
  },
  width_25: {
    width: '25%'
  },
  height_100: {
    height: '100%'
  },
  height_75: {
    height: '75%'
  },
  height_50: {
    height: '50%'
  },
  height_25: {
    height: '25%'
  }
} as const;

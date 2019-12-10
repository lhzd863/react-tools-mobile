import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import './AppMain.css';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const GridExample = () => (
  <div>
    <div className="sub-title">Always square grid item </div>
    <Grid data={data} columnNum={4}  activeStyle={false} />

  </div>
);


class AppMain extends Component {
  render() {
    return (
       <GridExample />
    );
  }
}

export default AppMain;


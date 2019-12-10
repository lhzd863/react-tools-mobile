import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import "./config.js";

const Item = List.Item;
const Brief = Item.Brief;


class AppHome extends Component {

  handleClick (e) {
      //this.props.history.push("/back");
      window.location.href = global.constants.const_url+"/back";
  }
  handleClickStatement () {
      window.location.href = global.constants.const_url+"/home/statement";
  }

  handleClickQrCode () {
      window.location.href = global.constants.const_url+"/home/qrcode";
  }

  render() {
    return (
    <div>
      <List className="nva-bar-title">
        <Item
          arrow="horizontal"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          onClick={() => {this.handleClick();}}
        >
          姓名  <Brief> mail </Brief>
        </Item>

        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {this.handleClickQrCode();}}
          platform="android"
        >
           { global.constants.const_home_qrcode_name }
        </Item>

        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {this.handleClickStatement();}}
          platform="android"
        >
           { global.constants.const_home_statement_name }
        </Item>
      </List>
    </div>

    );
  }
}

export default withRouter(AppHome);

import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
//import {withRouter} from 'react-router-dom';
import "./T.css";

class AppBack extends Component {
  handleClick (e) {
      //this.props.history.push("/");
      window.location.href = global.constants.const_url;
  }

  render() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.handleClick();}}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >个人信息</NavBar>

        </div>
    );
  }
}

export default AppBack;

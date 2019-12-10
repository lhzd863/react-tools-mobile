import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import "./T.css";
import QRCode from 'qrcode.react';

class AppQrCode extends Component {
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
              >{ global.constants.const_home_qrcode_name }</NavBar>
              <div className="am-div home-qrcode-pos">
                  <QRCode value={ global.constants.const_url } 
                          size={200}
                          fgColor="#000000"
                          level="M"
                  />
              </div>
        </div>
    );
  }
}

export default AppQrCode;

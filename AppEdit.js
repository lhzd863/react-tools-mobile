import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
//import {withRouter} from 'react-router-dom';
import Editor from 'for-editor';
import "./T.css";
import CryptoJS from 'crypto-js';

function PaddingLeft(key, length){                                
        var pkey= key.toString();                                     
        var l = pkey.length;                                      
        if (l < length) { 
                pkey = new Array(length - l + 1).join('0') + pkey;
        }else if (l > length){                                    
                pkey = pkey.slice(length);                        
        }                                                         
        return pkey;                                              
}  

class AppEdit extends Component {

  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  handleChange(value) {
    this.setState({
      value
    })
  }
  handleSave(e) {
     var key = "beijingtiananmen";
     PaddingLeft(key, 16);
     //加密
     //var encrypt = CryptoJS.AES.encrypt(e, CryptoJS.enc.Utf8.parse(aseKey), {
     //      mode: CryptoJS.mode.ECB,
     //      padding: CryptoJS.pad.Pkcs7
     //    }).toString();
    //解密
    //var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
    //       mode: CryptoJS.mode.ECB,
    //       padding: CryptoJS.pad.Pkcs7
    //    }).toString(CryptoJS.enc.Utf8);
    //key = PaddingLeft(key, 16);
    //e="www.baidu.com"
    key = CryptoJS.enc.Utf8.parse(key);
    var iv=key;
    var encrypted = CryptoJS.AES.encrypt(e, key, {        
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
    });
    var encrypt = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
     alert(encrypt)
    var enc1 = CryptoJS.enc.Hex.parse(encrypt);
    var enc2 = CryptoJS.enc.Base64.stringify(enc1);
    //alert(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypt)));
    alert(enc2)
    //
    //let d_mys = CryptoJS.AES.decrypt('', '12345').toString(CryptoJS.enc.Utf8)
    var decryptedData = CryptoJS.AES.decrypt(enc2, key, {  
        iv:  CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,  
        padding: CryptoJS.pad.Pkcs7  
    });  
  
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);  
    alert(decryptedStr);
  }

  handleClick (e) {
    //this.props.history.push("/");
    window.location.href = global.constants.const_url;
  }

  addImg($file) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  render() {
    const { value } = this.state;
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
              
              <Editor 
                value={value} 
                onChange={(value) => this.handleChange(value)} 
                addImg={($file) => this.addImg($file)}
                height={600}
                toolbar={{ h1: true,h2: true,h3: true,link: true,undo: true,img: true,code: true, save: true}} 
                onSave={(value)=> {this.handleSave(value)} }
              />

        </div>
    );
  }
}

export default AppEdit;

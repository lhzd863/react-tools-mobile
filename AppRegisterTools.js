import React, { Component } from 'react';
import { NavBar, Icon, List, InputItem, TextareaItem, Checkbox, Button } from 'antd-mobile';
import "./T.css";
import { createForm } from 'rc-form';
import  HomeRegisterCheckBoxMap from "./AppCommon.js";

const CheckboxItem = Checkbox.CheckboxItem;

class AppRegisterTools extends Component {
  //constructor(props) {
  //  super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
  //}
  handleClick (e) {
      window.location.href = global.constants.const_url;
  }

  onChange = (val) => {
    console.log(val);
  }

  handleChangeTitle(event) {
    
    //this.setState({input_title: event.target.value});
    console.log(event);
  }
  
  handleSubmit() {
    //this.setState({input_title: this.refs.input_title.props.value});
    var input_title = this.refs.input_title.props.value;
    var input_des = this.refs.input_des.props.value;
    var input_url = this.refs.input_url.props.value;
    var input_version = this.refs.input_version.props.value;
    var input_logo= this.refs.input_logo.props.value;
    var input_tag="";
    var obj = document.getElementsByName("mobilcheckbox");
    var k;
    var i=0
    for(k in obj) {
       if(obj[k].checked){
           if ( i===0){
             input_tag+=HomeRegisterCheckBoxMap(k);
           }else{
             input_tag+="-"+HomeRegisterCheckBoxMap(k);
           }
           i++;
       }
    }
    fetch("http://122.51.161.53:9903/api/tool/add?accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzMDA2MjI5MDQsImlzcyI6ImF6eiJ9.DX3XDYxkDGuUdtL_zG9v1KngDjON4qPN01N0_65gwEI",{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        version: input_version,
        toolsname: input_title,
        img: input_logo,
        author: "admin",
        url: input_url,
        des: input_des,
        tag: input_tag,
        cdt: "2019-12-10",
        urlicon: "ellipsis",
        stars: "s0",
        accesscnt: "0",
        toolsid: "",
      })
     })
     .then(response => response.json())
     .then((dat) => {
         // data=dat;
         console.log(dat)
     })
     .catch(function (err) {
          console.log(err);
     });
     
     //
     window.location.href = global.constants.const_url;
  }

  render() {
    const { getFieldProps } = this.props.form;
    const tagdata = [
            { value: 0, label: global.constants.const_home_register_tool_tag_safe },
            { value: 1, label: global.constants.const_home_register_tool_tag_video },
            { value: 2, label: global.constants.const_home_register_tool_tag_data },
            { value: 3, label: global.constants.const_home_register_tool_tag_audio },
            { value: 4, label: global.constants.const_home_register_tool_tag_image }
    ];

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
              >{ global.constants.const_home_register_tool_name}</NavBar>
              
              <List renderHeader={() => 'Custom title'}>
                  <InputItem
                      {...getFieldProps('input_title')}
                      placeholder="title can be text"
                      ref = "input_title"
                      //value={this.state.input_title} 
                      //onChange={this.handleChangeTitle} 
                  >
                    { global.constants.const_home_register_tool_title}
                  </InputItem>

                  <TextareaItem
                      {...getFieldProps('input_des')}
                      ref = "input_des"
                      title={global.constants.const_home_register_tool_des}
                      autoHeight
                      labelNumber={5}
                  />
                  
                  <InputItem
                      {...getFieldProps('input_url')}
                      ref = "input_url"
                      placeholder="tools url path"
                  >
                    { global.constants.const_home_register_tool_url} 
                  </InputItem>
                  <InputItem
                      {...getFieldProps('input_version')}
                      ref = "input_version"
                      placeholder="tools version format v1.0.0"
                  >
                    { global.constants.const_home_register_tool_version}
                  </InputItem>
                  <InputItem
                      placeholder="logo url"
                      {...getFieldProps('input_logo')}
                      ref = "input_logo"
                  >
                    { global.constants.const_home_register_tool_logo}
                  </InputItem>
                  
                  {tagdata.map(i => (
                      <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)} name="mobilcheckbox" value={i.value} >
                      {i.label}
                      </CheckboxItem>
                  ))}
                  <Button onClick={() => {this.handleSubmit();}}>{ global.constants.const_home_register_tool_submit }</Button>
             </List>

        </div>
    );
  }
}

const AppRegisterToolsWrapper = createForm()(AppRegisterTools);
export default AppRegisterToolsWrapper;


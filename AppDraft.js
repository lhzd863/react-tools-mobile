import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Editor, EditorState} from 'draft-js';
//import {withRouter} from 'react-router-dom';
import "./T.css";

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};


class AppDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) =>{ this.setState({editorState})};
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  handleClick (e) {
      //this.props.history.push("/");
      alert(this.state.editorState.getCurrentContent());
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

            <div style={styles.editor} onClick={this.focusEditor}>
              <Editor
                ref={this.setEditor}
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
           </div>
 
        </div>
    );
  }
}

export default AppDraft;

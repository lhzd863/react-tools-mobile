import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, Icon, Tag } from 'antd-mobile';
import "./config.js";

//import {withRouter} from 'react-router-dom';

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

let data = [];
//let NUM_SECTIONS = 5;
//let NUM_ROWS_PER_SECTION = 5;
//let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
//function genData(pIndex=0) {
//  for (let i = 0; i < NUM_SECTIONS; i++) {
//    const ii = (pIndex * NUM_SECTIONS) + i;
//    const sectionName = `Section ${ii}`;
//    sectionIDs.push(sectionName);
//    dataBlobs[sectionName] = sectionName;
//    rowIDs[ii] = [];

//    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
//      const rowName = `S${ii}, R${jj}`;
//      rowIDs[ii].push(rowName);
//      dataBlobs[rowName] = rowName;
//    }
//  }
//  sectionIDs = [...sectionIDs];
//  rowIDs = [...rowIDs];
//}

function genSrcData(data,pIndex) {
  var j,len
  for(j = 0,len=data.length; j < len; j++) {
        const ii = j;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = data[j].toolsname;
        rowIDs[ii] = [];
        const rowName = `R${ii}`;
        rowIDs[ii].push(rowName);
        dataBlobs[rowName] = rowName;
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class AppTools extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  handleClick (e) {
      //this.props.history.push("/back");
      window.location.href = e;
  }

  componentDidMount() {
    
      fetch("http://122.51.161.53:9903/api/tool/list?accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzMDA2MjI5MDQsImlzcyI6ImF6eiJ9.DX3XDYxkDGuUdtL_zG9v1KngDjON4qPN01N0_65gwEI",{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        version: 'v1.0.0',
      })
     })
     .then(response => response.json())
     .then((dat) => {
          data=dat;
          //console.log(dat)
     })
     .catch(function (err) {
          console.log(err);
     });

    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    setTimeout(() => {
      genSrcData(data,0);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  //onEndReached = (event) => {
  //  if (this.state.isLoading && !this.state.hasMore) {
  //    return;
  //  }
  //  console.log('reach end', event);
  //  this.setState({ isLoading: true });
  //  setTimeout(() => {
  //    genData(++pageIndex);
  //    this.setState({
  //      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
  //      isLoading: false,
  //    });
  //  }, 1000);
  //}

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{obj.toolsname}</div>
          <div style={{ display: '-webkit-box', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div> {obj.author} {obj.version}  {obj.cdt}</div>
              <div> <Tag selected> {obj.tag} </Tag></div>
              <div>{obj.accesscnt}{global.constants.const_tools_panel_access_number_name} <Icon type={obj.urlicon} style={{marginRight: '16px'}}  onClick={()=>{ this.handleClick( obj.url );} }/> </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>{global.constants.const_tools_header_name}</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : global.constants.const_tools_footer_end_name}
        </div>)}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        //onEndReached={this.onEndReached}
        //onEndReachedThreshold={10}
      />
    );
  }
}


export default AppTools;

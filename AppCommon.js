
const HomeRegisterCheckBoxMap = (v)=>{
    var k = "其他";
    if (v==="1"){
      k ="安全"
    }else if(v==="3") {
      k ="视频";
    }else if(v==="5") {
      k ="数据";
    }else if(v==="7"){
      k ="音频";
    }else if(v==="9"){
      k ="图片";
    }
    return k; 
}

export default HomeRegisterCheckBoxMap;


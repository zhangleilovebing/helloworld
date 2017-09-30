/**
 * Created by zhanglei on 2017/5/23.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd';
import {circleFunction,myMessage} from '../modelCommon/main';
const ContentEditable = require("react-contenteditable");
import './edit.less'
class Editor extends Component {
    static propTypes = {
        className: PropTypes.string,
    };
    constructor(props){
        super(props);
        circleFunction(this,[
            'inputTextChange','onchangefile','onpaste','ondrop','onParseOrDrop','faceClick','showFace','onkeyup'
        ]);
        this.state={
            value:null,tableData:[],
            linkModel:false,visible:false,
            isColor:false,myDisabled:false,isEdit:true,isFace:false,
            isBackground:false,linkValue:null,
            editStatus:[
                {label:'加粗',value:'bold',icon:'zitijiacu'},
                {label:'斜体',value:'italic',icon:'zitixieti'},
                {label:'下划线',value:'underline',icon:'xiahuaxian'},
                {label:'链接',value:'createLink',icon:'lianjie'}
            ],
            fontSizeData:[
                {title:'大号',value:'h1',icon:'H1'},
                {title:'中号',value:'h2',icon:'h2'},
                {title:'正常',value:'h3',icon:'h3-copy-copy'},
                {title:'小号',value:'h4',icon:'h4'}
            ],
            isSent:true,
            colorData:[
                'red','orange','yellow','#01FF01','#98F5FF','#8686FF','rgb(216, 154, 255)', '#fff',
                '#DE1607','#E49402','#E2E205','#04DE04','rgb(71, 237, 255)','#6363F9','rgb(204, 123, 255)', 'rgb(206, 205, 205)',
                '#C10303','#D08702','#C5C503','#07C307','rgb(0, 221, 245)','#4C4CFB','rgb(184, 70, 255)', 'rgb(183, 183, 183)',
                '#960505','#AB7005','#ABAB03','#02A902','rgb(6, 171, 189)','#3333FF','rgb(167, 25, 255)', 'rgb(148, 148, 148)',
                '#710303','#989805','#989805','#059C05','rgb(9, 138, 152)','blue','#A020F0', 'rgb(76, 75, 75)',
                '#5D0404',' #757504','#757504','green','rgb(2, 99, 109)','blue','#A020F0', '#000','rgb(56, 2, 2)'
            ],
            face:[
                {title:"微笑",status:false,class:"face qqface0"},
                {title:"撇嘴",status:false,class:"face qqface1"},
                {title:"色",status:false,class:"face qqface2"},
                {title:"发呆",status:false,class:"face qqface3"},
                {title:"得意",status:false,class:"face qqface4"},
                {title:"流泪",status:false,class:"face qqface5"},
                {title:"害羞",status:false,class:"face qqface6"},
                {title:"闭嘴",status:false,class:"face qqface7"},
                {title:"睡",status:false,class:"face qqface8"},
                {title:"大哭",status:false,class:"face qqface9"},
                {title:"尴尬",status:false,class:"face qqface10"},
                {title:"发怒",status:false,class:"face qqface11"},
                {title:"调皮",status:false,class:"face qqface12"},
                {title:"呲牙",status:false,class:"face qqface13"},
                {title:"惊讶",status:false,class:"face qqface14"},
                {title:"难过",status:false,class:"face qqface15"},
                {title:"酷",status:false,class:"face qqface16"},
                {title:"冷汗",status:false,class:"face qqface17"},
                {title:"抓狂",status:false,class:"face qqface18"},
                {title:"吐",status:false,class:"face qqface19"},
                {title:"偷笑",status:false,class:"face qqface20"},
                {title:"愉快",status:false,class:"face qqface21"},
                {title:"白眼",status:false,class:"face qqface22"},
                {title:"傲慢",status:false,class:"face qqface23"},
                {title:"饥饿",status:false,class:"face qqface24"},
                {title:"困",status:false,class:"face qqface25"},
                {title:"惊恐",status:false,class:"face qqface26"},
                {title:"流汗",status:false,class:"face qqface27"},
                {title:"憨笑",status:false,class:"face qqface28"},
                {title:"悠闲",status:false,class:"face qqface29"},
                {title:"奋斗",status:false,class:"face qqface30"},
                {title:"咒骂",status:false,class:"face qqface31"},
                {title:"疑问",status:false,class:"face qqface32"},
                {title:"嘘",status:false,class:"face qqface33"},
                {title:"晕",status:false,class:"face qqface34"},
                {title:"疯了",status:false,class:"face qqface35"},
                {title:"衰",status:false,class:"face qqface36"},
                {title:"骷髅",status:false,class:"face qqface37"},
                {title:"敲打",status:false,class:"face qqface38"},
                {title:"再见",status:false,class:"face qqface39"},
                {title:"擦汗",status:false,class:"face qqface40"},
                {title:"抠鼻",status:false,class:"face qqface41"},
                {title:"鼓掌",status:false,class:"face qqface42"},
                {title:"糗大了",status:false,class:"face qqface43"},
                {title:"坏笑",status:false,class:"face qqface44"},
                {title:"左哼哼",status:false,class:"face qqface45"},
                {title:"右哼哼",status:false,class:"face qqface46"},
                {title:"哈欠",status:false,class:"face qqface47"},
                {title:"鄙视",status:false,class:"face qqface48"},
                {title:"委屈",status:false,class:"face qqface49"},
                {title:"快哭了",status:false,class:"face qqface50"},
                {title:"阴险",status:false,class:"face qqface51"},
                {title:"亲亲",status:false,class:"face qqface52"},
                {title:"吓",status:false,class:"face qqface53"},
                {title:"可怜",status:false,class:"face qqface54"},
                {title:"菜刀",status:false,class:"face qqface55"},
                {title:"西瓜",status:false,class:"face qqface56"},
                {title:"啤酒",status:false,class:"face qqface57"},
                {title:"篮球",status:false,class:"face qqface58"},
                {title:"乒乓",status:false,class:"face qqface59"},
                {title:"咖啡",status:false,class:"face qqface60"},
                {title:"饭",status:false,class:"face qqface61"},
                {title:"猪头",status:false,class:"face qqface62"},
                {title:"玫瑰",status:false,class:"face qqface63"},
                {title:"凋谢",status:false,class:"face qqface64"},
                {title:"嘴唇",status:false,class:"face qqface65"},
                {title:"爱心",status:false,class:"face qqface66"},
                {title:"心碎",status:false,class:"face qqface67"},
                {title:"蛋糕",status:false,class:"face qqface68"},
                {title:"闪电",status:false,class:"face qqface69"},
                {title:"炸弹",status:false,class:"face qqface70"},
                {title:"刀",status:false,class:"face qqface71"},
                {title:"足球",status:false,class:"face qqface72"},
                {title:"瓢虫",status:false,class:"face qqface73"},
                {title:"便便",status:false,class:"face qqface74"},
                {title:"月亮",status:false,class:"face qqface75"},
                {title:"太阳",status:false,class:"face qqface76"},
                {title:"礼物",status:false,class:"face qqface77"},
                {title:"拥抱",status:false,class:"face qqface78"},
                {title:"强",status:false,class:"face qqface79"},
                {title:"弱",status:false,class:"face qqface80"},
                {title:"握手",status:false,class:"face qqface81"},
                {title:"胜利",status:false,class:"face qqface82"},
                {title:"抱拳",status:false,class:"face qqface83"},
                {title:"勾引",status:false,class:"face qqface84"},
                {title:"拳头",status:false,class:"face qqface85"},
                {title:"差劲",status:false,class:"face qqface86"},
                {title:"爱你",status:false,class:"face qqface87"},
                {title:"NO",status:false,class:"face qqface88"},
                {title:"OK",status:false,class:"face qqface89"},
                {title:"爱情",status:false,class:"face qqface90"},
                {title:"飞吻",status:false,class:"face qqface91"},
                {title:"跳跳",status:false,class:"face qqface92"},
                {title:"发抖",status:false,class:"face qqface93"},
                {title:"怄火",status:false,class:"face qqface94"},
                {title:"转圈",status:false,class:"face qqface95"},
                {title:"磕头",status:false,class:"face qqface96"},
                {title:"回头",status:false,class:"face qqface97"},
                {title:"跳绳",status:false,class:"face qqface98"},
                {title:"投降",status:false,class:"face qqface99"},
                {title:"激动",status:false,class:"face qqface100"},
                {title:"乱舞",status:false,class:"face qqface101"},
                {title:"献吻",status:false,class:"face qqface102"},
                {title:"左太极",status:false,class:"face qqface103"},
                {title:"右太极",status:false,class:"face qqface104"}
            ]
        }
    };
    componentDidMount(){
        document.addEventListener('click',this.documentClick);
    };
    componentWillReceiveProps(nextProps){
        if('value' in nextProps&&this.state.editValue !== nextProps.value){
            this.setState({editValue:nextProps.value})
        }
    }
    //全局取消隐藏颜色框
    documentClick=(e)=>{
        let en = e.srcElement||e.target;
        const name = '.color-content';
        while(en){
            if(en.className&&en.className === name.replace('.','')){
                return;
            }
            en = en.parentNode;
        }
        this.setState({isColor:false,isBackground:false});
    };
    //卸载颜色框
    componentWillUnmount(){
        document.removeEventListener('click',this.documentClick)
    }
    // onchange=(i)=>{
    //     this.setState({value:this[i].innerHTML})
    // };
    //粘贴
    onpaste=(e)=>{
        let cbd = e.clipboardData;
        let ua = window.navigator.userAgent;
        if ( !(e.clipboardData && e.clipboardData.items) ) {
            return ;
        }
        if(cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
            ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49){
            return;
        }
        this.onParseOrDrop(cbd,e);
    };
    //拖拽
    ondrop=(e)=>{
        e.preventDefault();
        let cbd = e.dataTransfer;
        let ua = window.navigator.userAgent;
        if ( !(e.dataTransfer && e.dataTransfer.items) ) {
            return ;
        }
        if(cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
            ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49){
            return;
        }
        this.onParseOrDrop(cbd,e);
    };
    //方法
    onParseOrDrop(cbd,e){
        if(cbd.items&&cbd.items.length === 4){
            document.createElement('table');
            return false;
        }
        const myArray = [];
        Object.keys(cbd.items).forEach(item=>{
            myArray.push(cbd.items[item]);
        });
        const arr = myArray.some((u)=>{
            if(u.kind === 'file'&&u.type!=='image/jpeg'&&u.type!=='image/png'){
                myMessage('error','仅支持PNG或者JPG的图片格式上传');
                return !1
            }
            return u.kind === 'file'&&(u.type==='image/jpeg'||u.type==='image/png')
        });
        if(arr){
            myArray.forEach(item=>{
                if(item.kind === 'string'){
                    e.preventDefault();
                    return;
                }
                if(item.kind === "file"){
                    e.preventDefault();
                    let blob = item.getAsFile();
                    if (blob.size === 0) {
                        return;
                    }
                    let reader = new FileReader();
                    let imgs = new Image();
                    imgs.file = blob;
                    reader.onload = (aImg =>e=>{
                        aImg.src = e.target.result;
                        const html = this.refs['inputText'].htmlEl.innerHTML;
                        const {onChange} = this.props;
                        if(onChange){
                            onChange(html);
                        }
                    })(imgs);
                    reader.readAsDataURL(blob);
                    imgs.title = '点击放大';
                    imgs.style.cursor = 'pointer';
                    imgs.style.borderRadius = '3px';
                    imgs.style.maxWidth = '500px';
                    imgs.style.display = '-webkit-box';
                    this.refs['inputText'].htmlEl.appendChild(imgs);
                }
            })
        }
    };
    //上传图片
    onchangefile=(e)=>{
        e.preventDefault();
        const arr = e.target.files[0].name.split('.');
        const mode = arr[arr.length - 1];
        if(mode !== 'jpg'&&mode !== 'png'&&mode !== 'jpeg'){
            myMessage('error','仅支持PNG或者JPG的图片格式上传！');
            return;
        }
        const imgs = new Image();
        imgs.file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (aImg=>(e)=>{
            aImg.src = e.target.result;
            const html = this.refs['inputText'].htmlEl.innerHTML;
            const {onChange} = this.props;
            if(onChange){
                onChange(html);
            }
        })(imgs);
        reader.readAsDataURL(e.target.files[0]);
        imgs.title = '点击放大';
        imgs.style.cursor = 'pointer';
        imgs.style.borderRadius = '3px';
        imgs.style.maxWidth = '500px';
        this.refs['inputText'].htmlEl.appendChild(imgs);
        // this.refs['inputText'].focus();
    };
    //链接地址
    handleClick=(v,item)=>{
        v.preventDefault();
        if(item === 'createLink'){
            const href = prompt("链接地址", "http://");
            if(href !=='http://'){
                document.execCommand('createLink',false, href);
            }else{
                return false;
            }
        }else{
            document.execCommand(item,false,null);
        }
    };
    //取消图片弹出层
    oncancel=()=>{
        this.setState({visible:false})
    };
    //是否可见
    mapEditStatus=(item)=>{
        const {myDisabled} = this.state;
        return item.map(e=>{
            return <button
                className={!!myDisabled?'pointerEvent':'pointerEvent1'}
                key={e.value}
                title={e.label}
                onClick={(v)=>this.handleClick(v,e.value)}
            >
                <Icon type={e.icon}/>
            </button>
        });
    };
    //color
    textColor=(e)=>{
        e.preventDefault();
        this.setState({isColor:true});
    };
    colorClick=(e,item)=>{
        e.preventDefault();
        document.execCommand("forecolor",false,item);
        this.setState({isColor:false});
    };
    //background
    textBackground=(e)=>{
        e.preventDefault();
        this.setState({isBackground:true});
    };
    backgroundClick=(e,item)=>{
        e.preventDefault();
        document.execCommand("backColor",false,item);
        this.setState({isBackground:false});
    };
    //点击HTML
    insetOlTable=(e)=>{
        e.preventDefault();
        //document.execCommand('InsertOrderedList');
        //document.execCommand('InsertUnorderedList');
        const {isEdit} = this.state;
        let html =null;
        if(isEdit){
            html = this.refs['inputText'].htmlEl.innerHTML;
            this.refs['inputText2'].value = html;
            this.setState({isEdit:false,myDisabled:true});
        }else{
            html = this.refs['inputText2'].value;
            this.refs['inputText'].htmlEl.innerHTML = html;
            this.setState({isEdit:true,myDisabled:false});
        }

    };
    //生成字体标签
    mapButtonToFont=(value)=>{
        const {myDisabled} = this.state;
        return value.map(item=>{
            return <button
                className={!!myDisabled?'pointerEvent':'pointerEvent1'}
                title={item.title}
                key={item.icon}
                onClick={(e)=>this.clickFontSize(e,item.value)}>
                <Icon style={{fontSize:18,marginTop:2}} type={item.icon}/>
            </button>
        });
    };
    //字体大小
    clickFontSize=(e,name)=>{
        e.preventDefault();
        document.execCommand('formatBlock', false, name);
    };
    //点击出现图片弹出框
    onHandleClick=(e)=>{
        if(e.target.childNodes.length>0){
            return
        }
        this.setState({visible:true,url:e.target.src})
    };
    //文本域改变
    inputTextChange(e) {
        this.setState({editValue:e.target.value});
        const {onChange} = this.props;
        const html = e.target.value;
        if(onChange){
            onChange(html);
        }
    }
    //表情
    mapFaceToData=()=>{
        const {face} = this.state;
        return face.map(item=>{
            return <div key={item.title} title={item.title} onClick={this.faceClick} contentEditable={item.status} className={item.class}>
            </div>
        });
    };
    //点击单个表情
    faceClick(e){
        e.preventDefault();
        this.refs['inputText'].htmlEl.appendChild(e.target);
        const html = this.refs['inputText'].htmlEl.innerHTML;
        const {onChange} = this.props;
        if(onChange){
            onChange(html);
        }
        this.setState({isFace:false})
    }
    //弹出表情窗
    showFace(e){
        e.preventDefault();
        this.setState({isFace:true});
    }
    //键盘事件
    onkeyup(e){
        e.preventDefault();
        const {onChange} = this.props;
        const html = this.refs['inputText'].htmlEl.innerHTML;
        if(e.keyCode === 8&&onChange){
            onChange(html)
        }
    }
    render() {
        const {editStatus,isColor,isBackground,isEdit,visible,colorData,fontSizeData,myDisabled,isFace} = this.state;
        const mapColor = (value)=>{
            return value.map((item,index)=>{
                return <li key={index}>
                    <button
                        className={!!myDisabled?'pointerEvent':'pointerEvent1'}
                        onClick={(e)=>this.colorClick(e,item)}
                        style={{background:item}}>
                    </button>
                </li>
            })
        };
        const mapBackground = (value)=>{
            return value.map((item,index)=>{
                return <li key={index}>
                    <button
                        className={!!myDisabled?'pointerEvent':'pointerEvent1'}
                        onClick={(e)=>this.backgroundClick(e,item)}
                        style={{background:item}}>
                    </button>
                </li>
            })
        };
        return (
            <div className="editor-full">
                {
                    !('disabled' in this.props)&&
                    <div id="editor-toolbar" className="clearfix">
                        <button title="表情" onClick={this.showFace}><Icon type="smile-o"/></button>
                        {
                            isFace&&<div className="qq_face">{this.mapFaceToData()}</div>
                        }
                        {!!editStatus&&this.mapEditStatus(editStatus)}
                        <div className="color-content">
                            <button className={!!myDisabled?'pointerEvent':'pointerEvent1'} title="字体颜色" onClick={this.textColor}><Icon type="zitiyanse"/></button>
                            {
                                isColor&&!isBackground?
                                    <div className="color-main">
                                        <ul className="clearfix">
                                            {!!colorData&&mapColor(colorData)}
                                        </ul>
                                    </div>:null
                            }
                        </div>
                        <div className="color-content">
                            <button className={!!myDisabled?'pointerEvent':'pointerEvent1'} title="背景颜色" onClick={this.textBackground}><Icon type="beijingyanse"/></button>
                            {
                                isBackground&&!isColor?
                                    <div className="color-main">
                                        <ul className="clearfix">
                                            {!!colorData&&mapBackground(colorData)}
                                        </ul>
                                    </div>:null
                            }
                        </div>
                        {!!fontSizeData&&this.mapButtonToFont(fontSizeData)}
                        <button title="HTML" onClick={this.insetOlTable}><Icon type="switcher"/></button>
                        <label className={!!myDisabled?'pointerEvent':'pointerEvent1'} htmlFor="male">
                        <span className={!!myDisabled?'pointerEvent':'pointerEvent1'}>
                            <Icon type="tupianwenben"/>
                        </span>
                        </label>
                        <input name="male" id="male" type="file" value={this.state.filevalue} onChange={this.onchangefile}/>
                    </div>
                }
                <div className="inputText" style={{
                    position:'relative',
                    overflow:'auto',
                    borderTop: '1px solid #B7B7B7',
                    border:this.props.editColor
                }}>
                    {
                        !('disabled' in this.props)?
                            <ContentEditable
                                onPaste={this.onpaste}
                                onDrop={this.ondrop}
                                onKeyUp={this.onkeyup}
                                onChange={this.inputTextChange}
                                html={this.state.editValue}
                                onClick={e=>{if(e.target.title==='点击放大'){this.setState({url:e.target.src,visible:true})}}}
                                ref="inputText"
                                style={{
                                    minHeight:188,
                                    background:'#fff',
                                    padding:10,
                                    display:isEdit?'block':'none'
                                }}>
                            </ContentEditable>:
                            <div
                                style={{minHeight:188,background:'#fff',padding:10,borderRadius:'3px'}}
                                dangerouslySetInnerHTML={{__html:this.state.editValue}}
                                onClick={e=>{if(e.target.title==='点击放大'){this.setState({url:e.target.src,visible:true})}}}
                            >
                            </div>
                    }
                    <textarea style={{width:'100%',height:188,position:'absolute',top:0,left:0,display:isEdit?'none':'block'}} ref="inputText2" id="editor-con">
                    </textarea>
                </div>
                <Modal className="chat-model" style={{width:'70%'}} visible={visible} footer={null} onCancel={this.oncancel}>
                    <img src={this.state.url} alt="img"/>
                </Modal>
            </div>

        );
    }
}
export default Editor;
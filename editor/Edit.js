/**
 * Created by zhanglei on 2017/5/23.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal,message } from 'antd';
import ContentEditable from 'react-contenteditable'
import './edit.less'
export default class Editor extends Component {
    static propTypes = {
        className: PropTypes.string,
        value:PropTypes.string,
        editColor:PropTypes.string,
    };
    constructor(props){
        super(props);
        ['inputTextChange','onchangefile','onpaste','ondrop','onParseOrDrop'].map(item=>this[item]=this[item].bind(this));
        this.state={
            value:null,
            tableData:[],
            linkModel:false,
            visible:false,
            isColor:false,
            myDisabled:false,
            isEdit:true,
            isFace:false,
            isBackground:false,
            linkValue:null,
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
        const {isColor,isBackground} = this.state;
        if(isColor||isBackground){
            let en = e.srcElement||e.target;
            const name = '.color-content';
            while(en){
                if(en.className&&en.className === name.replace('.','')){
                    return;
                }
                en = en.parentNode;
            }
            this.setState({isColor:false,isBackground:false});
        }
    };
    //卸载颜色框
    componentWillUnmount(){
        document.removeEventListener('click',this.documentClick)
    }
    /*
     * <粘贴功能>
     * @param onParseOrDrop 通用方法
     *
     * */
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
    /*
    * <拖拽功能>
    * @param onParseOrDrop 通用方法
    *
    * */
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
                message.error('仅支持PNG或者JPG的图片格式上传');
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
            message.error('仅支持PNG或者JPG的图片格式上传');
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
                <div className="inputText" style={{border:this.props.editColor}}>
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
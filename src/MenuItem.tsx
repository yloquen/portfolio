import React, {CSSProperties, RefObject} from "react";
import Util from "./util/Util";
import {TweenMax} from "gsap";

type MenuParams =
{
    data:any,
    style:any,
    index:number,
    activeProgress:number,
    onClickHandler:Function
};

export default class MenuItem extends React.Component<MenuParams, undefined>
{
    private readonly videoRef:React.RefObject<HTMLVideoElement>;
    private video:HTMLVideoElement;

    private imgRef:RefObject<HTMLImageElement>;
    private imgBrightness:number;
    private imgTween:gsap.core.Tween;

    constructor(props:undefined)
    {
        super(props);

        const style = this.props.style;
        style.display = "flex";
        style.flexDirection = "column";

        this.videoRef = React.createRef();
        this.imgBrightness = 0;
    }


    componentDidMount():void
    {
        this.video = this.videoRef.current;

        const img = this.imgRef.current;

        img.addEventListener('mouseenter', e =>
        {
            this.imgTween?.kill();
            this.imgTween = TweenMax.to(this, .3, {imgBrightness:20, onUpdate:() => this.setImgBrightness()});
        });

        img.addEventListener('mouseleave', e =>
        {
            this.imgTween?.kill();
            this.imgTween = TweenMax.to(this, .3, {imgBrightness:0, onUpdate:() => this.setImgBrightness()});
        });
    }


    setImgBrightness()
    {
        const b = 100 + this.imgBrightness * (1-this.props.activeProgress);
        if (this.imgRef)
        {
            this.imgRef.current.style.filter = "brightness(" + b + "%)" + " saturate(" + b + "%)";
        }
    }


    render()
    {
        this.setImgBrightness();

        const style = this.props.style;
        let imgHeight = Math.min(style.height * (1 - this.props.activeProgress * .3), style.width * .5625) *.94;
        let imgWidth = imgHeight * 1.7778;

        const offsetPercent = this.props.activeProgress * 10;

        const imgStyle:CSSProperties =
        {
            position:"absolute",
            top:(50 - offsetPercent) + "%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            height:imgHeight
        };

        const fontSize = Math.min(22, Math.min(window.innerHeight * .03, window.innerWidth * .03));

        const showVideo = this.props.activeProgress === 1;
        const thumbSrc = "./img/thumb_" + this.props.data.thumbId + ".png";

        let video;
        if (this.props.data.video && showVideo)
        {
            video = <video ref={this.videoRef}
                style={imgStyle}
                poster={thumbSrc}
                src={"./video/" + this.props.data.video}
                controls={showVideo}
                onClick={this.onVideoClick.bind(this)}
            />;
        }

        const infoContainerStyle:CSSProperties =
        {
            position:"absolute",
            left:"50%",
            top:style.height * (.5 - offsetPercent * .01) + .5 * imgHeight,
            opacity:Util.clamp((this.props.activeProgress-0.95) * 20, 0, 1),
            color:"#ffffff",
            fontWeight:300,
            fontSize:fontSize,
            transform:"translate(-50%, 0%)",
            background: "linear-gradient(180deg, rgba(10,20,30,0.3) 0%, rgba(10,20,30,0) 100%)"
        };

        const tableStyle =
        {
            paddingTop:(fontSize * .5) + "px",
            width:imgWidth
        };

        const infoTable = <table style={tableStyle} className="unselectable">
            <tbody style={{}}>
            {
                this.props.data.infoTitles.map((t:any, index:number) =>
                {
                    return (<tr style={{paddingTop:fontSize}} key={index}>
                        <td style={{color:"#ffdd70", width:"20%", verticalAlign:"top"}}>{this.props.data.infoTitles[index]}</td>
                        <td style={{paddingLeft:fontSize, width:"80%"}}>{this.props.data.infoTexts[index]}</td>
                    </tr>);
                })
            }
            </tbody>
        </table>;

        const reflectionStyle:CSSProperties =
        {
            position:"absolute",
            width:imgWidth * 1.11,
            left:"50%",
            top:"100%",
            transform:"translate(-50%, 0%)"
        };

        this.imgRef = React.createRef();

        return (
            <div style={style} onClick={() => this.props.onClickHandler(this.props.index)}>
                {<img alt="n.a." src={thumbSrc} style={imgStyle} ref={this.imgRef}/>}
                {video}
                <div style={infoContainerStyle}>
                    {infoTable}
                </div>
                <img style={reflectionStyle} alt="" src="./img/item_reflection.png"/>
            </div>);
    }


    onVideoClick(e:Event)
    {
        e.stopPropagation();
    }


}
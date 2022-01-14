import React, {CSSProperties} from "react";
import Util from "./util/Util";

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

    constructor(props:undefined)
    {
        super(props);

        const style = this.props.style;
        style.display = "flex";
        style.flexDirection = "column";

        this.videoRef = React.createRef();
    }


    componentDidMount():void
    {
        this.video = this.videoRef.current;
    }


    render()
    {
        let imgHeight = Math.min(this.props.style.height * (1 - this.props.activeProgress * .3), this.props.style.width * .5625) *.94;
        let imgWidth = imgHeight * 1.7778;

        const offsetPercent = this.props.activeProgress * 10;

        const imgStyle:CSSProperties =
        {
            position:"absolute",
            top:(50 - offsetPercent) + "%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            zIndex:0,
            height:imgHeight
        };

        const fontSize = Math.min(22, Math.min(window.innerHeight * .03, window.innerWidth * .03));

        const infoContainerStyle:CSSProperties =
        {
            position:"absolute",
            left:"50%",
            top:this.props.style.height * (.5 - offsetPercent * .01) + .5 * imgHeight,
            opacity:Util.clamp((this.props.activeProgress-0.95) * 20, 0, 1),
            color:"#ffffff",
            fontWeight:300,
            fontSize:fontSize,
            transform:"translate(-50%, 0%)",
            pointerEvents:"none"
        };

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

        const thumb = <img src={thumbSrc} style={imgStyle}/>;

        if (this.video && !showVideo && !this.video.paused)
        {
            this.video.pause();
        }

        const infoTable = <table style={{width:imgWidth, background: "linear-gradient(180deg, rgba(10,20,30,0.6) 0%, rgba(10,20,30,0) 100%)"}}>
            <tbody>
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

        return (
            <div style={this.props.style} onClick={() => this.props.onClickHandler(this.props.index)}>
                {thumb}
                {video}
                <div style={infoContainerStyle}>
                    {infoTable}
                </div>
            </div>);
    }


    onVideoClick(e:Event)
    {
        e.stopPropagation();
    }


}
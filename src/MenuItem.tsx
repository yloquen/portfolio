import React, {CSSProperties} from "react";
import Util from "./util/Util";

type MenuParams =
{
    data:any,
    style:any,
    index:number,
    activeProgress:number,
    coverColor:string,
    coverOpacity:number,
    onClickHandler:Function
};

export default class MenuItem extends React.Component<MenuParams, undefined>
{
    private videoRef:React.RefObject<HTMLVideoElement>;
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
        const opacity = this.props.coverOpacity * (1 - this.props.activeProgress);
        const coverStyle:CSSProperties =
        {
            position:"absolute",
            top:"-1%",
            left:"-1%",
            width:"102%",
            height:"102%",
            backgroundColor:this.props.coverColor,
            opacity:opacity,
            zIndex:1,
            pointerEvents:"none"
        };

        const imgWidth = 92 - this.props.activeProgress * 40;
        const imgStyle:CSSProperties =
        {
            position:"absolute",
            width:imgWidth + "%",
            top:"50%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            zIndex:0
        };

        const infoY = window.innerHeight * .5 - window.innerWidth * .22;

        const infoContainerStyle:CSSProperties =
        {
            position:"absolute",
            top:infoY + "px",
            left:"24%",
            opacity:Util.clamp((this.props.activeProgress-0.9) * 10, 0, 1),
            color:"#ffffff",
            fontWeight:300,
            fontSize:"0.8rem",
            display:"flex",
            flexDirection:"row",
            width:imgWidth + "%"
        };

        const showVideo = this.props.activeProgress === 1;
        const thumbSrc = "./img/thumb_" + this.props.data.thumbId + ".png";

        let video =
            <video ref={this.videoRef}
                   style={imgStyle}
                   poster={thumbSrc}
                   src={"./video/" + this.props.data.video}
                   controls={showVideo}/>;

        video = showVideo ? video : undefined;

        const thumb = <img src={thumbSrc} style={imgStyle}/>;

        if (this.video && !showVideo && !this.video.paused)
        {
            this.video.pause();
        }

        const infoTitleStyle = { marginBottom:"0.1rem", marginRight:"0.2rem"};
        const infoTextStyle = { marginBottom:"0.1rem"};

        const infoTitles = this.props.data.infoTitles.map((t:any) => { return <div style={infoTitleStyle}>{t}</div> });
        const infoTexts = this.props.data.infoTexts.map((t:any) => { return <div style={infoTextStyle}>{t}</div> });

        return (
            <div style={this.props.style} onClick={() => this.props.onClickHandler(this.props.index)}>
                {<div style={coverStyle}/>}
                {thumb}
                {video}
                <div style={infoContainerStyle}>
                    <div style={infoTitleStyle}>{infoTitles}</div>
                    <div style={infoTextStyle}>{infoTexts}</div>
                </div>
            </div>);
    }


}
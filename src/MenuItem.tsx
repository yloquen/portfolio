import React, {CSSProperties} from "react";
import Util from "./util/Util";

type MenuParams =
{
    style:any,
    index:number,
    activeProgress:number,
    coverColor:string,
    coverOpacity:number,
    onClickHandler:Function
};

export default class MenuItem extends React.Component<MenuParams, undefined>
{


    constructor(props:undefined)
    {
        super(props);

        const style = this.props.style;
        style.display = "flex";
        style.flexDirection = "column";
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
            cursor:"pointer",
            zIndex:1,
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

        const infoY = window.innerHeight * .5 + window.innerWidth * .16;

        const infoStyle:CSSProperties =
        {
            position:"absolute",
            top:infoY + "px",
            left:"24%",
            opacity:Util.clamp((this.props.activeProgress-0.9) * 10, 0, 1),
            color:"#ffffff",
            fontWeight:300
        };

        return (
            <div style={this.props.style} onClick={() => this.props.onClickHandler(this.props.index)}>
                <div style={coverStyle}/>
                <img src="./img/thumb_1.png" style={imgStyle}/>
                <div style={infoStyle}>
                    <div>Pigs & Bricks</div>
                    <div>2D Arcade Platforming Game</div>
                    <div>Frontend programming, backend programming</div>
                    <div>Actionscript 3, Starling, Spine, Java, SQL</div>
                </div>
            </div>);
    }


}
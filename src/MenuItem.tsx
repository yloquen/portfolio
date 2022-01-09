import React, {CSSProperties} from "react";


type MenuParams =
    {
        style:any,
        index:number,
        activeProgress:number,
        coverColor:string,
        coverOpacity:number,
        onClickHandler:Function};

export default class MenuItem extends React.Component<MenuParams, undefined>
{


    constructor(props:undefined)
    {
        super(props);
    }


    render()
    {
        const imgStyle:CSSProperties =
        {
            position:"absolute",
            height:"92%",
            top:"50%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            zIndex:0
        };

        const opacity = this.props.coverOpacity * (1 - this.props.activeProgress);

        const coverStyle:CSSProperties =
        {
            position:"absolute",
            width:"100%",
            height:"100%",
            backgroundColor:this.props.coverColor,
            opacity:opacity,
            outline:"5px solid" + this.props.coverColor,
            cursor:"pointer",
            zIndex:1,
        };

        return (
            <div style={this.props.style} onClick={() => this.props.onClickHandler(this.props.index)}>
                <div style={coverStyle}/>
                <img src="./img/thumb_1.png" style={imgStyle}/>
            </div>);
    }


}
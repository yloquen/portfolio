import React, {CSSProperties, LegacyRef} from "react";
import Util from "./util/Util";
import TweenMax from "gsap";

export default class Prompt extends React.Component<any, any>
{
    private readonly arrowRef:React.RefObject<HTMLImageElement>;
    private arrowTween:gsap.core.Tween;

    constructor(props:any)
    {
        super(props);
        this.arrowRef = React.createRef();
    }


    componentDidMount():void
    {
        const s = {opacity:1};
        this.arrowTween = TweenMax.to(this.arrowRef.current, 1, {opacity:0.5, repeat:-1, yoyo:true});
    }


    render()
    {
        const isMobile = Util.isMobile();
        const imgSrc = "./img/prompt_" + (isMobile ? "mobile" : "desktop") + ".png";

        const promptStyle:CSSProperties =
        {
            position:"fixed",
            bottom:0,
            left:"67vw",
            opacity:this.props.style.opacity,
            height:"25vh",
            transform: "translate(-50%, 0%)"
        };

        const arrowStyle:CSSProperties =
        {
            position:"fixed",
            bottom:"20vh",
            left:"67vw",
            opacity:this.props.style.opacity,
            height:"2.5vh"
        };

        if (isMobile)
        {
            arrowStyle.transform = "translate(-50%, 0%) rotate(180deg)"
        }
        else
        {
            arrowStyle.transform = "translate(-50%, 0%)"
        }

        return (<div>
            <img style={promptStyle} alt="" src={imgSrc}/>
            <img ref={this.arrowRef} style={arrowStyle} alt="" src="./img/prompt_arrow.png"/>
            </div>);
    }


    componentWillUnmount():void
    {
        this.arrowTween.kill();
    }

}
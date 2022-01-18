import React, {CSSProperties, LegacyRef} from "react";
import Util from "./util/Util";
import TweenMax from "gsap";

export default class Prompt extends React.Component<any, any>
{
    private readonly promptRef:React.RefObject<HTMLImageElement>;
    private readonly wheelRef:React.RefObject<HTMLImageElement>;
    private wheelTween:gsap.core.Tween;
    private images:any[];

    constructor(props:any)
    {
        super(props);
        this.promptRef = React.createRef();
        this.wheelRef = React.createRef();
        this.images = [];

        const numFrames = 6;
        for (let frameIdx=1; frameIdx <= numFrames; frameIdx++)
        {
            this.images.push(<img alt="" src={"./img/wheel_" + frameIdx + ".png"}/>);
        }
    }


    componentDidMount():void
    {
        if (Util.isMobile())
        {
            TweenMax.to(this.promptRef.current, 1.5, {bottom:-200, repeat:-1});
        }
        else
        {
            const numFrames = 6;
            let frame = 0;

            this.wheelTween = TweenMax.to(this.wheelRef.current, .03, {repeat:-1, delay:.5, onRepeat:() =>
                {
                    const img:HTMLImageElement = this.wheelRef.current;
                    frame = (++frame % numFrames);
                    img.src = "./img/wheel_" + (1+frame) + ".png";
                }});
        }
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

        const wheelStyle:CSSProperties =
        {
            position:"fixed",
            bottom:"9vh",
            left:"67vw",
            opacity:this.props.style.opacity,
            height:"11vh"
        };

        if (isMobile)
        {
            wheelStyle.transform = "translate(-50%, 0%) rotate(180deg)"
        }
        else
        {
            wheelStyle.transform = "translate(-50%, 0%)"
        }

        let wheel = isMobile ? undefined : <img ref={this.wheelRef} style={wheelStyle} alt="" src="./img/wheel_1.png"/>;

        return (<div>
            <img ref={this.promptRef} style={promptStyle} alt="" src={imgSrc}/>
            {wheel}
            </div>);
    }


    componentWillUnmount():void
    {
        this.wheelTween?.kill();
    }

}
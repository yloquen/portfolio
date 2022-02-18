import React, {CSSProperties, LegacyRef, RefObject} from "react";
import Util from "./util/Util";
import TweenMax from "gsap";

export default class Prompt extends React.Component<any, any>
{
    private readonly promptRef:React.RefObject<HTMLImageElement>;
    private wheelTween:gsap.core.Tween;
    private wheelImgs:any[];
    private wheelImgRefs:React.RefObject<HTMLImageElement>[] | undefined;

    constructor(props:any)
    {
        super(props);

        this.promptRef = React.createRef();

        if (!Util.isMobile())
        {
            this.wheelImgs = [];
            this.wheelImgRefs = [];

            const wheelStyle:any =
            {
                position:"fixed",
                bottom: "9vh",
                left: "67vw",
                height: "11vh",
                transform: "translate(-50%, 0%)"
            };

            for (let imgIdx=1; imgIdx <= 6; imgIdx++)
            {
                const ref:React.RefObject<HTMLImageElement> = React.createRef();
                const s = {};
                Object.assign(s, wheelStyle);
                this.wheelImgs.push(<img ref={ref} key={imgIdx} style={s} alt="" src={"./img/wheel_" + imgIdx + ".png"}/>);
                this.wheelImgRefs.push(ref);
            }
        }
    }


    componentDidMount():void
    {
        TweenMax.from(this.promptRef.current, .5, {alpha:0, delay:.5});
        if (Util.isMobile())
        {
            TweenMax.to(this.promptRef.current, 1.5, {bottom:-200, repeat:-1});
        }
        else
        {
            this.wheelImgRefs.forEach(wi =>
            {
                TweenMax.from(wi.current, .5, {alpha:0, delay:.5});
            });

            const numFrames = 6;
            let frame = 0;

            this.wheelTween = TweenMax.to({}, .03, {repeat:-1, onRepeat:() =>
            {
                frame = (++frame % numFrames);

                for (let imgIdx = 0; imgIdx < this.wheelImgRefs.length; imgIdx++)
                {
                    const wheelImgRef = this.wheelImgRefs[imgIdx];
                    wheelImgRef.current.style.display = imgIdx === frame ? "block" : "none";
                }
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




        return (<div>
            <img ref={this.promptRef} style={promptStyle} alt="" src={imgSrc}/>
            {this.wheelImgs}
            </div>);
    }


    componentWillUnmount():void
    {
        this.wheelTween?.kill();
    }

}
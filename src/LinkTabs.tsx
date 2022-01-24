import React, {CSSProperties, LegacyRef, Ref, RefObject} from "react";
import Util from "./util/Util";
import TweenMax from "gsap";
import {Back} from "gsap";

export default class LinkTabs extends React.Component<{}, any>
{
    private links:any[];
    private images:RefObject<HTMLImageElement>[];
    private containerWidth:number;
    private containerHeight:number;

    constructor(props:{})
    {
        super(props);
        this.images = [];
    }


    componentDidMount():void
    {
        this.images.forEach((imgRef:RefObject<HTMLImageElement>, index:number) =>
        {
            const img = imgRef.current;
            TweenMax.from(img, .4, {delay:1.5 + index* .45, height:"0vh", ease:Back.easeOut});

            img.addEventListener('mouseenter', e =>
            {
                TweenMax.to(img, .1, {height:this.containerHeight * .45, opacity:1});
            });
            img.addEventListener('mouseleave', e =>
            {
                TweenMax.to(img, .1, {height:this.containerHeight * .4, opacity:.9});
            });
        });
    }


    render()
    {
        this.containerWidth = Math.min(window.innerWidth * .3, window.innerHeight * .15);
        // noinspection JSSuspiciousNameCombination
        this.containerHeight = this.containerWidth;

        const containerStyle:CSSProperties =
        {
            position:"absolute",
            right:"0px",
            top:"10vh",
            width:this.containerWidth + "px",
            height:this.containerHeight + "px"
        };

        const linkStyle =
        {
            position:"absolute",
            right:"0px",
            opacity:"0.9",
            transform:"translate(0%,-50%)"
        };

        const imgStyle =
        {
            height:this.containerHeight * .4
        };

        const linksData =
        [
            {
                url:"https://www.linkedin.com/in/ivan-kostov-65679717a/",
                img:"./img/linkedin_logo.png"
            },
            {
                url:"https://github.com/yloquen?tab=repositories",
                img:"./img/github_logo.png"
            },
        ];

        const links = linksData.map((linkData:any, index:number) =>
        {
            const ref:RefObject<HTMLImageElement> = React.createRef();
            this.images.push(ref);
            const style:any = {};
            style.top = (25 + index * 50) + "%";
            Object.assign(style, linkStyle);
            return (<a href={linkData.url} target="_blank" style={style} key={index}>
                <img src={linkData.img} alt="" style={imgStyle} ref={ref}/>
            </a>)
        });


        return(<div style={containerStyle}>
            {links}
        </div>)

    }

}
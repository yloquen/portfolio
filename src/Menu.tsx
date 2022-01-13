import React, {CSSProperties} from "react";
import TweenMax from "gsap";

import * as math from "mathjs";
import MenuItem from "./MenuItem";
import Util from "./util/Util";


type MenuState = {z:number, activeProgress:number, targetZ:number}

export default class Menu extends React.Component<{}, MenuState>
{
    private readonly rotMatrix:math.Matrix;
    private readonly step:number;
    private items:any[];
    private activeIndex:number = -1;
    private stateClone:MenuState;
    private itemsData:any[];
    private itemCovers:any[];
    private maxZ:number;

    constructor(props:undefined)
    {
        super(props);

        this.step = 60;

        const infoTitles =
        [
            "Name",
            "Description",
            "Platforms",
            "Role",
            "Technologies"
        ];

        this.itemsData =
        [
            {
                thumbId:1,
                video:"pigs_bricks.mp4",
                infoTexts:
                [
                    "Pigs & Bricks",
                    "2D Arcade Platforming Game",
                    "Android, iOS",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:2,
                video:"svara_new_1.mp4",
                infoTexts:
                [
                    "VIP Svara",
                    "Online Card Game",
                    "Android, iOS, Web",
                    "Frontend programming",
                    "Javascript, PIXI"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:3,
                video:"domain.mp4",
                infoTexts:
                [
                    "Domain of the Black Stars",
                    "Solitaire Card Game",
                    "Web",
                    "Frontend programming",
                    "Typescript, PIXI"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:4,
                infoTexts:
                [
                    "Ampslide",
                    "Web presentation player",
                    "Web",
                    "Frontend programming",
                    "React.js"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:1,
                infoTexts:
                [
                    "Pigs & Bricks",
                    "",
                    "2D Arcade Platforming Game",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:1,
                infoTexts:
                [
                    "Pigs & Bricks",
                    "",
                    "2D Arcade Platforming Game",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:1,
                infoTexts:
                [
                    "Pigs & Bricks",
                    "",
                    "2D Arcade Platforming Game",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:1,
                infoTexts:
                [
                    "Pigs & Bricks",
                    "",
                    "2D Arcade Platforming Game",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            },
            {
                thumbId:1,
                infoTexts:
                [
                    "Pigs & Bricks",
                    "",
                    "2D Arcade Platforming Game",
                    "Frontend programming, backend programming",
                    "Actionscript 3, Starling, Spine, Java, SQL"
                ],
                infoTitles:infoTitles
            }

        ];

        this.state =
        {
            z:0,
            activeProgress:0,
            targetZ:0
        };

        this.maxZ = (this.itemsData.length-1) * this.step;

        this.stateClone = {z:0, activeProgress:0, targetZ:0};

        const angle = Math.PI * -.4;
        const sinT = Math.sin(angle);
        const cosT = Math.cos(angle);

        this.rotMatrix = math.matrix([
            [1,0,0],
            [0,cosT,-sinT],
            [0,sinT,cosT]
        ]);

        this.setupEvents();
    }


    setupEvents()
    {
        window.addEventListener('resize', () => this.setState(this.stateClone));
        window.addEventListener('wheel', (e:WheelEvent) =>
        {
            TweenMax.killTweensOf(this.stateClone);

            const sign = Math.sign(e.deltaY);
            this.scrollTo(this.stateClone.targetZ - sign * this.step);
        });

        let startTouch:undefined|Touch;
        let listener;
        window.addEventListener('touchstart', (e:TouchEvent) =>
        {
            if (startTouch)
            {
                return;
            }
            startTouch = e.changedTouches[0];
            window.addEventListener('touchmove', touchMoveHandler);
        });

        window.addEventListener('touchend', (e:TouchEvent) =>
        {
            startTouch = undefined;
            window.removeEventListener('touchmove', touchMoveHandler);
        });

        const touchMoveHandler = (e:TouchEvent) =>
        {
            const d = Math.round((startTouch.clientY - e.changedTouches[0].clientY) * 10 / window.innerHeight);
            this.scrollTo(d * this.step);
            console.log(d);
        };
    }


    scrollTo(newTargetZ:number)
    {
        this.stateClone.targetZ = Util.clamp(newTargetZ, 0, this.maxZ);

        const dur = .5;//(Math.abs(this.stateClone.z - targetZ) * .5) / this.step;

        if (this.activeIndex !== -1)
        {
            TweenMax.to({}, dur, {onComplete:() => { this.activeIndex = -1 }});
        }

        TweenMax.to(this.stateClone, dur, {z:this.stateClone.targetZ, activeProgress:0, onUpdate:() => { this.setState(this.stateClone); }});
    }


    render()
    {

        const numItems = this.itemsData.length;
        this.items = [];
        this.itemCovers = [];
        for (let itemIdx=0; itemIdx < this.itemsData.length; itemIdx++)
        {
            const itemData = this.itemsData[itemIdx];
            const camPos = math.matrix([[0, -20, this.state.z]]);

            const d = 17;

            const y = 0;
            const z = -10 + itemIdx * this.step;
            const x = ((itemIdx % 2)*2 - 1) * 50;

            let tempPos:any = math.matrix([[x,y,z]]);
            tempPos = math.subtract(tempPos, camPos);
            tempPos = math.multiply(tempPos, this.rotMatrix);

            const zFinal = tempPos.get([0,2]);

            const xp = d * (tempPos.get([0,0]) / (zFinal + d));
            const yp = d * (tempPos.get([0,1]) / (zFinal + d));

            const wMenu = (d * (80 / (zFinal + d))) * 0.01 * window.innerWidth;
            const hMenu = wMenu * .585;

            const screenCenterX = 50;
            const screenCenterY = 50;

            const xMenu = screenCenterX + xp;
            const yMenu = screenCenterY + yp;

            let xActive = xMenu;
            let yActive = yMenu;

            let wActive = wMenu;
            let hActive = hMenu;

            let zIndex = -itemIdx;

            if (itemIdx === this.activeIndex)
            {
                xActive = screenCenterX;
                yActive = screenCenterY;
                wActive = window.innerWidth;
                hActive = window.innerHeight;
                zIndex = 1;
            }

            const oneMinusActProgress = (1 - this.state.activeProgress);

            const xFinal = xActive + (-xActive + xMenu) * oneMinusActProgress;
            const yFinal = yActive + (-yActive + yMenu) * oneMinusActProgress;

            const wFinal = wActive + (-wActive + wMenu) * oneMinusActProgress;
            const hFinal = hActive + (-hActive + hMenu) * oneMinusActProgress;

            const style:any =
            {
                position:"absolute",
                width:wFinal,
                height:hFinal,
                backgroundColor:"#1a3470",
                left:xFinal + "%",
                top:yFinal + "%",
                transform:"translate(-50%,-50%)",
                zIndex:zIndex,
                cursor:"pointer"
            };

            const cutoffZ = 10;
            const cutoffBand = 5;

            let coverOpacity = 0;

            if (zFinal < cutoffZ)
            {
                if (zFinal < cutoffZ - cutoffBand)
                {
                    style.display = "none";
                }
                else
                {
                    coverOpacity = 1 - Math.max(0, 1 - (cutoffZ - zFinal) / cutoffBand );
                }
            }

            const farCutoff = 20;
            const farCutoffBand = 80;
            if (zFinal > farCutoff)
            {
                coverOpacity = 1 - Math.max(0, 1 - (zFinal-farCutoff)/farCutoffBand);
            }

            const item = <MenuItem
                key={itemIdx}
                data={itemData}
                style={style}
                activeProgress={itemIdx === this.activeIndex ? this.state.activeProgress : 0}
                index={itemIdx}
                onClickHandler={this.itemClickHandler.bind(this)}/>;

            this.items.push(item);


            if (itemIdx === this.activeIndex)
            {
                coverOpacity *= (1 - this.state.activeProgress);
            }

            const coverStyle:CSSProperties =
            {
                position:"absolute",
                width:wFinal + "px",
                height:hFinal + "px",
                backgroundColor:"#12295e",
                left:xFinal + "%",
                top:yFinal + "%",
                transform:"translate(-50%,-50%)",
                opacity:coverOpacity,
                zIndex:zIndex,
                pointerEvents:"none"
            };

            const cover = <div style={coverStyle} key={itemIdx}/>
            this.itemCovers.push(cover);
        }

        const menuStyle =
        {
            maxWidth:"100%",
            overflow:"hidden"
        };

        return (<div style={menuStyle}>
            {this.items}
            {this.itemCovers}
        </div>);
    }


    itemClickHandler(index:number)
    {
        if (this.activeIndex === -1)
        {
            this.activeIndex = index;
            TweenMax.killTweensOf(this.stateClone);
            TweenMax.to(this.stateClone, .5, {activeProgress:1, onUpdate:() => { this.setState(this.stateClone); }});
        }
        else
        {
            const dur = .5;
            TweenMax.to({}, dur, {onComplete:() => { this.activeIndex = -1 }});
            TweenMax.to(this.stateClone, dur, {z:this.stateClone.targetZ, activeProgress:0, onUpdate:() => { this.setState(this.stateClone); }})
        }
    }


}
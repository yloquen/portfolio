import React from "react";
import TweenMax from "gsap";

import * as math from "mathjs";
import MenuItem from "./MenuItem";


type MenuState = {z:number}

export default class Menu extends React.Component<{}, MenuState>
{
    private readonly rotMatrix:math.Matrix;
    private readonly step:number;

    constructor(props:undefined)
    {
        super(props);

        this.step = 400;

        this.state =
        {
            z:0
        };

        const o = {z:0};

        window.addEventListener('wheel', (e:WheelEvent) =>
        {
            TweenMax.killTweensOf(o);

            const sign = Math.sign(e.deltaY);

            const targetZ = Math.max(0, Math.min(5000, o.z - sign * this.step ));

            const dur = (Math.abs(o.z - targetZ) * .5) / this.step;

            TweenMax.to(o, dur, {z:targetZ, onUpdate:() => { this.setState({z:o.z}); }})
        });

        const angle = Math.PI * -.4;
        const sinT = Math.sin(angle);
        const cosT = Math.cos(angle);

        this.rotMatrix = math.matrix([
            [1,0,0],
            [0,cosT,-sinT],
            [0,sinT,cosT]
        ]);

    }


    render()
    {
        const itemsData =
        [
            {},{},{},{},{},
            {},{},{},{},{}
        ];

        const numItems = itemsData.length;

        const items = itemsData.map((itemData:any, index:number) =>
        {
            const camPos = math.matrix([[0, -200, this.state.z]]);

            const d = 150;

            const y = 0;
            const z = -250 + index * this.step;
            const x = ((index % 2)*2 - 1) * (800);

            let tempPos:any = math.matrix([[x,y,z]]);
            tempPos = math.subtract(tempPos, camPos);
            tempPos = math.multiply(tempPos, this.rotMatrix);

            const zFinal = tempPos.get([0,2]);

            const xp = d * (tempPos.get([0,0]) / (zFinal + d));
            const yp = d * (tempPos.get([0,1]) / (zFinal + d));

            const w = d * (1200 / (zFinal + d));
            const h = d * (740 / (zFinal + d));

            const sw = window.innerWidth;
            const sh = window.innerHeight;

            const style:any =
            {
                position:"absolute",
                width:w + "px",
                height:h + "px",
                backgroundColor:"#6080a0",
                left:(sw * .5) + xp + "px",
                top:(sh * .5) + yp + "px",
                transform:"translate(-50%,-50%)",
                zIndex:-index
            };

            const cutoffZ = 100;
            const cutoffBand = 100;
            if (zFinal < cutoffZ)
            {
                if (zFinal < cutoffZ - cutoffBand)
                {
                    style.display = "none";
                }
                else
                {
                    style.opacity = Math.max(0, 1 - (cutoffZ - zFinal) / cutoffBand );
                }
            }

            const farCutoff = 200;
            const farCutoffBand = 1000;
            if (zFinal > farCutoff)
            {
                style.opacity = Math.max(0, 1 - (zFinal-farCutoff)/1500);
            }

            return <MenuItem style={style}/>;
        });

        return (<div>
            {items}
        </div>);
    }
}
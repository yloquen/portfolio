import React from "react";
import { TweenMax, Power3 } from "gsap";
// const math = require('mathjs');

import * as math from "mathjs";


type MenuState = {z:number}

export default class Menu extends React.Component<undefined, MenuState>
{
    private rotMatrix:math.Matrix;

    constructor(props:undefined)
    {
        super(props);
        this.state =
        {
            z:0
        };

        const o = {z:0};

        window.addEventListener('wheel', (e:WheelEvent) =>
        {
            TweenMax.killTweensOf(o);

            const targetZ = Math.max(0, Math.min(2000, o.z + -1.5 * e.deltaY));

            TweenMax.to(o, .5, {z:targetZ, onUpdate:() => { this.setState({z:o.z}); }})
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
            {},
            {},
            {},
            {},
            {},
            {}
        ];

        const numItems = itemsData.length;

        const items = itemsData.map((itemData:any, index:number) =>
        {
            const camPos = math.matrix([[0, -100, this.state.z]]);

            const d = 50;

            const x = ((index%2)*2 - 1) * 900;
            const y = 0;
            const z = 20 + index * 400;

            let tempPos = math.matrix([[x,y,z]]);
            tempPos = math.subtract(tempPos, camPos);
            tempPos = math.multiply(tempPos, this.rotMatrix);

            const zFinal = tempPos.get([0,2]);

            const xp = d * (tempPos.get([0,0]) / (zFinal + d));
            const yp = d * (tempPos.get([0,1]) / (zFinal + d));

            const w = d * (900 / (zFinal + d));
            const h = d * (600 / (zFinal + d));

            const sw = window.innerWidth;
            const sh = window.innerHeight;

            const style:any =
            {
                position:"absolute",
                width:w + "px",
                height:h + "px",
                backgroundColor:"#507090",
                left:(sw * .5) + xp + "px",
                top:(sh * .5) + yp + "px",
                transform:"translate(-50%,-50%)",
                zIndex:-index
            };

            if (zFinal < 100)
            {
                style.opacity = Math.max(0, zFinal/50 - 1);
                if (zFinal < 50)
                {
                    style.display = "none";
                }
            }

            if (zFinal > 400)
            {
                style.opacity = Math.max(0, 1 - (zFinal-400)/500);
            }

            return <div style={style}/>;
        });

        return (<div>
            {items}
        </div>);
    }
}
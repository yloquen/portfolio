import React from "react";
import { TweenMax } from "gsap";

export default class Menu extends React.Component<any, any>
{

    constructor(props:any)
    {
        super(props);
        this.state =
        {
            zPos:0
        };

        document.addEventListener('keydown', (e:KeyboardEvent) =>
        {
            const o = {z:0};
            TweenMax.to(o, 5, {z:1, onUpdate:() =>
                {
                    this.setState({zPos:o.z});
                }})
        });

    }


    render()
    {
        const itemsData =
        [
            {},
            {},
            {},
            {}
        ];

        console.log(this.state.zPos);

        const items = itemsData.map((itemsData:any, index:number) =>
        {
            const style:any =
            {
                position:"absolute",
                width:"120px",
                height:"80px",
                backgroundColor:"#ff00ff",
                left:"50%",
                top:(100 + this.state.zPos * 100 + index * 150) + "px"
            };

            return <div style={style}/>;
        });

        return (<div>
            {items}
        </div>);
    }
}
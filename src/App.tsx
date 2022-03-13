import React, {useState} from 'react';
import Menu from "./Menu";
import Prompt from "./Prompt";
import TweenMax from "gsap";


export default function App()
{
    const [opacity, setOpacity] = useState(1);

    let tweenObj = {opacity:1};

    const scrollCallback = () =>
    {
        TweenMax.to(tweenObj, .25, {opacity:0, onUpdate:() => { setOpacity(tweenObj.opacity); }});
    };

    return <div>
        <Menu scrollCallback={scrollCallback}/>
        {opacity > 0 ? <Prompt style={{opacity:opacity}}/> : undefined}
    </div>
}

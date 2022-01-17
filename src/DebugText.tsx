import React from "react";

export const DebugText = (props:{dataGetter:Function}) =>
{
    return (<div style={{position:"fixed", color:"#ffffff", fontSize:"2rem"}}>
        {props.dataGetter()}
    </div>);
};
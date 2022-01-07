import React from "react";


export default class MenuItem extends React.Component<{style:any}, undefined>
{


    constructor(props:undefined)
    {
        super(props);
    }


    render()
    {
        const imgStyle =
        {
            position:"absolute",
            width:"92%",
            top:"50%",
            left:"50%",
            transform:"translate(-50%,-50%)"
        };

        return (
            <a href="https://www.google.com" target="_blank">
                <div style={this.props.style}>
                    <img src="./img/thumb_1.png" style={imgStyle}/>
                </div>
            </a>
)
    }


}
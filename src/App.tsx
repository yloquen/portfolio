import React from 'react';
import Menu from "./Menu";



export default function App()
{
    const menuData =
    [
        {},
        {},
        {}
    ];

    menuData.map((menuItemData:any, index:number) =>
    {

    });

    let menuPos = 0;
    let menuMaxPos = 3;

    document.addEventListener('keydown', (e:KeyboardEvent) =>
    {
        // console.log(e.code);

/*        if (e.code === 'ArrowUp' && menuPos < menuMaxPos)
        {

        }
        else if (e.code === 'ArrowDown' && menuPos > 0)
        {

        }*/
    });

    return <Menu/>
}

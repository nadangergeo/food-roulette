import React from 'react';


const Tau = 2 * Math.PI;

const Spinner = ({items, width, height, isSpinning}) => {

    const containerStyle = {
        display: "relative",
        backgroundColor: "blue",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        overflow: "hidden"
    }

    const itemWidth = width / 20;
    const itemHeight = itemWidth;

    const itemStyleBase = {
        backgroundColor: "red",
        position: "absolute",
        // width: ((itemWidth / width) * 100) + "%",
        // height: ((itemHeight / height) * 100) + "%",
        width: itemWidth + "px",
        height: itemHeight + "px"
    }

    const r = width / 2;
    const deltaV = Tau / items.length;

    console.log("width", width);
    console.log("height", height);
    console.log("itemWidth", itemWidth);
    console.log("itemHeight", itemHeight);
    console.log("isSpinning", isSpinning);

    let itemsToRender = items.map( ( item, index ) => {
        let v = deltaV * index;
        let x = ((Math.cos(v) * r) - itemWidth/2).toFixed(3);
        let y = ((Math.sin(v) * r) - itemHeight/2).toFixed(3);

        console.log(index);
        console.log("v", v);
        console.log("x", x);
        console.log("y", y);

        let itemStyle = {
            ...itemStyleBase,
            backgroundImage: "url('" + item.imgSrc + "')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            top: "50%",
            left: "50%",
            transform: "translate(" + x + "px," + y + "px)"
        }

        return <div style={itemStyle}></div>
    });

    return (
        <div style={containerStyle}>
            { itemsToRender }
        </div>
    );
}

export default Spinner;
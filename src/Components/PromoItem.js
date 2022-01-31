import React/*, { useState, useEffect }*/ from 'react';


export default function PromoItemMiniBox(props) {
    return <button id={props.ID} key={props.ID} className="btn Item-Box btn-light" onClick={() => props.AddCartItemByID(props.Data.ID)}>
        <div style={{ "display": "flex", "justifyContent": "center" }}>
            <img src={props.Data.ImageData.URL} alt='promo Item' style={
                {
                    height: props.Data.ImageData.Dimensions.Height,
                    width: props.Data.ImageData.Dimensions.Width,
                    margin: props.Data.ImageData.Dimensions.OffsetHeight + "px "+ props.Data.ImageData.Dimensions.OffsetWidth+"px",
                }} />
            <br />
        </div>
        <span style={{ "height": "40px", "fontSize": "1.5em" }}>
            {props.Data.Name.length > 20 && <span> {props.Data.Name.substring(0, 18)}... </span>}
            {props.Data.Name.length <= 20 && <span> {props.Data.Name} </span>}
        </span>
        <br />
        <span style={{ "fontWeight": "bold", "height": "40px", "fontSize": "2em" }}> £{props.Data.Price} </span>
    </button>
}
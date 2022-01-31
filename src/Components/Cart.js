import React, { useState, useEffect } from 'react'


export default function MiniShoppingCart(props) {
    return <table id="Cart" className="table table-striped header-fixed" style={{ "backgroundColor": "white",tableLayout:"fixed" }}>
        <thead>
            <tr>
                <th scope="col" style={{ "width": (props.Admin) ? "50%" : "70%" }}>Name</th>
                <th scope="col" style={{ "width": "10%" }}>QTY</th>
                <th scope="col" style={{ "width": "20%" }}>Price</th>
                {props.Admin && <th scope="col" style={{ "width": "20%" }}>X</th>}
            </tr>
        </thead>
        <tbody>
            {props.InputBox !== "" && props.InputBox}
            {props.Items}

        </tbody>
    </table>;
}

//element.addEventListener('taphold', ...)

export function CartItem(props) {
    function GetClassForCartItems(selected) {
        return "clickable-row" + ((selected) ? " selected" : "");
    }
    var Data = props.Data;
    var ID = "Cart_" + Data.ID;
    var Price = "£" + Data.Price;
    if(Data.ExtraLines == undefined)
        Data.ExtraLines = [];
  
    var height = 3.5+(1.5 * (Data.ExtraLines.length-1));
    if(height < 3.5)
        height = 3.5;
    

return <tr id={ID} key={ID} className={GetClassForCartItems(props.Selected)} onClick={() => { props.setState(ID); }}>
        <td style={{ "width": "52%", height:height+"em" }}>
            {Data.Name.length > 26 && <span> {Data.Name.substring(0, 23)}... </span>}
            {Data.Name.length <= 26 && <span> {Data.Name} </span>}
            {Data.ExtraLines &&
                Data.ExtraLines.map((item) =>
                    <span><br />{item}</span>
                )
            }
        </td>
        <td style={{ "width": "10%", height:height+"em" }}> {Data.Qty} </td>
        <td style={{ "width": "20%", height:height+"em"}}> {Price} </td>
        <td style={{ "width": "18%", height:height+"em"}}>
            <button onClick={props.Delete} className="btn btn-outline-danger text-red">
                <i className="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>;

}
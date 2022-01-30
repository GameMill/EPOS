import React, { useState, useEffect } from 'react'


export default function MiniShoppingCart(props) {
    console.log(props.Admin)
    return <table id="Cart" className="table table-striped header-fixed" style={{ "backgroundColor": "white" }}>
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

export function CartItem(props) {
    function GetClassForCartItems(selected) {
        return "clickable-row" + ((selected) ? " selected" : "");
    }
    var Data = props.Data;
    var ID = "Cart_" + Data.ID;
    var Price = "£" + Data.Price;
    return <tr id={ID} className={GetClassForCartItems(props.Selected)} onClick={() => { props.setState(ID); }}><td style={{ "width": "52%" }}> {Data.Name} </td><td style={{ "width": "10%" }}> {Data.Qty} </td><td style={{ "width": "20%" }}> {Price} </td><td style={{ "width": "18%" }}><button onClick={props.Delete} className="btn btn-outline-danger text-red"><i className="fas fa-trash-alt"></i></button></td></tr>;

}
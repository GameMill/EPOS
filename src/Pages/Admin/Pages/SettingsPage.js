import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    useNavigate,
    //    useParams
} from "react-router-dom";
import '../../../Style/Admin/main.css'
import { SendToServer, GetFormatter } from '../../../GlobalFunctions.js'
import { /*set,*/ useForm } from "react-hook-form";

import PDF from './Account/BalanceSheet.js'

export default function Settings() {
    const [title, setTitle] = useState("");

    return <div>
        <small className='fs-6'>Accounts - </small>{title && <small className='fs-5 fw-bold'>{title}</small>}<hr style={{ margin: "0px 0px 10px 0px", padding: "0px" }} />

        <Routes>
            <Route exact path="/" element={<Main setTitle={setTitle} />} />
        </Routes>
    </div>
}

function Main(props) {
    useEffect(() => {
        props.setTitle("Settings");
    })


    return <div>
        <ReceiptDesigner />
    </div>
}

function ReceiptDesigner(props) {
    const [currentItems, SetCurrentItems] = useState([])
    const [lenght, SetLenght] = useState(currentItems.length)
    const [Items, SetItems] = useState([
        {
            style: {},
            text: "Cut"
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 21",
            Eh:28
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 14",
            Eh:43
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 10",
            Eh:60
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 8",
            Eh:76
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 7",
            Eh:85
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 6",
            Eh:101
        },
        {
            style: { height: "3.5em" },
            text: "Large Text - 5",
            Eh:120
        }
    ]);
    function drop(ev) {
        ev.preventDefault();

        const id = ev.dataTransfer.getData('text');
        const num = parseInt(id);
        console.log(num)
        if(!num && num != 0)
            return;
        if(Items.length <= num || num < 0)
            return;
        console.log(id)
        var temp = currentItems;
        temp.push(Items[id]);
        console.log(temp);
        SetCurrentItems(temp);
        SetLenght(temp.length)
    }


    return <div style={{ display: "flex" }}>
        <div style={{ width: "350px", backgroundColor: "red" }}>
            {Items.map((i, k) => <ReceiptItem id={k} data={i} />)}

        </div>
        <div style={{ width: "350px", height: "calc(100vh - 70px)", backgroundColor: "white", border: "3px solid black" }} onDrop={drop} onDragOver={(ev) => ev.preventDefault()}>
            {currentItems.map((i, k) => {
                return <div style={{ width: "calc(100% - 2px)",color:"white",height:i.Eh+"px",backgroundColor:"red" }}>
                    {/*<span style={{ position: "relative" }}>
                        <button className='btn btn-primary' style={{ position: "absolute", padding: "1px 2px", fontSize: ".8em", right: -373 }}>Up</button>
                        <button className='btn btn-primary' style={{ position: "absolute", padding: "1px 2px", fontSize: ".8em", right: -420 }}>Down</button>
            </span>*/}
                    <spam style={{fontFamily:"courier New",overflowX:"hidden",margin:"0px",padding:"0px",width:"330px"}}>
                        {i.text === "Cut" && <span style={{fontSize:".84em"}}>{"-".repeat(42)}</span>}
                        {i.text === "Large Text - 21" && <span style={{fontSize:"1.7em",lineHeight:"1em"}}>012345678901234567890</span>}
                        {i.text === "Large Text - 14" && <span style={{fontSize:"2.55em",lineHeight:"1em"}}>{"12345678901234"}</span>}
                        {i.text === "Large Text - 10" && <span style={{fontSize:"3.6em",lineHeight:"1em"}}>{"1234567890"}</span>}
                        {i.text === "Large Text - 8" && <span style={{fontSize:"4.5em",lineHeight:"1em"}}>{"12345678"}</span>}
                        {i.text === "Large Text - 7" && <span style={{fontSize:"5.1em",lineHeight:"1em"}}>{"1234567"}</span>}
                        {i.text === "Large Text - 6" && <span style={{fontSize:"6em",lineHeight:"1em"}}>{"123456"}</span>}
                        {i.text === "Large Text - 5" && <span style={{fontSize:"7.2em",lineHeight:"1em"}}>{"12345"}</span>}
                    </spam>

                </div>
            })}
        </div>
    </div>
}
function ReceiptItem(props) {

    return <div draggable={true} onDragStart={(ev) => {
        ev.dataTransfer.setData('text/plain', props.id);
    }} id={props.id} style={{ width: "calc(100% - 20px)", backgroundColor: "lightgray", border: "2px solid black", margin: "10px" }}>
        <div style={props.data.style}>{props.data.text}</div>
    </div>
}

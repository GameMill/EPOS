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

import ReceiptDesigner from './Settings/ReceiptDesigner.js';

import MasterStation from './Settings/MasterStation.js';

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
        <div style={{ height: "calc(50vh - 250px)" }}>


        </div>
        <div style={{ height: "calc(50vh + 200px)" }}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#MasterStation" type="button" role="tab" aria-controls="MasterStation" aria-selected="true">Master Station</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#ReceiptDesigner" type="button" role="tab" aria-controls="ReceiptDesigner" aria-selected="false">Receipt Designer</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="MasterStation" role="tabpanel" aria-labelledby="profile-tab">
                    
                    <MasterStation />

                </div>

                <div className="tab-pane fade " id="ReceiptDesigner" role="tabpanel" aria-labelledby="home-tab">
                    <ReceiptDesigner />
                </div>

                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                </div>
            </div>

        </div>
    </div>
}



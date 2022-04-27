import React, { useState/*, useEffect */ } from 'react'
import { SendToServer } from '../../../../GlobalFunctions'

var Items = [
    {
        style: {},
        text: "Cut",
        Eh: 15,
    },
    {
        style: { height: "3.5em" },
        text: "Font B",
        LineSize: 56,
        Eh: 15,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font B",
        LineSize: 28,
        Eh: 25,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 21,
        Eh: 28,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 14,
        Eh: 43,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 10,
        Eh: 57,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 8,
        Eh: 76,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 7,
        Eh: 76,
        data: undefined
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 6,
        Eh: 90,
        data: "Hello"
    },
    {
        style: { height: "3.5em" },
        text: "Font A",
        LineSize: 5,
        Eh: 120,
        data: undefined
    }
]

var Templates = [
    [
        "Header",
        { Type: "Font A - Char:14", Data: "Test" },
        { Type: "Font A - Char:14", Data: "Test" }
    ]
]

export default function ReceiptDesigner(props) {
    const [currentItems, SetCurrentItems] = useState([])
    const [refresh, SetRefresh] = useState(false)

    function drop(ev) {
        ev.preventDefault();
        var data = {};
        try {
            data = JSON.parse(ev.dataTransfer.getData('text'));
        } catch (error) {
            console.log(error);
            return;
        }
        console.log(data)

        if (!data.id && data.id !== 0)
            return;
        if (Items.length <= data.id || data.id < 0)
            return;
        if (data.type === "comp") {
            var temp = currentItems;
            temp.push(Items[data.id]);
            SetCurrentItems(temp);
            SetRefresh(!refresh);
        }
    }

    function remove(row) {
        var temp = currentItems;
        temp.splice(row, 1);
        SetCurrentItems(temp);
        SetRefresh(!refresh);
    }

    function array_move(old_index, new_index) {
        var arr = currentItems;
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        SetCurrentItems(arr);
        SetRefresh(!refresh);
    };

    function setValue(i, data) {
        var TempItems = currentItems;
        TempItems[i].data = data;
        SetCurrentItems(TempItems);
        SetRefresh(!refresh);

    }
    var style = { display: "inline-block", overflow: "hidden", lineHeight: "1em", margin: "0px", padding: "0px", resize: "none", textAlign: "center", backgroundColor: "transparent", border: "0px", width: "344px" };
    return <div style={{ display: "flex" }}>
        <div style={{ width: "450px" }}>
            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3" style={{ width: "100px" }} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Components</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Templates</button>
                    <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
                    <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
                </div>
                <div className="tab-content" id="v-pills-tabContent" style={{ width: "350px", }}>
                    <div className="tab-pane fade show active" style={{ overflowY: "scroll", height: "calc(100vh - 70px)" }} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        {Items.map((i, k) => <ReceiptItem key={k} id={k} data={i} />)}
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        {Templates.map((i, k) => <TemplateItem key={k} id={k} data={i} />)}

                    </div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
            </div>

        </div>
        <div style={{ width: "350px", minWidth: "350px", marginRight: "100px", height: "calc(100vh - 70px)", backgroundColor: "white", border: "3px solid black" }} onDrop={drop} onDragOver={(ev) => ev.preventDefault()}>
            {currentItems.map((i, k) => <div key={k} style={{ width: "calc(100% - 2px)", height: i.Eh + "px", color: "black" }}>

                <span style={{ position: "relative" }}>
                    <button className='btn btn-primary' onClick={() => array_move(k, k - 1)} disabled={k === 0} style={{ position: "absolute", padding: "1px 2px", fontSize: ".8em", right: -373 }}>Up</button>
                    <button className='btn btn-primary' onClick={() => array_move(k, k + 1)} disabled={k === (currentItems.length - 1)} style={{ position: "absolute", padding: "1px 2px", fontSize: ".8em", right: -419 }}>Down</button>
                    <button className='btn btn-primary' onClick={() => { remove(k) }} style={{ position: "absolute", padding: "1px 2px", fontSize: ".8em", right: -444 }}><i className="fas fa-trash-alt"></i></button>
                </span>

                <spam style={{ fontFamily: "courier New", overflowX: "hidden", overflowY: "scroll", margin: "0px", padding: "0px", width: "330px" }}>
                    {i.text === "Cut" && <span style={{ fontSize: ".63em", ...style, lineHeight: "1em" }}>{"^".repeat(56)}</span>}
                    {i.LineSize === 56 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: ".63em", ...style, lineHeight: "1em" }} maxLength={56} />}
                    {i.LineSize === 28 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "1.26em", ...style, lineHeight: "1.2em" }} maxLength={28} />}
                    {i.LineSize === 21 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "1.7em", ...style }} maxLength={21} />}
                    {i.LineSize === 14 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "2.55em", ...style }} maxLength={14} />}
                    {i.LineSize === 10 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "3.58em", ...style }} maxLength={10} />}
                    {i.LineSize === 8 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "4.47em", ...style }} maxLength={8} />}
                    {i.LineSize === 7 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "5.1em", ...style }} maxLength={7} />}
                    {i.LineSize === 6 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "5.97em", ...style }} maxLength={6} />}
                    {i.LineSize === 5 && <input type="text" onChange={e => setValue(k, e.target.value)} value={i.data} placeholder='Click here to enter text' spellCheck={false} style={{ fontSize: "7.16em", ...style }} maxLength={5} />}
                </spam>
            </div>
            )}
        </div>
        <div style={{ width: "100%",padding:"5px", borderLeft: "1px solid black" }} onDrop={drop} onDragOver={(ev) => ev.preventDefault()}>
        
            <div className="row">
                <label htmlFor="inputEmail3" className="col-md-2 col-form-label">Email</label>
                <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" />
                </div>
            </div>
            <div className='row'>
                <button onClick={()=>SendToServer("DemoPrint",currentItems)} style={{ margin:"10px", padding:"0px", width: "calc(100% - 15px)"}} className='btn btn-primary'>Demo Print</button>
            </div>

        </div>
    </div>
}
function ReceiptItem(props) {

    return <div draggable={true} onDragStart={(ev) => {
        ev.dataTransfer.setData('text/plain', '{ "type":"comp","id":' + props.id + ' }');
    }} id={props.id} className='ReceiptItem align-middle'>
        <div style={props.data.style}>{props.data.text}</div>
    </div>
}

function TemplateItem(props) {
    console.log("a", props)
    return <div draggable={true} onDragStart={(ev) => {
        ev.dataTransfer.setData('text/plain', '{ "type":"temp","id":' + props.id + ' }');
    }} id={props.id} style={{ width: "calc(100% - 20px)", backgroundColor: "lightgray", border: "2px solid black", margin: "10px" }}>
        <div style={props.data.style}>{props.data[0]} </div>
    </div>
}
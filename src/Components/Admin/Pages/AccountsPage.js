import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    useNavigate,
    useParams
} from "react-router-dom";
import './main.css';
import { SendToServer, GetFormatter } from '../../Main.js'
import { useForm } from "react-hook-form";

import Keyboard from '../../Keyboard.js'

export default function Accounts(Props) {
    const [title, setTitle] = useState("");

    return <div>
        <small className='fs-6'>Order - </small>{title && <small className='fs-5 fw-bold'>{title}</small>}<hr style={{margin:"0px 0px 10px 0px",padding:"0px"}} />

        <Routes>
            <Route exact path="/" element={<Main setTitle={setTitle} />} />
            <Route path="/newedit/:id2" element={<Edit setTitle={setTitle} />} />

            <Route path="/newedit" element={<Edit setTitle={setTitle} />} />
        </Routes>
    </div>
}
//react-image-file-resizer
//https://react-hook-form.com/form-builder

function Edit(props) {

    let navigate = useNavigate();
    let { id2 } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        setDisabled(true); console.log(data); SendToServer("CreateEditProduct", data, (data) => {
            navigate("/admin/orders");
        })
    };
    //console.log(errors);

    const [id, setID] = useState((id2 !== undefined) ? id2 : -1);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (loading) {
            if (id !== -1) {
                SendToServer("GetOrders", id, (Data) => {
                    if (Data.Data != null) {
                        setID(Data.Data.id);
                        reset(Data.Data);
                        setLoading(false);
                    }
                });
            }
            else {
                props.setTitle("Creating")
                setLoading(false);
            }
        }
    }, [loading, id, reset, props]);

    return <div>
        {loading === true && <div>Loading</div>}
        {loading === false && <div>
            <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: "auto",overflowX:"hidden", height: "calc(100vh - 300px)", paddingBottom: "10px" }}>
                
            </form>
            <div style={{ position: "absolute", bottom: "0px", width: "calc(100% - 175px)" }}>
                <Keyboard OnInput={(e) => console.log(e)} />
            </div>
        </div>}</div>
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Aorders: {},
            Orders: {},
            searchTerm: ""
        };

    }
    componentDidMount() {
        this.props.setTitle("List");
        SendToServer("GetOrders",  "", (Data) => {
            console.log(Data);
            this.setState({ Aorders: Data.Orders })
            this.search("");
            this.setState({ loading: false })
        })

    }

    search(value) {
        console.log(value)
       if (value !== "") {
            const filtered = this.state.Aorders.filter(
                p => p.ID.toString().includes(value),
            );
            this.setState({ Orders: filtered, searchTerm: value });
        }
        else {
            this.setState({ Orders: this.state.Aorders, searchTerm: "" });
        }
    }
    Edit(id) {

    }

    check(SKUs, value) {
        SKUs.forEach(element => {
            if (element.contains.includes(value))
                return true;
        });
        return false;
    }

    render() {
        return <div>
            {this.state.loading === true && <h1>Loading</h1>}
            {this.state.loading === false &&
                <div>
                    <div className='row'>
                        <div className='col'>
                            <input placeholder='Receipt Number' onChange={(e) => { this.search(e.target.value) }} />
                        </div>
                        <div style={{ width: "150px" }}>
                            <button>New Order N/A</button>
                        </div>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>
                                    Receipt #
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Amount Sold
                                </th>
                                <th>
                                    Amount Refunded
                                </th>
                                <th style={{ maxWidth: "35px"}}>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Orders.map((order) =>
                                <tr key={order.ID}>
                                    <td style={{ width: "75px" }}>
                                        {order.ID}
                                    </td>
                                    <td>{new Date(order.SoldDate).toLocaleString("en-GB")}</td>
                                    <td>{GetFormatter().format(order.Price.Remaning)}</td>
                                    <td>{GetFormatter().format(order.Price.Refunded)}</td>
                                    <td>
                                    {order.Status == -1 && <span>Void</span>}
                                    {order.Status == 0 && <span>Active</span>}
                                    {order.Status == 1 && <span>Shipping</span>}
                                    {order.Status == 2 && <span>Complate</span>}
                                    {order.Status == 3 && <span>Return</span>}
                                    {order.Status == 4 && <span>PartiallyRefunded</span>}
                                        
                                    </td>
                                    <td style={{ width: "60px", margin: "0px", padding: "10px 0px 0px 0px" }}> <Nbutton className='btn mx-auto fs-4' text={<i className="fas fa-edit"></i>} url={this.GetURL(order.ID,"newedit")} /></td>
                                    <td style={{ width: "60px", margin: "0px", padding: "10px 0px 0px 0px" }}> <Nbutton className='btn mx-auto fs-4' text={<i className="fas fa-trash-alt"></i>} url={this.GetURL(order.ID,"newedit")} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            } </div>
    }
    GetURL(id,path) {
        return "/admin/products/"+path+"/" + id
    }
}

function Nbutton(props) {
    let navigate = useNavigate();

    return <button {...props} onClick={() => navigate(props.url)}>{props.text}</button>
}
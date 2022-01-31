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

export default function Accounts() {
    const [title, setTitle] = useState("");

    return <div>
        <small className='fs-6'>Accounts - </small>{title && <small className='fs-5 fw-bold'>{title}</small>}<hr style={{ margin: "0px 0px 10px 0px", padding: "0px" }} />

        <Routes>
            <Route exact path="/" element={<Main setTitle={setTitle} />} />
            <Route path="/BalanceSheet/:Year" element={<Edit setTitle={setTitle} />} />

            <Route path="/newedit" element={<Add setTitle={setTitle} />} />
        </Routes>
    </div>
}
//react-image-file-resizer
//https://react-hook-form.com/form-builder

function Add(props) {
    let navigate = useNavigate();

    props.setTitle("Adding Expense")
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(errors)
        if (Object.keys(errors).length === 0)
            SendToServer("AddExpense", data, () => {
                navigate("/admin/account/")
            })

    }
    var today = new Date();
    return <div>
        {Object.keys(errors).map((i) => <div class="alert alert-danger" role="alert">
  {i} {errors[i].message}
</div> )
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <input type="text" placeholder="Name" {...register("Name", { required: "is required", maxLength: 255 })} />
            <label>Amount £:</label>

            <input type="number" step=".01" placeholder="Amount £" {...register("Amount", { required: "must be a number and have a max value of 9999", maxLength: 9999 })} />
            <label>Date and Time:</label>

            <div className='row'>
                <div className='col'>
                    <input type="date" placeholder="Date" defaultValue={today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2)} {...register("Date", { required: true })} />
                </div>
                <div className='col'>
                    <input type="Time" placeholder="Time" defaultValue={('0' + (today.getHours())).slice(-2) + ":" + ('0' + (today.getMinutes())).slice(-2)} {...register("Time", { required: true })} />
                </div>
            </div>
            <hr />
            <input type="submit" className='btn btn-primary' />
        </form></div>
        ;
}

function Main(props) {
    let navigate = useNavigate();
    //const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(10);
    const [page, setPage] = useState(0);
    const [year, setYear] = useState((new Date()).getFullYear());
    props.setTitle("Running List")

    function Update() {
        // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
            if (loading) {
                SendToServer("GetAccounts", { "Year": year }, (Data) => {
                    if (Data.Data !== null) {
                        setLoading(false);
                        setData(Data.Data);
                        setPage(0)
                    }
                });
            }
        }, []);
    }
    Update();
    function AddExpense() {
        navigate("/admin/account/newedit")
    }
    function NewLimit(e) {
        var tempArray = [10, 25, 50];
        var tempSelected = tempArray[e.target.options.selectedIndex];
        tempArray = undefined;

        setSelected(tempSelected);
        setPage(0);
    }
    function NewYear(e) {
        console.log(1999 + e.target.options.selectedIndex)
        if (e.target.options.selectedIndex === 0)
            setYear(0);
        else
            setYear(1999 + e.target.options.selectedIndex);
        setPage(0);
        setLoading(true);

    }
    function resetPage(Data) {
        setData(Data.AccountChanges);

    }
    var Total = 0

    return <div>
        {loading === true && <div>Loading</div>}
        {loading === false &&
            <div>
                <div className='row'>
                    <button onClick={AddExpense}>Add Expense</button>
                </div>
                <hr />
                <div className="overflow-auto" style={{ height: "calc(100vh - 150px)" }}>
                    <table className='table table-hover'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col" style={{ width: "100px" }}>Amount</th>
                                <th scope="col" >Name</th>
                                <th scope="col" style={{ width: "250px" }}>When</th>
                                <th scope='col' style={{ width: "150px" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(page * selected, (page * selected) + selected).map(a => <tr>
                                <td style={{ backgroundColor: (a.Amount > 0) ? "#2c2" : (a.Amount < 0) ? "red" : "white", color: (a.Amount > 0) ? "black" : (a.Amount < 0) ? "white" : "black" }}>{(Total += a.Amount | false) && GetFormatter().format(a.Amount)}</td>
                                <td>{a.Name}</td>

                                <td>{new Date(a.When).toLocaleString("en-GB")}</td>
                                <td>
                                    {a.FromDatabase === "Expences" &&
                                        <button className='btn btn-danger' onClick={() => SendToServer("DeleteExpence", { "id": a.id, "Year": year }, resetPage)}><i class="fas fa-trash-alt"></i></button>}
                                </td>
                            </tr>)}
                            <tr className='table-dark'>
                                <td style={{ color: (Total > 0) ? "#2c2" : (Total < 0) ? "red" : "gray", fontWeight: "bold" }}>{GetFormatter().format(Total)}</td>
                                <td colSpan={2}>Total
                                    <div style={{ textAlign: "center", position: "relative", top: "-10px" }}>
                                        <button className={'btn' + (page !== 0 ? " btn-primary" : " btn-dark")} style={{ width: "100px", marginRight: "10px" }} disabled={page === 0} onClick={() => setPage(page - 1)}>-</button>
                                        <button className={'btn' + (page !== parseInt(data.length / selected) ? " btn-primary" : " btn-dark")} disabled={page === parseInt(data.length / selected)} style={{ width: "100px", marginRight: "10px" }} onClick={() => setPage(page + 1)}>+</button>
                                    </div>
                                </td>
                                <td>

                                    <select value={year} onChange={NewYear} className="form-select">
                                        <option key={0} value={0} selected={year === 0}>All Years</option>
                                        {Array.apply(null, Array(100)).map((_, i) => <option key={2000 + i} selected={year === 2000 + i} value={2000 + i}>{2000 + i}</option>)}
                                    </select>

                                    <select value={selected} onChange={NewLimit} className="form-select">
                                        <option key={10} value={10}>10</option>
                                        <option key={25} value={25}>25</option>
                                        <option key={50} value={50}>50</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        }
    </div>
}

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Aorders: {},
            Orders: {},
            searchTerm: ""
        };

    }
    componentDidMount() {
        this.props.setTitle("List");
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
                    <PDF Data={{
                        "Date": "December 31, 2020",
                        "Assets": {
                            "Cash and cash equivalent": 2200,
                            "Short-Term Investments": 10000,
                            "Account receivable - net": 39500,
                            "Other receivables": 1000,
                            "Imventory": 31000,
                            "Supplies": 3800,
                            "Prepaid expenses": 1500
                        },
                        "Total current asssets": 89000,



                        "Liabilities": {
                            "Short-term loans payable": 5000,
                            "Current portion of long-term debt": 15000,
                            "Accounts payable": 20900,
                            "Accrued compensation and benefits": 8500,
                            "Income taxes payable": 6100,
                            "Other accrued liabilities": 4000,
                            "Deferred revenues": 1500,
                        },
                        "Total current liabilities": 61000
                    }} style={{ "width": "calc(100vw - 190px)", "height": "calc(100vh - 50px)" }} />
                </div>
            } </div>
    }
    GetURL(id, path) {
        return "/admin/products/" + path + "/" + id
    }
}

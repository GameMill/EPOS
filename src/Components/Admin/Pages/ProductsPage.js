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

import Resizer from "react-image-file-resizer";

import Keyboard from '../../Keyboard.js'

export default function Products(Props) {
    const [title, setTitle] = useState("");

    return <div>
        <small className='fs-6'>Product - </small>{title && <small className='fs-5 fw-bold'>{title}</small>}<hr style={{margin:"0px 0px 10px 0px",padding:"0px"}} />

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
        data.ImageData = { URL: image, Dimensions: Dimensions }; setDisabled(true); console.log(data); SendToServer("CreateEditProduct", data, (data) => {
            navigate("/admin/products");
        })
    };
    //console.log(errors);

    const [image, setImage] = useState("");
    const [id, setID] = useState((id2 !== undefined) ? id2 : -1);
    const [Dimensions, setDimensions] = useState({ Height: 0, Width: 0, OffsetHeight: 0, OffsetWidth: 0 });
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const hiddenFileInput = React.useRef(null);

    const RoutehandleClick = event => {
        hiddenFileInput.current.click();
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (loading) {
            if (id !== -1) {
                SendToServer("GetProduct", id, (Data) => {
                    if (Data.Data != null) {
                        props.setTitle("Edit")

                        setID(Data.Data.id);
                        setImage(Data.Data.ImageData.URL);
                        setDimensions(Data.Data.ImageData.Dimensions);
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
    function resizeFile(file) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                150,
                150,
                "PNG",
                90,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    }


    async function UpdateImage(event) {
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
            setImage(image);
            const img = new Image();
            img.src = image;
            img.onload = () => {
                setDimensions({ Height: img.height, Width: img.width, OffsetHeight: ((150) - img.height) / 2, OffsetWidth: ((150) - img.width) / 2 })
            };

            console.log(image);
        } catch (err) {
            console.log(err);
        }
    }
    return <div>
        {loading === true && <div>Loading</div>}
        {loading === false && <div>
            <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: "auto",overflowX:"hidden", height: "calc(100vh - 300px)", paddingBottom: "10px" }}>
                <div className="row" style={{ margin: "0px 0px", padding: "0px 0px" }}>


                    <div className='col' >
                        <div className="row" >
                            <div className="col" style={{ maxWidth: "150px" }}>
                                <label style={{ paddingTop: "5px" }}>Product Name: </label>
                            </div>
                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Product Name" {...register("Name", { required: true, min: 3, maxLength: 72 })} />
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "5px" }} >
                            <div className="col" style={{ maxWidth: "150px" }}>
                                <label style={{ paddingTop: "5px" }}>Category: </label>
                            </div>
                            <div className='col'>
                                <select class="form-select">
                                    <option selected>None</option>
                                </select>
                            </div>
                        </div>

                        <div className="row" style={{ paddingTop: "5px" }} >
                            <div className="col" style={{ maxWidth: "150px" }}>
                                <label className="form-check-label"> Is Featured ?</label>
                            </div>
                            <div className='col' style={{ maxWidth: "50px" }}>
                                <input type="checkbox" className="form-check-input" placeholder="Promo" {...register("Promo", {})} />
                            </div>
                            <div className='col'>
                                <button type="submit" className='btn btn-primary w-100' disabled={disabled}> {id === -1 && <span>Add Product</span>} { id !== -1 && <span>Update Product</span> } </button>

                            </div>
                        </div>

                    </div>
                    <div style={{ "width": "150px", height: "150px", backgroundColor: "lightgray", margin: "0px 0px", padding: "0px 0px" }} >
                        <input onChange={UpdateImage} ref={hiddenFileInput} type="file" style={{ display: "none" }} />

                        <button className='btn btn btn-outline-secondary' type='button' onClick={RoutehandleClick} style={{ margin: "0px", padding: "0px" }}>
                            {!image && <img className='NoImage' alt='' style={{ width: "150px", height: "150px" }} />}
                            {image && <img src={image} alt='' style={{ marginLeft: Dimensions.OffsetWidth, marginRight: Dimensions.OffsetWidth, marginTop: Dimensions.OffsetHeight, marginBottom: Dimensions.OffsetHeight }} />}
                        </button>
                    </div>
                </div>
                <ul class="nav nav-tabs" id="pills-tab" role="tablist" style={{ position: "relative", top: "-30px" }}>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent" style={{ position: "relative", top: "-30px" }}>
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="form-group">
                            <label>Price: </label>
                            <input type="number" className="form-control" placeholder="Price" {...register("Price", { required: true, max: 100000.00, min: 0 })} />
                        </div>
                        <div className="form-group">
                            <label>Qty Remaning: </label>
                            <input type="number" className="form-control" placeholder="QTY Remaning" {...register("QTY_Remaning", { required: true, })} />
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">2</div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">3</div>
                </div>
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
            Aproducts: {},
            products: {},
            searchTerm: ""
        };

    }
    componentDidMount() {
        this.props.setTitle("List");
        SendToServer("GetProducts", "", (Data) => {
            console.log(Data);
            this.setState({ Aproducts: Data.Products })
            this.search("");
            this.setState({ loading: false })
        })

    }

    search(value) {
        if (value !== "") {
            const filtered = this.state.Aproducts.filter(
                p => (p.Name.toLowerCase().indexOf(value.toLowerCase()) > -1) || this.check(p.SKUs, value) || p.ID.toString().includes(value),
            );
            this.setState({ products: filtered, searchTerm: value });
        }
        else {
            console.log(this.state.Aproducts);

            this.setState({ products: this.state.Aproducts, searchTerm: "" });
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
                            <input onChange={(e) => { this.search(e.target.value) }} />
                        </div>
                        <div style={{ width: "150px" }}>
                            <button>Low Stock N/A</button>
                        </div>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>
                                    Image
                                </th>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    QTY Remaning
                                </th>
                                <th>
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((product) =>
                                <tr key={product.ID}>
                                    {console.log(product)}
                                    <td style={{ width: "75px" }}>
                                        <div style={{ width: "75px", height: "75px", display: "inline-block" }}>
                                            <img src={product.ImageData.URL} alt='' style={{ marginTop: (product.ImageData.Dimensions.OffsetHeight / 2), marginLeft: (product.ImageData.Dimensions.OffsetWidth / 2), maxWidth: "75px", maxHeight: "75px" }} />
                                        </div>
                                    </td>
                                    <td>{product.ID}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.QTY_Remaning}</td>
                                    <td>{GetFormatter().format(product.Price)}</td>
                                    <td>{product.SKUs.join(' | ')}</td>
                                    <td style={{ width: "60px", margin: "0px", padding: "10px 0px 0px 0px" }}> <Nbutton className='btn mx-auto fs-4' text={<i className="fas fa-edit"></i>} url={this.GetURL(product.ID)} /></td>
                                    <td style={{ width: "60px", margin: "0px", padding: "10px 0px 0px 0px" }}><button className='btn mx-auto fs-4' style={{ width: "60px" }} ><i className="fas fa-trash-alt"></i></button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Nbutton className='btn btn-primary' text="Add Product" url="/admin/products/newedit" />
                </div>
                
            } </div>
    }
    GetURL(id) {
        return "/admin/products/newedit/" + id
    }
}

function Nbutton(props) {
    let navigate = useNavigate();

    return <button {...props} onClick={() => navigate(props.url)}>{props.text}</button>
}
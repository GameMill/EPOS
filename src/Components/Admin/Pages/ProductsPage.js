import React, { useState,useEffect } from 'react'
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

export default function Products(Props) {
    return <div>
        <h2>Products</h2><hr />

        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/newedit/:id2" element={<Edit />} />

            <Route path="/newedit" element={<Edit />} />
        </Routes>
    </div>
}
//react-image-file-resizer
//https://react-hook-form.com/form-builder

function Edit() {
    let navigate = useNavigate();
    let { id2 } = useParams();
    const { register, handleSubmit, reset , formState: { errors } } = useForm();
    const onSubmit = data => {
        data.ImageData = { URL: image, Dimensions:Dimensions }; setDisabled(true); console.log(data); SendToServer("CreateEditProduct", data, (data) => {
            navigate("/admin/products");
        })
    };
    console.log(errors);

    const [image, setImage] = useState("");
    const [id, setID] = useState((id2 !== undefined) ? id2 : -1);
    const [Dimensions, setDimensions] = useState({ Height: 0, Width: 0, OffsetHeight: 0, OffsetWidth: 0});
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(loading)
        {
            if(id !== -1)
            {
                SendToServer("GetProduct",id,(Data)=>{
                    setID(Data.id);
                    setImage(Data.Data.ImageData.URL);
                    setDimensions(Data.Data.ImageData.Dimensions);
                    reset(Data.Data);
                    setLoading(false);
                });
            }
            else{
                setLoading(false);
            }
        }
    },[loading, id, reset]);
    function resizeFile(file) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                150,
                150,
                "JPEG",
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
    { loading === true && <div>Loading</div>}
    { loading === false && <div>
        {id !== -1 && <h3>Editing: {id}</h3>}
        {id === -1 && <h3>Creating</h3>}

        <div className="row" style={{ margin: "0px 0px", padding: "0px 0px" }}>

            
            <div className='col' >
                <div className="form-group" >
                    <label>Product Image: </label>
                    <input onChange={UpdateImage} type="file" />
                </div>
            </div>
            <div style={{ "width": "150px", height: "150px", backgroundColor: "lightgray", margin: "0px 0px", padding: "0px 0px" }} >
                {!image &&<img className='NoImage' style={{width: "150px", height: "150px"}} />}
                {image && <img src={image} alt='' style={{ marginLeft: Dimensions.OffsetWidth,marginRight: Dimensions.OffsetWidth, marginTop: Dimensions.OffsetHeight,marginBottom: Dimensions.OffsetHeight }} /> }
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label>Product Name: </label>
                <input type="text" className="form-control" placeholder="Product Name" {...register("Name", { required: true, min: 3, maxLength: 72 })} />
            </div>
            <div className="form-group">
                <label>Price: </label>
                <input type="number" className="form-control" placeholder="Price" {...register("Price", { required: true, max: 100000.00, min: 0 })} />
            </div>
            <div className="form-group">
                <label>Qty Remaning: </label>
                <input type="number" className="form-control" placeholder="QTY Remaning" {...register("QTY_Remaning", { required: true, })} />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" placeholder="Promo" {...register("Promo", {})} />
                <label className="form-check-label"> Is Featured ?</label>
            </div>


            <input type="submit" disabled={disabled} />
        </form>
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
                                        <div style={{ width: "75px", height:"75px", display:"inline-block" }}>
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
                </div>
            } <Nbutton className='btn btn-primary' text="Add Product" url="/admin/products/newedit" /></div>
    }
    GetURL(id) {
        return "/admin/products/newedit/" + id
    }
}

function Nbutton(props) {
    let navigate = useNavigate();

    return <button {...props} onClick={() => navigate(props.url)}>{props.text}</button>
}
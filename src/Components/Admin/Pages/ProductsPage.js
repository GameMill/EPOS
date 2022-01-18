import React, { useRef, useState } from 'react'
import {
    Routes,
    Route,
    NavLink,
    useNavigate
} from "react-router-dom";
import { SendToServer, LoadController } from '../../Main.js'
import { useForm } from "react-hook-form";

import Resizer from "react-image-file-resizer";

export default function Products(Props) {
    return <div>
        <h2>Products</h2><hr />

        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/newedit" element={<Edit />} />
        </Routes>
    </div>
}
//react-image-file-resizer
//https://react-hook-form.com/form-builder

function Edit() {
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.ImageData = { URL: image, Dimensions };setDisabled(true); console.log(data); SendToServer("CreateEditProduct", data, (data) => {
            navigate("/admin/products");
        })
    };
    console.log(errors);

    const [image, setImage] = useState("");
    const [id, setID] = useState(-1);
    const [Dimensions, setDimensions] = useState({ Height: 0, Width: 0 });
    const [disabled, setDisabled] = useState(false);

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
        {id != -1 && <h3>Editing: {id}</h3>}
        {id == -1 && <h3>Creating</h3>}

        <div class="row" style={{ margin: "0px 0px", padding: "0px 0px" }}>

            <div style={{ "width": "150px", height: "150px", backgroundColor: "lightgray", margin: "0px 0px", padding: "0px 0px" }} >
                <img src={image} style={{ marginLeft: Dimensions.OffsetWidth, marginTop: Dimensions.OffsetHeight }} />
            </div>
            <div className='col' >
                <div class="form-group" >
                    <label>Product Image: </label>
                    <input onChange={UpdateImage} type="file" />
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div class="form-group">
                <label>Product Name: </label>
                <input type="text" class="form-control" placeholder="Product Name" {...register("Name", { required: true, min: 3, maxLength: 72 })} />
            </div>
            <div class="form-group">
                <label>Price: </label>
                <input type="number" class="form-control" placeholder="Price" {...register("Price", { required: true, max: 100000.00, min: 0 })} />
            </div>
            <div class="form-group">
                <label>Qty Remaning: </label>
                <input type="number" class="form-control" placeholder="QTY Remaning" {...register("QTY_Remaning", { required: true, })} />
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" placeholder="Promo" {...register("Promo", {})} />
                <label class="form-check-label"> Is Featured ?</label>
            </div>


            <input type="submit" disabled={disabled} />
        </form>
    </div>
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            products:{}
        };
    
    }
    componentDidMount()
    {
        SendToServer("GetProducts", "", (Data) => {
            this.setState({loading:false, products:Data.Products})
        })
    }

    render() {
        return <div> <h2>Hello World</h2>  {this.state.loading == true && <h1>Loading</h1>} {
            this.state.loading  == false &&
            <table>
                {this.state.products.map((product) =>
                    <tr>
                        <td>{product.Name}</td>
                    </tr>
                )}
            </table>

        } <Nbutton className='btn btn-primary' text="Add Product" url="/admin/products/newedit" /></div>
    }
}

function Nbutton(props)
{
    let navigate = useNavigate();

    return <button {...props} onClick={() => navigate(props.url)}>{props.text}</button>
}
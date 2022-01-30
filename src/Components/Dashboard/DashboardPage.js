import React from 'react'
// eslint-disable-next-line
import './main.css'
import { SendToServer, LoadController, AddCallback, RemoveCallback, GetFormatter } from '../Main.js'
import {
  useNavigate
} from "react-router-dom";

import MiniShippingCart,{ CartItem } from "../Components/Cart.js";

function LinkToAdmin() {
  let navigate = useNavigate();

  return <button className="btn" onClick={() => navigate("/admin/")}>
    <span className="navbar-toggler-icon"></span>
  </button>
}
class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      promoItem: {},
      cartItems: {},
      selectedID: "",
      priceDisplay: {
        "Items": 0,
        "Discount": 0,
        "Vat": 0,
        "Total": 0,
        "Remaning": 0,
        "Paid": 0
      }
    };

    this.OnKeyDown = (key) => {
      var character = key.key;
      if (character.length > 1 && !(character === "Enter" || character === "Backspace")) {
        return;
      }
      var data = this.state.input;
      var id = ""
      console.log(key);
      if (character === "Backspace") {
        data = (data.length > 0) ? data.substring(0, data.length - 1) : "";
        this.setState({ input: data });
      }
      else if (character === "Enter") {
        SendToServer("UserInput", data);
        this.setState({ input: "" });
      }
      else if (character === "-") {
        if (this.state.selectedID === "" || !(this.state.selectedID in this.state.cartItems))
          return;

        id = this.state.cartItems[this.state.selectedID].ID;
        this.RemoveCartItemByID(id)
      }
      else if (character === "+") {
        if (this.state.selectedID === "" || !(this.state.selectedID in this.state.cartItems))
          return;

        id = this.state.cartItems[this.state.selectedID].ID;
        this.AddCartItemByID(id)
      }
      else {
        if (data.length > 0) {
          data += character;
          this.setState({ input: data });
        }
        else {
          this.setState({ input: character });
        }
        this.setState({ selectedID: "" })

      }
    }




    LoadController("Dashboard");


  }

  RemoveCartItemByID(id) {
    SendToServer("RemoveCartItemByID", id, (Data) => {
      if (Data.Name !== undefined) {
        this.AddItemToCartDisplay(Data);
      }
      else {
        this.RemoveItem(Data.Data);
      }
    });
  }

  // componentWillMount deprecated in React 16.3
  componentDidMount() {
    document.addEventListener("keydown", this.OnKeyDown);
    AddCallback("promoItem", (Data) => { this.AddPromoItem(Data); });
    AddCallback("AddItem", (Data) => { this.AddItemToCartDisplay(Data); });
    AddCallback("updateDisplayPrices", (Data => {
      delete Data["Action"];
      this.setState({ priceDisplay: Data })
    }));
  }



  componentWillUnmount() {
    document.removeEventListener("keydown", this.OnKeyDown);
    RemoveCallback("promoItem");
    RemoveCallback("AddItem");
    RemoveCallback("updateDisplayPrices");
  }

  AddCartItemByID(ID) {
    SendToServer("AddItemByID", ID);
  }
  AddItemToCartDisplay(Data) {
    var items = this.state.cartItems;
    var ID = "Cart_" + Data.ID;
    if (!(ID in items)) {
      delete items[ID]
    }
    items[ID] = Data;
    this.setState({ selectedID: ID, input: "", cartItems: items })
  }

  AddPromoItem(Data) {
    Data = Data.Data;
    var items = this.state.promoItem;

    var ID = "promoItem_" + Data.ID;

    //var cartrows = $("#Cart_" + Data.ID);
    if (!(ID in items)) {
      delete items[ID]
    }
    //$(".selected").removeClass("selected")
    var Price = "£" + Data.Price;
    items[ID] = <button id={ID} key={ID} className="btn Item-Box btn-light" onClick={() => { this.AddCartItemByID(Data.ID) }}><div style={{ "display": "flex", "justifyContent": "center" }}><img src={Data.ImageData.URL} alt='promo Item' style={{ "height": Data.ImageData.Dimensions.Height, "width": Data.ImageData.Dimensions.Width, marginLeft: Data.ImageData.Dimensions.OffsetWidth, marginTop: Data.ImageData.Dimensions.OffsetHeight }} /><br /></div><span style={{ "height": "40px", "fontSize": "1.5em" }}> {Data.Name} </span><br /><span style={{ "fontWeight": "bold", "height": "40px", "fontSize": "2em" }}> {Price} </span></button>
    this.setState({ promoItem: items });

    //this.currentTableRowSelected = $('#Cart_' + Data.ID)
    //this.updateClickableRow()
  }




  SelectedCartItem(ID) {
    this.setState({ selectedID: ID });
  }

  simulateKeyPress(key) {
    this.OnKeyDown({ key: key })
  }

  SignOut() {
    SendToServer("Signout", "");
  }

  RemoveItem(id) {
    var items = this.state.cartItems;
    delete items["Cart_" + id];
    this.setState({ cartItems: items });
  }

  Void() {
    SendToServer("Void", "", () => this.clearCart());
  }
  clearCart() {
    this.setState({ selectedID: "", cartItems: {} })
  }
  render() {
    var cartItems = []
    if (this.state.cartItems !== undefined) {
      for (const [key, value] of Object.entries(this.state.cartItems)) {
        var selected = (key) === this.state.selectedID;
        cartItems.unshift(<CartItem key={key} Selected={selected} setState={() => { this.SelectedCartItem(key) }} Delete={() => { SendToServer("RemoveItem", value.ID, (Data) => this.RemoveItem(Data.Data)) }} Data={value} />)
      }
    }



    var InputBox = (this.state.input === "") ? "" : <tr id="Input" className="selected"><td colSpan="4" width="100%" style={{ "textAlign": "center", "fontWeight": "bold", "lineHeight": "2.5em" }}> {this.state.input} </td></tr>

    return <div style={{ "backgroundColor": "#212529" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ "height": "45px" }}>
        <div className="container-fluid">
          <LinkToAdmin />
          <div className="d-flex">
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#SignoutModal"><i
              className="fas fa-sign-out-alt"></i></button>
          </div>

        </div>
      </nav>



      <div className="container-fluid">
        <div className="row d-flex justify-content-center">

          <div className="col-xxl-8 col-xl-7 Hideifsmall" style={{ "paddingTop": "10px" }}>
            <div id="Leftsidebar" className="text-center overflow-auto" style={{ "height": "calc(100vh - 135px)" }}>
              {Object.values(this.state.promoItem)}
            </div>
            <div className="col-xxl-8 col-xl-7" style={{ "position": "absolute", "padding": "0 15px 0 14px", "bottom": "0px", "height": "70px" }}>
              <div className="row" style={{ "height": "33px", "paddingBottom": "2px" }}>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
              </div>
              <div className="row" style={{ "height": "33px", "paddingBottom": "2px" }}>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
                <button className="col">a</button>
              </div>
            </div>



          </div>
          <div className="col-12 col-xxl-4 col-xl-5 ">
            <div style={{ "height": "calc(100vh - 250px)", "backgroundColor": "white", "marginRight": "155px", "marginTop": "6px" }}>

              <MiniShippingCart InputBox={InputBox} Items={cartItems} Admin />
            </div>
            <div style={{ "height": "195px", "marginRight": "155px" }}>
              <div className="row">
                <div className="col fs-6 " style={{ "height": "100px" }}>
                  <table style={{ "width": "100%", "height": "calc(100% - 7px)", "backgroundColor": "white", "margin": "5px", "borderRadius": "5px" }}>
                    <tbody>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Items:</td>
                        <td className="col-5" id="Items">{this.state.priceDisplay.Items}</td>
                      </tr>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Discount</td>
                        <td className="col-5" id="Discount">{GetFormatter().format(this.state.priceDisplay.Discount)}</td>
                      </tr>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Vat</td>
                        <td className="col-5" id="VAT">{GetFormatter().format(this.state.priceDisplay.Vat)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col fs-5 " style={{ "height": "100px", "overflow": "hidden" }}>
                  <table style={{ "width": "100%", "height": "calc(100% - 7px)", "backgroundColor": "white", "margin": "5px", "position": "relative", "right": "10px", "borderRadius": "5px" }}>
                    <tbody>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Total:</td>
                        <td className="col-5 " id="TotalPrice2">{GetFormatter().format(this.state.priceDisplay.Total)}</td>
                      </tr>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Remaning:</td>
                        <td className="col-5" id="Remaning" style={{ "fontWeight": "bold", "fontSize": "1em" }}>{GetFormatter().format(this.state.priceDisplay.Remaning)}
                        </td>
                      </tr>
                      <tr>
                        <td className="col-7" style={{ "paddingLeft": "5px" }}>Paid</td>
                        <td className="col-5" id="Paid">{GetFormatter().format(this.state.priceDisplay.Paid)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row" style={{ "height": "100px", "padding": "0px", "margin": "0px" }}>
                <button className="col btn btn-danger "
                  style={{ "height": "90px", "fontSize": "2.5em", "margin": "0px", "padding": "0px" }} data-bs-toggle="modal"
                  data-bs-target="#VoidModal">
                  Void
                </button>
                <button onClick={() => SendToServer("PayBalance", null, (data) => { this.clearCart() })} className="col btn btn-success" style={{ "height": "90px", "margin": "0px", "padding": "0px", "width": "50%" }}>
                  <div style={{ "fontSize": "1em" }}>
                    Pay balance
                  </div>
                  <div style={{ "fontSize": "3em", "marginTop": ".5vh", "fontWeight": "bold", "position": "relative", "top": "-.30em" }}
                    id="TotalPrice">
                    {GetFormatter().format(this.state.priceDisplay.Remaning)}
                  </div>
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
      <div style={{ "position": "absolute", "right": "12px", "top": "50px", "width": "150px", "backgroundColor": "white", "height": "calc(100vh - 60px)" }}>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BL" onClick={() => { this.simulateKeyPress('1') }}>
            1
          </button>
          <button className="col btn btn-primary fs-2 BR" onClick={() => { this.simulateKeyPress('2') }}>
            2
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BL" onClick={() => { this.simulateKeyPress('3') }}>
            3
          </button>
          <button className="col btn btn-primary fs-2 BR" onClick={() => { this.simulateKeyPress('4') }}>
            4
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BL" onClick={() => { this.simulateKeyPress('5') }}>
            5
          </button>
          <button className="col btn btn-primary fs-2 BR" onClick={() => { this.simulateKeyPress('6') }}>
            6
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BL" onClick={() => { this.simulateKeyPress('7') }}>
            7
          </button>
          <button className="col btn btn-primary fs-2 BR" onClick={() => { this.simulateKeyPress('8') }}>
            8
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BL" onClick={() => { this.simulateKeyPress('9') }}>
            9
          </button>
          <button className="col btn btn-primary fs-2 BR" onClick={() => { this.simulateKeyPress('0') }}>
            0
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BC" onClick={() => { this.simulateKeyPress('Backspace') }}>
            <i className="fas fa-backspace"></i>
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BC" onClick={() => { this.simulateKeyPress('Enter') }}>
            Enter
          </button>
        </div>

        <div className="row rightButton">
          <button className="col btn btn-dark fs-2 BL" onClick={() => { this.simulateKeyPress('-') }}>
            -
          </button>
          <button className="col btn btn-dark fs-2 BR" onClick={() => { this.simulateKeyPress('+') }}>
            +
          </button>
        </div>
        <div className="row rightButton">
          <button className="col btn btn-primary fs-2 BC">
            Deposit
          </button>
        </div>

      </div>

      <div className="modal fade" id="SignoutModal" tabIndex="-1" aria-labelledby="SignoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="SignoutModalLabel">Sign Out</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to sign out of the current session?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.SignOut}>Sign
                Out</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="VoidModal" tabIndex="-1" aria-labelledby="VoidModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="VoidModalLabel">Void</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to void the current cart?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => this.Void()}>V id</button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}



export default DashboardPage;

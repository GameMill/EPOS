
import React, { useState, useEffect } from 'react'
import { SendToServer, LoadController, AddCallback, RemoveCallback, GetFormatter } from './GlobalFunctions.js'
import MiniShippingCart, { CartItem } from './Components/Cart.js';

export default class Main extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      tillClosed: true
    };

  }
  componentDidMount() {
    AddCallback("S2_Loggedin", (Data) => {
      console.log(Data);
      this.setState({ tillClosed: !Data.Data });
    })
  }

  render() {

    return <div>{this.state.tillClosed && <div style={{ backgroundColor: "#333", color: "white", width: "100vw", height: "100vh" }}><span className='TextCenterScreenCentered' style={{ fontSize: "150px" }}>CLosed</span></div>}
      {this.state.tillClosed === false && <div style={{ backgroundColor: "#333", color: "white", width: "100vw", height: "100vh" }}>
        <h1>CustomerScreen</h1>
        <hr />
        <div style={{ display: "inline-block", width: "calc(100vw - 600px)", height: "100vh" }}>
          a
        </div>
        <div style={{ display: "inline-block", width: "600px" }}>
          <div style={{ "height": "calc(100vh - 250px)", "marginRight": "25px", "marginTop": "6px" }}>

            <MiniShippingCart Items={[]} />
          </div>
          <div style={{ "height": "195px", "marginRight": "25px" }}>
            <div >
              Total:
            </div>
            <div style={{ textAlign: "center", fontSize: "80px", fontWeight: "bold", color: "white" }}>£1000.00</div>
          </div>

        </div>
      </div>}
    </div>
  }
}

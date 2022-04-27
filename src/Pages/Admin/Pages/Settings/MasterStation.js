import React, { useState/*, useEffect */ } from 'react'
import { SendToServer } from '../../../../GlobalFunctions'

export default class MasterStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyData:null
        };

    }
    componentDidMount() {
        SendToServer("GetStationSettings", "", (Data) => {
            this.setState({ companyData: Data });
        })
    }


    render() {
        return <div>
            <h1>Master Station Setting</h1>
            <hr />
            {!this.state.companyData && "Loading"}
            {this.state.companyData &&
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            }
        </div>
    }
}

import React from "react"
import { SendToServer, LoadController,GetFormatter } from '../../Main.js'


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Data:{ ItemsSoldToday:0,TotalSales:0,TodayProfit:0 }
        };

    }
    componentDidMount() {
        SendToServer("GetDashboardStats", "", (Data) => {
            this.setState({ loading: false, Data: Data })
        })
    }

    render() {
        return <div>
            <h2>Dashboard</h2> <hr />
            {this.state.loading === true && <h2 className="mx-auto">Loading</h2> }
            {this.state.loading === false &&
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                    <div class="col">
                        <div class="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 class="card-header">Profit Today <span className="float-end fs-"><i class="fas fa-truck text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "10px" }}></i></span></h5>

                            <div class="card-body ">
                                <h5 class="card-title fs-2">{GetFormatter().format(this.state.Data.TodayProfit)}</h5>
                                <small class="text-muted"><span style={{ "color": "#2fd04a" }}>5.50%</span> More sales then usual</small>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 class="card-header">Sales Today <span className="float-end fs-"><i class="fas fa-truck text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "10px" }}></i></span></h5>

                            <div class="card-body ">
                                <h5 class="card-title fs-2">{GetFormatter().format(this.state.Data.TotalSales)}</h5>
                                <small class="text-muted"><span style={{ "color": "#2fd04a" }}>5.50%</span> More sales then usual</small>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 class="card-header">Pending Orders <span className="float-end fs-"><i class="fas fa-truck-loading text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "5px" }}></i></span></h5>

                            <div class="card-body ">
                                <h5 class="card-title fs-2">-1</h5>
                                <small class="text-muted"><span style={{ "color": "#dc2325" }}>-5.50%</span> Less sales then usual</small>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 class="card-header">Item Sold Today <span className="float-end fs-"><i class="fas fa-user-friends text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "5px" }}></i></span></h5>

                            <div class="card-body ">
                                <h5 class="card-title fs-2">{GetFormatter().format(this.state.Data.ItemsSoldToday)}</h5>
                                <small class="text-muted"><span style={{ "color": "#2fd04a" }}>5.50%</span> More sales then usual</small>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 class="card-header">Total Earnings <span className="float-end fs-"><i class="fas fa-money-bill-wave text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "5px" }}></i></span></h5>

                            <div class="card-body ">
                                <h5 class="card-title fs-2">£2,562</h5>
                                <small class="text-muted"><span style={{ "color": "#2fd04a" }}>5.50%</span> More sales then usual</small>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    }
}
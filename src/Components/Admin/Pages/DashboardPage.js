import React from "react"
import { SendToServer, GetFormatter } from '../../Main.js'


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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-4 g-4" sty>
                    <div className="col">
                        <div className="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 className="card-header">Profit Today <span className="float-end fs-"><i className="fas fa-truck text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "10px" }}></i></span></h5>

                            <div className="card-body ">
                                <h5 className="card-title fs-2">{GetFormatter().format(this.state.Data.TodayProfit)}</h5>
                                {this.state.Data.ProfitDiff > 0 && <small className="text-muted"> <span style={{ "color": "#2fd04a" }}>{this.state.Data.ProfitDiff}%</span> <span>More profit then usual</span></small> }
                                {this.state.Data.ProfitDiff < 0 && <small className="text-muted"> <span style={{ "color": "red" }}>{this.state.Data.ProfitDiff}%</span> <span>Less profit then usual</span></small> }
                                {this.state.Data.ProfitDiff === 0 && <small className="text-muted">Profit is the same as usual</small> }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 className="card-header">Sales Today <span className="float-end fs-"><i className="fas fa-truck text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "10px" }}></i></span></h5>

                            <div className="card-body ">
                                <h5 className="card-title fs-2">{GetFormatter().format(this.state.Data.TotalSales)}</h5>
                                {this.state.Data.TotalSalesDiff > 0 && <small className="text-muted"> <span style={{ "color": "#2fd04a" }}>{this.state.Data.ItemsSoldDiff}%</span> <span>More Sales then usual</span></small> }
                                {this.state.Data.TotalSalesDiff < 0 && <small className="text-muted"> <span style={{ "color": "red" }}>{this.state.Data.ItemsSoldDiff}%</span> <span>Less Sales then usual</span></small> }
                                {this.state.Data.TotalSalesDiff === 0 && <small className="text-muted">Sales is the same as usual</small> }
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 className="card-header">Pending Orders<span className="float-end fs-"><i className="fas fa-truck-loading text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "5px" }}></i></span></h5>

                            <div className="card-body ">
                                <h5 className="card-title fs-2">{this.state.Data.Pending}</h5>
                                <small className="text-muted">Orders with status Active</small>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-dark bg-light mb-3 mx-auto" style={{ "maxWidth": "18rem" }}>
                            <h5 className="card-header">Item Sold Today <span className="float-end fs-"><i className="fas fa-user-friends text-white" style={{ padding: "5px", backgroundColor: "#8EB0C0", borderRadius: "5px" }}></i></span></h5>

                            <div className="card-body ">
                                <h5 className="card-title fs-2">{GetFormatter().format(this.state.Data.ItemsSoldToday)}</h5>
                                
                                {this.state.Data.ItemsSoldDiff > 0 && <small className="text-muted"> <span style={{ "color": "#2fd04a" }}>{this.state.Data.ItemsSoldDiff}%</span> <span>More profit then usual</span></small> }
                                {this.state.Data.ItemsSoldDiff < 0 && <small className="text-muted"> <span style={{ "color": "red" }}>{this.state.Data.ItemsSoldDiff}%</span> <span>Less profit then usual</span></small> }
                                {this.state.Data.ItemsSoldDiff === 0 && <small className="text-muted">Profit is the same as usual</small> }
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    }
}
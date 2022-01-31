import React, { useRef, useState } from 'react'
import '../../Style/Login/style.css'
import {
    Routes,
    Route,
    NavLink,
    useNavigate
} from "react-router-dom";
import { SendToServer, LoadController } from '../../GlobalFunctions.js'
import Keyboard from 'react-simple-keyboard';

import '../../../node_modules/react-simple-keyboard/build/css/index.css';
import packageJson  from '../../../package.json'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        LoadController("LoginPage")
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentWillUnmount() {
        console.log("Login page Unmount")
    }
    isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    render() {

        return <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/*" element={<A404 />} />
            </Routes>
        </div>;
    }
}


function A404() {
    return <div>404: Page not found</div>
}

function CopyrightYear() {
    return new Date().getFullYear();
}

function RegistrationForm() {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [firstLine, setFirstLine] = useState("");
    const [secondLine, setSecondLine] = useState("");
    const [county, setCounty] = useState("");
    const [country, setCountry] = useState("");
    const [vAT, setVAT] = useState("");
    const [license, setLicense] = useState("");
    const [tAC, setTAC] = useState(false);
    const [Errors, setErrors] = useState(null);
    const [PageNumber, setPageNumber] = useState(0);
    const [Phone, setPhone] = useState("");
    const [DOB_dd, setDOB_dd] = useState([""]);
    const [DOB_mm, setDOB_mm] = useState([""]);
    const [DOB_yyyy, setDOB_yyyy] = useState([""]);


    const [selectedTextBox, SetSelectedTextBox] = useState("Email");
    const [layoutName, setLayoutName] = useState("default");
    const keyboard = useRef();
    const [shiftLastUsed, setShiftLastUsed] = useState(false);

    function Click() {
        if (email !== "" && password !== "" && password === password2 && companyName !== "" && firstLine !== "" && license !== "" && tAC === true)
            return;

        var data = {
            CompanyName: companyName,
            Email: email,
            Password: password,
            FirstLine: firstLine,
            SecondLine: secondLine,
            County: county,
            Country: country,
            VAT_Number: vAT,
            License: license,
            Phone: Phone,
        }

        SendToServer("Registration", data, (data) => {
            if (data.Data === "success") {
                navigate("/Dashboard", { replace: true });

            } else {
                AddError(data.Data);
            }
        })
    }
    function AddError(message) {
        var rows = Errors;
        if (rows === undefined)
            rows = [];
        for (var i = 0; i < rows.lenght; i++) {
            rows.push(<div className="alert calert-danger alert-dismissible" role="alert"> {message} <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>);
        }
        setErrors(rows)
    }

    function CurrentPageComplate() {
        if (PageNumber === 0) {
            if (isValidEmailAddress(email) && password !== "" && password === password2)
                return true;
            else
                return false;
        }
        return true;
    }
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    function handleShift() {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
        return layoutName === "default";
    };

    function KeyboardInput(data) {
        var currentValue = "";
        if (selectedTextBox === "Email") {
            currentValue = email;
        }
        else if (selectedTextBox === "Password") {
            currentValue = password;
        }
        else if (selectedTextBox === "Password2") {
            currentValue = password2
        } else if (selectedTextBox === "Phone") {
            currentValue = Phone
        } else if (selectedTextBox === "CompanyName") {
            currentValue = companyName
        } else if (selectedTextBox === "FirstLine") {
            currentValue = firstLine
        } else if (selectedTextBox === "SecondLine") {
            currentValue = secondLine
        } else if (selectedTextBox === "County") {
            currentValue = county
        } else if (selectedTextBox === "Country") {
            currentValue = country
        } else if (selectedTextBox === "DOB_dd") {
            currentValue = DOB_dd
        } else if (selectedTextBox === "DOB_mm") {
            currentValue = DOB_mm
        } else if (selectedTextBox === "DOB_yyyy") {
            currentValue = DOB_yyyy
        } else if (selectedTextBox === "VAT") {
            currentValue = vAT
        } else if (selectedTextBox === "License") {
            currentValue = license
        }

        if (data === "{bksp}") {
            if (currentValue !== "") {
                currentValue = currentValue.substring(0, currentValue.length - 1)
            }
            else {
                return;
            }
        }
        else {
            currentValue = currentValue + data
        }


        if (selectedTextBox === "Email") {
            setEmail(currentValue);
        }
        else if (selectedTextBox === "Password") {
            setPassword(currentValue);
        }
        else if (selectedTextBox === "Password2") {
            setPassword2(currentValue);
        } else if (selectedTextBox === "Phone") {
            setPhone(currentValue);
        } else if (selectedTextBox === "CompanyName") {
            setCompanyName(currentValue);
        } else if (selectedTextBox === "FirstLine") {
            setFirstLine(currentValue);
        } else if (selectedTextBox === "SecondLine") {
            setSecondLine(currentValue);
        } else if (selectedTextBox === "County") {
            setCounty(currentValue);
        } else if (selectedTextBox === "Country") {
            setCountry(currentValue);
        } else if (selectedTextBox === "DOB_dd") {
            setDOB_dd(currentValue);
        } else if (selectedTextBox === "DOB_mm") {
            setDOB_mm(currentValue);
        } else if (selectedTextBox === "DOB_yyyy") {
            setDOB_yyyy(currentValue);
        } else if (selectedTextBox === "VAT") {
            setVAT(currentValue);
        } else if (selectedTextBox === "License") {
            setLicense(currentValue);
        }
    }

    return <div>
        <form id="regForm" action="">

            <h1>Register:</h1>

            <div className="tab" style={{ "display": (PageNumber === 0) ? "block" : "none" }}>Login Details:
                <p><input placeholder="E-mail..." value={email} onFocus={(event) => { SetSelectedTextBox("Email") }} onChange={(event) => { setEmail(event.target.value); }} /></p>
                <p><input type="password" value={password} onFocus={(event) => { SetSelectedTextBox("Password") }} placeholder="Password..." onChange={(event) => { setPassword(event.target.value); }} /></p>
                <p><input type="password" value={password2} onFocus={(event) => { SetSelectedTextBox("Password2") }} placeholder="Confirm Password..." onChange={(event) => { setPassword2(event.target.value); }} /></p>
                <p><input placeholder="Phone..." value={Phone} onFocus={(event) => { SetSelectedTextBox("Phone") }} onChange={(event) => { setPhone(event.target.value); }} /></p>

            </div>

            <div className="tab" style={{ "display": (PageNumber === 1) ? "block" : "none" }}>Address:
                <p><input placeholder="Company Name..." value={companyName} onFocus={(event) => { SetSelectedTextBox("CompanyName") }} onChange={(event) => { setCompanyName(event.target.value); }} /></p>
                <p><input placeholder="First Line..." value={firstLine} onFocus={(event) => { SetSelectedTextBox("FirstLine") }} onChange={(event) => { setFirstLine(event.target.value); }} /></p>
                <p><input placeholder="Second Line..." value={secondLine} onFocus={(event) => { SetSelectedTextBox("SecondLine") }} onChange={(event) => { setSecondLine(event.target.value); }} /></p>
                <p><input placeholder="County..." value={county} onFocus={(event) => { SetSelectedTextBox("County") }}  onChange={(event) => { setCounty(event.target.value); }} /></p>
                <p><input placeholder="Country..." value={country} onFocus={(event) => { SetSelectedTextBox("Country") }}  onChange={(event) => { setCountry(event.target.value); }} /></p>
            </div>

            <div className="tab" style={{ "display": (PageNumber === 2) ? "block" : "none" }}>Company Register Date:
                <p><input placeholder="dd" value={DOB_dd} onFocus={(event) => { SetSelectedTextBox("DOB_dd") }} onChange={(event) => { setDOB_dd(event.target.value); }} /></p>
                <p><input placeholder="mm" value={DOB_mm} onFocus={(event) => { SetSelectedTextBox("DOB_mm") }} onChange={(event) => { setDOB_mm(event.target.value); }} /></p>
                <p><input placeholder="yyyy" value={DOB_yyyy} onFocus={(event) => { SetSelectedTextBox("DOB_yyyy") }} onChange={(event) => { setDOB_yyyy(event.target.value); }} /></p>
            </div>

            <div className="tab" style={{ "display": (PageNumber === 3) ? "block" : "none" }}>Legal Details:
                <p><input placeholder="Vat Number..." value={vAT} onFocus={(event) => { SetSelectedTextBox("VAT") }} onChange={(event) => { setVAT(event.target.value); }} /></p>
                <p><input placeholder="License..." value={license} onFocus={(event) => { SetSelectedTextBox("License") }}onChange={(event) => { setLicense(event.target.value); }} /></p>
                <p><input type="checkbox" checked={tAC} onChange={(event) => { setTAC(event.target.value); }} /> Terms and Conditions</p>
            </div>

            <div style={{ "overflow": "auto" }}>
                <div style={{ "float": "right" }}>
                    <button type="button" id="prevBtn" style={{ "display": (PageNumber === 0) ? "none" : "inline" }} onClick={() => setPageNumber(PageNumber - 1)}>Previous</button>
                    <button type="button" id="nextBtn" style={{ "display": (PageNumber === 3) ? "none" : "inline" }} onClick={() => { if (CurrentPageComplate()) { setPageNumber(PageNumber + 1) } }}>Next</button>
                    <button type="button" id="nextBtn" style={{ "display": (PageNumber === 3) ? "inline" : "none" }} onClick={() => { if (CurrentPageComplate()) { Click() } }}>Submit</button>
                </div>
            </div>

            <div style={{ "textAlign": "center", "marginTop": "40px" }}>
                <span className={"step" + ((PageNumber === 0) ? " active" : (PageNumber > 0) ? " finish" : "")}></span>
                <span className={"step" + ((PageNumber === 1) ? " active" : (PageNumber > 1) ? " finish" : "")}></span>
                <span className={"step" + ((PageNumber === 2) ? " active" : (PageNumber > 2) ? " finish" : "")}></span>
                <span className={"step" + ((PageNumber === 3) ? " active" : (PageNumber > 3) ? " finish" : "")}></span>
            </div>

        </form>
        <div class="fixed-bottom">
            <Keyboard onChange={() => keyboard.current.setInput("")} onKeyPress={input => {
                if (input === "{shift}") {
                    if (handleShift())
                        handleShift();
                    setShiftLastUsed(true);
                    return;
                }
                else if (input === "{lock}") {
                    handleShift();
                    if (shiftLastUsed)
                        setShiftLastUsed(false);
                    return;
                }
                else if (input === "{enter}" || input === "{tab}") {
                    if (selectedTextBox === "Email" && email !== "") {
                        SetSelectedTextBox("Password");
                    }
                    else if (selectedTextBox === "Password" && password !== "") {
                        SetSelectedTextBox("Password2");
                    }
                    else if (selectedTextBox === "Password2" && password !== "" && password === password2) {
                        SetSelectedTextBox("Phone");

                    } else if (selectedTextBox === "Phone") {
                        setPageNumber(1);
                        SetSelectedTextBox("CompanyName");
                    } else if (selectedTextBox === "CompanyName" && companyName !== "") {
                        SetSelectedTextBox("FirstLine");
                    } else if (selectedTextBox === "FirstLine" && firstLine !== "") {
                        SetSelectedTextBox("SecondLine");
                    } else if (selectedTextBox === "SecondLine") {
                        SetSelectedTextBox("County");
                    } else if (selectedTextBox === "County") {
                        SetSelectedTextBox("Country");
                    } else if (selectedTextBox === "Country") {
                        setPageNumber(2);
                        SetSelectedTextBox("DOB_dd");
                    } else if (selectedTextBox === "DOB_dd") {
                        SetSelectedTextBox("DOB_mm");
                    } else if (selectedTextBox === "DOB_mm") {
                        SetSelectedTextBox("DOB_yyyy");
                    } else if (selectedTextBox === "DOB_yyyy") {
                        setPageNumber(3);
                        SetSelectedTextBox("VAT");
                    } else if (selectedTextBox === "VAT") {
                        SetSelectedTextBox("License");
                    }

                }
                else {
                    KeyboardInput(input)
                    if (shiftLastUsed) {
                        handleShift();
                        setShiftLastUsed(false);
                    }
                }


            }} layoutName={layoutName}
                keyboardRef={r => (keyboard.current = r)}
            />
        </div>
    </div>;
}
function LoginForm() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("1234");
    const [disabled, setDisabled] = useState(null);
    const [errors, setErrors] = useState(null);
    const [selectedTextBox, SetSelectedTextBox] = useState("Email");
    const [layoutName, setLayoutName] = useState("default");
    const keyboard = useRef();
    const [shiftLastUsed, setShiftLastUsed] = useState(false);

    

    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }

    async function handleSubmit(e) {
        if (e !== null)
            e.preventDefault();
        setDisabled(true);
        if (isValidEmailAddress(email) && password !== "") {
            SendToServer("Login", { "Username": email, "Password": password }, (data) => {
                setDisabled(false);
                console.log();
                if (data.Data === "success") {
                    navigate("/Dashboard", { replace: true });

                } else {
                    AddError("Incorrect Username or Password")
                }
            })
        }
        else {
            setDisabled(false);
        }
    }
    function AddError(message) {
        var rows = errors;
        if (rows === undefined)
            rows = [];
        for (var i = 0; i < rows.lenght; i++) {
            rows.push(<div className="alert alert-danger alert-dismissible" role="alert"> {message} <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>);
        }
        setErrors(rows)
    }

    function KeyboardInput(data) {
        console.log(selectedTextBox)
        var CurrentValue = "";
        if (selectedTextBox === "Email") {
            CurrentValue = email;
        }
        else if (selectedTextBox === "Password") {
            CurrentValue = password;
        }

        if (data === "{bksp}") {
            if (CurrentValue !== "") {
                CurrentValue = CurrentValue.substring(0, CurrentValue.length - 1)
            }
            else {
                return;
            }
        }
        else {
            CurrentValue = CurrentValue + data
        }


        if (selectedTextBox === "Email") {
            setEmail(CurrentValue);
        }
        else if (selectedTextBox === "Password") {
            setPassword(CurrentValue);
        }

    }



    function handleShift() {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
        return layoutName === "default";
    };

    return <div>
        <div className="d-flex align-items-center justify-content-center custom1">
            <div>

                <div id="liveAlertPlaceholder">{errors}</div>
                <section>
                    <div className="container-fluid align-self-center">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid" alt="Sample" />
                            </div>
                            <div className="col-md-9 col-lg-7 col-xl-5 ">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form3Example3" value={email} onFocus={(event) => { SetSelectedTextBox("Email") }} className="form-control form-control-lg"
                                            placeholder="Enter a valid email address" onChange={(event) => { setEmail(event.target.value); }} />
                                        <label className="form-label" htmlFor="form3Example3" autoComplete="off">Email address</label>
                                    </div>


                                    <div className="form-outline mb-3">
                                        <input type="password" id="form3Example4" value={password} onFocus={(event) => { SetSelectedTextBox("Password") }} onChange={(event) => { setPassword(event.target.value); }} className="form-control form-control-lg"
                                            placeholder="Enter password" />
                                        <label className="form-label" htmlFor="form3Example4" autoComplete="off">Password</label>
                                    </div>


                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button disabled={disabled} type="submit" className="btn btn-primary btn-lg custom2" onClick={handleSubmit}>Login</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to="/registration" className="link-danger">Register</NavLink></p>
                                    </div>
                                </form>
                                <div>
                                    <br />
                                    <Keyboard onChange={() => keyboard.current.setInput("")} onKeyPress={input => {
                                        if (input === "{shift}") {
                                            if (handleShift())
                                                handleShift();
                                            setShiftLastUsed(true);
                                            return;
                                        }
                                        else if (input === "{lock}") {
                                            handleShift();
                                            if (shiftLastUsed)
                                                setShiftLastUsed(false);
                                            return;
                                        }
                                        else if (input === "{enter}" || input === "{tab}") {
                                            if (selectedTextBox === "Email")
                                                SetSelectedTextBox("Password");
                                            else if (selectedTextBox === "Password") {
                                                handleSubmit(null)
                                            }
                                            else {
                                                return;
                                            }
                                        }
                                        else {
                                            KeyboardInput(input)
                                            if (shiftLastUsed) {
                                                handleShift();
                                                setShiftLastUsed(false);
                                            }
                                        }


                                    }} layoutName={layoutName}
                                        keyboardRef={r => (keyboard.current = r)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary  fixed-bottom">

                        <div className="text-white mb-3 mb-md-0">
                            Copyright © <CopyrightYear />. All rights reserved. Version: {packageJson.version}
                        </div>


                    </div>
                </section>


            </div>
        </div>
        <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary  fixed-bottom">

            <div className="text-white mb-3 mb-md-0">
                Copyright © <CopyrightYear />. All rights reserved. Version: {packageJson.version}
            </div>
            



        </div>
    </div>
}

export default LoginPage;

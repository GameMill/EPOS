import React, { useState, useRef } from 'react'

import Keyboard from 'react-simple-keyboard';

function CbKeyboard(props) 
{

    const [layoutName, setLayoutName] = useState("default");
    const keyboard = useRef();
    const [shiftLastUsed, setShiftLastUsed] = useState(false);
    function handleShift() {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
        return layoutName === "default";
    };

    return <Keyboard   onChange={() => keyboard.current.setInput("")} {...props} onKeyPress={input => {
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
                   

                }
                else {
                    props.OnInput(input)
                    if (shiftLastUsed) {
                        handleShift();
                        setShiftLastUsed(false);
                    }
                }


            }} layoutName={layoutName}
                keyboardRef={r => (keyboard.current = r)}
            />
}


export default CbKeyboard;
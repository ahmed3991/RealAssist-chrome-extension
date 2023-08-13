import { faEnvelope, faMessage, faPhone, faThumbtack } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Email from "./Email"
import React from 'react';

const Types = ({ typeActive, setTypeActive, toneActive, setToneActive, lengthActive, setLengthActive, onTextareaChange }) => {
    return (
        <>
            <div className="flex m-auto w-full justify-around">
                <button className={`px-1 flex justify-center text-sm items-center gap-1 text-white py-2 types border-white block ${typeActive === "note" ? "opacity-100" : "opacity-20"}`} onClick={() => setTypeActive("note")}>
                    <FontAwesomeIcon icon={faThumbtack} />
                    Create Note
                </button>
                <button className={`px-1 flex justify-center text-sm items-center gap-1 text-white py-2 types border-white block ${typeActive === "email" ? "opacity-100" : "opacity-20"}`} onClick={() => setTypeActive("email")}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    Send Email
                </button>
                <button className={`px-1 flex justify-center text-sm items-center gap-1 text-white py-2 types border-white block ${typeActive === "text" ? "opacity-100" : "opacity-20"}`} onClick={() => setTypeActive("text")}>
                    <FontAwesomeIcon icon={faMessage} />
                    Text
                </button>
                <button className={`px-1 flex justify-center text-sm items-center gap-1 text-white py-2 types border-white block ${typeActive === "call" ? "opacity-100" : "opacity-20"}`} onClick={() => setTypeActive("call")}>
                    <FontAwesomeIcon icon={faPhone} />
                    Log Call
                </button>
            </div>
            {
                {
                    'note': <Email toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} />,
                    'email': <Email toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} />,
                    'text': <Email toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} />,
                    'call': <Email toneActive={toneActive} setToneActive={setToneActive} lengthActive={lengthActive} setLengthActive={setLengthActive} />
                }[typeActive]
            }
        </>
    )
}

export default Types
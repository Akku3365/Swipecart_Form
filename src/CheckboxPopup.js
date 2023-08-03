/** @format */

import React, { useState } from "react";
import './Popup.css'

function CheckboxPopup({ OnSubmitCheckBox, CheckClose }) {
    const [valueOne, setValueOne] = useState("");
    const [valueTwo, setValueTwo] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!valueOne || !valueTwo) {
            setError("All fields are required");
            return;
        }

        const checkboxData = {
            id: Date.now(),
            valueOne,
            valueTwo,
        };

        OnSubmitCheckBox(checkboxData);

        setValueOne("");
        setValueTwo("");
    };

    return (
        <div className="popup-container">
            <div className="popup-form" >
                <form onSubmit={handleSubmit}>
                    <label className="fs-4 mt-1">
                        Enter checkbox label:
                        <input type="text" value={valueOne} onChange={(e) => setValueOne(e.target.value)} />
                    </label>
                    <br />
                    <label className="fs-4 mt-2">
                        Enter Checkbox value:
                        <input type="text" value={valueTwo} onChange={(e) => setValueTwo(e.target.value)} />
                    </label>
                    <br />
                    {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
                    <button className="btn btn-primary mt-4" type="submit">Submit</button>
                </form>
                <button className="btn btn-danger mt-4" onClick={CheckClose} >Close</button>
            </div>
        </div>
    );
}

export default CheckboxPopup;

/** @format */

import React, { useState, useEffect } from "react";
import './Popup.css'

function CheckboxPopup({ OnSubmitCheckBox, CheckClose, editingField }) {
    const [checkBoxLabel, setCheckBoxLabel] = useState("");
    const [valueOne, setValueOne] = useState("");
    const [valueTwo, setValueTwo] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // If editingField prop is provided, populate the form fields with its values
        if (editingField) {
          setCheckBoxLabel(editingField.checkBoxLabel);
          setValueOne(editingField.valueOne);
          setValueTwo(editingField.valueTwo);
        }
      }, [editingField]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!valueOne) {
            setError("All fields are required");
            return;
        }

        const checkboxData = {
            id: editingField ? editingField.id : Date.now(),
            checkBoxLabel,
            valueOne,
            valueTwo,
        };

        OnSubmitCheckBox(checkboxData);
        setCheckBoxLabel("");
        setValueOne("");
        setValueTwo("");
    };

    return (
        <div className="popup-container">
            <div className="popup-form" >
                <form onSubmit={handleSubmit}>
                    <label className="fs-4 mt-1">
                        Enter checkbox label:
                        <input type="text" placeholder="Enter checkbox label" value={checkBoxLabel} onChange={(e) => setCheckBoxLabel(e.target.value)} />
                    </label>
                    <br />
                    <label className="fs-4 mt-1">
                        Enter checkbox value 1:
                        <input type="text" placeholder="Enter first value" value={valueOne} onChange={(e) => setValueOne(e.target.value)} />
                    </label>
                    <br />
                    <label className="fs-4 mt-2">
                        Enter checkbox value 2:
                        <input type="text" placeholder="Enter second value" value={valueTwo} onChange={(e) => setValueTwo(e.target.value)} />
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

import React, { useState, useEffect } from "react";
import './Popup.css'

function CheckboxPopup({ OnSubmitCheckBox, CheckClose, editCheckBox }) {
    const [checkBoxLabel, setCheckBoxLabel] = useState("");
    const [values, setValues] = useState([{ value: "" }]);
    const [error, setError] = useState("");

    useEffect(() => {
        // If editingField prop is provided, populate the form fields with its values
        if (editCheckBox) {
            setCheckBoxLabel(editCheckBox.checkBoxLabel);
            setValues(editCheckBox.values);
        }
    }, [editCheckBox]);

    const handleChange = (index, newValue) => {
        const newValues = [...values];
        newValues[index].value = newValue;
        setValues(newValues);
    };

    const handleAddValue = () => {
        setValues([...values, { value: "" }]);
    };

    const handleRemoveValue = (index) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checkBoxLabel || values.some(item => item.value === "")) {
            setError("All fields are required");
            return;
        }

        const checkboxData = {
            id: editCheckBox ? editCheckBox.id : Date.now(),
            checkBoxLabel,
            values,
        };

        OnSubmitCheckBox(checkboxData);
        setCheckBoxLabel("");
        setValues([{ value: "" }]);
    };

    return (
        <div className="popup-container">
            <div className="popup-form">
                <form onSubmit={handleSubmit}>
                    <label className="fs-4 mt-1">
                        Enter checkbox label:
                        <input type="text" placeholder="Enter checkbox label" value={checkBoxLabel} onChange={(e) => setCheckBoxLabel(e.target.value)} />
                    </label>
                    <br />
                    {values.map((item, index) => (
                        <div key={index}>
                            <label className="fs-4 mt-1">
                                Enter value {index + 1}:
                                <input type="text" placeholder={`Enter value ${index + 1}`} value={item.value} onChange={(e) => handleChange(index, e.target.value)} />
                            </label>
                            {index > 0 && (
                                <button type="button" onClick={() => handleRemoveValue(index)}>Remove</button>
                            )}
                            <br />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddValue}>Add Value</button>
                    <br />
                    {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
                    <button className="btn btn-primary mt-4" type="submit">Submit</button>
                </form>
                <button className="btn btn-danger mt-4" onClick={CheckClose}>Close</button>
            </div>
        </div>
    );
}

export default CheckboxPopup;


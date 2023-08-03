/** @format */

import React, { useState } from "react";
import "./Popup.css";

function TextPopup({ onSubmitData, TextClose }) {
    const [labelName, setLabelName] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!labelName || !fieldName || !placeholder) {
            setError("All fields are required");
            return;
        }

        const formData = {
            id: Date.now(),
            labelName,
            fieldName,
            placeholder,
        };

        onSubmitData(formData);

        setLabelName("");
        setFieldName("");
        setPlaceholder("");
    };

    return (
        <div className="popup-container">
            <div className="popup-form">
                <form onSubmit={handleSubmit}>
                    <label className="fs-4 mt-2">
                        Enter label Name:
                        <input type="text" value={labelName} onChange={(e) => setLabelName(e.target.value)} />
                    </label>
                    <br />
                    <label className="fs-4 mt-4">
                        Enter Field Name:
                        <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
                    </label>
                    <br />
                    <label className="fs-4 mt-4">
                        Enter placeholder:
                        <input type="text" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                    </label>
                    <br />
                    {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
                        <button className="btn btn-primary mt-4" type="submit">
                            Submit
                        </button>
                </form>
                        <button className="btn btn-danger mt-4" onClick={TextClose}> Close</button>
            </div>
        </div>
    );
}

export default TextPopup;

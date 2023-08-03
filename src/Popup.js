/** @format */

import React, { useState } from "react";

const Popup = ({ formName, setFormName, handleFieldTypeSelection, usedFormNames, handleFormSubmit }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormNameChange = (e) => {
        setFormName(e.target.value);
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usedFormNames.includes(formName)) {
            setErrorMessage("Form Name must be unique. This name is already used.");
        } else {
            handleFormSubmit(e);
            // console.log("clicked");
        }
    };

    return (
        <div style={{width: "500px"}} className="mt-5 card border shadow">
           <div className="card-body" >
            <h2>Customise form</h2>
            <form className="fs-4" onSubmit={handleSubmit}>
                <label className="fw-bold mt-2">
                    Form Name :
                    <input type="text" value={formName} placeholder="Enter Form name. . ." onChange={handleFormNameChange} />
                </label>
                <p className="fw-bold mt-4"> Select Field type</p>
                <div className="field-buttons">
                    <button style={{ marginRight: "10px" }} className="btn btn-primary" type="button" onClick={() => handleFieldTypeSelection("text")}>
                        Text
                    </button>
                    <button style={{ marginRight: "10px" }} className="btn btn-primary" type="button" onClick={() => handleFieldTypeSelection("checkbox")}>
                        Checkbox
                    </button>
                    <button style={{ marginRight: "10px" }} className="btn btn-primary" type="button" onClick={() => handleFieldTypeSelection("file")}>
                        File
                    </button>
                </div>
                <button className="btn btn-dark mt-4" type="submit">
                    Create
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
            </div>
        </div>
    );
};

export default Popup;

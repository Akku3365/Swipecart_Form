/** @format */

import React from "react";

const TempForm = ({ savedData, checkboxSavedData, fileSavedData, handleDeleteTextField, handleEditField, handleDeleteCheckboxField, handleCheckBoxEdit, handleDeleteFileField, handleFileBoxEdit }) => {
    console.log(checkboxSavedData);
    return (
        <div style={{ textAlign: "center", width: "600px" }}>
            <div className="fs-4 mt-4">
                {savedData.map((data, index) => (
                    <div key={index} className="mb-3">
                        <h4>{data.labelName}</h4>
                        <label>{data.fieldName} :</label>
                        <input type="text" placeholder={data.placeholder} />
                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteTextField(data.id)}>
                            Delete
                        </button>
                        <button className="btn btn-info mx-1" onClick={() => handleEditField(data)}>
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            <div className="fs-4 mt-4">
                {checkboxSavedData.map((data, index) => (
                    <div key={index} className="mb-3">
                        <label className="fs-3">{data.checkBoxLabel}</label>
                        <br />
                        {data.values.map((item, idx) => (
                            <label key={idx}>
                                {item.value}
                                <input type="checkbox" />
                            </label>
                        ))}
                        <br />
                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteCheckboxField(data.id)}>
                            Delete
                        </button>
                        <button className="btn btn-info mx-1" onClick={() => handleCheckBoxEdit(data)}>
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            <div className="fs-4 mt-4">
                {fileSavedData.map((data, index) => (
                    <div key={index} className="mb-3">
                        <label>{data.fileLableName}</label>
                        <br />
                        <input type="file" />
                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteFileField(data.id)}>
                            Delete
                        </button>
                        <button className="btn btn-info mx-1" onClick={() => handleFileBoxEdit(data)}>
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TempForm;

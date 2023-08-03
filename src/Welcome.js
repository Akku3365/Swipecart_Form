/** @format */

import React, { useState } from "react";
import Popup from "./Popup";
import TextPopup from "./TextPopup";
import CheckboxPopup from "./CheckboxPopup";
import FilePopup from "./FilePopup";
// import FinalForm from "./FinalForm";

const Welcome = () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const [formDataList, setFormDataList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showTextPopup, setShowTextPopup] = useState(false);
    const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
    const [showFilePopup, setShowFilePopup] = useState(false);
    const [formName, setFormName] = useState("");

    const [fieldType, setFieldType] = useState([]);
    const [usedFormNames, setUsedFormNames] = useState(() => {
        const storedFormNames = localStorage.getItem("formdata");
        return storedFormNames ? Object.keys(JSON.parse(storedFormNames)) : [];
    });

    // States for perform editing
    const [editingField, setEditingField] = useState(null);
    const [editCheckBox, setEditCheckBox] = useState(null);
    const [editFileBox, setEditFileBox] = useState(null);
    // Indivisual states for Popup fields
    const [savedData, setSavedData] = useState([]);
    const [checkboxSavedData, setCheckboxSavedData] = useState([]);
    const [fileSavedData, setFileSavedData] = useState([]);

    const handleCreateForm = () => {
        setShowForm(true);
        setSavedData([]);
        setFieldType([]); // Clear selected field types
    };

    const handleFieldTypeSelection = (type) => {
        setFieldType([...fieldType, type]);
        if (type === "text") {
            setShowTextPopup(true);
            setShowCheckboxPopup(false);
            setShowFilePopup(false);
            console.log("Text Clicked");
        } else if (type === "checkbox") {
            setShowCheckboxPopup(true);
            setShowTextPopup(false);
            setShowFilePopup(false);
            // setFieldType([...fieldType, type]);
        } else if (type === "file") {
            setShowFilePopup(true);
            setShowTextPopup(false);
            setShowCheckboxPopup(false);
            console.log("File Clicked");
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (formName.trim() === "") {
            alert("Form Name cannot be empty.");
            return; // Exit the function without saving data
        }
        // Check if the form name is unique
        if (!usedFormNames.includes(formName)) {
            // Update the list of used form names
            setUsedFormNames([...usedFormNames, formName]);

            // Save the current form data to localStorage
            const formData = JSON.parse(localStorage.getItem("formdata") || "{}");
            // Initialize the form data array for this formName if not already present
            if (!formData[formName]) {
                formData[formName] = [];
            }

            // Push the new data to the existing form data for the corresponding formName
            // console.log(savedData);
            formData[formName].push(...savedData, ...checkboxSavedData, ...fileSavedData);
            // Update the localStorage with the updated form data
            localStorage.setItem("formdata", JSON.stringify(formData));

            const newFormData = {
                [formName]: [[fieldType], [...savedData], [checkboxSavedData], [fileSavedData]],
            };

            setFormDataList([newFormData]);
            // Clear the savedData after form submission
            setCheckboxSavedData([]);
            setSavedData([]);
            setFileSavedData([]);
            setFieldType([]);
        } else {
            console.log("Form Name must be unique. This name is already used.");
        }
    };

    const handlePopupSave = (Data) => {
        if (editingField) {
            const updatedData = savedData.map((item) => (item.id === editingField.id ? Data : item));
            setSavedData(updatedData);
        } else {
            setSavedData((prevSavedData) => [...prevSavedData, Data]);
        }
        setShowTextPopup(false);
        setEditingField(null);
    };

    const handleEditField = (field) => {
        console.log(field.labelName)
        setEditingField(field);
        setShowTextPopup(true);
    };

    const checkBoxPopupSave = (checkData) => {
        if (editCheckBox) {
            const updatedCheckboxData = checkboxSavedData.map((item) => (item.id === editCheckBox.id ? checkData : item));
            setCheckboxSavedData(updatedCheckboxData);
        } else {
            setCheckboxSavedData((prevSavedData) => [...prevSavedData, checkData]);
        }
        setShowCheckboxPopup(false);
        setEditCheckBox(null);
    };

    const handleCheckBoxEdit = (field) => {
        console.log(field)
        setEditCheckBox(field);
        setShowCheckboxPopup(true);
    };

    const fileBoxPopupSave = (fileData) => {
        if (editFileBox) {
            const updatedFileData = fileSavedData.map((item) => (item.id === editFileBox.id ? fileData : item));
            setFileSavedData(updatedFileData);
        } else {
            setFileSavedData((prevSavedData) => [...prevSavedData, fileData]);
        }
        setShowFilePopup(false);
        setEditFileBox(null);
    };

    const handleFileBoxEdit = (field) => {
        console.log(field)
        setEditFileBox(field);
        setShowFilePopup(true);
    };

    const handleDeleteTextField = (id) => {
        setSavedData((prevSavedData) => prevSavedData.filter((data) => data.id !== id));
    };

    const handleDeleteCheckboxField = (id) => {
        setCheckboxSavedData((prevSavedData) => prevSavedData.filter((data) => data.id !== id));
    };

    const handleDeleteFileField = (id) => {
        setFileSavedData((prevSavedData) => prevSavedData.filter((data) => data.id !== id));
    };

    const TextClose = () => {
        setShowTextPopup(false);
    }

    const CheckClose = () => {
        setShowCheckboxPopup(false);
    }

    const FileClose = () => {
        setShowFilePopup(false);
    }

    // console.log(formDataList)
    return (
        <div>
            {userData ? (
                <div className="container">
                    <h2>
                        Hello Welcome to Swipecart Mr <span style={{ fontSize: "35px", color: "red" }}>{userData.username}</span>
                    </h2>
                    <p className="fs-4">
                        Create your first form with us!!{" "}
                        <button className="btn btn-success" onClick={handleCreateForm}>
                            Create Form
                        </button>
                    </p>

                    {showForm && (
                        // Rendering Popup component
                        <Popup
                            formName={formName}
                            setFormName={setFormName}
                            handleFormSubmit={handleFormSubmit}
                            handleFieldTypeSelection={handleFieldTypeSelection}
                            handlePopupSave={handlePopupSave}
                            usedFormNames={usedFormNames} // Pass the usedFormNames to Popup component
                        />
                    )}
                    {showTextPopup && <TextPopup TextClose={TextClose} onSubmitData={handlePopupSave} />}
                    {showCheckboxPopup && <CheckboxPopup CheckClose={CheckClose} OnSubmitCheckBox={checkBoxPopupSave} />}
                    {showFilePopup && <FilePopup FileClose={FileClose} OnSubmitFileBox={fileBoxPopupSave} />}
                    <div style={{ textAlign: "center" }}>
                        <div className="fs-4 mt-4">
                            {savedData.map((data, index) => (
                                <div key={index} className="mb-3">
                                    <h4>{data.labelName}</h4>
                                    <label>{data.fieldName} :</label>
                                    <input type="text" placeholder={data.placeholder} />
                                    <button className="btn btn-danger mx-1" onClick={() => handleDeleteTextField(data.id)}>
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                    <button className="btn btn-info mx-1" onClick={() => handleEditField(data)}>
                                        <i className="bi bi-pencil"></i> Edit
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="fs-4 mt-4">
                            {checkboxSavedData.map((data, index) => (
                                <div key={index} className="mb-3">
                                    <label>{data.valueOne}</label>
                                    <br />
                                    <label>
                                        {data.valueTwo}
                                        <input type="checkbox" />
                                    </label>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDeleteCheckboxField(data.id)}>
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                    <button className="btn btn-info mx-1" onClick={() => handleCheckBoxEdit(data)}>
                                        <i className="bi bi-pencil"></i> Edit
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
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                    <button className="btn btn-info mx-1" onClick={() => handleFileBoxEdit(data)}>
                                        <i className="bi bi-pencil"></i> Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Welcome;

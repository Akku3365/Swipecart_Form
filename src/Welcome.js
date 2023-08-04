/** @format */

import React, { useState } from "react";
import Popup from "./Popup";
import TextPopup from "./TextPopup";
import CheckboxPopup from "./CheckboxPopup";
import FilePopup from "./FilePopup";
import TempForm from "./TempForm";
import CurrentForm from "./CurrentForm";
// import FinalForm from "./FinalForm";

const Welcome = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
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

    // let init = {

    // }

    // States for perform editing
    // const [textEdit, setTextEdit] = useState(init);
    const [editingField, setEditingField] = useState(null);
    const [editCheckBox, setEditCheckBox] = useState(null);
    const [editFileBox, setEditFileBox] = useState(null);
    // Indivisual states for Popup fields
    const [savedData, setSavedData] = useState([]);
    const [checkboxSavedData, setCheckboxSavedData] = useState([]);
    const [fileSavedData, setFileSavedData] = useState([]);

    const [formDataList, setFormDataList] = useState(() => {
        const storedFormDataList = JSON.parse(localStorage.getItem("formdataList") || "[]");
        return storedFormDataList;
    });

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
            // Create a new form object to hold the form data
            const newFormObject = {
                formName: formName,
                fields: [],
            };

            // Add the input fields data to the newFormObject's fields array
            savedData.forEach((data) => {
                const fieldObject = {
                    fieldType: "text",
                    labelName: data.labelName,
                    fieldName: data.fieldName,
                    placeholder: data.placeholder,
                };
                newFormObject.fields.push(fieldObject);
            });

            // Add the checkbox fields data to the newFormObject's fields array
            checkboxSavedData.forEach((data) => {
                const fieldObject = {
                    fieldType: "checkbox",
                    checkBoxLabel: data.checkBoxLabel,
                    valueOne: data.valueOne,
                    valueTwo: data.valueTwo,
                };
                newFormObject.fields.push(fieldObject);
            });

            // Add the file fields data to the newFormObject's fields array
            fileSavedData.forEach((data) => {
                const fieldObject = {
                    fieldType: "file",
                    fileLableName: data.fileLableName,
                };
                newFormObject.fields.push(fieldObject);
            });

            // Update the list of used form names
            setUsedFormNames([...usedFormNames, formName]);

            // Save the current form data to localStorage
            const formDataList = JSON.parse(localStorage.getItem("formdataList") || "[]");
            formDataList.push(newFormObject);

            console.log(formDataList);
            localStorage.setItem("formdataList", JSON.stringify(formDataList));

            setFormDataList(formDataList);

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
        const editField = savedData.find((item) => item.id === field.id);
        setEditingField(editField);
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
        const editField = checkboxSavedData.find((item) => item.id === field.id);
        setEditCheckBox(editField);
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
        console.log(field);
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

    const CheckClose = () => {
        setShowCheckboxPopup(false);
    };

    const FileClose = () => {
        setShowFilePopup(false);
    };

    // console.log(formDataList)
    return (
        <div>
            {userData ? (
                <div>
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
                    {showTextPopup && (
                        <TextPopup
                            TextClose={() => {
                                setShowTextPopup(false);
                                setEditingField(null);
                            }}
                            onSubmitData={handlePopupSave}
                            editingField={editingField}
                        />
                    )}
                    {showCheckboxPopup && <CheckboxPopup CheckClose={CheckClose} OnSubmitCheckBox={checkBoxPopupSave} />}
                    {showFilePopup && <FilePopup FileClose={FileClose} OnSubmitFileBox={fileBoxPopupSave} />}
                    <TempForm savedData={savedData} checkboxSavedData={checkboxSavedData} fileSavedData={fileSavedData} handleDeleteTextField={handleDeleteTextField} handleEditField={handleEditField} handleDeleteCheckboxField={handleDeleteCheckboxField} handleCheckBoxEdit={handleCheckBoxEdit} handleDeleteFileField={handleDeleteFileField} handleFileBoxEdit={handleFileBoxEdit} />
                    <CurrentForm formDataList={formDataList} />
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Welcome;

// /** @format */

// import React, { useState } from "react";
// import "./Popup.css";

// function TextPopup({ onSubmitData, TextClose }) {
//     const [labelName, setLabelName] = useState("");
//     const [fieldName, setFieldName] = useState("");
//     const [placeholder, setPlaceholder] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!labelName && !fieldName) {
//             setError("Kindly Fill required fields");
//             return;
//         } else if(!labelName) {
//             setError("Label Display Name is required");
//             return;
//         } else if(!fieldName) {
//             setError("Label Name is required");
//             return;
//         }

//         const formData = {
//             id: Date.now(),
//             labelName,
//             fieldName,
//             placeholder,
//         };

//         onSubmitData(formData);

//         setLabelName("");
//         setFieldName("");
//         setPlaceholder("");
//     };

//     return (
       
//             <div className="popup-form">
//                 <form onSubmit={handleSubmit}>
//                     <label className="fs-4 mt-2">
//                     Label Display Name:
//                         <input type="text" placeholder="Enter label display name" value={labelName} onChange={(e) => setLabelName(e.target.value)} />
//                     </label>
//                     <br />
//                     <label className="fs-4 mt-4">
//                     Label Name:
//                         <input type="text" placeholder="Enter label name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
//                     </label>
//                     <br />
//                     <label className="fs-4 mt-4">
//                     Placeholder Text:
//                         <input type="text" placeholder="Enter placeholder text" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
//                     </label>
//                     <br />
//                     {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
//                         <button className="btn btn-primary mt-4" type="submit">
//                             Submit
//                         </button>
//                 </form>
//                         <button className="btn btn-danger mt-4" onClick={TextClose}> Close</button>
//             </div>
//     );
// }

// export default TextPopup;



import React, { useState, useEffect } from "react";
import "./Popup.css";

function TextPopup({ onSubmitData, TextClose, editingField }) {
    const [labelName, setLabelName] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      // If editingField prop is provided, populate the form fields with its values
      if (editingField) {
        setLabelName(editingField.labelName);
        setFieldName(editingField.fieldName);
        setPlaceholder(editingField.placeholder);
      }
    }, [editingField]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!labelName && !fieldName) {
        setError("Kindly Fill required fields");
        return;
      } else if (!labelName) {
        setError("Label Display Name is required");
        return;
      } else if (!fieldName) {
        setError("Label Name is required");
        return;
      }
  
      const formData = {
        id: editingField ? editingField.id : Date.now(), // If editingField exists, use its id for update, else generate a new id for a new entry
        labelName,
        fieldName,
        placeholder,
      };
  
      onSubmitData(formData);
  
      setLabelName("");
      setFieldName("");
      setPlaceholder("");
      setError("");
    };
  
    return (
      <div className="popup-form">
        <form onSubmit={handleSubmit}>
          <label className="fs-4 mt-2">
            Label Display Name:
            <input
              type="text"
              placeholder="Enter label display name"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
            />
          </label>
          <br />
          <label className="fs-4 mt-4">
            Label Name:
            <input
              type="text"
              placeholder="Enter label name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </label>
          <br />
          <label className="fs-4 mt-4">
            Placeholder Text:
            <input
              type="text"
              placeholder="Enter placeholder text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </label>
          <br />
          {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
          <button className="btn btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>
        <button className="btn btn-danger mt-4" onClick={TextClose}>
          Close
        </button>
      </div>
    );
  }
  
  export default TextPopup;
  

import React, { useState } from 'react'
import './Popup.css'


function FilePopup({OnSubmitFileBox, FileClose}) {

  const [fileLableName, setFileLableName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!fileLableName) {
      setError("Please enter label name");
      return;
    }

    const fileData = {
        id: Date.now(),
        fileLableName
    }
    OnSubmitFileBox(fileData);

    setFileLableName("");

  }


  return (
    <div className="popup-container">
    <div className="popup-form">
     <form onSubmit={handleSubmit}>
      <label className="fs-4 mt-2">
          Enter File label Name:
          <input type='text' placeholder='Enter File label Name' value={fileLableName} onChange={(e) => setFileLableName(e.target.value)} />
        </label>
        <br />
        <button className="btn btn-primary mt-4" type="submit">Submit</button>
      </form>
      {error && <h4 className="error-message mt-2 text-danger">{error}</h4>}
      <button className="btn btn-danger mt-4" onClick={FileClose}>Close</button>
    </div>
    </div>
  )
}

export default FilePopup

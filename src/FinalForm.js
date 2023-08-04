/** @format */

import React, { useEffect, useState } from "react";
import "./FinalForm.css";

function FinalForm({ formdataList }) {
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        const formdataList = JSON.parse(localStorage.getItem("formdataList"));
        setFinalData(formdataList);
    }, []);

    console.log(finalData);

    return (
        <>
            <div className="container1">
                <div className="final-form1">
                    <h1>Your personal Forms List</h1>
                    {finalData.map((data, index) => (
                      <div key={index}>
                            <h4 className="form-number1 mt-5">Form Number {index + 1}</h4>
                            <h4 className="form-name1">Form Name : {data.formName}</h4>
                            <button>Access</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FinalForm;

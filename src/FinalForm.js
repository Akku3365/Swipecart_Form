/** @format */

import React from "react";

const FinalForm = ({ formDataList }) => {
    console.log(formDataList);
    return (
        <div>
            {formDataList.map((formData, index) => {
                // Extracting formName and fields data
                const formName = Object.keys(formData)[0];
                const fieldsData = formData[formName];

                console.log("Form Name: ", formName);
                {/* console.log(fieldsData[0][0]);
                console.log(fieldsData[1][0]); */}
                return (
                    <div key={index}>
                        <h2>{formName}</h2>
                        <div key={fieldsData[1].id}>
                            {fieldsData[0] === "text" && (
                                <>
                                    <p>{fieldsData[1].labelName}</p>
                                    <label>
                                        {fieldsData[1].fieldName}:
                                        <input type="text" placeholder={fieldsData[1].placeholder} />
                                    </label>
                                </>
                            )}
                            {fieldsData[0] === "checkbox" && (
                                <>
                                    <label>{fieldsData[1].valueOne}</label>
                                    <br />
                                    <label>{fieldsData[1].valueTwo}:</label>
                                    <input type="checkbox" />
                                </>
                            )}
                            {fieldsData[0] === "file" && (
                                <>
                                    <label>{fieldsData[1].fileLableName}</label>
                                    <br />
                                    <input type="file" />
                                </>
                            )}
                            {/* {fieldsData[0] === "text" && fieldsData[0] === "check"} */}
                        </div>
                        
                    </div>
                );
            })}
        </div>
    );
};

export default FinalForm;

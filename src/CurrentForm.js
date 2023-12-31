/** @format */

import React from "react";
import "./CurrentForm.css";

const CurrentForm = ({ formDataList }) => {
    if (!formDataList || formDataList.length === 0) {
        return;
    }

    const lastFormData = formDataList[formDataList.length - 1];
    console.log(lastFormData)

    return (
        <div className="current-form">
            <form>
                   <h2 className="text-center">{lastFormData.formName}</h2>
                {lastFormData.fields.map((field, index) => (
                    <div key={index} className="form-field">
                        {field.fieldType === "text" && (
                            <div>
                                <h4>{field.fieldName}</h4>
                                <label>{field.labelName}</label>
                                <input type="text" placeholder={field.placeholder} />
                            </div>
                        )}

{field.fieldType === "checkbox" && (
                            <div>
                                <h4>{field.checkBoxLabel}</h4>
                                {field.values.map((item, idx) => (
                                    <div key={idx}>
                                        <label className="fs-4">{item.value}</label>
                                        <input type="checkbox" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {field.fieldType === "file" && (
                            <div>
                                <h4>{field.fileLableName}</h4>
                                <input type="file" />
                            </div>
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default CurrentForm;

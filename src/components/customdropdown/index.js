import * as React from 'react';
import {useEffect, useState} from "react";

function Index({
    data = [],
    width = "40%",
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    placeholder = "placeholder",
    touched = false,
    errorMessage = ""
}) {
    const errorStat = touched === true && errorMessage !== ""
    const [datadd,setdatadd] = useState([])

    useEffect(() => {
        setupdata()
    }, []);

    function setupdata() {
        setdatadd(data)
    }

    function onChangeValue(event) {
        onChange(event.target.value)
    }

    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            <select
            defaultValue={'DEFAULT'}
            onChange={(event) => onChangeValue(event)}
            onBlur={onBlur}
            onFocus={onFocus}
            style={{
                borderColor: errorStat ? "red" : "gray",
                padding: 10,
                outline: "none",
                borderRadius: "5px",
                fontSize: "15px"
            }}>
                <React.Fragment>
                    <option value="DEFAULT" disabled={true}>{placeholder}</option>
                    {datadd?.map((i,x) => (
                        <option key={x} value={JSON.stringify(i)}>{i?.name}</option>
                    ))}
                </React.Fragment>
            </select>
            {errorStat && (
                <div style={{
                    fontSize: 12,
                    color: "red"
                }}>{errorMessage}</div>
            )}
        </div>
    )
}

export default Index;

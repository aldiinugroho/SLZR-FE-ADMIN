import * as React from 'react';
import {useEffect, useState} from "react";

function Index({
    value = "",
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
    const [valuedata,setvaluedata] = useState("")
    // const selectRef = React.useRef(null)

    useEffect(() => {
        setupdata()
    }, [data]);

    function setupdata() {
        // if (selectRef.current && value === "") {
        //     selectRef.current.value = 'DEFAULT';
        // } else if (selectRef.current && value !== "") {
        //     selectRef.current.value = value
        // }
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
            // ref={selectRef}
            value={value}
            // defaultValue={"DEFAULT"}
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
                        <React.Fragment key={x} >
                            {/* {console.log({loopedvalue: JSON.stringify(i), valuedata})} */}
                            <option value={JSON.stringify(i)}>{i?.name}</option>
                        </React.Fragment>
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

import * as React from 'react';
import { formatNumber } from '../../utils';

function Index({
    placeholder = "0",
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    width = "40%",
    errorMessage = "",
    value = "",
    touched = false,
    type = "text"
}) {
    const errorStat = touched === true && errorMessage !== ""
    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                // display: "flex",
                borderColor: errorStat ? "red" : "gray",
                borderRadius: "5px",
                borderWidth: "1px",
                borderStyle: "solid",
                outline: "none",
                padding: "10px",
            }}>
                {value === "" && <div style={{ fontSize: 12 }}>{placeholder}</div>}
                <div style={{
                    display: "flex"
                }}>
                    <div style={{
                        fontSize: 15
                    }}>Rp</div>
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => {
                            let rawval = e.target.value.replace(/\./g, "");
                            let newval = formatNumber(rawval)
                            onChange(newval)
                        }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "15px"
                        }}
                        placeholder={"0"}
                    />
                </div>
            </div>
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

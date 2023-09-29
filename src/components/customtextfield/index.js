import * as React from 'react';

function Index({
    placeholder = "",
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    width = "40%",
    errorMessage = "",
    value = "",
    touched = false,
    type = "text",
    maxLength = 0
}) {
    const errorStat = touched === true && errorMessage !== ""
    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            {maxLength !== 0 && <div style={{
                fontSize: 12,
                textAlign: "right"
            }}>{value.length}/16</div>}
            <input
                maxLength={maxLength === 0 ? 99999999 : maxLength}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                    borderColor: errorStat ? "red" : "gray",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    outline: "none",
                    padding: "10px",
                    fontSize: "15px"
                }}
                placeholder={placeholder}
            />
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

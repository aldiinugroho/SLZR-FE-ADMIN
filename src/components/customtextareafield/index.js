import * as React from 'react';

function Index({
    placeholder = "",
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    width = "40%",
    errorMessage = "",
    value = "",
    touched = false
}) {
    const errorStat = touched === true && errorMessage !== ""
    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            <textarea
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
                    fontSize: "15px",
                    minHeight: "10rem",
                    fontFamily: "sans-serif"
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

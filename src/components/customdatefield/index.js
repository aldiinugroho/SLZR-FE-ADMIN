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
    type = "date"
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
              display: "flex",
              flexDirection: "column",
              borderColor: errorStat ? "red" : "gray",
              borderRadius: "5px",
              borderWidth: "1px",
              borderStyle: "solid",
              padding: "10px",
            }}>
              {value === "" && <div style={{ fontSize: 12 }}>{placeholder}</div>}
              <input
                  type={type}
                  value={value}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  style={{
                    border: "none",
                      // borderColor: errorStat ? "red" : "gray",
                      // borderRadius: "5px",
                      // borderWidth: "1px",
                      // borderStyle: "solid",
                      outline: "none",
                      // padding: "10px",
                      fontSize: "15px",
                      fontFamily: "sans-serif"
                  }}
              />
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

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
    type = "text"
}) {
    const errorStat = touched === true && errorMessage !== ""

    function handleFileInputChange(event) {
        const selectedFile = event.target.files[0];
        const fileName = selectedFile.name;
        const fakePath = event.target.value; // This will contain the "fakepath"
        console.log('File Name:', fileName);
        console.log('selectedFile:', selectedFile);
        console.log('Fake Path:', fakePath);
    }
    
    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            <input
                type={"file"}
                // value={value}
                onChange={(event) => handleFileInputChange(event)}
                // onFocus={onFocus}
                // onBlur={onBlur}
                style={{
                    borderColor: errorStat ? "red" : "gray",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    outline: "none",
                    padding: "10px",
                    fontSize: "15px"
                }}
                accept="image/png, image/gif, image/jpeg"
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

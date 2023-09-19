import * as React from 'react';
import { Customalert } from '..';

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
    const [loadingsubmit,setloadingsubmit] = React.useState(false)
    const [displayUrl,setdisplayUrl] = React.useState("")
    const alertmsg = Customalert.useCustomAlert()

    function handleFileInputChange(event) {
        const selectedFile = event.target.files[0];
        const fileName = selectedFile.name;
        const fakePath = event.target.value; // This will contain the "fakepath"
        console.log('File Name:', fileName);
        console.log('selectedFile:', selectedFile);
        console.log('Fake Path:', fakePath);
        submitImage()
    }

    function dataflow(params = "") {
        onChange(params)
        setdisplayUrl(params)
    }

    function submitImage() {
        try {
            setloadingsubmit(true)
            setTimeout(() => {
                setloadingsubmit(false)
                dataflow("THIS IS GONNA BE IMG URL")
            }, 2000);
        } catch (error) {
            setloadingsubmit(false)
            alertmsg(error)
        }
    }

    function deleteImage() {
        dataflow("")
    }
    
    return(
        <div style={{
            width: width,
            // backgroundColor: "yellow",
            display: "flex",
            flexDirection: "column"
        }}>
            {loadingsubmit === true && (
                <div style={{
                    borderRadius: "5px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    outline: "none",
                    padding: "10px",
                }}>
                    uploading file...
                </div>
            )}
            {loadingsubmit === false && displayUrl !== "" && (
                <div 
                onClick={() => deleteImage()}
                style={{
                    width: "8rem",
                    height: "8rem",
                    backgroundColor: "pink",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "1rem",
                        height: "1rem",
                        borderRadius: 10,
                        backgroundColor: "red",
                        margin: 2.5
                    }}></div>
                </div>
            )}
            {loadingsubmit === false && displayUrl === "" && (
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
            )}
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

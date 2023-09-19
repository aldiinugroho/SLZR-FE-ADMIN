import * as React from 'react';
import { Customalert } from '..';

function Index({
    onSuccessUpload = () => {},
    width = "40%",
}) {
    const [loadingsubmit,setloadingsubmit] = React.useState(false)
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
        onSuccessUpload(params)
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
            {loadingsubmit === false && (
                <input
                    type={"file"}
                    // value={value}
                    onChange={(event) => handleFileInputChange(event)}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    style={{
                        borderColor:  "gray",
                        borderRadius: "5px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        outline: "none",
                        padding: "10px",
                        fontSize: "15px"
                    }}
                    accept="image/png, image/gif, image/jpeg"
                />
            )}
        </div>
    )
}

export default Index;

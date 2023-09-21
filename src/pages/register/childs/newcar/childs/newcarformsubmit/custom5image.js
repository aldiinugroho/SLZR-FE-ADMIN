import * as React from "react";
import { Customuploadimage } from "../../../../../../components";
import { v4 as uuidv4 } from 'uuid';

function Custom5image({
  onChangeValue = () => {},
  value = [],
  errorMessage = "",
  onFocus = () => {},
  onBlur = () => {},
  touched = false
}) {
  const errorStat = touched === true && errorMessage !== ""
  const [imagedata,setimagedata] = React.useState([
    // {
    //   uploadId: "123",
    //   uri: "https://t4.ftcdn.net/jpg/04/02/26/11/360_F_402261107_D204pzlyN46dj5rBIgdXThFL74YQUWeY.jpg"
    // }
  ])
  // make only image uploader 
  // after that stack it into array

  function onSuccessUpload(params) {
    const uploadId = uuidv4()
    const newdata = {
      uploadId,
      uri: params
    }
    setimagedata(prevItems => {
      return [...prevItems, newdata];
    });
  }

  function onclickdelete(params) {
    setimagedata(prevItems => {
      const filtered = prevItems.filter((i) => i.uploadId !== params.uploadId)
      return filtered
    });
  }

  React.useEffect(() => {
    onChangeValue(imagedata)
  },[imagedata])

  return (
    <React.Fragment>
      <div style={{
        display: "flex",
        flexWrap: "wrap"
      }}>
        {imagedata.map((i,x) => (
          <React.Fragment key={x}>
            <div style={{
              width: "8rem",
              height: "8rem",
              backgroundColor: "gray",
              position: "relative",
              overflow: "hidden",
              marginBottom: 10
            }}>
              <div onClick={() => onclickdelete(i)} style={{
                position: "absolute",
                margin: 2,
                top: 0,
                right: 0,
                width: "1rem",
                height: "1rem",
                backgroundColor: "red",
                borderRadius: "10rem",
                cursor: "default"
              }}></div>
              <img 
                src={i?.uri} 
                alt={i?.uri} 
                width="100%" 
                height="100%"
                style={{
                  objectFit: "cover"
                }}
              ></img>
            </div>
            <div style={{ padding: 5 }}></div>
          </React.Fragment>
        ))}
      </div>
      {imagedata.length <= 5 && (
        <Customuploadimage 
          onBlur={onBlur}
          onFocus={onFocus}
          makeError={errorStat}
          onSuccessUpload={onSuccessUpload}
        />
      )}
      {errorStat && (
        <div style={{
          fontSize: 12,
          color: "red"
        }}>{errorMessage}</div>
      )}
      <div style={{ padding: 5 }}></div>
    </React.Fragment>
  )
}

export default Custom5image
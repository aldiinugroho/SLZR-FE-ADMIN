import * as React from "react";
import { Customuploadimage } from "../../../../../../components";
import { v4 as uuidv4 } from 'uuid';

function Custom5image({
  onChangeValue = () => {},
  value = []
}) {
  const [imagedata,setimagedata] = React.useState(value)
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
    console.log(params);
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
              backgroundColor: "pink",
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
            </div>
            <div style={{ padding: 5 }}></div>
          </React.Fragment>
        ))}
      </div>
      {imagedata.length <= 5 && (
        <Customuploadimage 
          onSuccessUpload={onSuccessUpload}
        />
      )}
      <div style={{ padding: 5 }}></div>
    </React.Fragment>
  )
}

export default Custom5image
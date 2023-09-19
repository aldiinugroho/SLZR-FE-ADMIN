import * as React from "react";
import { Customfieldimage } from "../../../../../../components";

function Custom5image({}) {
  const [imagedata,setimagedata] = React.useState([])
  // make only image uploader 
  // after that stack it into array

  return (
    <React.Fragment>
      {imagedata.length <= 5 && (
        <Customfieldimage 
          placeholder={"Harga Jual"}
          // value={values.carSellPrice}
          // onChange={handleChange("carSellPrice")}
          // onBlur={handleBlur("carSellPrice")}
          // touched={touched.carSellPrice}
          // errorMessage={errors.carSellPrice}
        />
      )}
    </React.Fragment>
  )
}

export default Custom5image
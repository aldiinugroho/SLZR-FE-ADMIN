import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customcarbranddropdown({
  value = "",
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Brand",
}) {
  const customalert = Customalert.useCustomAlert()
  const store = storeDDBrand((state) => state)

  React.useEffect(() => {
    prepareData()
  },[])

  async function prepareData() {
    try {
      await requestCarBrand.list()
    } catch (error) {
      customalert(error)
    }
  }

  return(
    <Customdropdown
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      touched={touched}
      errorMessage={errorMessage}
      placeholder={placeholder}
      data={store.data}
    />
  )
}

export default Customcarbranddropdown
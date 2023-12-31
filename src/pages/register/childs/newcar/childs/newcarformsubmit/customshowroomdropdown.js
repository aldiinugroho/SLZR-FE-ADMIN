import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand, requestShowroom } from "../../../../../../request";
import { storeDDShowroom } from "./state";

function Customshowroomdropdown({
  value = "",
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Showroom",
}) {
  const customalert = Customalert.useCustomAlert()
  const store = storeDDShowroom((state) => state)

  React.useEffect(() => {
    prepareData()
  },[])

  async function prepareData() {
    try {
      await requestShowroom.geDDList()
    } catch (error) {
      customalert(error)
    }
  }

  React.useEffect(() => {
    console.log("storeDDShowroom",store.data);
  },[store])

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

export default Customshowroomdropdown
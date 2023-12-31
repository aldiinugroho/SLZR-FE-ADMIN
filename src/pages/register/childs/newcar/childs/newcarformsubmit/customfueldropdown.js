import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customfueldropdown({
  value = "",
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Bahan bakar",
}) {
  const store = [
    {
      "id": "Gasoline",
      "name": "Gasoline"
    },
    {
      "id": "Diesel",
      "name": "Diesel"
    }
  ]

  return(
    <Customdropdown
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      touched={touched}
      errorMessage={errorMessage}
      placeholder={placeholder}
      data={store}
    />
  )
}

export default Customfueldropdown
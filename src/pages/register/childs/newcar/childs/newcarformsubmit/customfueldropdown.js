import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customfueldropdown({
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Bahan bakar",
}) {
  const store = [
    {
      "id": "1",
      "name": "Gasoline"
    },
    {
      "id": "2",
      "name": "Diesel"
    }
  ]

  return(
    <Customdropdown
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
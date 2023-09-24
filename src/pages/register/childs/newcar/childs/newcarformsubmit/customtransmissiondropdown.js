import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customtransmissiondropdown({
  value = "",
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Transmission",
}) {
  const store = [
    {
      "id": "Matic",
      "name": "Matic"
    },
    {
      "id": "Manual",
      "name": "Manual"
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

export default Customtransmissiondropdown
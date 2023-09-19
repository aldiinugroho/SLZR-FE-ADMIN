import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customtransmissiondropdown({
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Transmission",
}) {
  const store = [
    {
      "id": "1",
      "name": "Matic"
    },
    {
      "id": "2",
      "name": "Manual"
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

export default Customtransmissiondropdown
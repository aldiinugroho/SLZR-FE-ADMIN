import * as React from "react";
import { Customalert, Customdropdown } from "../../../../../../components";
import { requestCarBrand } from "../../../../../../request";
import { storeDDBrand, storeDDShowroom } from "./state";

function Customcaryeardropdown({
  onBlur = () => {},
  onChange = () => {},
  touched = false,
  errorMessage = "",
  placeholder = "Pilih Tahun mobil",
}) {
  const store = Array.from({ length: new Date().getFullYear() - 2005 }, (_, index) => {
    return {
      id: index,
      name: new Date().getFullYear() - index
    }
  });

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

export default Customcaryeardropdown
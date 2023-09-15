import * as React from "react";
import { LocalStorage } from "../../configs/localstorage";
import { useNavigate } from "react-router-dom";


function Index({
  children
}) {
  const navigate = useNavigate()

  React.useEffect(() => {
    secChecker()
  },[])

  function secChecker() {
    const result = new LocalStorage().getToken()
    if (result === null || result === undefined) {
      navigate("/")
    }
  }

  return(
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Index
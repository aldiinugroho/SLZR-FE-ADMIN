import * as React from "react";
import { Customalert, Custombody, Customheader, Customspinner, Sidebar } from "../../../../components";

function Index({
}) {
  return(
    <Custombody>
      {/* {store.loading && (
        <Customspinner />
      )} */}
      <Sidebar>
        <Customheader />
        {/* {store.data !== null && <BodyComponent />} */}
      </Sidebar>
    </Custombody>
  )
}

export default Index
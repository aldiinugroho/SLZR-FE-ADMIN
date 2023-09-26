import * as React from 'react';
import {
  Custombody, Customheader, Sidebar
} from "../../../../components";

function Index({
  type = "Ready"
}) {
  return(
    <Custombody>
      <Sidebar>
        <Customheader />
        <BodyComponent type={type} />
      </Sidebar>
    </Custombody>
  )
}

function BodyComponent({
  type = ""
}) {
  return (
    <div style={{
      padding: 10
    }}>
      <h1>
        List {type} Car
      </h1>
      <div className="spacingblack"></div>
    </div>
  )
}

export default Index;

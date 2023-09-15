import * as React from 'react';
import {
    Custombody, Customheader, Sidebar
} from "../../components";

function Index() {
    return(
        <Custombody>
            <Sidebar>
                <Customheader />
            </Sidebar>
        </Custombody>
    )
}

export default Index;

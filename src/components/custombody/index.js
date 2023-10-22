import * as React from 'react';
import "./stylecustombody.css"

function Index({
    children
}) {
    return(
        <div className="bodycomponent" >
            <div className="bodycomponentchild">
                {children}
            </div>
        </div>
    )
}

export default Index;

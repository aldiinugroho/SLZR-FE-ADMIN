import * as React from 'react';
import "./stylecustomheader.scss"

function Index({
    withLogoutBtn = true
}) {
    return(
        <div className="stylemaincustomheader">
            <div className="stylecustomheadercomponent">
                {withLogoutBtn && (
                    <button className="stylebtnlogout">
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}

export default Index;

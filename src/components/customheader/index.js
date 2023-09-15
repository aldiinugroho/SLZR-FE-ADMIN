import * as React from 'react';
import "./stylecustomheader.scss"
import { LocalStorage } from '../../configs/localstorage';
import { useNavigate } from 'react-router-dom';

function Index({
    withLogoutBtn = true
}) {
    const navigate = useNavigate()

    function clicklogout() {
        new LocalStorage().resetAll()
        navigate("/")
    }

    return(
        <div className="stylemaincustomheader">
            <div className="stylecustomheadercomponent">
                {withLogoutBtn && (
                    <button onClick={() => clicklogout()} className="stylebtnlogout">
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}

export default Index;

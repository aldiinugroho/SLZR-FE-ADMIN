import * as React from 'react';
import "./stylesidebar.scss"
import {Routing} from "../../App";
import {storeSideBar} from "./state";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Index({
    children
}) {
    const storeState = storeSideBar((state) => state)
    const  navigate = useNavigate()
    const [datanavbar,setdatanavbar] = useState([])

    function clicktabsidebar(params = "") {
        // storeState.setselectedpage(params)
        navigate(params)
        setupnavbar(params)
    }

    React.useEffect(() => {
        setupnavbar(window.location.pathname)
    },[])

    function setupnavbar(params = "") {
        let newnavbar = Routing.map((i) => {
            if (i?.path === params || params.includes(i?.path)) {
                return {
                    ...i,
                    active: true
                }
            } else {
                return i
            }
        })
        setdatanavbar(newnavbar)
    }

    return(
        <div className="stylemainsidebar">
            <div className="stylesidebar">
                <div className="stylesidebarimg">
                </div>
                {datanavbar.map((i,x) => {
                    if (i?.showSideBar === false) {
                        return null
                    }
                    if (x === Routing.length-1) {
                        return (
                            <React.Fragment  key={x}>
                                <div
                                    onClick={() => clicktabsidebar(i?.path)}
                                    className="stylesidebartabnobottomborder">
                                    {i?.name}
                                </div>
                                {i?.active && i?.childs.map((n,m) => {
                                    if (n?.showSideBar === false) {
                                        return null
                                    }
                                    if (m === i?.length-1 || m === 0) {
                                        return (
                                            <div
                                                key={m}
                                                onClick={() => clicktabsidebar(n?.path)}
                                                className="stylesidebartabnobottomborderchild">
                                                {n?.name}
                                            </div>
                                        )
                                    } else  {
                                        return(
                                            <div
                                                key={m}
                                                onClick={() => clicktabsidebar(n?.path)}
                                                className="stylesidebartabnobottomborderchild">
                                                {n?.name}
                                            </div>
                                        )
                                    }
                                })}
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment key={x}>
                                <div
                                     onClick={() => clicktabsidebar(i?.path)}
                                     className="stylesidebartabnobottomborder">
                                    {i?.name}
                                </div>
                                {i?.active && i?.childs.map((n,m) => {
                                    if (n?.showSideBar === false) {
                                        return null
                                    }
                                    if (m === i?.length-1 || m === 0) {
                                        return (
                                            <div
                                                key={m}
                                                onClick={() => clicktabsidebar(n?.path)}
                                                className="stylesidebartabnobottomborderchild">
                                                {n?.name}
                                            </div>
                                        )
                                    } else  {
                                        return(
                                            <div
                                                key={m}
                                                onClick={() => clicktabsidebar(n?.path)}
                                                className="stylesidebartabnobottomborderchild">
                                                {n?.name}
                                            </div>
                                        )
                                    }
                                })}
                            </React.Fragment>
                        )
                    }
                })}
            </div>
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    )
}

export default Index;

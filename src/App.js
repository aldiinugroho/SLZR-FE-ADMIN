import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import * as Pages from "./pages"
import {Newcar, Newshowroom} from "./pages/register/childs";
import {Newshowroomformsubmit} from "./pages/register/childs/newshowroom/childs";
import {Newcarformsubmit} from "./pages/register/childs/newcar/childs";
import { Customloginchecker } from "./components";
import * as Stok from "./pages/stok/childs";

class ChildRouting {
    name = ''
    path = ''
    element = <div></div>
    showSideBar = true
    constructor({
        name = '',
        path = '',
        element = <div></div>,
        showSideBar = true
    }) {
        this.name = name
        this.path = path
        this.element = element
        this.showSideBar = showSideBar
    }
}

class ParentRouting {
    active = false
    name = ''
    path = ''
    element = <div></div>
    childs = []
    showSideBar = true
    constructor({
        active = false,
        name = '',
        path = '',
        element = <div></div>,
        childs = [],
        showSideBar = true
    }) {
        this.active = active
        this.name = name
        this.path = path
        this.element = element
        this.childs = childs.map((i) => new ChildRouting({
            name: i?.name,
            path: `${path}${i?.path}`,
            element: i?.element,
            showSideBar: i?.showSideBar
        }))
        this.showSideBar = showSideBar
    }
}

export  const  Routing = [
    new ParentRouting({
        name: "Main",
        path: "/",
        element: <Pages.Main />,
        showSideBar: false
    }),
    new ParentRouting({
        name: "Home",
        path: "/home",
        element: <Customloginchecker>
            <Pages.Home />
        </Customloginchecker>
    }),
    new ParentRouting({
        name: "Register",
        path: "/register",
        element: <Customloginchecker>
            <Newcar />
        </Customloginchecker>,
        childs: [

            new ChildRouting({
                name: "Register Mobil",
                path: "/new-car",
                element: <Customloginchecker>
                    <Newcar />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Register Showroom",
                path: "/new-showroom",
                element: <Customloginchecker>
                    <Newshowroom />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Register Form Showroom",
                path: "/new-showroom/formsubmit/:type",
                element: <Customloginchecker>
                    <Newshowroomformsubmit />
                </Customloginchecker>,
                showSideBar: false
            }),
            new ChildRouting({
                name: "Register Form Showroom",
                path: "/new-showroom/formsubmit/:type/:showroomId",
                element: <Customloginchecker>
                    <Newshowroomformsubmit />
                </Customloginchecker>,
                showSideBar: false
            }),
            new ChildRouting({
                name: "Register Form Car",
                path: "/new-car/formsubmit/:type",
                element: <Customloginchecker>
                    <Newcarformsubmit />
                </Customloginchecker>,
                showSideBar: false
            }),
            new ChildRouting({
                name: "Register Form Car",
                path: "/new-car/formsubmit/:type/:carId",
                element: <Customloginchecker>
                    <Newcarformsubmit />
                </Customloginchecker>,
                showSideBar: false
            })
        ]
    }),
    new ParentRouting({
        name: "Stok",
        path: "/stok",
        element: <Customloginchecker>
            <Stok.Liststok />
        </Customloginchecker>,
        childs: [
            new ChildRouting({
                name: "Ready",
                path: "/ready",
                element: <Customloginchecker>
                    <Stok.Liststok />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Booked",
                path: "/booked",
                element: <Customloginchecker>
                    <Stok.Liststok type={"Booked"} />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Sold",
                path: "/sold",
                element: <Customloginchecker>
                    <Stok.Liststok type={"Sold"} />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Detail",
                path: "/detail/:carId",
                showSideBar: false,
                element: <Customloginchecker>
                    <Stok.Detail />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Proses",
                path: "/proses/:carId",
                showSideBar: false,
                element: <Customloginchecker>
                    <Stok.Proses />
                </Customloginchecker>
            }),
            new ChildRouting({
                name: "Proses Website",
                path: "/proses/CBFI2/:carBookKeepingId",
                showSideBar: false,
                element: <Customloginchecker>
                    <Stok.Proses />
                </Customloginchecker>
            }),
        ]
    })
]

function App() {
    return (
        <Router>
            <Routes>
                {Routing.map((i,r) => (
                    <React.Fragment key={r}>
                        <Route path={i.path} element={i.element} />
                        {i?.childs.map((childs,ckey) => (
                            <Route key={{ckey}} path={childs?.path} element={childs?.element} />
                        ))}
                    </React.Fragment>
                ))}
            </Routes>
        </Router>
    );
}

export default App;

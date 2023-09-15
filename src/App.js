import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import * as Pages from "./pages"
import {Newcar, Newshowroom} from "./pages/register/childs";
import {Newshowroomformsubmit} from "./pages/register/childs/newshowroom/childs";
import {Newcarformsubmit} from "./pages/register/childs/newcar/childs";

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
        element: <Pages.Home />
    }),
    new ParentRouting({
        name: "Register",
        path: "/register",
        element: <Newshowroom />,
        childs: [
            new ChildRouting({
                name: "Register Showroom",
                path: "/new-showroom",
                element: <Newshowroom />
            }),
            new ChildRouting({
                name: "Register Form Showroom",
                path: "/new-showroom/formsubmit",
                element: <Newshowroomformsubmit />,
                showSideBar: false
            }),
            new ChildRouting({
                name: "Register Car",
                path: "/new-car",
                element: <Newcar />
            }),
            new ChildRouting({
                name: "Register Form Car",
                path: "/new-car/formsubmit",
                element: <Newcarformsubmit />,
                showSideBar: false
            })
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

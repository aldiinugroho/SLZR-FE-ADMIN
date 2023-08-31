import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import * as Pages from "./pages"

class ChildRouting {
    path = ''
    element = <div></div>
    constructor({
        path = '',
        element = <div></div>
    }) {
        this.path = path
        this.element = element
    }
}

class ParentRouting {
    path = ''
    element = <div></div>
    childs = []
    constructor({
        path = '',
        element = <div></div>,
        childs = []
    }) {
        this.path = path
        this.element = element
        this.childs = childs.map((i) => new ChildRouting({path: `${path}${i?.path}`, element: i?.element}))
    }
}

const  Routing = [
    new ParentRouting({path: "/", element: <Pages.Main />})
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

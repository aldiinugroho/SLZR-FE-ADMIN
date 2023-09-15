import * as React from 'react';
import {Custombody, Customheader, Sidebar} from "../../../../components";
import "./stylenewshowroom.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getShowroom} from "../../../../services/showroom";
import {requestShowroom} from "../../../../request";

function Index() {

    return(
        <Custombody>
            <Sidebar>
                <Customheader />
                <FormBody />
            </Sidebar>
        </Custombody>
    )
}

function FormBody() {
    const navigate = useNavigate()

    function gotoformsubmit() {
        navigate("/register/new-showroom/formsubmit")
    }

    return(
        <div style={{
            padding: "10px"
        }}>
            <h1>
                Register Showroom
            </h1>
            <div className="spacingblack"></div>
            <div style={{ padding: "10px" }}></div>
            <button
                style={{
                    borderStyle: "none",
                    fontSize: "15px",
                    padding: "0.5rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem"
                }}
                onClick={() => gotoformsubmit()}
            >Tambah</button>
            <div style={{ padding: "10px" }}></div>
            <TableShow />
        </div>
    )
}

function TableShow() {
    const data = [
        new ModelNewShowroom({
            id: "123",
            name: "didi1",
            phone: "087787666008",
            alamat: "jalan taman taman"
        }),
        new ModelNewShowroom({
            id: "123",
            name: "didi2",
            phone: "087787666008",
            alamat: "jalan taman taman"
        }),
        new ModelNewShowroom({
            id: "123",
            name: "didi3",
            phone: "087787666008",
            alamat: "jalan taman taman"
        }),
        new ModelNewShowroom({
            id: "123",
            name: "didi3",
            phone: "087787666008",
            alamat: "jalan taman taman"
        }),
        new ModelNewShowroom({
            id: "123",
            name: "didi3",
            phone: "087787666008",
            alamat: "jalan taman taman"
        })
    ]

    useEffect(() => {
        getlistdata()
    },[])


    async function getlistdata() {
        try {
            await requestShowroom.getList()
        } catch (e) {
        }
    }

    return(
        <div style={{
            display: "inline-block",
            overflow: "scroll",
            height: "20rem"
        }}>
            <table>
                <thead>
                <tr style={{ backgroundColor: "#B92929" }}>
                    <th className="styletablecell">No</th>
                    <th className="styletablecell">Nama</th>
                    <th className="styletablecell">Alamat</th>
                    <th className="styletablecell">No Telphone</th>
                    <th className="styletablecell">Action</th>
                </tr>
                </thead>
                {data?.map((i,x) => {
                    if (x % 2 === 0) {
                        return (
                            <tbody key={x}>
                            <tr>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.name}</td>
                                <td className="styletablecell">{i?.alamat}</td>
                                <td className="styletablecell">{i?.phone}</td>
                                <td>
                                    <button>update</button>
                                    <button>delete</button>
                                </td>
                            </tr>
                            </tbody>
                        )
                    } else  {
                        return (
                            <tbody key={x}>
                            <tr style={{ backgroundColor: "#d4d4d4" }}>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.name}</td>
                                <td className="styletablecell">{i?.alamat}</td>
                                <td className="styletablecell">{i?.phone}</td>
                                <td>
                                    <button>update</button>
                                    <button>delete</button>
                                </td>
                            </tr>
                            </tbody>
                        )
                    }
                })}
            </table>
        </div>
    )
}

class ModelNewShowroom {
    id = ""
    name = ""
    alamat = ""
    phone = ""
    constructor({
        id = "",
        name = "",
        alamat = "",
        phone = ""
    }) {
        this.id = id
        this.name = name
        this.alamat = alamat
        this.phone = phone
    }
}

export default Index;

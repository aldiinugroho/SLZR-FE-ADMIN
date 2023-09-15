import * as React from 'react';
import {Customalert, Custombody, Customheader, Sidebar} from "../../../../components";
import "./stylenewshowroom.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getShowroom} from "../../../../services/showroom";
import {requestShowroom} from "../../../../request";
import { storeListShowroom } from './state';

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
        navigate("/register/new-showroom/formsubmit/create")
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
    const navigate = useNavigate()
    const store = storeListShowroom((state) => state)
    const errmsg = Customalert.useCustomAlert()

    useEffect(() => {
        getlistdata()
    },[])


    async function getlistdata() {
        try {
            await requestShowroom.getList()
        } catch (e) {
            errmsg(e)
        }
    }

    function goedit() {
        navigate("/register/new-showroom/formsubmit/update")
    }

    async function godelete(showroomId = "") {
        try {
            await requestShowroom.reqDelete(showroomId)
        } catch (error) {
            errmsg(error)
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
                {store.data?.map((i,x) => {
                    if (x % 2 === 0) {
                        return (
                            <tbody key={x}>
                            <tr>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.showroomName}</td>
                                <td className="styletablecell">{i?.showroomAddress}</td>
                                <td className="styletablecell">{i?.showroomPhone}</td>
                                <td>
                                    <button onClick={() => goedit(i?.showroomId)}>update</button>
                                    <button onClick={() => godelete(i?.showroomId)}>delete</button>
                                </td>
                            </tr>
                            </tbody>
                        )
                    } else  {
                        return (
                            <tbody key={x}>
                            <tr style={{ backgroundColor: "#d4d4d4" }}>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.showroomName}</td>
                                <td className="styletablecell">{i?.showroomAddress}</td>
                                <td className="styletablecell">{i?.showroomPhone}</td>
                                <td>
                                    <button onClick={() => goedit(i?.showroomId)}>update</button>
                                    <button onClick={() => godelete(i?.showroomId)}>delete</button>
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

export default Index;

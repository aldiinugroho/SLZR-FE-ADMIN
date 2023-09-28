import * as React from 'react';
import {Customalert, Custombody, Customheader, Sidebar} from "../../../../components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {requestCar, requestShowroom} from "../../../../request";
import { storeListCar } from './state';
import { DateFormatter } from '../../../../utils';

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
        navigate("/register/new-car/formsubmit/create")
    }

    return(
        <div style={{
            padding: "10px"
        }}>
            <h1>
                Register Mobil
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
    const store = storeListCar((state) => state)
    const alermsg = Customalert.useCustomAlert()

    useEffect(() => {
        getlistdata()
    },[])


    async function getlistdata() {
        try {
            await requestCar.getList()
        } catch (e) {
            alermsg(e)
        }
    }

    async function deleteData(params = "") {
        try {
            await requestCar.reqDelete(params)
        } catch (error) {
            alermsg(error)
        }
    }

    async function updateData(params = "") {
        console.log(params);
        navigate(`/register/new-car/formsubmit/update/${params}`)
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
                    <th className="styletablecell">Name</th>
                    <th className="styletablecell">Plat No</th>
                    <th className="styletablecell">Tahun</th>
                    <th className="styletablecell">Pajak</th>
                    <th className="styletablecell">Transmisi</th>
                    <th className="styletablecell">Action</th>
                </tr>
                </thead>
                {store.data?.map((i,x) => {
                    if (x % 2 === 0) {
                        return (
                            <tbody key={x}>
                            <tr>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.carName}</td>
                                <td className="styletablecell">{i?.carPlate}</td>
                                <td className="styletablecell">{i?.carYear}</td>
                                <td className="styletablecell">{new DateFormatter().onlyMonthXYear(i?.carTax)}</td>
                                <td className="styletablecell">{i?.carTransmission}</td>
                                <td>
                                    <button onClick={() => updateData(i?.carId)}>update</button>
                                    <button onClick={() => deleteData(i?.carId)}>delete</button>
                                </td>
                            </tr>
                            </tbody>
                        )
                    } else  {
                        return (
                            <tbody key={x}>
                            <tr style={{ backgroundColor: "#d4d4d4" }}>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.carName}</td>
                                <td className="styletablecell">{i?.carPlate}</td>
                                <td className="styletablecell">{i?.carYear}</td>
                                <td className="styletablecell">{new DateFormatter().onlyMonthXYear(i?.carTax)}</td>
                                <td className="styletablecell">{i?.carTransmission}</td>
                                <td>
                                    <button onClick={() => updateData(i?.carId)}>update</button>
                                    <button onClick={() => deleteData(i?.carId)}>delete</button>
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

class ModelNewCar {
    id = ""
    carName = ""
    carPlate = ""
    carTax = ""
    carTransmission = ""
    constructor({
        id = "",
        carName = "",
        carPlate = "",
        carTax = "",
        carTransmission = ""
    }) {
        this.id = id
        this.carName = carName
        this.carPlate = carPlate
        this.carTax = carTax
        this.carTransmission = carTransmission
    }
}

export default Index;

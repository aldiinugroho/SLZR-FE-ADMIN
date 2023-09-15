import * as React from 'react';
import {Custombody, Customheader, Sidebar} from "../../../../components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
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
        navigate("/register/new-car/formsubmit")
    }

    return(
        <div style={{
            padding: "10px"
        }}>
            <h1>
                Register Car
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
        new ModelNewCar({
            id: "123",
            carName: "Toyota calya",
            carPlate: "B 1234 BCA",
            carTax: "2023",
            carTransmission: "matic"
        }),
        new ModelNewCar({
            id: "123",
            carName: "Toyota calya",
            carPlate: "B 1234 BCA",
            carTax: "2023",
            carTransmission: "matic"
        }),
        new ModelNewCar({
            id: "123",
            carName: "Toyota calya",
            carPlate: "B 1234 BCA",
            carTax: "2023",
            carTransmission: "matic"
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
                    <th className="styletablecell">Name</th>
                    <th className="styletablecell">Plat No</th>
                    <th className="styletablecell">Pajak</th>
                    <th className="styletablecell">Transmisi</th>
                    <th className="styletablecell">Action</th>
                </tr>
                </thead>
                {data?.map((i,x) => {
                    if (x % 2 === 0) {
                        return (
                            <tbody key={x}>
                            <tr>
                                <td className="styletablecell">{x+1}</td>
                                <td className="styletablecell">{i?.carName}</td>
                                <td className="styletablecell">{i?.carPlate}</td>
                                <td className="styletablecell">{i?.carTax}</td>
                                <td className="styletablecell">{i?.carTransmission}</td>
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
                                <td className="styletablecell">{i?.carName}</td>
                                <td className="styletablecell">{i?.carPlate}</td>
                                <td className="styletablecell">{i?.carTax}</td>
                                <td className="styletablecell">{i?.carTransmission}</td>
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

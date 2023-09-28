import * as React from 'react';
import {
  Customalert,
  Custombody, Customheader, Customspinner, Sidebar
} from "../../../../components";
import { requestCarBookKeeping } from '../../../../request';
import { storeListStok } from './store';
import moment from 'moment/moment';
import { formatNumber } from '../../../../utils';
import { ModelResponseStok } from './state';
import { useNavigate } from 'react-router-dom';

function Index({
  type = "Ready"
}) {
  const store = storeListStok((state) => state)

  return(
    <Custombody>
      {store.loading && (
          <Customspinner />
      )}
      <Sidebar>
        <Customheader />
        <BodyComponent type={type} />
      </Sidebar>
    </Custombody>
  )
}

function BodyComponent({
  type = ""
}) {
  const [tabselector,settabselector] = React.useState("CBFI1")

  function changeselector(params = "") {
    settabselector(params)
  }

  React.useEffect(() => {
    settabselector("CBFI1")
  },[type])

  return (
    <div style={{
      padding: 10,
      display: "flex",
      flexDirection: "column"
    }}>
      <h1>
        List {type}
      </h1>
      <div className="spacingblack"></div>
      <div style={{ padding: "10px" }}></div>
      <div style={{
        display: type === "Booked" ? "inline-block" : "none",
      }}>
        <div style={{
          display: 'flex'
        }}>
          <button
            style={{
                backgroundColor: tabselector === "CBFI1" ? "#B92929" : "#EFEFEF",
                fontWeight: tabselector === "CBFI1" ? "bold" : "normal",
                borderStyle: "none",
                fontSize: "15px",
                padding: "0.5rem",
                paddingLeft: "2rem",
                paddingRight: "2rem"
            }}
            onClick={() => changeselector("CBFI1")}
          >Direct</button>
          <div style={{ padding: 5 }}></div>
          <button
            style={{
                backgroundColor: tabselector === "CBFI2" ? "#B92929" : "#EFEFEF",
                fontWeight: tabselector === "CBFI2" ? "bold" : "normal",
                borderStyle: "none",
                fontSize: "15px",
                padding: "0.5rem",
                paddingLeft: "2rem",
                paddingRight: "2rem"
            }}
            onClick={() => changeselector("CBFI2")}
          >Website</button>
        </div>
        <div style={{ padding: "10px" }}></div>
      </div>
      <TableShow type={type} tabselector={tabselector} />
    </div>
  )
}

function TableShow({
  type = "",
  tabselector = ""
}) {
  // const navigate = useNavigate()
  const store = storeListStok((state) => state)
  const errmsg = Customalert.useCustomAlert()
  const navigate = useNavigate()

  React.useEffect(() => {
    getlistdata()
  },[type])

  React.useEffect(() => {
    getlistdataonchangetabselector()
  },[tabselector])

  async function getlistdataonchangetabselector() {
    try {
      if (type === "Booked") {
        console.log("only booked",tabselector);
        await requestCarBookKeeping.getListBookedByCarBuyFrom(tabselector)
      }
    } catch (error) {
      errmsg(errmsg)
    }
  }

  async function getlistdata() {
      try {
        if (type === "Ready" || type === "Sold") {
          console.log("only ready and sold");
          await requestCarBookKeeping.getList(type)
        }
        await getlistdataonchangetabselector()
      } catch (e) {
        errmsg(e)
      }
  }

  async function cencelprocess(data = new ModelResponseStok({})) {
    try {
      await requestCarBookKeeping.cancelBookedKeeping({
        carId: data.carId,
        carBookKeepingId: data.carBookKeeping[0].carBookKeepingId,
        type: data.carBookKeeping[0]?.carBookKeepingCarBuyFrom?.carBuyFromId
      })
    } catch (error) {
      errmsg(error)
    }
  }

  function processdata(data = new ModelResponseStok({})) {
    console.log(data);
    navigate(`/stok/proses/${data.carId}`)
  }

  function detaildata(data = new ModelResponseStok({})) {
    console.log(data);
    navigate(`/stok/detail/${data.carId}`)
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
                  <th className="styletablecell">Brand</th>
                  <th className="styletablecell">Plat No</th>
                  <th className="styletablecell">Tahun Mobil</th>
                  <th className="styletablecell">Pajak Mobil</th>
                  <th className="styletablecell">Harga Jual</th>
                  {type !== "Ready" && (
                    <React.Fragment>
                      <th className="styletablecell">Harga Tawar</th>
                      <th className="styletablecell">Booking Fee/DP</th>
                    </React.Fragment>
                  )}
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
                              <td className="styletablecell">{i?.carBrand.carBrandName}</td>
                              <td className="styletablecell">{i?.carPlate}</td>
                              <td className="styletablecell">{i?.carYear}</td>
                              <td className="styletablecell">{moment(i?.carTax).format("MMMM YYYY")}</td>
                              <td className="styletablecell">Rp {formatNumber(i?.carSellPrice)}</td>
                              {/* <td className="styletablecell">Rp {formatNumber(i?.carBuyPrice)}</td> */}
                              {type === "Ready" && (
                                <React.Fragment>
                                  <td>
                                    <button onClick={() => processdata(i)}>proses</button>
                                    <button onClick={() => detaildata(i)}>detail</button>
                                  </td>
                                </React.Fragment>
                              )}
                              {type !== "Ready" && (
                                <React.Fragment>
                                  <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingSoldPrice)}</td>
                                  <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingBookedFee)}</td>
                                  <td>
                                    <button onClick={() => cencelprocess(i)}>cancel</button>
                                    <button onClick={() => detaildata(i)}>detail</button>
                                    {type === "Booked" && <button>tandai terjual</button>}
                                  </td>
                                </React.Fragment>
                              )}
                          </tr>
                          </tbody>
                      )
                  } else  {
                      return (
                          <tbody key={x}>
                          <tr style={{ backgroundColor: "#d4d4d4" }}>
                              <td className="styletablecell">{x+1}</td>
                              <td className="styletablecell">{i?.carName}</td>
                              <td className="styletablecell">{i?.carBrand.carBrandName}</td>
                              <td className="styletablecell">{i?.carPlate}</td>
                              <td className="styletablecell">{i?.carYear}</td>
                              <td className="styletablecell">{moment(i?.carTax).format("MMMM YYYY")}</td>
                              <td className="styletablecell">Rp {formatNumber(i?.carSellPrice)}</td>
                              {/* <td className="styletablecell">Rp {formatNumber(i?.carBuyPrice)}</td> */}
                              {type === "Ready" && (
                                <React.Fragment>
                                  <td>
                                    <button onClick={() => processdata(i)}>proses</button>
                                    <button onClick={() => detaildata(i)}>detail</button>
                                  </td>
                                </React.Fragment>
                              )}
                              {type !== "Ready" && (
                                <React.Fragment>
                                  <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingSoldPrice)}</td>
                                  <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingBookedFee)}</td>
                                  <td>
                                    <button onClick={() => cencelprocess(i)}>cancel</button>
                                    <button onClick={() => detaildata(i)}>detail</button>
                                  </td>
                                </React.Fragment>
                              )}
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

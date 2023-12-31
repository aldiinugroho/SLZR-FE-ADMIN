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
import { storeMarkSold } from './storev1marksold';

function Index({
  type = "Ready"
}) {
  const store = storeListStok((state) => state)
  const storemarksold = storeMarkSold((state) => state)

  return(
    <Custombody>
      {(store.loading || storemarksold.loading) && (
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
        type: type,
        tabselector: tabselector
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

  function updatefromweb(data = new ModelResponseStok({})) {
    navigate(`/stok/proses/CBFI2/${data.carBookKeeping[0].carBookKeepingId}`)
  }

  async function updatemarksold(data = new ModelResponseStok({})) {
    try {
      await requestCarBookKeeping.setMarkSold({
        carId: data.carId,
        carBookKeepingId: data.carBookKeeping[0]?.carBookKeepingId
      })
      navigate(`/stok/sold`)
    } catch (error) {
      errmsg(error)
    }
  }

  return(
      <div style={{
        height: "30rem",
        width: "100%",
        overflowY: "auto", // Keep overflowY as "auto"
        overflowX: "scroll", // Set overflowX to "scroll" to enable horizontal scrolling
      }}>
          <table style={{
            width: 1000
          }}>
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
                      {type === "Booked" && <th className="styletablecell">Harga Tawar</th>}
                      {type === "Sold" && <th className="styletablecell">Harga Terjual</th>}
                      <th className="styletablecell">Booking Fee/DP</th>
                    </React.Fragment>
                  )}
                  <th className="styletablecell">Action</th>
              </tr>
              </thead>
              {store.data?.map((i,x) => {
                return (
                  <tbody key={x}>
                  <tr style={{ backgroundColor: x % 2 === 0 ? "white" : "#d4d4d4" }}>
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
                      {type === "Booked" && tabselector === "CBFI1" && (
                        <React.Fragment>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingSoldPrice)}</td>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingBookedFee)}</td>
                          <td>
                            <button onClick={() => cencelprocess(i)}>cancel</button>
                            <button onClick={() => detaildata(i)}>detail</button>
                            <button onClick={() => updatemarksold(i)}>tandai terjual</button>
                          </td>
                        </React.Fragment>
                      )}
                      {type === "Booked" && tabselector === "CBFI2" && (
                        <React.Fragment>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingSoldPrice)}</td>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingBookedFee)}</td>
                          <td>
                            {i?.carBookKeeping[0]?.transactionPayment !== null && 
                            i?.carBookKeeping[0]?.transactionPayment.transactionPaymentStatus === "PAID" && (
                              <React.Fragment>
                                <button onClick={() => cencelprocess(i)}>cancel</button>
                                <button onClick={() => detaildata(i)}>detail</button>
                                {i?.carBookKeeping[0]?.carBookKeepingPaymentTools !== null && (
                                  <button onClick={() => updatemarksold(i)}>tandai terjual</button>
                                )}
                                {i?.carBookKeeping[0]?.carBookKeepingPaymentTools === null && (
                                  <button onClick={() => updatefromweb(i)}>proses</button>
                                )}
                              </React.Fragment>
                            )}
                            {i?.carBookKeeping[0]?.transactionPayment !== null && 
                            i?.carBookKeeping[0]?.transactionPayment.transactionPaymentStatus === "PENDING" && (
                              <div style={{
                                fontSize: 12,
                                backgroundColor: "orange",
                                padding: 5,
                                borderRadius: 5,
                                fontWeight: "bold"
                              }}>Menunggu pembayaran</div>
                            )}
                          </td>
                        </React.Fragment>
                      )}
                      {type === "Sold" && (
                        <React.Fragment>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingSoldPrice)}</td>
                          <td className="styletablecell">Rp {formatNumber(i?.carBookKeeping[0]?.carBookKeepingBookedFee)}</td>
                          <td>
                            <button onClick={() => detaildata(i)}>detail</button>
                            <button onClick={() => cencelprocess(i)}>cancel</button>
                          </td>
                        </React.Fragment>
                      )}
                  </tr>
                  </tbody>
                )
              })}
          </table>
      </div>
  )
}

export default Index;

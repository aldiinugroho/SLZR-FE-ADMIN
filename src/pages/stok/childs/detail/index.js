import * as React from "react";
import { Customalert, Custombody, Customheader, Customspinner, Sidebar } from "../../../../components";
import { useParams } from "react-router-dom";
import { requestCarBookKeeping } from "../../../../request";
import { storeStokDetail } from "./store";
import { ModelResponseStok, ModelResponseStokCarBookKeeping } from "../liststok/state";
import moment from "moment/moment";
import { formatNumber } from "../../../../utils";

function Index({
}) {
  let { carId } = useParams();
  const alertmsg = Customalert.useCustomAlert()
  const store = storeStokDetail((state) => state)

  React.useEffect(() => {
    getDetailData()
  },[])

  async function getDetailData() {
    try {
      await requestCarBookKeeping.getDetailByCarId(carId)
    } catch (error) {
      alertmsg(error)
    }
  }

  return(
    <Custombody>
      {store.loading && (
        <Customspinner />
      )}
      <Sidebar>
        <Customheader />
        {store.data !== null && <BodyComponent />}
      </Sidebar>
    </Custombody>
  )
}

function BodyComponent({
}) {
  const store = storeStokDetail((state) => state)

  return(
    <div style={{
      padding: 10
    }}>
      <h1>Detail</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarDetail data={store.data} />
      <h1>Pengeluaran lainnya</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarOtherPrice data={store.data} />
      <h1>Gambar</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarImage data={store.data} />
      <h1>Showroom</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarShowroom data={store.data} />
      <h1>History</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarBookKeeping data={store.data} />
    </div>
  )
}

function ComponentCarBookKeeping({
  data = new ModelResponseStok({})
}) {

  return(
    <div>
      {data.carBookKeeping.map((i,x) => (
        <ComponentCellCarBookKeeping key={x} i={i} x={x} data={data} />
      ))}
    </div>
  )
}

function ComponentCellCarBookKeeping({
  data = new ModelResponseStok({}),
  i = new ModelResponseStokCarBookKeeping({}),
  x = 0
}) {
  const [subview,setsubview] = React.useState(false)
  const stylecell = {
    width: "10rem",
    // backgroundColor: "yellow"
  }

  function opensubview() {
    setsubview((prev) => {
      if (prev === false) {
        return true
      } else {
        return false
      }
    })
  }

  return(
    <div 
    onClick={() => opensubview()}
    style={{
      marginBottom: data.carBookKeeping.length-1 === x ? 0 : "0.5rem",
    }}>
      <div 
      style={{
        backgroundColor: "pink",
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: "#EFEFEF"
      }}>
        <div style={{
          ...stylecell,
          textAlign: "center"
        }}>
          <div>Nama</div>
          <div>{i?.carBookKeepingName}</div>
        </div>
        <div style={{
          ...stylecell,
          textAlign: "center"
        }}>
          <div>Nomor Handphone</div>
          <div>{i?.carBookKeepingPhone}</div>
        </div>
        <div style={{
          ...stylecell,
          textAlign: "center"
        }}>
          <div>Booked Fee/Dp</div>
          <div>Rp {formatNumber(i?.carBookKeepingBookedFee)}</div>
        </div>
        <div style={{
          ...stylecell,
          textAlign: "center"
        }}>
          <div>Status</div>
          <div style={{
            fontWeight: "bold",
            color: i?.carBookKeepingStatus === "CANCEL" ? "red" : (i?.carBookKeepingStatus === "ON PROGRESS" ? "orange" : "#11e30e")
            }}>{i?.carBookKeepingStatus.toLowerCase()}</div>
        </div>
      </div>
      <table 
      style={{
        borderCollapse: "collapse",
        display: subview ? "block" : "none"
      }}>
        <tbody>
          <DataPopulate title={"KTP"} value={i?.carBookKeepingKTP} />
          <DataPopulate title={"Harga jual"} value={`Rp ${formatNumber(i?.carBookKeepingSoldPrice)}`} />
          <DataPopulate title={"Pemesanan"} value={i?.carBookKeepingCarBuyFrom?.carBuyFromId === "CBFI1" ? "Showroom" : "Website"} />
          {i?.carBookKeepingPaymentTools !== null && (<DataPopulate title={"Pembayaran"} value={i?.carBookKeepingPaymentTools?.carBookKeepingPaymentTools} />)}
          {i?.transactionPayment !== null && (<DataPopulate title={"Status Pembayaran Booking Fee/DP"} value={i?.transactionPayment?.transactionPaymentStatus} />)}
          {i?.transactionPayment !== null && (<DataPopulate title={"Nomor VA"} value={i?.transactionPayment?.transactionPaymentVA} />)}
          {i?.transactionPayment !== null && (<DataPopulate title={"Bank"} value={i?.transactionPayment?.transactionPaymentBank.toUpperCase()} />)}
          {i?.transactionPayment !== null && i?.transactionPayment.transactionPaymentStatus === "PAID" && (<DataPopulate title={"Tanggal Pembayaran Booking Fee/DP"} value={moment(i?.transactionPayment?.updatedAt).format("DD MMMM YYYY HH:MM")} />)}
          {i?.carLeasing !== null && <DataPopulate title={"Leasing"} value={i?.carLeasing?.carLeasing} />}
          <DataPopulate title={"Tanggal Booking"} value={moment(i?.createdAt).format("DD MMMM YYYY")} />
        </tbody>
      </table>
    </div>
  )
}

function ComponentCarOtherPrice({
  data = new ModelResponseStok({})
}) {
  let totalprice = 0
  data.carOtherPrice.forEach((i) => {
    totalprice += parseInt(i?.carOtherPrice)
  })

  return(
    <table style={{
      borderCollapse: "collapse"
    }}>
      <thead>
        <tr>
          <th style={{
            minWidth: "8rem",
            maxWidth: "12rem",
            borderStyle: "solid",
            borderWidth: 0.8,
            borderColor: "gray",
            padding: 5
          }}>Pengeluaran</th>
          <th style={{
            minWidth: "8rem",
            maxWidth: "12rem",
            borderStyle: "solid",
            borderWidth: 0.8,
            borderColor: "gray",
            padding: 5
          }}>Harga</th>
        </tr>
      </thead>
      <tbody>
        {data.carOtherPrice.map((i,x) => (
          <DataPopulate key={x} title={i?.carOtherPriceName} value={`Rp ${formatNumber(i?.carOtherPrice)}`} />
        ))}
        <DataPopulate 
        trStyle={{
          backgroundColor: "#EFEFEF",
          fontWeight: "Bold"
        }}
        title={"Total"} value={`Rp ${formatNumber(totalprice)}`} />
      </tbody>
    </table>
  )
}

function ComponentCarImage({
  data = new ModelResponseStok({})
}) {
  let dataimage = data.carImage.map((i) => i.carImage)
  return(
    <table style={{
      borderCollapse: "collapse",
      width: "100%"
    }}>
      <tbody>
        <DataPopulateImage value={dataimage} />
      </tbody>
    </table>
  )
}

function ComponentCarShowroom({
  data = new ModelResponseStok({})
}) {
  return(
    <table style={{
      borderCollapse: "collapse"
    }}>
      <tbody>
        <DataPopulate title={"Showroom"} value={data.showroom.showroomName} />
        <DataPopulate title={"Nomor Telphone Showroom"} value={data.showroom.showroomPhone} />
        <DataPopulate title={"Alamat Showroom"} value={data.showroom.showroomAddress} />
      </tbody>
    </table>
  )
}

function ComponentCarDetail({
  data = new ModelResponseStok({})
}) {
  return(
    <table style={{
      borderCollapse: "collapse"
    }}>
      <tbody>
        <DataPopulate title={"Mobil"} value={data.carName} />
        <DataPopulate title={"Plat Mobil"} value={data.carPlate} />
        <DataPopulate title={"Brand Mobil"} value={data.carBrand.carBrandName} />
        <DataPopulate title={"Pajak Mobil"} value={moment(data.carTax).format("MMMM YYYY")} />
        <DataPopulate title={"Tahun Mobil"} value={data.carYear} />
        <DataPopulate title={"Transmisi Mobil"} value={data.carTransmission} />
        <DataPopulate title={"Bahan Bakar Mobil"} value={data.carFuel} />
        <DataPopulate 
        valueStyle={{
          whiteSpace: "pre-line"
        }}
        title={"Deskripsi Mobil"} value={data.carDescription} />
        <DataPopulate title={"Harga Beli Mobil"} value={`Rp ${formatNumber(data.carBuyPrice)}`} />
        <DataPopulate title={"STNK Mobil"} value={data.carSTNK ? "Tersedia" : "Tidak Tersedia"} />
        <DataPopulate title={"BPKB Mobil"} value={data.carBPKB ? "Tersedia" : "Tidak Tersedia"} />
        <DataPopulate title={"Estimasi Harga Jual Mobil"} value={`Rp ${formatNumber(data.carSellPrice)}`} />
      </tbody>
    </table>
  )
}

function DataPopulate({
  title = "",
  value = "",
  trStyle = {},
  valueStyle = {}
}) {
  return(
    <tr style={trStyle}>
      <td style={{
        minWidth: "8rem",
        maxWidth: "12rem",
        borderStyle: "solid",
        borderWidth: 0.8,
        borderColor: "gray",
        padding: 5
      }}>
        {title}
      </td>
      <td style={{
        minWidth: "8rem",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "gray",
        padding: 5,
        ...valueStyle
      }}>
        {value}
      </td>
    </tr>
  )
}

function DataPopulateImage({
  value = []
}) {
  return(
    <tr>
      <td style={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "8rem",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "gray",
        // padding: 5
      }}>
        {value.map((i,x) => (
          <img src={i} alt={i} key={x} 
          style={{
            margin: 5,
            width: "10rem",
            height: "10rem",
            backgroundColor: "#EFEFEF",
            objectFit: "contain"
          }} />
        ))}
      </td>
    </tr>
  )
}

export default Index
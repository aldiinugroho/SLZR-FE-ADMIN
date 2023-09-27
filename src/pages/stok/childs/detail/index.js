import * as React from "react";
import { Customalert, Custombody, Customheader, Customspinner, Sidebar } from "../../../../components";
import { useParams } from "react-router-dom";
import { requestCarBookKeeping } from "../../../../request";
import { storeStokDetail } from "./store";
import { ModelResponseStok } from "../liststok/state";
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
      <h1>Gambar</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarImage data={store.data} />
      <h1>Showroom</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: 10 }}></div>
      <ComponentCarShowroom data={store.data} />
    </div>
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
        <DataPopulate title={"Deskripsi Mobil"} value={data.carDescription} />
        <DataPopulate title={"Harga Beli Mobil"} value={`Rp ${formatNumber(data.carBuyPrice)}`} />
        <DataPopulate title={"Estimasi Harga Jual Mobil"} value={`Rp ${formatNumber(data.carSellPrice)}`} />
      </tbody>
    </table>
  )
}

function DataPopulate({
  title = "",
  value = ""
}) {
  return(
    <tr>
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
        padding: 5
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
        padding: 5
      }}>
        {value.map((i,x) => (
          <img src={i} alt={i} key={x} 
          style={{
            margin: 2,
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
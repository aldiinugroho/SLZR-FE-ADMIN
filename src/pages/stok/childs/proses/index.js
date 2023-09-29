import * as React from "react";
import { Customalert, Custombody, Custombutton, Customheader, Customnumtextfield, Customspinner, Customtextfield, Sidebar } from "../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { requestCarBookKeeping } from "../../../../request";
import { useNavigate, useParams } from "react-router-dom";

function Index({
}) {
  return(
    <Custombody>
      {/* {store.loading && (
        <Customspinner />
      )} */}
      <Sidebar>
        <Customheader />
        {/* {store.data !== null && <BodyComponent />} */}
        <BodyComponent />
      </Sidebar>
    </Custombody>
  )
}

const submitformvalidation = Yup.object().shape({
  name: Yup.string()
      .required('Nama wajib diisi.'),
  phone: Yup.string()
      .required('Nomor handphone wajib diisi.'),
  ktp: Yup.string()
      .matches(/^[0-9]*$/g, 'KTP hanya boleh berisi angka.')
      .min(16,"KTP harus 16 angka.")
      .required('KTP wajib diisi.'),
  soldprice: Yup.string()
      .required('Harga jual wajib diisi.'),
  bookedfee: Yup.string()
      .required('Harga Booking/DP wajib diisi.'),
  leasing: Yup.string()
      .required('Leasing wajib diisi.'),
});

function BodyComponent({

}) {
  return(
    <div style={{
      padding: 10
    }}>
      <h1>Proses Mobil</h1>
      <div className="spacingblack"></div>
      <div style={{ padding: "10px" }}></div>
      <FormSubmit />
    </div>
  )
}

function FormSubmit({
  buyfrom = "CBFI1",
  initialValues = {
      name: "",
      phone: "",
      paymenttools: "CBKPT01",
      ktp: "",
      soldprice: "",
      bookedfee: "",
      leasing: ""
  },
  // submit = () => {}
}) {
  const alertmsg = Customalert.useCustomAlert()
  const {carId} = useParams()
  const navigate = useNavigate()

  async function createData(params) {
    try {
      await requestCarBookKeeping.createCarBookKeeping({
        carId: carId,
        carBookKeepingBookedFee: params.bookedfee === "none" ? "" : params.bookedfee,
        carBookKeepingKTP: params.ktp,
        carBookKeepingName: params.name,
        carBookKeepingPaymentToolsId: params.paymenttools,
        carBookKeepingPhone: params.phone,
        carBookKeepingSoldPrice: params.soldprice,
        carBuyFromId: buyfrom,
        carLeasing: params.leasing === "none" ? "" : params.leasing
      })
      // navigate after success
      alertmsg("Berhasil Update Data")
      navigate("/stok")
    } catch (error) {
      alertmsg(error)
    }
  }

  return(
    <Formik
        initialValues={initialValues}
        validationSchema={submitformvalidation}
        onSubmit={(values, { setSubmitting }) => {
          createData(values)
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
            /* and other goodies */
        }) => (
            <React.Fragment>
                <div style={{
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  padding: 10,
                  width: "40%",
                  padding: 10,
                  boxSizing: "border-box"
                }}>
                  <div style={{ fontSize: 15 }}>Tipe Pembayaran</div>
                  <div style={{ padding: 2 }}></div>
                  <div style={{
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "pink"
                  }}>
                      <input 
                      defaultChecked={true}
                      onChange={e => {
                          console.log("Kredit is checked",e.target.value);
                          setFieldValue("paymenttools",e.target.value)

                          // clear value if KREDIT
                          setFieldValue("bookedfee","")
                          setFieldValue("leasing","")
                      }}
                      type="radio" name="paymenttools" value="CBKPT01" />
                      <label style={{ fontSize: 15 }}>Kredit</label>
                  </div>
                  {/* <div style={{ padding: 5 }}></div> */}
                  <div style={{
                      display: "flex",
                      alignItems: "center"
                  }}>
                      <input 
                      // checked={values.carBPKB}
                      onChange={e => {
                          console.log("Cash is checked",e.target.value);
                          setFieldValue("paymenttools",e.target.value)

                          // give value if CASH
                          setFieldValue("bookedfee","none")
                          setFieldValue("leasing","none")
                      }}
                      type="radio" name="paymenttools" value="CBKPT02" />
                      <label style={{ fontSize: 15 }}>Cash</label>
                  </div>
                </div>
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Nama"}
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    touched={touched.name}
                    errorMessage={errors.name}
                />
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Nomor Handphone"}
                    value={values.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    touched={touched.phone}
                    errorMessage={errors.phone}
                />
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    maxLength={16}
                    placeholder={"Nomor KTP"}
                    value={values.ktp}
                    onChange={handleChange("ktp")}
                    onBlur={handleBlur("ktp")}
                    touched={touched.ktp}
                    errorMessage={errors.ktp}
                />
                <div style={{ padding: 5 }}></div>
                <Customnumtextfield
                    placeholder={"Harga Jual"}
                    value={values.soldprice}
                    onChange={handleChange("soldprice")}
                    onBlur={handleBlur("soldprice")}
                    touched={touched.soldprice}
                    errorMessage={errors.soldprice}
                />
                <div style={{ padding: 5 }}></div>
                {values.paymenttools === "CBKPT01" && (
                  <React.Fragment>
                    <Customnumtextfield
                        placeholder={"Booking Fee/DP"}
                        value={values.bookedfee}
                        onChange={handleChange("bookedfee")}
                        onBlur={handleBlur("bookedfee")}
                        touched={touched.bookedfee}
                        errorMessage={errors.bookedfee}
                    />
                    <div style={{ padding: 5 }}></div>
                    <Customtextfield
                        placeholder={"Leasing"}
                        value={values.leasing}
                        onChange={handleChange("leasing")}
                        onBlur={handleBlur("leasing")}
                        touched={touched.leasing}
                        errorMessage={errors.leasing}
                    />
                    <div style={{ padding: 5 }}></div>
                  </React.Fragment>
                )}
                <Custombutton
                    onClick={handleSubmit}
                    title={"Proses"}
                />
            </React.Fragment>
        )}
    </Formik>
  )
}

export default Index
import * as React from "react";
import { Customalert, Custombody, Custombutton, Customheader, Customnumtextfield, Customspinner, Customtextfield, Sidebar } from "../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  type = "",
  initialValues = {
      name: "",
      phone: "",
      paymenttools: "",
      ktp: "",
      soldprice: "",
      bookedfee: "",
      leasing: ""
  },
  submit = () => {}
}) {
  return(
    <Formik
        initialValues={initialValues}
        // validationSchema={submitformvalidation}
        onSubmit={(values, { setSubmitting }) => {
            submit(values)
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
                      checked={values.carBPKB}
                      onChange={e => {
                          console.log("Kredit is checked",e.target.checked);
                          // setFieldValue("carBPKB",e.target.checked)
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
                      checked={values.carBPKB}
                      onChange={e => {
                          console.log("Cash is checked",e.target.checked);
                          // setFieldValue("carBPKB",e.target.checked)
                      }}
                      type="radio" name="paymenttools" value="CBKPT02" />
                      <label style={{ fontSize: 15 }}>Cash</label>
                  </div>
                </div>
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Nama"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Nomor Handphone"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Nomor KTP"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
                <Customnumtextfield
                    placeholder={"Harga Jual"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
                <Customnumtextfield
                    placeholder={"Booking Fee/DP"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
                <Customtextfield
                    placeholder={"Leasing"}
                    value={values.nama}
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    touched={touched.nama}
                    errorMessage={errors.nama}
                />
                <div style={{ padding: 5 }}></div>
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
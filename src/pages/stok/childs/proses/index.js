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
      paymenttools: "CBKPT01",
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
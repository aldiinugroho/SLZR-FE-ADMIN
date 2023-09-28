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
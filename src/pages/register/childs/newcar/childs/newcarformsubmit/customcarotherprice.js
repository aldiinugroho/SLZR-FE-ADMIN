
import * as React from "react";
import { Custombutton, Customnumtextfield, Customtextfield } from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';

function Customcarotherprice({
  data = []
}) {

  function onChangeValue(params) {
    console.log(params);
  }

  return(
    <div>
      <Formcarotherpricegenerator 
        onChangeValue={onChangeValue}
      />
    </div>
  )
}

const submitformvalidation = Yup.object().shape({
  carOtherPriceName: Yup.string()
      .required('Nama pengeluaran wajib diisi.'),
      carOtherPrice: Yup.string()
      .required('Harga pengeluaran wajib diisi.')
});

function Formcarotherpricegenerator({
  onChangeValue = () => {}
}) {
  return(
    <Formik
      initialValues={{
        carOtherPriceName: "",
        carOtherPrice: ""
      }}
      validationSchema={submitformvalidation}
      onSubmit={(values,{ resetForm }) => {
        console.log("Formcarotherpricegenerator - values",values)
        onChangeValue(values)
        resetForm()
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
            placeholder="Barang..."
            value={values.carOtherPriceName}
            onChange={handleChange("carOtherPriceName")}
            onBlur={handleBlur("carOtherPriceName")}
            touched={touched.carOtherPriceName}
            errorMessage={errors.carOtherPriceName}
          />
          <div style={{ padding: 5 }}></div>
          <Customnumtextfield 
            placeholder="Harga"
            value={values.carOtherPrice}
            onChange={handleChange("carOtherPrice")}
            onBlur={handleBlur("carOtherPrice")}
            touched={touched.carOtherPrice}
            errorMessage={errors.carOtherPrice}
          />
          <div style={{ padding: 5 }}></div>
          <Custombutton
            onClick={handleSubmit}
            title={"tambah harga lainnya"}
          />
        </React.Fragment>
      )}
    </Formik>
  )
}

export default Customcarotherprice
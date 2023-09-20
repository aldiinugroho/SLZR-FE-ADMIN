
import * as React from "react";
import { Custombutton, Customnumtextfield, Customtextfield } from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

function Customcarotherprice({
  data = []
}) {
  const [datavalue,setdatavalue] = React.useState(data)

  function onChangeValue(params = new ModelCustomCarOtherPrice({})) {
    setdatavalue(prevItems => {
      return [...prevItems, params];
    });
  }

  function onclickdelete(params = new ModelCustomCarOtherPrice({})) {
    setdatavalue(prevItems => {
      const filtered = prevItems.filter((i) => i.uid !== params.uid)
      return filtered
    });
  }

  return(
    <div>
      {datavalue.map((i,x) => (
        <React.Fragment key={x}>
          <div style={{
            width: "40%",
            fontSize: 15,
            // padding: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 6,
            position: "relative"
          }}>
            <div onClick={() => onclickdelete(i)} style={{
              position: "absolute",
              margin: 2,
              top: 0,
              right: 0,
              width: "1rem",
              height: "1rem",
              backgroundColor: "red",
              borderRadius: "10rem",
              cursor: "default"
            }}></div>
            <div style={{
              margin: 10
            }}>
              <div>{i?.carOtherPriceName}</div>
              <div>Rp {i?.carOtherPrice}</div>
            </div>
          </div>
          <div style={{ padding: 5 }}></div>
        </React.Fragment>
      ))}
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
        const generatedData = new ModelCustomCarOtherPrice({
          carOtherPriceName: values?.carOtherPriceName,
          carOtherPrice: values?.carOtherPrice
        })
        onChangeValue(generatedData)
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
            placeholder="Pengeluaran..."
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
            title={"tambah pengeluaran lainnya"}
          />
        </React.Fragment>
      )}
    </Formik>
  )
}

class ModelCustomCarOtherPrice {
  uid =  uuidv4()
  carOtherPriceName = ""
  carOtherPrice = ""
  constructor({
    carOtherPriceName = "",
    carOtherPrice = ""
  }) {
    this.carOtherPriceName = carOtherPriceName
    this.carOtherPrice = carOtherPrice
  }
}

export default Customcarotherprice
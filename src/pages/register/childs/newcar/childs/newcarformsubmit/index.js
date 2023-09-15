import * as React from 'react';
import {
    Custombody,
    Custombutton, Customdropdown,
    Customheader,
    Customtextareafield,
    Customtextfield,
    Sidebar
} from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';

const submitformvalidation = Yup.object().shape({
    carShowroom: Yup.string()
        .required('Showroom wajib diisi.'),
    carBrand: Yup.string()
        .required('Brand wajib diisi.')
});

function Index() {
    return(
        <Custombody>
            <Sidebar>
                <Customheader />
                <SubmitForm />
            </Sidebar>
        </Custombody>
    )
}

function SubmitForm() {
    return(
        <div style={{
            padding: "10px",
        }}>
            <h1>
                Register Car
            </h1>
            <div className="spacingblack"></div>
            <div style={{ padding: 5 }}></div>
            <Formik
                initialValues={{
                    carName: "",
                    carShowroom: "",
                    carBrand: "",
                    carPlate: "",
                    carDesc: "",
                    carTransmission: ""
                }}
                validationSchema={submitformvalidation}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("values",values)
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
                        <Customdropdown
                            onBlur={handleBlur("carShowroom")}
                            onChange={handleChange("carShowroom")}
                            touched={touched.carShowroom}
                            errorMessage={errors.carShowroom}
                            placeholder={"Pilih Showroom"}
                            data={[
                                {
                                    "id": "main",
                                    "name": "Pribadi"
                                },
                                {
                                    "id": "123",
                                    "name": "Toyota"
                                },
                                {
                                    "id": "123",
                                    "name": "Subaru"
                                }
                            ]}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customdropdown
                            onBlur={handleBlur("carBrand")}
                            onChange={handleChange("carBrand")}
                            touched={touched.carBrand}
                            errorMessage={errors.carBrand}
                            placeholder={"Pilih Brand"}
                            data={[
                                {
                                    "id": "123",
                                    "name": "Toyota"
                                },
                                {
                                    "id": "123",
                                    "name": "Subaru"
                                }
                            ]}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextfield
                            placeholder={"Nama"}
                            value={values.carName}
                            onChange={handleChange("carName")}
                            onBlur={handleBlur("carName")}
                            touched={touched.carName}
                            errorMessage={errors.carName}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextfield
                            placeholder={"Plat No"}
                            value={values.carPlate}
                            onChange={handleChange("carPlate")}
                            onBlur={handleBlur("carPlate")}
                            touched={touched.carPlate}
                            errorMessage={errors.carPlate}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextareafield
                            placeholder={"Deskripsi"}
                            value={values.carDesc}
                            onChange={handleChange("carDesc")}
                            onBlur={handleBlur("carDesc")}
                            touched={touched.carDesc}
                            errorMessage={errors.carDesc}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextfield
                            placeholder={"Transmisi"}
                            value={values.carTransmission}
                            onChange={handleChange("carTransmission")}
                            onBlur={handleBlur("carTransmission")}
                            touched={touched.carTransmission}
                            errorMessage={errors.carTransmission}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Custombutton
                            onClick={handleSubmit}
                            title={"tambah"}
                        />
                    </React.Fragment>
                )}
            </Formik>
        </div>
    )
}

export default Index;

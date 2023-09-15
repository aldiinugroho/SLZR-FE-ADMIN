import * as React from 'react';
import {
    Custombody,
    Custombutton,
    Customheader,
    Customtextareafield,
    Customtextfield,
    Sidebar
} from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';

const submitformvalidation = Yup.object().shape({
    nama: Yup.string()
        .required('Nama wajib diisi.'),
    alamat: Yup.string()
        .required('Alamat wajib diisi.'),
    phone: Yup.string()
        .matches(/^\d+$/, 'Nomor telp hanya boleh angka.')
        .min(8,"Nomor telp minimal 8 angka.")
        .max(13,"Nomor telp maksimal 13 angka.")
        .required('Nomor telp wajib diisi.'),
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
                Register Showroom
            </h1>
            <div className="spacingblack"></div>
            <div style={{ padding: 5 }}></div>
            <Formik
                initialValues={{
                    nama: "",
                    alamat: "",
                    phone: ""
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
                        <Customtextfield
                            placeholder={"Nama"}
                            value={values.nama}
                            onChange={handleChange("nama")}
                            onBlur={handleBlur("nama")}
                            touched={touched.nama}
                            errorMessage={errors.nama}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextareafield
                            placeholder={"Alamat"}
                            value={values.alamat}
                            onChange={handleChange("alamat")}
                            onBlur={handleBlur("alamat")}
                            touched={touched.alamat}
                            errorMessage={errors.alamat}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customtextfield
                            placeholder={"Phone"}
                            value={values.phone}
                            onChange={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            touched={touched.phone}
                            errorMessage={errors.phone}
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

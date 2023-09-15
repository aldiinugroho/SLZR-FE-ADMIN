import * as React from 'react';
import {
    Customalert,
    Custombody,
    Custombutton,
    Customheader,
    Customtextareafield,
    Customtextfield,
    Sidebar
} from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { requestShowroom } from '../../../../../../request';
import { storeShowroomForm } from './state';

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
    let { type, showroomId } = useParams();
    const customalert = Customalert.useCustomAlert()
    const navigate = useNavigate()
    const store = storeShowroomForm((state) => state)

    React.useEffect(() => {
        preparedata()
    },[])

    async function preparedata() {
        try {
            if (type === "update" && showroomId !== undefined && showroomId !== null) {
                await requestShowroom.detail(showroomId)
            }
        } catch (error) {
            customalert(error)
        }
    }

    async function submitNew(params) {
        try {
            const result = await requestShowroom.create({
                showroomName: params?.nama,
                showroomAddress: params?.alamat,
                showroomPhone: params?.phone
            })
            if (result === true) {
                navigate("/register/new-showroom")
            }
        } catch (error) {
            customalert(error)
        }
    }

    async function submitUpdate(params) {
        try {
            const result = await requestShowroom.update({
                showroomId: params?.id,
                showroomName: params?.nama,
                showroomAddress: params?.alamat,
                showroomPhone: params?.phone
            })
            if (result === true) {
                navigate("/register/new-showroom")
            }
        } catch (error) {
            customalert(error?.rawmessage)
        }
    }

    function submit(data) {
        if (type === "create") {
            submitNew(data)
        } else {
            submitUpdate(data)
        }
    }

    return(
        <div style={{
            padding: "10px",
        }}>
            <h1>
                Register Showroom
            </h1>
            <div className="spacingblack"></div>
            <div style={{ padding: 5 }}></div>
            {type === "update" && store.loading === false && store.data !== null && (
                <RawForm 
                submit={submit} 
                type={type} 
                initialValues={{
                    id: store.data?.showroomId,
                    nama: store.data?.showroomName,
                    alamat: store.data?.showroomAddress,
                    phone: store.data?.showroomPhone
                }}
                />
            )}
            {type === "create" && <RawForm submit={submit} type={type} />}
        </div>
    )
}

function RawForm({
    type = "",
    initialValues = {
        nama: "",
        alamat: "",
        phone: "",
    },
    submit = () => {}
}) {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={submitformvalidation}
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
                        title={type === "create" ? "Tambah" : "Ubah"}
                    />
                </React.Fragment>
            )}
        </Formik>
    )
}

export default Index;

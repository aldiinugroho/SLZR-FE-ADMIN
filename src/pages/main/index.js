import * as React from 'react';
import {Customalert, Custombody, Custombutton, Customheader, Customtextareafield, Customtextfield} from "../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { requestAuth } from '../../request';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../configs/localstorage';

function Index() {
    return(
        <Custombody>
            <Customheader
                withLogoutBtn={false}
            />
            <Bodyformlogin />
        </Custombody>
    )
}

const submitformvalidation = Yup.object().shape({
    email: Yup.string()
        .email("Email format salah.")
        .required('Email wajib diisi.'),
    password: Yup.string()
        .required('Password wajib diisi.')
});

function Bodyformlogin() {
    const navigate = useNavigate()
    const customalert = Customalert.useCustomAlert()
    const [loadingstate,setloadingstate] = React.useState(true)

    async function postLogin({
        email = '',
        password = ""
    }) {
        try {
            const result = await requestAuth.login({
                email,
                password
            })
            if (result) {
                navigate("/home")
            }
        } catch (error) {
            customalert(error?.rawmessage)
        }
    }

    React.useEffect(() => {
        checkloginstate()
    },[])

    function checkloginstate() {
        const result = new LocalStorage().getToken()
        if (result === null || result === undefined) {
            setloadingstate(false)
        } else {
            navigate("/home")
            setloadingstate(false)
        }
    }

    return(
        !loadingstate && <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={submitformvalidation}
            onSubmit={(values, { setSubmitting }) => {
                postLogin(values)
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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "pink",
                    alignItems: "center",
                    padding: 10,
                    marginTop: "5rem"
                }}>
                    <Customtextfield
                        placeholder={"Email"}
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        touched={touched.email}
                        errorMessage={errors.email}
                    />
                    <div style={{ padding: 5 }}></div>
                    <Customtextfield
                        type={"password"}
                        placeholder={"Password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        touched={touched.password}
                        errorMessage={errors.password}
                    />
                    <div style={{ padding: 5 }}></div>
                    <Custombutton
                        onClick={handleSubmit}
                        title={"Login"}
                    />
                </div>
            )}
        </Formik>
    )
}

export default Index;

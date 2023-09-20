import * as React from 'react';
import {
    Custombody,
    Custombutton, Customdatefield, Customdropdown,
    Customfieldimage,
    Customheader,
    Customnumtextfield,
    Customtextareafield,
    Customtextfield,
    Sidebar
} from "../../../../../../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Customshowroomdropdown from './customshowroomdropdown';
import Customcarbranddropdown from './customcarbranddropdown';
import Customtransmissiondropdown from './customtransmissiondropdown';
import Customfueldropdown from './customfueldropdown';
import Customcaryeardropdown from './customcaryeardropdown';
import Custom5image from './custom5image';
import Customcarotherprice from './customcarotherprice';

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

    function submitdata(params) {
        const data = {
            ...params,
            carImage: JSON.parse(params?.carImage)
        }
        console.log(data);
    }

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
                    carTransmission: "",
                    carFuel: "",
                    carYear: "",
                    carTax: "",
                    carSellPrice: "",
                    carBuyPrice: "",
                    carImage: "",
                    carOtherPrice: ""
                }}
                // validationSchema={submitformvalidation}
                onSubmit={(values) => submitdata(values)}
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
                        <Customshowroomdropdown
                            onBlur={handleBlur("carShowroom")}
                            onChange={handleChange("carShowroom")}
                            touched={touched.carShowroom}
                            errorMessage={errors.carShowroom}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customcarbranddropdown
                            onBlur={handleBlur("carBrand")}
                            onChange={handleChange("carBrand")}
                            touched={touched.carBrand}
                            errorMessage={errors.carBrand}
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
                        <Customtransmissiondropdown
                            onBlur={handleBlur("carTransmission")}
                            onChange={handleChange("carTransmission")}
                            touched={touched.carTransmission}
                            errorMessage={errors.carTransmission}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customfueldropdown
                            onBlur={handleBlur("carFuel")}
                            onChange={handleChange("carFuel")}
                            touched={touched.carFuel}
                            errorMessage={errors.carFuel}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customcaryeardropdown
                            onBlur={handleBlur("carYear")}
                            onChange={handleChange("carYear")}
                            touched={touched.carYear}
                            errorMessage={errors.carYear}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customdatefield
                            type={"month"}
                            placeholder={"Pilih Bulan/Tahun pajak"}
                            value={values.carTax}
                            onChange={handleChange("carTax")}
                            onBlur={handleBlur("carTax")}
                            touched={touched.carTax}
                            errorMessage={errors.carTax}
                        />
                        <div style={{ padding: 5 }}></div>
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <input 
                            onChange={e => {
                                console.log("BPKB is checked",e.target.checked);
                            }}
                            type="checkbox" name="BPKB" value="BPKB" />
                            <label style={{ fontSize: 15 }}>BPKB</label>
                        </div>
                        <div style={{ padding: 5 }}></div>
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <input 
                            onChange={e => {
                                console.log("STNK is checked",e.target.checked);
                            }}
                            type="checkbox" name="STNK" value="STNK" />
                            <label style={{ fontSize: 15 }}>STNK</label>
                        </div>
                        <div style={{ padding: 5 }}></div>
                        <Customnumtextfield
                            placeholder={"Harga Beli"}
                            value={values.carBuyPrice}
                            onChange={handleChange("carBuyPrice")}
                            onBlur={handleBlur("carBuyPrice")}
                            touched={touched.carBuyPrice}
                            errorMessage={errors.carBuyPrice}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customnumtextfield
                            placeholder={"Harga Jual"}
                            value={values.carSellPrice}
                            onChange={handleChange("carSellPrice")}
                            onBlur={handleBlur("carSellPrice")}
                            touched={touched.carSellPrice}
                            errorMessage={errors.carSellPrice}
                        />
                        <div style={{ padding: 5 }}></div>
                        <div className="spacingblack"></div>
                        <div style={{ padding: 5 }}></div>
                        <Custom5image 
                            onChangeValue={(value) => {
                                setFieldValue("carImage",JSON.stringify(value))
                            }}
                        />
                        <div className="spacingblack"></div>
                        <div style={{ padding: 5 }}></div>
                        <Customcarotherprice 
                            onChangeValue={(value) => {
                                setFieldValue("carOtherPrice",JSON.stringify(value))
                            }}
                        />
                        <div style={{ padding: 5 }}></div>
                        <div className="spacingblack"></div>
                        <div style={{ padding: 20 }}></div>
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

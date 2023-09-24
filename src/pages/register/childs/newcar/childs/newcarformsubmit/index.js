import * as React from 'react';
import {
    Customalert,
    Custombody,
    Custombutton, Customdatefield, Customdropdown,
    Customfieldimage,
    Customheader,
    Customnumtextfield,
    Customspinner,
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
import { requestCar } from '../../../../../../request';
import { storeListCar } from '../../state';
import { useParams } from 'react-router-dom';
import { storeCarDetail } from './statedetailcar';
import { formatNumber } from '../../../../../../utils';
import moment from 'moment/moment';

const submitformvalidation = Yup.object().shape({
    carShowroom: Yup.string()
        .required('Showroom wajib diisi.'),
    carBrand: Yup.string()
        .required('Brand wajib diisi.'),
    carName: Yup.string()
        .required('Nama wajib diisi.'),
    carPlate: Yup.string()
        .required('Plat nomor wajib diisi.'),
    carDesc: Yup.string()
        .required('Deskripsi wajib diisi.'),
    carTransmission: Yup.string()
        .required('Jenis transmisi wajib diisi.'),
    carFuel: Yup.string()
        .required('Jenis bahan bakar wajib diisi.'),
    carTax: Yup.string()
        .required('Pajak mobil wajib diisi.'),
    carYear: Yup.string()
        .required('Tahun mobil wajib diisi.'),
    carSellPrice: Yup.string()
        .required('Harga jual mobil wajib diisi.'),
    carBuyPrice: Yup.string()
        .required('Harga beli mobil wajib diisi.'),
    // carImage: Yup.string()
    //     .required('Gambar mobil wajib diisi minimal 1.'),
});

function Index() {
    const {type,carId} = useParams()
    const store = storeListCar((state) => state)
    const storecardetail = storeCarDetail((state) => state)
    const alertmsg = Customalert.useCustomAlert()

    React.useEffect(() => {
        setupdataupdate()
    },[])

    async function setupdataupdate() {
        try {
            if (type === "create") return
            await requestCar.detail(carId)
        } catch (error) {
            alertmsg(error)
        }
    }

    React.useEffect(() => {
        console.log("useEffect",storecardetail.data);
    },[storecardetail])

    return(
        <Custombody>
            {store.loading || storecardetail.loading && (
                <Customspinner />
            )}
            <Sidebar>
                <Customheader />
                {type === "create" && (<SubmitForm />)}
                {type === "update" && storecardetail.data !== null && (<SubmitForm 
                    initValue={{
                        ...storecardetail.data,
                        carTax: moment(storecardetail.data.carTax).format("yyyy-MM"),
                        carShowroom: storecardetail.data.carShowroom.showroomId,
                        carBrand: storecardetail.data.carBrand.carBrandId,
                        carDesc: storecardetail.data.carDescription,
                        carBuyPrice: formatNumber(storecardetail.data.carBuyPrice),
                        carSellPrice: formatNumber(storecardetail.data.carSellPrice),
                        carImage: JSON.stringify(storecardetail.data.carImage.map((i) => {
                            return {
                                uploadId: i?.carImageId,
                                uri: i?.carImage
                            }
                        })),
                        carOtherPrice: JSON.stringify(storecardetail.data.carOtherPrice.map((i) => {
                            return {
                                uid: i?.carOtherPriceId,
                                carOtherPriceName: i?.carOtherPriceName,
                                carOtherPrice: formatNumber(i?.carOtherPrice)
                            }
                        }))
                    }}
                />)}
            </Sidebar>
        </Custombody>
    )
}

function SubmitForm({
    initValue = {
        carName: "",
        carShowroom: "DEFAULT",
        carBrand: "DEFAULT",
        carPlate: "",
        carDesc: "",
        carTransmission: "DEFAULT",
        carFuel: "DEFAULT",
        carYear: "DEFAULT",
        carTax: "",
        carBPKB: false,
        carSTNK: false,
        carSellPrice: "",
        carBuyPrice: "",
        carImage: "",
        carOtherPrice: ""
    }
}) {
    const {type} = useParams()
    const alermsg = Customalert.useCustomAlert()

    async function submitdata(params) {
        try {
            if (type === "create") {
                await createdata(params)
            }
            if (type === "update") {
                await updatedata(params)
            }
        } catch (error) {
            alermsg(error)
        }
    }

    async function createdata(params) {
        try {
            console.log("createdata",params);
            await requestCar.create(params)
        } catch (error) {
            throw error
        }
    }

    async function updatedata(params) {
        try {
            console.log("updatedata",params);
            // await requestCar.create(params)
        } catch (error) {
            throw error
        }
    }

    React.useEffect(() => {
        console.log("initValue",initValue);
    },[initValue])

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
                initialValues={initValue}
                validationSchema={submitformvalidation}
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
                            value={values.carShowroom}
                            onBlur={handleBlur("carShowroom")}
                            onChange={handleChange("carShowroom")}
                            touched={touched.carShowroom}
                            errorMessage={errors.carShowroom}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customcarbranddropdown
                            value={values.carBrand}
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
                            value={values.carTransmission}
                            onBlur={handleBlur("carTransmission")}
                            onChange={handleChange("carTransmission")}
                            touched={touched.carTransmission}
                            errorMessage={errors.carTransmission}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customfueldropdown
                            value={values.carFuel}
                            onBlur={handleBlur("carFuel")}
                            onChange={handleChange("carFuel")}
                            touched={touched.carFuel}
                            errorMessage={errors.carFuel}
                        />
                        <div style={{ padding: 5 }}></div>
                        <Customcaryeardropdown
                            value={values.carYear}
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
                            checked={values.carBPKB}
                            onChange={e => {
                                console.log("BPKB is checked",e.target.checked);
                                setFieldValue("carBPKB",e.target.checked)
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
                            checked={values.carSTNK}
                            onChange={e => {
                                console.log("STNK is checked",e.target.checked);
                                setFieldValue("carSTNK",e.target.checked)
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
                            value={values.carImage}
                            onBlur={handleBlur("carImage")}
                            touched={touched.carImage}
                            errorMessage={errors.carImage}
                            onChangeValue={(value) => {
                                setFieldValue("carImage",value.length === 0 ? "" : JSON.stringify(value))
                            }}
                        />
                        <div className="spacingblack"></div>
                        <div style={{ padding: 5 }}></div>
                        <Customcarotherprice 
                            value={values.carOtherPrice}
                            onChangeValue={(value) => {
                                setFieldValue("carOtherPrice",value.length === 0 ? "" : JSON.stringify(value))
                            }}
                        />
                        <div style={{ padding: 5 }}></div>
                        <div className="spacingblack"></div>
                        <div style={{ padding: 20 }}></div>
                        <Custombutton
                            onClick={handleSubmit}
                            title={type === "create" ? "Tambah" : "Ubah"}
                        />
                    </React.Fragment>
                )}
            </Formik>
        </div>
    )
}

export default Index;

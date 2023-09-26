import * as React from 'react';
import {
  Customalert,
  Custombody, Customheader, Sidebar
} from "../../../../components";
import { requestCarBookKeeping } from '../../../../request';

function Index({
  type = "Ready"
}) {
  return(
    <Custombody>
      <Sidebar>
        <Customheader />
        <BodyComponent type={type} />
      </Sidebar>
    </Custombody>
  )
}

function BodyComponent({
  type = ""
}) {
  return (
    <div style={{
      padding: 10
    }}>
      <h1>
        List {type} Car
      </h1>
      <div className="spacingblack"></div>
      <div style={{ padding: "10px" }}></div>
      <TableShow type={type} />
    </div>
  )
}

function TableShow({
  type = ""
}) {
  // const navigate = useNavigate()
  // const store = storeListShowroom((state) => state)
  const errmsg = Customalert.useCustomAlert()

  React.useEffect(() => {
    getlistdata()
  },[type])


  async function getlistdata() {
      try {
          await requestCarBookKeeping.getList(type)
      } catch (e) {
          errmsg(e)
      }
  }

  function goedit(showroomId = "") {
      console.log(showroomId);
      // navigate(`/register/new-showroom/formsubmit/update/${showroomId}`)
  }

  async function godelete(showroomId = "") {
      try {
          // await requestShowroom.reqDelete(showroomId)
      } catch (error) {
          // errmsg(error)
      }
  }

  return(
      <div style={{
          display: "inline-block",
          overflow: "scroll",
          height: "20rem"
      }}>
          <table>
              <thead>
              <tr style={{ backgroundColor: "#B92929" }}>
                  <th className="styletablecell">No</th>
                  <th className="styletablecell">Nama</th>
                  <th className="styletablecell">Brand</th>
                  <th className="styletablecell">Plat No</th>
                  <th className="styletablecell">Tahun Mobil</th>
                  <th className="styletablecell">Pajak Mobil</th>
                  <th className="styletablecell">Harga Jual</th>
                  <th className="styletablecell">Harga Beli</th>
                  {/* <th className="styletablecell">Action</th> */}
              </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="styletablecell">1</td>
                    <td className="styletablecell">Car nama</td>
                    <td className="styletablecell">Brand</td>
                    <td className="styletablecell">Plat no</td>
                    <td className="styletablecell">Tahun mobil</td>
                    <td className="styletablecell">Pajak mobil</td>
                    <td className="styletablecell">Harga jual</td>
                    <td className="styletablecell">Harga beli</td>
                    {/* <td>
                        <button onClick={() => goedit(i?.showroomId)}>update</button>
                        <button onClick={() => godelete(i?.showroomId)}>delete</button>
                    </td> */}
                </tr>
              </tbody>
              {/* {store.data?.map((i,x) => {
                  if (x % 2 === 0) {
                      return (
                          <tbody key={x}>
                          <tr>
                              <td className="styletablecell">{x+1}</td>
                              <td className="styletablecell">{i?.showroomName}</td>
                              <td className="styletablecell">{i?.showroomAddress}</td>
                              <td className="styletablecell">{i?.showroomPhone}</td>
                              <td>
                                  <button onClick={() => goedit(i?.showroomId)}>update</button>
                                  <button onClick={() => godelete(i?.showroomId)}>delete</button>
                              </td>
                          </tr>
                          </tbody>
                      )
                  } else  {
                      return (
                          <tbody key={x}>
                          <tr style={{ backgroundColor: "#d4d4d4" }}>
                              <td className="styletablecell">{x+1}</td>
                              <td className="styletablecell">{i?.showroomName}</td>
                              <td className="styletablecell">{i?.showroomAddress}</td>
                              <td className="styletablecell">{i?.showroomPhone}</td>
                              <td>
                                  <button onClick={() => goedit(i?.showroomId)}>update</button>
                                  <button onClick={() => godelete(i?.showroomId)}>delete</button>
                              </td>
                          </tr>
                          </tbody>
                      )
                  }
              })} */}
          </table>
      </div>
  )
}

export default Index;

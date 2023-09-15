import { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create a context for your provider
const Context = createContext();

// Step 2: Create a Provider component
const CustomAlertProvider = ({ children }) => {
  const [alertdata, setalertdata] = useState([])

  const alertFunction = (message) => {
    setalertdata((prevAlertdata) => [...prevAlertdata, message]);
  };

  useEffect(() => {
    // Remove the oldest message every 2 seconds
    const interval = setInterval(() => {
      setalertdata((prevAlertdata) => {
        if (prevAlertdata.length > 0) {
          // Remove the oldest message by slicing the array
          return prevAlertdata.slice(1);
        }
        return prevAlertdata;
      });
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Context.Provider value={alertFunction}>
      <AlertComponent data={alertdata}/>
      {children}
    </Context.Provider>
  );
};

function AlertComponent({data = []}) {
  return(
    <div style={{
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: 0,
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: 5,
      // backgroundColor:"pink"
    }}>
      {data.map((i,x) => (
        <div key={x} style={{
          backgroundColor: "white",
          padding: 5,
          paddingRight: 10,
          paddingLeft: 10,
          minWidth: "10rem",
          maxWidth: "20rem",
          textAlign: "center",
          borderRadius: 6,
          fontSize: 15,
          borderColor: "gray",
          borderStyle: "solid",
          borderWidth: 0.5,
          marginBottom: data.length === x+1 ? 0 : 5
        }}>
          {i}
        </div>
      ))}
    </div>
  )
}

// Step 3: Create a custom hook to access the context values
const useCustomAlert = () => {
  const alert = useContext(Context);
  if (!alert) {
    throw new Error('useAlertMyProviderContext must be used within MyProvider');
  }
  return alert;
};

export {
  CustomAlertProvider,
  useCustomAlert
}
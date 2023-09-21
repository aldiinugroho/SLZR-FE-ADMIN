import "./stylespinner.css"

function Index({
}) {
  return(
    <div style={{
      display: "flex",
      position: "fixed",
      backgroundColor: "rgba(0,0,0,0.5)",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center"
  }}>
    <div class="loader"></div>
  </div>
  )
}

export default Index
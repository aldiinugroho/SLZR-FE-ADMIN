import * as React from 'react';

function Index({
    title = "",
    disabled = false,
    onClick = () => {},
    type = "button"
}) {
    return(
        <button
            type={type}
            disabled={disabled}
            onClick={() => onClick()}
            style={{
                borderStyle: "none",
                fontSize: "15px",
                padding: "0.5rem",
                paddingLeft: "2rem",
                paddingRight: "2rem"
            }}
        >
            {title}
        </button>
    )
}

export default Index;

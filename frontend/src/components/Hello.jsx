import React from "react";

function Hello(props) {
    var name = props.name;

    return (
        <p>Hello { name || 'World'}!</p>
    );
}

export default Hello;
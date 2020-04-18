import React from 'react'

const Option = (props) => {
    return (
        <div>
            <li>{props.item}</li>
            <button onClick={(e) => {
                props.handleDeleteOption(props.item);
            }}>remove</button>
        </div>
    );
};

export default Option
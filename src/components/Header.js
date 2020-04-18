import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>Put your life in the hands of a computer</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

export default Header
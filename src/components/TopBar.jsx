import React from 'react'
import "./TopBar.css"

const TopBar = ({ onAddNode, changeSelect }) => {


    return (
        <div className="topbar">
            <button className="btn" onClick={onAddNode}>Add Node</button>
            <button className="btn" onClick={changeSelect}>Add Edge</button>
            <button className="btn">Run Algorithm</button>
        </div>
    );
}

export default TopBar
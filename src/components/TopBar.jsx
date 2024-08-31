import React from 'react'
import "./TopBar.css"

const TopBar = ({ onAddNode }) => {
    return (
        <div className="topbar">
            <button className="btn" onClick={onAddNode}>Add Node</button>
            <button className="btn">Add Edge</button>
            <button className="btn">Run Algorithm</button>
        </div>
    );
}

export default TopBar
// React Imports
import React, { useState, useRef } from 'react';

// Component Imports
import TopBar from './TopBar';
import Canvas from './Canvas';

// CSS Imports
import "./Visualizer.css";

// models
import Node from '../models/Node';



var HEIGHT = 750;
var WIDTH = 600;

const Visualizer = () => {
    const p5Instance = useRef(null); // Create a ref to hold the p5 instance
    const [nodes, setNodes] = useState([]);

    const addNode = () => {
        if (p5Instance.current) {
            const newNode = new Node(p5Instance.current, `node-${nodes.length + 1}`, Math.random() * (HEIGHT - 50) + 25, Math.random() * (WIDTH - 50) + 25);
            console.log('New node created:', newNode);  // Check if node is being created
            setNodes([...nodes, newNode]);
        } else {
            console.warn('p5Instance is not initialized yet.');
        }
    };

    return (
        <div className="p5-container">
            <div className="topbar-Div">
                <TopBar onAddNode={addNode} />
            </div>
            <div className="p5-wrapper">
                <Canvas p5Instance={p5Instance} nodes={nodes} HEIGHT={HEIGHT} WIDTH={WIDTH} />
            </div>
        </div>
    );
}

export default Visualizer
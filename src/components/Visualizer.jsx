// React Imports
import React, { useState, useRef, useEffect } from 'react';

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

    const [selectMode, setSelectMode] = useState(false);
    const [selectedNodes, setSelectedNodes] = useState([]); // For conneting edges

    // ADDING A NODE
    const addNode = () => {
        if (p5Instance.current) {
            const newNode = new Node(
                p5Instance.current,
                `node-${nodes.length + 1}`,
                Math.random() * (HEIGHT - 50) + 25,
                Math.random() * (WIDTH - 50) + 25,
                selectMode ? [0, 0, 255] : [255, 255, 255]
            );
            console.log('New node created:', newNode);
            setNodes([...nodes, newNode]);
        } else {
            console.warn('p5Instance is not initialized yet.');
        }
    };

    // TURNING ON SELECT MODE
    const changeSelect = () => {
        let modeShift = !selectMode;
        setSelectMode(modeShift);  // Toggle the boolean state

        if (modeShift) {
            setNodes(nodes.map(node => {
                node.changeColor([0, 0, 255]); // Reset to Blue or original color
                return node;
            }));
        }
        else {
            setNodes(nodes.map(node => {
                node.changeColor([255, 255, 255]); // Reset to Blue or original color
                return node;
            }));
        }
    };


    // Handling selecting node for forming connections
    const handleNodeClick = (clickedNode) => {
        setSelectedNodes(prevSelected => {
            // CHECK FOR SELF CONNECTION
            const newSelected = [...prevSelected, clickedNode];
            return newSelected;
        });
    };

    useEffect(() => {
        if (selectedNodes.length === 2) {
            const [node1, node2] = selectedNodes;
            node1.connectTo(node2.id);
            node2.connectTo(node1.id);

            node1.printInfo();
            node2.printInfo();
            setSelectedNodes([]);
            changeSelect();
        }
    }, [selectedNodes]);


    return (
        <div className="p5-container">
            <div className="topbar-Div">
                <TopBar onAddNode={addNode} selectMode={selectMode} changeSelect={changeSelect} />
            </div>
            <div className="p5-wrapper">
                <Canvas
                    p5Instance={p5Instance}
                    nodes={nodes}
                    HEIGHT={HEIGHT}
                    WIDTH={WIDTH}
                    onNodeClick={handleNodeClick}
                    selectMode={selectMode}
                />
            </div>
        </div>
    );
}

export default Visualizer
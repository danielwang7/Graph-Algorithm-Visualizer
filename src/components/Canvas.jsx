// React imports
import React, { useRef, useEffect } from 'react';

// libraries
import p5 from 'p5';


const Canvas = ({ p5Instance, nodes, HEIGHT, WIDTH, onNodeClick, selectMode }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const sketch = (p) => {

            p.setup = () => {
                p.createCanvas(HEIGHT, WIDTH);
                p.frameRate(30);
            };

            p.draw = () => {

                // Draw the background
                p.background(255);

                // Draw the connecting lines
                p.stroke(0);
                p.strokeWeight(8);
                nodes.forEach(node => {
                    node.getConnections().forEach(connectionId => {

                        const targetNode = nodes.find(n => n.id === connectionId);
                        if (targetNode) {
                            p.line(node.x, node.y, targetNode.x, targetNode.y);
                        }
                    });
                });

                // Draw the nodes
                nodes.forEach(node => {
                    node.p = p;
                    node.draw();
                    node.drag();
                });

            };

            // Node clicking logic
            p.mousePressed = () => {
                nodes.forEach(node => {
                    if (node.isMouseInside()) {
                        node.startDragging();
                    }
                });
            };

            p.mouseReleased = () => {
                nodes.forEach(node => node.stopDragging());

                nodes.forEach(node => {
                    if (node.isMouseInside() && selectMode) {
                        onNodeClick(node);
                    }
                });
            };

        };

        p5Instance.current = new p5(sketch, canvasRef.current);

        // Cleanup the p5 instance on component unmount
        return () => {
            p5Instance.current.remove();
        };
    }, [nodes, p5Instance]);

    return <div ref={canvasRef}></div>;
}

export default Canvas;
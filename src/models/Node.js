
export default class Node {

    constructor(p, id, x, y, color = [255, 255, 255], radius = 50) {
        this.p = p;  // Reference to the p5 instance
        this.id = id // ID of the node

        this.connections = []; // Array to store connected node IDs

        // coordinates of circle
        this.x = x;
        this.y = y;

        // radius & color of the node
        this.radius = radius;
        this.color = color;

        // dist of mouse from center
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
    }

    printInfo() {
        console.log("INFO FOR:", this.id);
        console.log(this.x);
        console.log(this.y);
        console.log(this.connections);
    }

    draw() {
        const p = this.p;
        p.fill(this.color[0], this.color[1], this.color[2]);
        p.stroke(0);
        p.strokeWeight(8);
        p.ellipse(this.x, this.y, this.radius * 2);
    }

    isMouseInside() {
        const p = this.p;
        const distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);
        return distance < this.radius;
    }

    startDragging() {
        const p = this.p;
        this.offsetX = this.x - p.mouseX;
        this.offsetY = this.y - p.mouseY;
        this.isDragging = true;
    }

    stopDragging() {
        this.isDragging = false;
    }

    drag() {
        const p = this.p;
        if (this.isDragging) {
            this.x = p.mouseX + this.offsetX;
            this.y = p.mouseY + this.offsetY;
        }
    }

    changeColor(color = [255, 255, 255]) {
        this.color = color;
    }

    // _______NODE CONNECTION LOGIC_______

    connectTo(otherNodeId) {
        if (!this.connections.includes(otherNodeId)) {
            this.connections.push(otherNodeId); // Add the ID of the connected node
        }
    }

    disconnectFrom(otherNodeId) {
        this.connections = this.connections.filter(id => id !== otherNodeId); // Remove the ID from connections
    }

    getConnections() {
        return this.connections;
    }


}
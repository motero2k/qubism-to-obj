const { readFileSync } = require('fs');
const { Object3d }  = require('./object');
function loadObj(shapeId) {
    const vertices = [];
    const faces = [];
    const data = readFileSync("shapes/"+shapeId+".obj", 'utf8');
    const lines = data.split('\n');
    
    for (const line of lines) {
        const tokens = line.trim().split(/\s+/);
        
        if (tokens[0] === 'v') {
            const vertex = tokens.slice(1).map(parseFloat);
            vertices.push(vertex);
        } else if (tokens[0] === 'f') {
            const face = tokens.slice(1).map(index => parseInt(index.split('/')[0]) - 1);
            faces.push(face);
        }
    }
    
    return new Object3d( vertices, faces );
}

module.exports = { loadObj };

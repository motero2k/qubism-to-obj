const { writeFileSync } = require('fs');

function exportObj(object3Darray, outputPath) {

    let objContent = '';
    let vertexAccumulator = 0;
    for (let objectIndex = 0; objectIndex < object3Darray.length; objectIndex++) {
        const object3D = object3Darray[objectIndex];
        objContent += `o object${objectIndex}\n`;
        const vertices = object3D.vertices;
        const faces = object3D.faces;
        // Write vertices
        vertices.forEach(vertex => {
            objContent += `v ${vertex.join(' ')}\n`;
        });

        // Write faces
        faces.forEach(face => {
            //the index in the face array is 0-based, but OBJ format is 1-based
            const indices = face.map(index => index + 1 + vertexAccumulator).join(' ');
            objContent += `f ${indices}\n`;
        });
        // verices dont start at 0 for each object, 
        vertexAccumulator += vertices.length;
        
    };
    // Write content to file
    try {
        writeFileSync(outputPath, objContent);
        console.log(`OBJ file saved to ${outputPath}`);
    } catch (err) {
        console.error(`Error writing OBJ file: ${err}`);
    }
}

module.exports = { exportObj };

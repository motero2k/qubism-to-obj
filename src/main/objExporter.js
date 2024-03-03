const { writeFileSync } = require('fs');
const { Object3d, MultiObject3d } = require('./object');
/**
 * Exports a multiObject to a .obj file
 * @param {MultiObject3d[]} multiObject - The multiObject to export
 * @param {string} multiObject.name - The name of the multiObject
 * @param {Object3d[]} multiObject.subObjects - The subObjects of the multiObject
 */
function exportObj(multiObject) {
    const outputPath = 'src/output/';
    const filePath = outputPath + (multiObject.name?? "untiled-"+Date.now() )+'.obj';
    let objContent = '';
    let vertexAccumulator = 0;
    const object3DParts = multiObject.subObjects??[];
    for (let objectIndex = 0; objectIndex < object3DParts.length; objectIndex++) {
        const object3Dpart = object3DParts[objectIndex];
        // Write object name ----------------------------------------------
        objContent += `o ${object3Dpart.name}\n`;
        const vertices = object3Dpart.vertices;
        const faces = object3Dpart.faces;
        // Write vertices ----------------------------------------------
        vertices.forEach(vertex => {
            objContent += `v ${vertex.join(' ')}\n`;
        });

        // Write faces ----------------------------------------------
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
        writeFileSync(filePath, objContent);
        console.log(`OBJ file saved to ${filePath}`);
    } catch (err) {
        console.error(`Error writing OBJ file: ${err}`);
    }
}

module.exports = { exportObj };

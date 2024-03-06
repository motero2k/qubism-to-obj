const fs = require('fs');
const { loadObj } = require("./objReader");
const { MultiObject3d, Object3d } = require('./object');

const shapes = {
    255: "cube",
    287: "ramp"
}
function readQubismJsonToMultiObject3D(filename, scale=1/256) {
    try {
        const data = fs.readFileSync(`src/input/${filename}.json`, 'utf8');
        const qubismData = JSON.parse(data);
        const multiObject3D = new MultiObject3d(filename).setName(filename);

        qubismData.qubes.forEach(qube => {
            if(!shapes[qube.shape]){
                console.error(`Shape ${qube.shape} not found in shapes folder using default cube.`);
                qube.shape = 287;
            }
            console.log(qube.shape, shapes[qube.shape])
            const object3d = loadObj(shapes[qube.shape])
                // .getPart(0)//get the first part of the object(we only have one part in the shapes obj files)
                .scale([qube.size_x*scale,qube.size_y*scale,qube.size_z*scale])
                .translate([qube.pos_x*scale,qube.pos_y*scale,qube.pos_z*scale]);
            _changeAxis(object3d.getPart(0),qube.orient)
            multiObject3D.subObjects.push(...object3d.subObjects);
        });
        return multiObject3D;
    } catch (err) {
        console.error('Error reading Qubism JSON:', err);
    }
}
/**
 * 
 * @param {Object3d} object 
 * @param {*} orient 
 */
function _changeAxis(object,orient){
    if(orient == -1) return ;
    const paddedOrient = String(orient).padStart(3,"0")
    let newXOldIndex = paddedOrient.search([12])
    let newYOldIndex = paddedOrient.search([34])
    let newZOldIndez = paddedOrient.search([12])
    console.log(object)
    const verticesCopy= [object.vertices[0],object.vertices[1],object.vertices[2]]
    console.log(verticesCopy)
}
module.exports = { readQubismJsonToMultiObject3D };

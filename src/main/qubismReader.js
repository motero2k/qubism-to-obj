const fs = require('fs');
const { loadObj } = require("./objReader");
const { MultiObject3d } = require('./object');

const shapes = {
    255: "cube",
}
function readQubismJsonToMultiObject3D(filename, scale=1/256) {
    try {
        const data = fs.readFileSync(`src/input/${filename}.json`, 'utf8');
        const qubismData = JSON.parse(data);
        const multiObject3D = new MultiObject3d(filename);

        qubismData.qubes.forEach(qube => {
            if(!shapes[qube.shape]){
                console.error(`Shape ${qube.shape} not found in shapes folder using default cube.`);
                qube.shape = 255;
            }
            const object3d = loadObj(shapes[qube.shape])
                // .getPart(0)//get the first part of the object(we only have one part in the shapes obj files)
                .scale([qube.size_x*scale,qube.size_y*scale,qube.size_z*scale])
                .translate([qube.pos_x*scale,qube.pos_y*scale,qube.pos_z*scale]);
            multiObject3D.subObjects.push(object3d);
        });
        return multiObject3D.subObjects;
    } catch (err) {
        console.error('Error reading Qubism JSON:', err);
    }
}

module.exports = { readQubismJsonToMultiObject3D };

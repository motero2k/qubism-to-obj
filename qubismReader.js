const fs = require('fs');
const { loadObj } = require("./objReader");
function readQubismJsonToObjects3D(jsonPath, scale=1/256) {
    try {
        const shapesIds = fs.readdirSync("shapes").join("");
        const data = fs.readFileSync(jsonPath, 'utf8');
        const qubismData = JSON.parse(data);
        const qubesObjects3D = []
        qubismData.qubes.forEach(qube => {
            if(!shapesIds.includes(qube.shape)){
                console.error(`Shape ${qube.shape} not found in shapes folder`);
                return null;
            }
            const object3d = loadObj(qube.shape)
                .scale([qube.size_x*scale,qube.size_y*scale,qube.size_z*scale])
                .translate([qube.pos_x*scale,qube.pos_y*scale,qube.pos_z*scale]);
            qubesObjects3D.push(object3d);
        });
        return qubesObjects3D;
    } catch (err) {
        console.error('Error reading Qubism JSON:', err);
    }
}

module.exports = { readQubismJsonToObjects3D };

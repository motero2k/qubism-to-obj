const { readFileSync } = require('fs');
const { Object3d, MultiObject3d }  = require('./object');
function loadObj(objFilename) {
    let vertices = [];
    let faces = [];
    let objName = null;

    const data = readFileSync(`src/obj-shapes/${objFilename}.obj`, 'utf8');
    const lines = data.split('\n');
    const multiObjectResult = new MultiObject3d(objFilename);

    for (const line of lines) {
        const tokens = line.trim().split(/\s+/);
        //trake obj name (o)
        if (tokens[0] === 'o') {
            //push the previous object to the multiObject if it is not the first object
            objName = "part-"+tokens.slice(1).join('-');
            if(vertices.length>0 && faces.length>0){
                multiObjectResult.subObjects.push(new Object3d( vertices, faces, objName+"" ));
                vertices = [];faces = [];objName = null;
            }
        }else if (tokens[0] === 'v') {
            const vertex = tokens.slice(1).map(parseFloat);
            vertices.push(vertex);
        } else if (tokens[0] === 'f') {
            const face = tokens.slice(1).map(index => parseInt(index.split('/')[0]) - 1);
            faces.push(face);
        }
    }
    if(vertices.length>0 && faces.length>0){
        multiObjectResult.subObjects.push(new Object3d( vertices, faces, objName ));
    }
    
    return multiObjectResult;
}

module.exports = { loadObj };

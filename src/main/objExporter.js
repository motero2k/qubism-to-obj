const { writeFileSync } = require("fs");
const { Object3d, MultiObject3d } = require("./object");
const path = require("path");
const shapes = require(path.join(__dirname) + "/shapes.json");
function uptateShapesJsonFile(object3d, id) {
  shapes[id] = object3d;
  try {
    const jsonContent = JSON.stringify(shapes, null, 2)
      // remove the extra spaces in the json file
      .replace(/(\n(\s)+(\d|\-\d|\+\d))|(\n\s+\])/g, function (match) {
        return match.replace(/\n\s+/, "");
      });

    writeFileSync(path.join(__dirname) + "/shapes.json", jsonContent);
    console.log(`shapes.json updated`);
  } catch (err) {
    console.error(`Error writing shapes.json file: ${err}`);
  }
}

function exportObj(object3d, outputPath = "src/output/") {
  const filePath =
    outputPath + (object3d.name ?? "untiled-" + Date.now()) + ".obj";
  let objContent = "";
  let vertexAccumulator = 0;

  // Write object name ----------------------------------------------
  objContent += `o ${object3d.name}\n`;
  const vertices = object3d.vertices;
  const faces = object3d.faces;
  // Write vertices ----------------------------------------------
  vertices.forEach((vertex) => {
    objContent += `v ${vertex.join(" ")}\n`;
  });

  // Write faces ----------------------------------------------
  faces.forEach((face) => {
    //the index in the face array is 0-based, but OBJ format is 1-based
    const indices = face
      .map((index) => index + 1 + vertexAccumulator)
      .join(" ");
    objContent += `f ${indices}\n`;
  });
  // verices dont start at 0 for each object,
  vertexAccumulator += vertices.length;

  // Write content to file
  try {
    writeFileSync(filePath, objContent);
    console.log(`OBJ file saved to ${filePath}`);
  } catch (err) {
    console.error(`Error writing OBJ file: ${err}`);
  }
}
/**
 * Exports a multiObject to a .obj file
 * @param {MultiObject3d[]} multiObject - The multiObject to export
 * @param {string} multiObject.name - The name of the multiObject
 * @param {Object3d[]} multiObject.subObjects - The subObjects of the multiObject
 */
function exportMultiObj(multiObject, outputPath = "src/output/") {
  const filePath =
    outputPath + (multiObject.name ?? "untiled-" + Date.now()) + ".obj";
  let objContent = "";
  let vertexAccumulator = 0;
  const object3DParts = multiObject.subObjects ?? [];
  for (let objectIndex = 0; objectIndex < object3DParts.length; objectIndex++) {
    const object3Dpart = object3DParts[objectIndex];
    // Write object name ----------------------------------------------
    objContent += `o ${object3Dpart.name}\n`;
    const vertices = object3Dpart.vertices;
    const faces = object3Dpart.faces;
    // Write vertices ----------------------------------------------
    vertices.forEach((vertex) => {
      objContent += `v ${vertex.join(" ")}\n`;
    });

    // Write faces ----------------------------------------------
    faces.forEach((face) => {
      //the index in the face array is 0-based, but OBJ format is 1-based
      const indices = face
        .map((index) => index + 1 + vertexAccumulator)
        .join(" ");
      objContent += `f ${indices}\n`;
    });
    // verices dont start at 0 for each object,
    vertexAccumulator += vertices.length;
  }
  // Write content to file
  try {
    writeFileSync(filePath, objContent);
    console.log(`OBJ file saved to ${filePath}`);
  } catch (err) {
    console.error(`Error writing OBJ file: ${err}`);
  }
}

module.exports = { exportObj, exportMultiObj, uptateShapesJsonFile };

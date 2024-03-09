const { Object3d } = require("./main/object");
const { loadObj } = require("./main/objReader");
const {
  exportObj,
  exportMultiObj,
  uptateShapesJsonFile,
} = require("./main/objExporter");
const { readQubismJsonToMultiObject3D } = require("./main/qubismReader");
const path = require("path");
const shapes = require(path.join(__dirname, "main") + "/shapes.json");
const qubismScale = 1 / 256;

// ====== TRANSFORM QUBISM JSON TO OBJ =======
// read all files in src/input folder
const fs = require("fs");
const inputs = fs.readdirSync("src/input");
const outputs = fs.readdirSync("src/output");
inputs.forEach((file) => {
  if (file.includes(".json") && !outputs.includes(file.split(".")[0] + ".obj")){
    const filename = file.split(".")[0];
    const loadedQubismMultiObj3d = readQubismJsonToMultiObject3D(
      filename,
      qubismScale,
    );
    exportMultiObj(loadedQubismMultiObj3d);
  }
});


// let object3d = new Object3d();
// ================== READ ===================
// FROM SHAPES.JSON
// let shape = shapes[263]
// object3d.setShape(shape)

// FROM OBJ src/shapes folder
// object3d = loadObj("rounded-edge")

// ================== WRITE ==================

// TO SHAPES.JSON src/main/shapes.json
// uptateShapesJsonFile(object3d, 263)

// TO OBJ src/output/
// exportObj(object3d)

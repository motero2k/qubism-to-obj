const { loadObj } = require("./main/objReader");
const { exportObj } = require("./main/objExporter");
const { readQubismJsonToMultiObject3D } = require("./main/qubismReader");

const qubismScale = 1/256
const loadedQubismMultiObj3d = readQubismJsonToMultiObject3D("data",qubismScale);

// let obj = loadObj(287)
//     // .setName("ramp")
//     .translate([-0.5,-0.5,-0.5])
// let cube = loadObj("cube");

// exportObj([obj,obj.copy().rotate([0,0,90]),obj.copy().rotate([0,0,180])], "output.obj");
exportObj(loadedQubismMultiObj3d)



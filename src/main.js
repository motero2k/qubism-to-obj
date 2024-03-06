const { loadObj } = require("./main/objReader");
const { exportObj , exportMultiObj} = require("./main/objExporter");
const { readQubismJsonToMultiObject3D } = require("./main/qubismReader");

const qubismScale = 1/256
const loadedQubismMultiObj3d = readQubismJsonToMultiObject3D("axis and complex shape",qubismScale);
exportMultiObj(loadedQubismMultiObj3d)

// let ramp = loadObj("ramp")
// .changeAxis(431)
// .setName("ramp_test")

// exportObj(ramp)



const { loadObj } = require("./main/objReader");
const { exportObj } = require("./main/objExporter");
const { readQubismJsonToMultiObject3D } = require("./main/qubismReader");

const qubismScale = 1/256
const loadedQubismMultiObj3d = readQubismJsonToMultiObject3D("axis and complex shape",qubismScale);
exportObj(loadedQubismMultiObj3d)

// let ramp = loadObj("ramp").rotate([0,0,-90]).setName("ramp_test")

// exportObj(ramp)



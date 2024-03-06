const { loadObj } = require("./main/objReader");
const { exportObj } = require("./main/objExporter");
const { readQubismJsonToMultiObject3D } = require("./main/qubismReader");

const qubismScale = 1/256
const loadedQubismMultiObj3d = readQubismJsonToMultiObject3D("data",qubismScale);


let ramp = loadObj("ramp")

exportObj(ramp)



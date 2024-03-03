const { loadObj: readObj } = require("./objReader");
const { exportObj } = require("./objExporter");
const { readQubismJsonToObjects3D } = require("./qubismReader");

const qubismScale = 1/256
const qubismObjects3D = readQubismJsonToObjects3D("data.json",qubismScale);

exportObj(qubismObjects3D, "output.obj");

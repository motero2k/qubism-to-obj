const fs = require("fs");
const { MultiObject3d, Object3d } = require("./object");
const path = require("path");
const shapes = require(path.join(__dirname) + "/shapes.json");
function readQubismJsonToMultiObject3D(filename, scale = 1 / 256) {
  try {
    const data = fs.readFileSync(`src/input/${filename}.json`, "utf8");
    const qubismData = JSON.parse(data);
    const multiObject3D = new MultiObject3d(filename);
    qubismData.qubes.forEach((qube) => {
      if (!shapes[qube.shape]) {
        console.error(
          `Shape ${qube.shape} not found in shapes folder using default cube.`,
        );
        qube.shape = 255;
      }
      const shape = shapes[qube.shape]; //shapes are contined in a 1x1x1 unit cube
      const object3d = new Object3d(shape.name, shape.vertices, shape.faces) //shape centered at 0,0,0
        .changeAxis(qube.orient) //shapes can be oriented in 24 different ways
        .translate([0.5, 0.5, 0.5]) //takes the cube to positive quadrant
        .scale([qube.size_x * scale, qube.size_y * scale, qube.size_z * scale]) //scaling in the positive direction
        .translate([-0.5, -0.5, -0.5]) // return to original position (maybe is taller or wider now)
        .translate([
          qube.pos_x * scale,
          qube.pos_y * scale,
          qube.pos_z * scale,
        ]); //move to the final position
      multiObject3D.subObjects.push(object3d);
    });
    return multiObject3D;
  } catch (err) {
    console.error("Error reading Qubism JSON:", err);
  }
}

module.exports = { readQubismJsonToMultiObject3D };

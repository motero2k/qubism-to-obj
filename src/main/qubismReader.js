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
      qube.size_x = qube.size_x * scale;
      qube.size_y = qube.size_y * scale;
      qube.size_z = qube.size_z * scale;
      qube.pos_x = qube.pos_x * scale;
      qube.pos_y = qube.pos_y * scale;
      qube.pos_z = qube.pos_z * scale;
      const shape = shapes[qube.shape]; //all shapes are contained in a 1x1x1 unit cube (bounding box)
      const object3d = new Object3d(shape.name, shape.vertices, shape.faces) //shape centered at 0,0,0
        .changeAxis(qube.orient) //shapes can be oriented in 24 different ways, this function changes the axis order to match the orientation.
        // SCALING
        .translate([0.5, 0.5, 0.5]) //takes the cube to positive quadrant
        .scale([qube.size_x, qube.size_y, qube.size_z]) //scaling in the positive direction
        // TRANSLATION
        object3d.translate([qube.pos_x,qube.pos_y,qube.pos_z,]); //move to the final position
        // ROTATION
        if(qube.rot_axis != undefined && qube.rot_angle != undefined) {
          qube.rot_x = qube.rot_x * scale;
          qube.rot_y = qube.rot_y * scale;
          qube.rot_z = qube.rot_z * scale;  
          const rot_vector = [0, 0, 0];
            rot_vector[qube.rot_axis] =  -qube.rot_angle;
            console.log("Rotation detected", rot_vector);
            object3d.setName(shape.name + "-"+qube.orient)
            object3d.translate([-qube.rot_x, -qube.rot_y  , -qube.rot_z]); //moves the rotation axis (one of the edges of the bounding box) to one of the origin axis
            object3d.rotate(rot_vector) 
            object3d.translate([+qube.rot_x, +qube.rot_y , +qube.rot_z]); //moves back to the final position
        }

      multiObject3D.subObjects.push(object3d);
    });
    return multiObject3D;
  } catch (err) {
    console.error("Error reading Qubism JSON:", err);
  }
}

module.exports = { readQubismJsonToMultiObject3D };

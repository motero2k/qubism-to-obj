const { transpose, matrix, multiply, sin, cos, pi, round } = require('mathjs');

class Object3d {

    constructor(name="untitled",vertices=[], faces=[]) {
        this.name = name ?? "untitled";
        this.vertices = vertices
        this.faces = faces;
    }
    transform(scalingV=[1,1,1],transationV=[0,0,0]){
        const transformMatrix = matrix([
            [scalingV[0],0,0,transationV[0]],
            [0,scalingV[1],0,transationV[1]],
            [0,0,scalingV[2],transationV[2]],
            [0,0,0,1]
        ]);
        const vertices = this.vertices.map(vertex=> {
            let vertexCopy = [...vertex];
            if(vertex.length<4) vertexCopy.push(1);//if vertex is not homogeneus
            return vertexCopy
        })
        const verticesMatrix = transpose(matrix(vertices))
        const newVertices = transpose(multiply(transformMatrix,verticesMatrix)).toArray()
        this.vertices = round(newVertices, 8);
        return this;
    }
    scale(scalingV=[1,1,1]){
        this.transform(scalingV);
        return this;
    }
    translate(transationV=[0,0,0]){
        this.transform([1,1,1],transationV);
        return this;
    }
    rotate(rotationV=[0,0,0]){
        const alpha=rotationV[0]*pi/180;
        const beta=rotationV[1]*pi/180;
        const gamma=rotationV[2]*pi/180;
        // Calculate the elements of the rotation matrix
        const cosA = cos(alpha);
        const sinA = sin(alpha);
        const cosB = cos(beta);
        const sinB = sin(beta);
        const cosY = cos(gamma);
        const sinY = sin(gamma);

        const rotationMatrix = matrix([
        [cosB * cosY    ,    sinA * sinB * cosY - cosA * sinY   ,   cosA * sinB * cosY + sinA * sinY, 0],
        [cosB * sinY    ,    sinA * sinB * sinY + cosA * cosY   ,   cosA * sinB * sinY - sinA * cosY, 0],
        [-sinB          ,    sinA * cosB                        ,   cosA * cosB,                      0],
        [0              ,    0                                  ,   0,                                1]
        ]);

        const vertices = this.vertices.map(vertex=> {
            let vertexCopy = [...vertex];
            if(vertex.length<4) vertexCopy.push(1);//if vertex is not homogeneus
            return vertexCopy
        })
        const verticesMatrix = transpose(matrix(vertices))
        const newVertices = transpose(multiply(rotationMatrix,verticesMatrix)).toArray()
        this.vertices = round(newVertices, 8);
        return this;
    }
    copy(){
        return new Object3d(this.name,this.vertices,this.faces);
    }
    setName(name){
        this.name = name;
        return this;
    }
    createFromShape(shape){
        return new Object3d(shape.name,shape.vertices,shape.faces);
    }
    changeAxis(orient){
        if(orient == -1) return this;
        console.log("orient",orient)
        const paddedOrient = String(orient).padStart(3,"0")
        const getNewAxis = (oldAxisId) => {
            // x=0,y=2,z=4 means negative
            // x=1,y=3,z=5 means positive
            const negativeAxis = paddedOrient.indexOf(oldAxisId)
            const positiveAxis = paddedOrient.indexOf(oldAxisId+1)
            if(negativeAxis!=-1) return {oldIndex: negativeAxis, sign: -1}
            else return {oldIndex: positiveAxis, sign: 1}
        }
        let newXaxis = getNewAxis(0)
        let newYaxis = getNewAxis(2)
        let newZaxis = getNewAxis(4)
        const oldVectors= transpose(this.vertices)
        const newVectors= [
            oldVectors[newXaxis.oldIndex].map(x=>x*newXaxis.sign),
            oldVectors[newYaxis.oldIndex].map(y=>y*newYaxis.sign),
            oldVectors[newZaxis.oldIndex].map(z=>z*newZaxis.sign),
            oldVectors[3]
        ]
    
        this.vertices = transpose(newVectors)
        return this;
    }

}
class MultiObject3d {
    constructor(name="unitled-object",subObjects=[]){
        this.name = name;
        this.subObjects = subObjects;
    }
    setName(name){
        this.name = name;
        return this;
    }
    getPart(index) {
        return this.subObjects[index];
    }
    translate(transationV=[0,0,0]){
        this.subObjects.forEach(subObject => {
            subObject.translate(transationV);
        });
        return this;
    }
    scale(scalingV=[1,1,1]){
        this.subObjects.forEach(subObject => {
            subObject.scale(scalingV);
        });
        return this;
    }
    rotate(rotationV=[0,0,0]){
        this.subObjects.forEach(subObject => {
            subObject.rotate(rotationV);
        });
        return this;
    }

}
module.exports = { Object3d , MultiObject3d};
const { transpose, matrix, multiply, sin, cos, pi } = require('mathjs');
class Object3d {

    constructor(vertices=[], faces=[], name="untitled-part") {
        this.vertices = vertices
        this.faces = faces;
        this.name = name ?? "untitled-part";
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
        this.vertices = transpose(multiply(transformMatrix,verticesMatrix)).toArray()
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
        this.vertices = transpose(multiply(rotationMatrix,verticesMatrix)).toArray()
        return this;
    }
    copy(){
        return new Object3d(this.vertices,this.faces);
    }
    setName(name){
        this.name = name;
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
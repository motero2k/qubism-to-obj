const math = require('mathjs'); // Assuming you're using math.js library

class Object3d {

    constructor(vertices=[], faces=[]) {
        this.vertices = vertices
        this.faces = faces;
    }
    transform(scalingV=[1,1,1],transationV=[0,0,0]){
        const transformMatrix = math.matrix([
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
        const verticesMatrix = math.transpose(math.matrix(vertices))
        this.vertices = math.transpose(math.multiply(transformMatrix,verticesMatrix)).toArray()
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
    copy(){
        return new Object3d(this.vertices,this.faces);
    }
}

module.exports = { Object3d };
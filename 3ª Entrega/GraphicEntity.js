class GraphicEntity extends THREE.Object3D {
    constructor(x, y, z, materials, name) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.materials = materials;
        this.name = name;
    }

    updatePosition(dx, dy, dz){
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
    }

    updatePosition(vector, delta){
        vector.divideScalar(vector.length());
        this.position.x += vector.x * delta;
        this.position.y += vector.y * delta;
        this.position.z += vector.z * delta;
    }

    createSquare(x,y,z,width,length){
        var vertices = [new THREE.Vector3(x,y,z),
                        new THREE.Vector3(x+width,y,z),
                        new THREE.Vector3(x+width,y,z+length),
                        new THREE.Vector3(x,y,z+length)];

        var geometry = new THREE.Geometry();
        geometry.vertices.push(vertices[0],vertices[1],vertices[2],vertices[3]);
        geometry.faces.push(new THREE.Face3(0,1,2));
        geometry.faces.push(new THREE.Face3(0,2,3));
        return geometry
    }
    createPlane(x,y,z,width,length,verticalSegments,horizontalSegments){
        var squares = [];
        for (var i=0; i<horizontalSegments; i++){
            for (var j=0; j<verticalSegments; j++){
                squares.push(this.createSquare(i*length/horizontalSegments,
                                              y,
                                              j*width/verticalSegments,
                                              width/verticalSegments,
                                              length/horizontalSegments));
                console.log("Creating Square at ",i*length/horizontalSegments,y,j*width/verticalSegments);
            }
        }
        var geometry = new THREE.Geometry();
        for (var i=0; i < squares.length; i++){
            geometry.vertices.push(squares[i].vertices[0],squares[i].vertices[1],squares[i].vertices[2],squares[i].vertices[3])
            geometry.faces.push(new THREE.Face3(i*4,i*4+2,i*4+1));
            geometry.faces.push(new THREE.Face3(i*4,i*4+3,i*4+2));
        }
        return geometry;

    }
}

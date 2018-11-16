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

    addMaterial(material){
        this.materials.push(material);
    }

    createCustomCylinder(x,y,z,radii,radialSegments){
        var geometry = new THREE.Geometry();
        for (var i = 0; i<radii.length; i++){
            for (var angle = 0; angle<2*Math.PI; angle += (2*Math.PI)/radialSegments){
                geometry.vertices.push(new THREE.Vector3(x + radii[i][1]*Math.cos(angle),
                                                        y + radii[i][1]*Math.sin(angle),
                                                        z +radii[i][0]));
                // geometry.vertices.push(new THREE.Vector3(x + radii[i][1]*angle,
                //                                         0,
                //                                         radii[i][0]));
            }
        }
        for (var i = 0; i< radii.length-1; i++){
            for(var j = 0; j < radialSegments; j++){
                geometry.faces.push(new THREE.Face3(radialSegments*i+j,
                                                    radialSegments*i+((j+1)%radialSegments),
                                                    radialSegments*(i+1)+((j+1)%radialSegments)));
                geometry.faces.push(new THREE.Face3(radialSegments*i+j,
                                                    radialSegments*(i+1)+((j+1)%radialSegments),
                                                    radialSegments*(i+1)+j));
            }
        }
        return geometry;
    }

    createTriangle(x,y,z,width, length){
        var vertices = [new THREE.Vector3(x,y,z),
                        new THREE.Vector3(x+width,y,z+length),
                        new THREE.Vector3(x,y,z+length)];

        var geometry = new THREE.Geometry();
        geometry.vertices.push(vertices[0],vertices[1],vertices[2]);
        geometry.faces.push(new THREE.Face3(0,2,1));
        return geometry;
    }

    createSquare(x,y,z,width,length){
        var vertices = [new THREE.Vector3(x,y,z),
                        new THREE.Vector3(x+width,y,z),
                        new THREE.Vector3(x+width,y,z+length),
                        new THREE.Vector3(x,y,z+length)];

        var geometry = new THREE.Geometry();
        geometry.vertices.push(vertices[0],vertices[1],vertices[2],vertices[0],vertices[2],vertices[3]);
        geometry.faces.push(new THREE.Face3(0,2,1));
        geometry.faces.push(new THREE.Face3(3,5,4));
        return geometry
    }
    createPlane(x,y,z,width,length,widthSegments,lengthSegments){
        var squares = [];
        for (var i=0; i<lengthSegments; i++){
            for (var j=0; j<widthSegments; j++){
                squares.push(this.createSquare(x + j*width/widthSegments,
                                              y,
                                              z + i*length/lengthSegments,
                                              width/widthSegments,
                                              length/lengthSegments));
                console.log("Creating Square at ",i*length/lengthSegments,y,j*width/widthSegments);
            }
        }
        var geometry = new THREE.Geometry();
        for (var i=0; i < squares.length; i++){
            geometry.vertices.push(squares[i].vertices[0],
                                    squares[i].vertices[1],
                                    squares[i].vertices[2],
                                    squares[i].vertices[3],
                                    squares[i].vertices[4],
                                    squares[i].vertices[5]);
            geometry.faces.push(new THREE.Face3(i*6,i*6+2,i*6+1));
            geometry.faces.push(new THREE.Face3(i*6+3,i*6+5,i*6+4));
        }
        return geometry;

    }

    createTrianglePlane(x,y,z,width,length,widthSegments,lengthSegments){
        var parts = []
        for (var i=0; i<lengthSegments; i++){
            for (var j=0; j<widthSegments; j++){
                if(i==j){
                    parts.push(this.createTriangle( x + j * width / widthSegments,
                                                    y,
                                                    z + i * length / lengthSegments,
                                                    width/widthSegments,
                                                    length/lengthSegments));
                }
                else if(i > j){
                    parts.push(this.createSquare(x + j * width / widthSegments,
                                                 y,
                                                 z + i * length / lengthSegments,
                                                 width/widthSegments,
                                                 length/lengthSegments));
                }
            }
        }
        var geometry = new THREE.Geometry();
            for (var i=0; i < parts.length; i++){
                for(var j = 0; j < parts[i].faces.length; j++){
                    /*console.log("creating triangle with ",parts[i].vertices[0+j*3],
                                            parts[i].vertices[1+j*3],
                                            parts[i].vertices[2+j*3]);*/
                    var verticeIndex = geometry.vertices.length;
                    geometry.vertices.push(parts[i].vertices[0+j*3],
                                            parts[i].vertices[1+j*3],
                                            parts[i].vertices[2+j*3]);
                    geometry.faces.push(new THREE.Face3(verticeIndex,verticeIndex+2,verticeIndex+1));
            }
        }
        return geometry;
    }
}

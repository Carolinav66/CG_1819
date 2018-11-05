class Rotor extends GraphicEntity{
    constructor(x, y, z, materials) {
        'use strict';

        super(x, y, z,materials,
            "rotor");

        this.createRotor();

    }
    createRotor(){
        var radii =[[0,1.2],[0.1,1.2],[0.2,1.15],[0.3,1.05],[0.4,0.9],[0.5,0.75],[0.6,0.5],[0.7,0.2],[0.75,0]];
        var baseGeometry = this.createCustomCylinder(0,0,0, radii,16);
        var baseMesh = new THREE.Mesh(baseGeometry, this.materials[0]);
        this.add(baseMesh);
        var paddleGeometry=new THREE.Geometry();
        paddleGeometry.vertices.push(new THREE.Vector3(0,0,0));
        for(var i=1; i<5; i++){
            for(var angle=0; angle<=Math.PI; angle+=Math.PI/(20)){
                paddleGeometry.vertices.push(new THREE.Vector3(Math.cos(angle)*(0.5+Math.sin(angle)*2*i/5)*i/5,
                                                            Math.sin(angle)*7*i/5,
                                                            0));
            }
        }
        var radialSegments = 20;
        for (var j = 0; j < radialSegments; j++){
            paddleGeometry.faces.push(new THREE.Face3(0,j+1,j+2))
        }
        for(var i = 1; i<4; i++){
            for(var j=0; j<radialSegments; j++){
                paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+2));
                paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+2,
                                                (i-1)*(radialSegments+1)+j+2));
            }
        }

        var paddle1Mesh = new THREE.Mesh(paddleGeometry, this.materials[0]);
        var paddle2Mesh = new THREE.Mesh(paddleGeometry, this.materials[0]);
        paddle1Mesh.rotation.y+=0.3;
        paddle2Mesh.rotation.y-=0.3;
        paddle2Mesh.rotation.z+=Math.PI;

        this.add(paddle1Mesh);
        this.add(paddle2Mesh);
    }

    rotateRotor(delta){
        this.rotation.z+=50*delta;
    }
}

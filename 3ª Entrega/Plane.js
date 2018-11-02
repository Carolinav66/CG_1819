class Plane extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            [new THREE.MeshBasicMaterial({ color: 0xc56836 /*0xff09e5*/, wireframe: false })],
            "field");

        this.createWing();

    }

    createWing(){
        var vertices = [new THREE.Vector3(0,0,0),
                        new THREE.Vector3(0,0,40),
                        new THREE.Vector3(9,0,37),
                        new THREE.Vector3(10,0,0)]

        var geometry = new THREE.Geometry();
        geometry.vertices.push(vertices[0],vertices[1],vertices[2],vertices[3]);
        geometry.faces.push(new THREE.Face3(0,1,2));
        geometry.faces.push(new THREE.Face3(0,2,3));
        var mesh = new THREE.Mesh(geometry, this.materials[0]);
        this.add(mesh);
    }
}

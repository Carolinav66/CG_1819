class mesa extends GraphicEntity {
    constructor(x, y, z) {
        this.object = new THREE.Object3D();
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addTableTop() {
        'use strict';
        geometry = new THREE.CubeGeometry(60, 2, 20);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.object.add(mesh);
    }

}

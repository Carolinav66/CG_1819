class Lamp extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xffff00 , wireframe: true }),
            "lamp");

        this.addLampBottom(0, 0, 0);
        this.addLampMiddle(0, 0, 0);
        this.addLampTop(0, 0, 0);
    }

    addLampBottom(x, y, z) {
        'use strict';
      
        var geometry = new THREE.ConeGeometry(6, 50, 15);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 , wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }
      
    addLampMiddle(x, y, z) {
        'use strict';

        var geometry = new THREE.SphereGeometry(5, 10, 10);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff , wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y + 17, z);
        this.add(mesh);
    }
      
    addLampTop(x, y, z) {
        'use strict';

        var geometry = new THREE.CylinderGeometry(6, 6, 7, 15);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 , wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y + 25, z);
        this.add(mesh);
    }
}
class SpotLight extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({color: 0xffff00}),
            "spotlight");

        this.addSpotLightBase(0, 0, 0);
        this.addBulb(0, 0, 0);
        
        this.light = new THREE.SpotLight(0xffffff);
        this.add(this.light);
    }

    toggleLight() {
        this.light.intensity = this.light.intensity ? 0 : 1
    }

    addSpotLightBase(x, y, z) {
        'use strict';
      
        var geometry = new THREE.ConeGeometry(1.5, 5, 15);
        var material = new THREE.MeshBasicMaterial({color: 0x462302});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y + 2.5, z);
        this.add(mesh);
    }
      
    addBulb(x, y, z) {
        'use strict';

        var geometry = new THREE.SphereGeometry(1, 10, 10);
        var material = new THREE.MeshBasicMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

}
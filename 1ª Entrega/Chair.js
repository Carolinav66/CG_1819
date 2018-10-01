class Chair /*extends GraphicEntity*/ {
    constructor(x, y, z) {
        'use strict';

        this.object = new THREE.Object3D();
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.object.position.x = x;
        this.object.position.y = y;
        this.object.position.z = z;

        this.addChairSeat(0, 0, 0);
        this.addChairBack(0, 10, 10);
        this.addChairLeg(0, -10, 0);
        this.addChairFoot1(0, -20, 7);
        this.addChairFoot1(0, -20, -7);
        this.addChairFoot2(7, -20, 0);
        this.addChairFoot2(-7, -20, 0);
        this.addWheels(0, -22, 15);
        this.addWheels(0, -22, -15);
        this.addWheels(15, -22, 0);
        this.addWheels(-15, -22, 0);
    }

    addChairSeat(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 2, 20);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.object.add(mesh);
    }

    addChairLeg(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(2, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.object.add(mesh);
    }

    addChairBack(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.object.add(mesh);
    }
    
    addChairFoot1(x, y, z){
      'use strict';
    
      var geometry = new THREE.CubeGeometry(2, 2, 15);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.object.add(mesh);
    }
    
    addChairFoot2(x, y, z){
      'use strict';
      
      var geometry = new THREE.CubeGeometry(15, 2, 2);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.object.add(mesh);
    }
    
    addWheels(x, y, z) {
      'use strict';
      var geometry = new THREE.TorusGeometry(2, 1, 10, 10);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.object.add(mesh);
    }


}
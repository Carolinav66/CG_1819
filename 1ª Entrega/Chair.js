class Chair extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super();

        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.name = "chair";
        this.decelerating = false;
        this.acceleration = 0;
        this.velocity = 0;
        this.angle = 0;

        this.addChairSeat(0, 0, 0);
        this.addChairBack(0, 10, 10);
        this.addChairLeg(0, -10, 0);
        this.addChairFoot1(0, -20, 7);
        this.addChairFoot1(0, -20, -7);
        this.addChairFoot2(7, -20, 0);
        this.addChairFoot2(-7, -20, 0);
        this.addWheel(0, -22, 15);
        this.addWheel(0, -22, -15);
        this.addWheel(15, -22, 0);
        this.addWheel(-15, -22, 0);
    }

    changeSpeed(clock) {
        'use strict';

        console.log(this.velocity);
        var delta = clock.getDelta();
        var v_0 = this.velocity;
        this.velocity += this.acceleration * delta;
        if (this.decelerating && Math.abs(this.velocity) <= 0.5) {
            this.acceleration = 0;
            this.velocity = 0;
        }
        var x = v_0 * delta - 0.5 * this.acceleration * delta * delta;
        this.translateZ(-x);
    }

    rotateChair(){
        'use strict';

        this.rotateY(this.angle);
    }

    addChairSeat(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 2, 20);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairLeg(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(2, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairBack(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairFoot1(x, y, z){
      'use strict';

      var geometry = new THREE.CubeGeometry(2, 2, 15);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.add(mesh);
    }

    addChairFoot2(x, y, z){
      'use strict';

      var geometry = new THREE.CubeGeometry(15, 2, 2);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.add(mesh);
    }

    addWheel(x, y, z) {
      'use strict';

      var geometry = new THREE.TorusGeometry(2, 1, 10, 10);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.add(mesh);
    }
}

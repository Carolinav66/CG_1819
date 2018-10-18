class Ball extends GraphicEntity {
    constructor(x, y, z,radius,id) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xaedfff, wireframe: true }),
            "ball"+id);
        this.radius = radius;
        var angle = Math.random()*2*Math.PI;
        this.velocity = new THREE.Vector3(1,0,0);
        this.addBall(x,y,z,angle);
    }

    addBall(x,y,z,angle){
        'use strict';
        var axis = new THREE.AxisHelper(6);
        var geometry = new THREE.SphereGeometry(this.radius, 15, 15);
        var mesh = new THREE.Mesh(geometry, this.material);
        this.rotation.y=angle
        this.add(mesh);
        this.add(axis);
    }

    ballColiding(ball){
        'use strict';
        var distance = Math.sqrt((this.position.x-ball.position.x)*(this.position.x-ball.position.x)
            +(this.position.y-ball.position.y)*(this.position.y-ball.position.y)
            +(this.position.z-ball.position.z)*(this.position.z-ball.position.z));
        if (distance < this.radius*2){
            return true;
        } else {
            return false;
        }
    }

    updateBall(delta){
        var x = delta*1
        this.translateOnAxis(this.velocity, x);
    }
}

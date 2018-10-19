class Ball extends GraphicEntity {
    constructor(x, y, z,radius,id) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xaedfff, wireframe: true }),
            "ball"+id);
        this.radius = radius;
        var angle = Math.random()*2*Math.PI;
        this.addBall(x,y,z,angle);
        this.velocity = new THREE.Vector3(Math.cos(angle),0,Math.sin(angle));
    }

    addBall(x,y,z,angle){
        'use strict';
        var axis = new THREE.AxisHelper(6);
        var geometry = new THREE.SphereGeometry(this.radius, 15, 15);
        var mesh = new THREE.Mesh(geometry, this.material);
        this.rotation.y=angle;
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
        var x = delta*Math.PI*2;
        this.updatePosition(this.velocity,x);
        for (var i = 0; i < this.children.length; i++) {
            //console.log(this.children[i]," is mesh? ",this.children[i].isMesh)
            if (this.children[i] instanceof THREE.Mesh) {
                console.log("ROLANDO")
                this.children[i].rotation.z+=-delta;
            }
        }
    }
}

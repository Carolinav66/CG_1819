class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.aspect = [window.innerWidth, window.innerHeight];
        this.ratio = window.innerWidth / window.innerHeight;

        this.camaraPos = [0, 75, 0];
        this.changeCamara = false;
        this.toggleWireframe = false;
      }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        var table = new Table(0, 5, 0);  //chao: -25
        this.scene.add(table);
        var lamp = new Lamp(40, 0, 0);   //chao: -25
        this.scene.add(lamp);
        var chair = new Chair(0, 0, 20); //chao: -25
        this.scene.add(chair);
    }

    createCamera() {
        'use strict';

        var aspectConstant = 50;

        this.camera = new THREE.OrthographicCamera(-aspectConstant * this.ratio,
                                                    aspectConstant * this.ratio,
                                                    aspectConstant,
                                                   -aspectConstant,
                                                    1,
                                                    1000);
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);

    }

    changeCameraPosition() {
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);

    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 65: //A
            case 97: //a
                this.toggleWireframe = true;
                break;

            case 49: //1
                this.camaraPos = [0, 75, 0];
                this.changeCamara = true;
                break;

            case 50: //2
                this.camaraPos = [75, 0, 0];
                this.changeCamara = true;
                break;

            case 51: //3
                this.camaraPos = [0, 0, 75];
                this.changeCamara = true;
                break;

            case 37: //esquerda
                this.scene.getObjectByName("chair").angle = 1/100 * Math.PI;
                break;

            case 38: // cima
                this.scene.getObjectByName("chair").acceleration = 5;
                this.scene.getObjectByName("chair").decelerating = false;
                break;

            case 39: // direita
                this.scene.getObjectByName("chair").angle = -1/100 * Math.PI;
                break;

            case 40: // baixo
                this.scene.getObjectByName("chair").acceleration = -5;
                this.scene.getObjectByName("chair").decelerating = false;
                break;

            default:
                break;
        }
    }

    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 37: //esquerda
                this.scene.getObjectByName("chair").angle = 0;
                break;

            case 38: // cima
            case 40: // baixo
                if (this.scene.getObjectByName("chair").velocity >= 0) {
                    this.scene.getObjectByName("chair").acceleration = -5;
                } else {
                    this.scene.getObjectByName("chair").acceleration = 5;
                }
                this.scene.getObjectByName("chair").decelerating = true;
                break;

            case 39: // direita
                this.scene.getObjectByName("chair").angle = 0;
                break;

            default:
                break;
        }
    }

    onResize() {
        'use strict';

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        //novo aspect
        var newRatio = window.innerWidth / window.innerHeight;
        var aspectConstant = 50;

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.left = -aspectConstant * newRatio;
            this.camera.right = aspectConstant * newRatio;
            this.camera.top = aspectConstant;
            this.camera.bottom = -aspectConstant;
            this.camera.updateProjectionMatrix();
        }

    }

    render() {
        'use strict';

        this.renderer.render(this.scene, this.camera);
    }

    init() {
        'use strict';

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.createScene();
        this.createCamera(); //50, 50, 50

        this.render();

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        if (this.changeCamara) {
            this.changeCameraPosition();
            this.changeCamara = false;
            this.onResize();
        }

        if (this.toggleWireframe) {
            this.scene.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                    console.log("pi");
                }
            });
            this.toggleWireframe = false;
        }

        this.scene.getObjectByName("chair").changeSpeed(this.clock);
        this.scene.getObjectByName("chair").rotateChair();

        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}

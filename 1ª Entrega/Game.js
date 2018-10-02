class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();
        
    }

    createScene() {
        'use strict';
    
        this.scene = new THREE.Scene();
    
        this.scene.add(new THREE.AxisHelper(10));
    
        var table = new Table(0, 5, 0);  //chao: -25
        this.scene.add(table);
        var lamp = new Lamp(40, 0, 0);   //chao: -25
        this.scene.add(lamp);
        var chair = new Chair(0, 0, 20); //chao: -25
        this.scene.add(chair);
    }
    
    createCamera(x, y, z) {
        'use strict';
        this.camera = new THREE.PerspectiveCamera(70,
                                             window.innerWidth / window.innerHeight,
                                             1,
                                             1000);
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    
        this.camera.lookAt(this.scene.position);
    
    }
    
    onKeyDown(e) {
        'use strict';
    
        switch (e.keyCode) {
            case 65: //A
            case 97: //a
                this.scene.traverse(function (node) {
    
                    if (node instanceof THREE.Mesh) {
                        node.material.wireframe = !node.material.wireframe;
                    }
                });
                break;
    
            case 49: //1
                this.createCamera(0, 75, 0);
                this.controls = new THREE.OrbitControls(this.camera);
                break;
            case 50: //2
                this.createCamera(75, 0, 0);
                this.controls = new THREE.OrbitControls(this.camera);
                break;
            case 51: //3
                this.createCamera(0, 0, 75);
                this.controls = new THREE.OrbitControls(this.camera);
                break;
    
            case 37: //esquerda
                startMoveLeft();
                break;
            case 38: // cima
                console.log("up");
                this.scene.getObjectByName("chair").acceleration = 5;
                break;
            case 39: // direita
                startMoveRight();
                break;
            case 40: // baixo
                console.log("down");
                this.scene.getObjectByName("chair").acceleration = -5;
                break;
            default:
                break;
        }
    }
    
    onKeyUp(e) {
        'use strict';
    
        switch (e.keyCode) {
            case 37: //esquerda
                stopMoveLeft();
                break;
            case 38: // cima
                this.scene.getObjectByName("chair").acceleration = -5;
                break;
            case 39: // direita
                stopMoveRight();
                break;
            case 40: // baixo
                this.scene.getObjectByName("chair").acceleration = 5;
                break;
            default:
                break;
        }
    }
    
    onResize() {
        'use strict';
    
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
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
        this.createCamera(50,50,50);
    
        this.controls = new THREE.OrbitControls(this.camera);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }
    
    animate() {
        this.scene.getObjectByName("chair").changeSpeed(this.clock);

        this.render();
        this.controls.update();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
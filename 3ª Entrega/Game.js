class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.camaraPos = [50, 50, 50];

        this.airplaneRoll = 0;
        this.airplanePitch = 0;

        this.spotlights = new Array(4);
        this.toggleLights = [false, false, false, false];
        this.materials = new Array(6);

        this.toggleBasic = false;
        this.toggleMaterials = false;

    } 


    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        this.sun = new THREE.DirectionalLight();
        this.scene.add(this.sun);

        this.airplane = new AirPlane(0, 0, 0);
        this.scene.add(this.airplane);

        this.spotlights[0] = new SpotLight(10, 12, 10);
        this.spotlights[0].rotation.x = Math.PI / 4;
        this.spotlights[0].rotation.z = -Math.PI / 4;

        this.spotlights[1] = new SpotLight(-10, 12, 10);
        this.spotlights[1].rotation.x = Math.PI / 4;
        this.spotlights[1].rotation.z = Math.PI / 4;

        this.spotlights[2] = new SpotLight(10, 12, -10);
        this.spotlights[2].rotation.x = -Math.PI / 4;
        this.spotlights[2].rotation.z = -Math.PI / 4;

        this.spotlights[3] = new SpotLight(-10, 12, -10);
        this.spotlights[3].rotation.x = -Math.PI / 4;
        this.spotlights[3].rotation.z = Math.PI / 4;

        for (var i = 0; i < 4; i++) {
            this.scene.add(this.spotlights[i]);
        }

        var axis = new THREE.AxisHelper(5);
        this.scene.add(axis);

    }

    createCamera() {
        'use strict';

        this.camera = new THREE.PerspectiveCamera(20,
                                                  window.innerWidth / window.innerHeight,
                                                  1,
                                                  1000);
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);
    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 37: //left
                this.airplaneRoll = -2;
                break;
            case 39: //right
                this.airplaneRoll = 2;
                break;
            case 38: //up
                this.airplanePitch = 2;
                break;
            case 40: //down
                this.airplanePitch = -2;
                break;

            case 49: //1
                this.toggleLights[0] = true;
                break;
            case 50: //2
                this.toggleLights[1] = true;
                break;
            case 51: //3
                this.toggleLights[2] = true;
                break;
            case 52: //4
                this.toggleLights[3] = true;
                break;

            case 78: //n
                this.sun.intensity = this.sun.intensity == 1 ? 0 : 1;
            case 71: //g
                this.toggleMaterials = true;
                break;
            case 76: //l
                this.toggleBasic = true;
                break;
            default:
                break;
            }
    }
    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 37:
                this.airplaneRoll = 0;
                break;
            case 39:
                this.airplaneRoll = 0;
                break;
            case 38:
                this.airplanePitch = 0;
                break;
            case 40:
                this.airplanePitch = 0;
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
        this.createCamera();
        this.controls = new THREE.OrbitControls(this.camera);

        this.onResize();
        this.render();
        this.controls.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        'use strict';

        for (var i = 0; i < this.toggleLights.length; i++) {
            if (this.toggleLights[i]) {
                this.spotlights[i].toggleLight();
                this.toggleLights[i] = false;
            }
        }

        if(this.toggleMaterials) {
            this.airplane.toggleMaterial();
            this.toggleMaterials = false;
        }

        if(this.toggleBasic) {
            this.airplane.toggleBasic();
            this.toggleBasic = false;
        }

        var delta = this.clock.getDelta();
        this.airplane.rotateRotor(delta);
        this.airplane.roll(delta, this.airplaneRoll);
        this.airplane.pitch(delta, this.airplanePitch);

        this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}

class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.orthoCameraAspectRatio = 16 / 9;
        this.orthoCameraWidth = 90; //65;
        this.orthoCameraHeight = this.orthoCameraWidth / this.orthoCameraAspectRatio;

        this.aspect = [window.innerWidth, window.innerHeight];
        this.ratio = window.innerWidth / window.innerHeight;

        this.camaraPos1 = [0, 0, 75];
        this.changeCamara = false;
        this.cameraNumber = 1;

        this.airplaneRoll = 0;
        this.airplanePitch = 0;


    }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        this.square1 = new Square(Math.random()*60-30,Math.random()*60-30,0,0x5070ff,0x2040dd);
        this.square2 = new Square(Math.random()*60-30,Math.random()*30-15,0,0x50ff70,0x20dd40);
        this.square3 = new Square(Math.random()*60-30,Math.random()*30-15,0,0xff7050,0xdd4020);
        this.scene.add(this.square1);
        this.scene.add(this.square2);
        this.scene.add(this.square3);
        // var axis = new THREE.AxisHelper(5);
        // this.scene.add(axis);

    }

    createCamera1() {
        'use strict';

        this.cameraNumber = 1;

        this.camera1 = new THREE.OrthographicCamera(-this.orthoCameraWidth / 2,
                                                    this.orthoCameraWidth / 2,
                                                    this.orthoCameraHeight / 2,
                                                    -this.orthoCameraHeight / 2,
                                                    1,
                                                    1000);
        this.camera1.position.x = this.camaraPos1[0];
        this.camera1.position.y = this.camaraPos1[1];
        this.camera1.position.z = this.camaraPos1[2];

        this.camera1.lookAt(this.scene.position);

    }

    // createCamera2() {
    //     'use strict';
    //
    //     this.cameraNumber = 2;
    //
    //     this.camera2 = new THREE.PerspectiveCamera(20,
    //                                               window.innerWidth / window.innerHeight,
    //                                               1,
    //                                               1000);
    //     this.camera2.position.x = this.camaraPos2[0];
    //     this.camera2.position.y = this.camaraPos2[1];
    //     this.camera2.position.z = this.camaraPos2[2];
    //
    //     this.camera2.lookAt(this.scene.position);
    // }



    changeCamera() {
        'use strict';

        if(this.cameraNumber == 1){
          this.camera = this.camera1;
        }

        // if(this.cameraNumber == 2){
        //   this.camera = this.camera2;
        // }

        this.changeCamara = false;
    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 65:  //A
            case 97: //a
                this.airplaneRoll = -2;
                break;

            case 68:  //D
            case 100: //d
                this.airplaneRoll = 2;
                break;

            case 87:  //W
            case 119: //w
                this.airplanePitch = 2;
                break;

            case 83:  //S
            case 115: //s
                this.airplanePitch = -2;
                break;

            case 49: //1
                this.cameraNumber = 1;
                this.changeCamara = true;
                break;

            // case 50: //2
            //     this.cameraNumber = 2;
            //     this.changeCamara = true;
            //     break;

            default:
                break;
        }
    }
    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 65:  //A
            case 97: //a
                this.airplaneRoll = 0;
                break;

            case 68:  //D
            case 100: //d
                this.airplaneRoll = 0;
                break;

            case 87:  //W
            case 119: //w
                this.airplanePitch = 0;
                break;

            case 83:  //S
            case 115: //s
                this.airplanePitch = 0;
                break;

            case 49: //1
                this.cameraNumber = 1;
                this.changeCamara = true;
                break;

            case 50: //2
                this.cameraNumber = 2;
                this.changeCamara = true;
                break;

            default:
                break;
        }
    }


    onResize() {
        'use strict';

        if(this.cameraNumber == 1){
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            var windowRatio = window.innerWidth / window.innerHeight;

            if(windowRatio > this.orthoCameraAspectRatio) {
                this.camera.left = -this.orthoCameraHeight * windowRatio / 2;
                this.camera.right = this.orthoCameraHeight * windowRatio / 2;
                this.camera.top = this.orthoCameraHeight / 2;
                this.camera.bottom = -this.orthoCameraHeight / 2;
            } else {
                this.camera.left = -this.orthoCameraWidth / 2;
                this.camera.right = this.orthoCameraWidth / 2;
                this.camera.top = (this.orthoCameraWidth / windowRatio) / 2;
                this.camera.bottom = -(this.orthoCameraWidth / windowRatio) / 2;
            }
            this.camera.updateProjectionMatrix();
        }

        if(this.cameraNumber == 2 || this.cameraNumber == 3) {

            this.renderer.setSize(window.innerWidth, window.innerHeight);

            if (window.innerHeight > 0 && window.innerWidth > 0) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
            }
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
        this.createCamera1(); //50, 50, 50
        //this.createCamera2();
        this.controls = new THREE.OrbitControls( this.camera1 );

        this.camera = this.camera1;
        this.cameraNumber = 1;

        this.s1Xrot = Math.random()*4-2;
        this.s2Xrot = Math.random()*4-2;
        this.s3Xrot = Math.random()*4-2;
        this.s1Yrot = Math.random()*4-2;
        this.s2Yrot = Math.random()*4-2;
        this.s3Yrot = Math.random()*4-2;
        this.s1Zrot = Math.random()*4-2;
        this.s2Zrot = Math.random()*4-2;
        this.s3Zrot = Math.random()*4-2;

        this.onResize();
        this.render();
        this.controls.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        'use strict';

        if (this.changeCamara) {
            this.changeCamera();
            this.changeCamara = false;
            this.onResize();
        }
        var delta = this.clock.getDelta();
        this.square1.rotateXaxis(this.s1Xrot*delta);
        this.square2.rotateXaxis(this.s2Xrot*delta);
        this.square3.rotateXaxis(this.s3Xrot*delta);
        this.square1.rotateYaxis(this.s1Yrot*delta);
        this.square2.rotateYaxis(this.s2Yrot*delta);
        this.square3.rotateYaxis(this.s3Yrot*delta);
        this.square1.rotateZaxis(this.s1Zrot*delta);
        this.square2.rotateZaxis(this.s2Zrot*delta);
        this.square3.rotateZaxis(this.s3Zrot*delta);

        this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}

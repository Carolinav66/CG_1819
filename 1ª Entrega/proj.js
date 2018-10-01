var controls, camera, scene, renderer;

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    var table = new Table(0, 5, 0);  //chao: -25
    scene.add(table.object);
    var lamp = new Lamp(40, 0, 0);   //chao: -25
    scene.add(lamp.object);
    var chair = new Chair(0, 0, 20); //chao: -25
    scene.add(chair.object);
}

function createCamera(x, y, z) {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;

    camera.lookAt(scene.position);

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {

            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 49: //1
        createCamera(0, 75, 0);
        controls = new THREE.OrbitControls(camera);
        break;
    case 50: //2
        createCamera(75, 0, 0);
        controls = new THREE.OrbitControls(camera);
        break;
    case 51: //3
        createCamera(0, 0, 75);
        controls = new THREE.OrbitControls(camera);
        break;
        
/*
    case 37: // esquerda
    case 38: // cima
    case 39: // direita
    case 40: // baixo
*/
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera(50,50,50);

    controls = new THREE.OrbitControls(camera);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate(){
  render();
	controls.update();
	requestAnimationFrame( animate );
}

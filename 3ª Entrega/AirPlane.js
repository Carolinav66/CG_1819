class AirPlane extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            [new THREE.MeshLambertMaterial({ color: 0x263b47, wireframe: false}),
             new THREE.MeshLambertMaterial({ color: 0x99aaff, wireframe: false, /*opacity: 0.5, transparent: true, side: THREE.DoubleSide*/ }),
             new THREE.MeshLambertMaterial({ color: 0x404040, wireframe: false}),
             new THREE.MeshLambertMaterial({ color: 0x390022, wireframe: false, side:THREE.DoubleSide}),

             new THREE.MeshPhongMaterial({ color: 0x263b47, wireframe: false}),
             new THREE.MeshPhongMaterial({ color: 0x99aaff, wireframe: false, /*opacity: 0.5, transparent: true, side: THREE.DoubleSide*/ }),
             new THREE.MeshPhongMaterial({ color: 0x404040, wireframe: false}),
             new THREE.MeshPhongMaterial({ color: 0x390022, wireframe: false, side:THREE.DoubleSide}),             
        
             new THREE.MeshBasicMaterial({ color: 0x263b47, wireframe: false}),
             new THREE.MeshBasicMaterial({ color: 0x99aaff, wireframe: false /*opacity: 0.5, transparent: true,*/}),
             new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: false}),
             new THREE.MeshBasicMaterial({ color: 0x390022, wireframe: false, side: THREE.DoubleSide })
            ],
            "airplane");

        this.chassisMesh = this.createChassis(0,0,-15);

        this.leftWing      = this.createWing( 2.3, 0, -3, 25, 8, 24, 55, "left");
        this.rightWing     = this.createWing(-2.3, 0, -3, 25, 8, 24, 55, "right");
        this.rearLeftWing  = this.createWing( 1,   0, -18, 7, 5,  9, 8, "left");
        this.rearRightWing = this.createWing(-1,   0, -18, 7, 5,  9, 8, "right");
        this.topStablizer  = this.createWing( 1,   0, -18, 9, 5,  8, 8, "left");
        this.topStablizer.rotation.z+=Math.PI/2;

        this.windShield = this.createWindShield(0, 1, -2, 3, 2*Math.PI, Math.PI, 15, 15);

        this.baseMesh;
        this.paddle1Mesh;
        this.paddle2Mesh;
        this.createRotor(0, 0, 5);

        this.add(new THREE.AxisHelper(15));

        this.eulerOrder = 'ZYX';

        this.materialType = "Lambert";
        this.isBasic = false

        console.log(this.children);
    }

    toggleMaterial() {
        if (this.materialType == "Lambert") {
            this.materialType = "Phong";
            if (!this.isBasic) this.changeMaterial("Phong");
        } else if (this.materialType == "Phong") {
            this.materialType = "Lambert";
            if (!this.isBasic) this.changeMaterial("Lambert");
        }
    }

    toggleBasic() {
        if (this.isBasic) {
            this.isBasic = false;
            this.changeMaterial(this.materialType);
        } else {
            this.isBasic = true;
            this.changeMaterial("Basic");
        }
    }

    changeMaterial(to) {
        if (to == "Basic") {
            this.chassisMesh.material  = this.materials[8];
            this.leftWing.material     = this.materials[10];
            this.rightWing.material    = this.materials[10];
            this.rearLeftWing.material = this.materials[10];
            this.rearRightWing.material= this.materials[10];
            this.topStablizer.material = this.materials[10];
            this.windShield.material   = this.materials[9];
            this.baseMesh.material     = this.materials[11];
            this.paddle1Mesh.material  = this.materials[11];
            this.paddle2Mesh.material  = this.materials[11];
        } else if (to == "Lambert") {
            this.chassisMesh.material  = this.materials[0];
            this.leftWing.material     = this.materials[2];
            this.rightWing.material    = this.materials[2];
            this.rearLeftWing.material = this.materials[2];
            this.rearRightWing.material= this.materials[2];
            this.topStablizer.material = this.materials[2];
            this.windShield.material   = this.materials[1];
            this.baseMesh.material     = this.materials[3];
            this.paddle1Mesh.material  = this.materials[3];
            this.paddle2Mesh.material  = this.materials[3];
        } else if (to == "Phong") {
            this.chassisMesh.material  = this.materials[4];
            this.leftWing.material     = this.materials[6];
            this.rightWing.material    = this.materials[6];
            this.rearLeftWing.material = this.materials[6];
            this.rearRightWing.material= this.materials[6];
            this.topStablizer.material = this.materials[6];
            this.windShield.material   = this.materials[5];
            this.baseMesh.material     = this.materials[7];
            this.paddle1Mesh.material  = this.materials[7];
            this.paddle2Mesh.material  = this.materials[7];
        }

    }

    createChassis(x,y,z){

        var radii=[[-3,0],[-2.5,1.4],[-1,1.7],[0,1.7],[1,1.7],[2,1.8],[2.5,2.1],[4,2.3],[5,2.5],[6,2.5],[7,2.5],[8,2.5],[9,2.5],[10,2.5],[11,2.5],[12,2.5],[13,2.5],[14.5,2.5],[16,2.5],[18,2.5],[18.391,2.469],[18.773,2.378],[19.135,2.228],[19.469,2.023],[19.768,1.768],[20.023,1.469],[20.228,1.135],[20.378,0.773],[20.469,0.391],[20.5,0]];
        var geometry = this.createCustomCylinder(x,y,z,radii,16);
        geometry.vertices[277].y-=0.5;
        geometry.vertices[276].y-=0.8;
        geometry.vertices[275].y-=0.5;
        geometry.vertices[261].y-=0.5;
        geometry.vertices[260].y-=1.2;
        geometry.vertices[259].y-=0.5;
        geometry.vertices[245].y-=0.6;
        geometry.vertices[244].y-=1.5;
        geometry.vertices[243].y-=0.6;
        geometry.vertices[229].y-=0.2;
        geometry.vertices[228].y-=0.4;
        geometry.vertices[227].y-=0.2;
        for (var i = 0; i < geometry.vertices.length; i++){
            geometry.vertices[i].y*=0.8;
        }
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
     
        geometry.normalsNeedUpdate = true;
        

        var chassisMesh = new THREE.Mesh(geometry, this.materials[0]);
        chassisMesh.name = "chassis";
        this.add(chassisMesh);
        return chassisMesh;
    }

    createWing(x,y,z,length,width,radialSegments,lengthSegments,side){
        if (side == "right"){
            var sideMul=-1;
        } else {
            var sideMul=1;
        }
        var geometry=new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x,y-0.5,z));
        for(var i=1; i<lengthSegments+1; i++){
            for(var angle=0; angle<=Math.PI/2; angle+=Math.PI/(2*radialSegments)){
                geometry.vertices.push(new THREE.Vector3(sideMul * Math.cos(angle)*length*i/(lengthSegments+1) + x,
                                                            y - 0.5,
                                                            Math.sin(angle)*width*i/(lengthSegments+1) + z));

            }
        }
        var topIndex = geometry.vertices.length;
        geometry.vertices.push(new THREE.Vector3(x,y+0.5,z));
        for(var i=1; i<(lengthSegments+1); i++){
            for(var angle=0; angle<=Math.PI/2; angle+=Math.PI/(2*radialSegments)){
                geometry.vertices.push(new THREE.Vector3(sideMul * Math.cos(angle)*length*i/(lengthSegments+1) + x,
                                                            y+0.5,
                                                            Math.sin(angle)*width*i/(lengthSegments+1) + z));
            }
        }

        //bottom inner wing face
        for (var j = 0; j < radialSegments; j++){
            if (side == "left"){
                geometry.faces.push(new THREE.Face3(0,j+1,j+2))
            } else {
                geometry.faces.push(new THREE.Face3(0,j+2,j+1))
            }
        }
        //bottom outer wing face
        for(var i = 1; i<lengthSegments; i++){
            for(var j=0; j<radialSegments; j++){
                if (side == "left"){
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                    (i)*(radialSegments+1)+j+1,
                                                    (i)*(radialSegments+1)+j+2));
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                    (i)*(radialSegments+1)+j+2,
                                                    (i-1)*(radialSegments+1)+j+2));
                } else {
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                    (i)*(radialSegments+1)+j+2,
                                                    (i)*(radialSegments+1)+j+1));
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                    (i-1)*(radialSegments+1)+j+2,
                                                    (i)*(radialSegments+1)+j+2));
                }

            }
        }
        // top inner wing face
        for (var j = 0; j < radialSegments; j++){
            if (side == "right"){
                geometry.faces.push(new THREE.Face3(topIndex,topIndex + j + 1,topIndex + j + 2))
            } else {
                geometry.faces.push(new THREE.Face3(topIndex,topIndex + j + 2,topIndex + j + 1))
            }
        }
        // top outer wing face
        for(var i = 1; i<lengthSegments; i++){
            for(var j=0; j<radialSegments; j++){
                if (side == "left"){
                    geometry.faces.push(new THREE.Face3(topIndex + (i-1)*(radialSegments+1)+j+1,
                                                    topIndex + (i)*(radialSegments+1)+j+2,
                                                    topIndex + (i)*(radialSegments+1)+j+1));
                    geometry.faces.push(new THREE.Face3(topIndex + (i-1)*(radialSegments+1)+j+1,
                                                    topIndex + (i-1)*(radialSegments+1)+j+2,
                                                    topIndex + (i)*(radialSegments+1)+j+2));
                } else {
                    geometry.faces.push(new THREE.Face3(topIndex + (i-1)*(radialSegments+1)+j+1,
                                                    topIndex + (i)*(radialSegments+1)+j+1,
                                                    topIndex + (i)*(radialSegments+1)+j+2));
                    geometry.faces.push(new THREE.Face3(topIndex + (i-1)*(radialSegments+1)+j+1,
                                                    topIndex + (i)*(radialSegments+1)+j+2,
                                                    topIndex + (i-1)*(radialSegments+1)+j+2));
                }

            }
        }
        //length wing face
        for(var i = 0; i<lengthSegments; i++){
            if(side == "right"){
                if(i == 0){
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex +1,
                                                        topIndex));
                    geometry.faces.push(new THREE.Face3(0,
                                                        i*(radialSegments+1) + 1,
                                                        topIndex + 1));
                } else {
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1) + 1,
                                                        topIndex + i*(radialSegments+1) + 1,
                                                        topIndex + (i-1)*(radialSegments+1) + 1));
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1) + 1,
                                                        i*(radialSegments+1) + 1,
                                                        topIndex + i*(radialSegments+1) + 1));
                }
            } else {
                if( i == 0){
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex,
                                                        topIndex+1));
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex + 1,
                                                        i*(radialSegments+1) + 1));
                } else {
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1) + 1,
                                                        topIndex + (i-1)*(radialSegments+1) + 1,
                                                        topIndex + i*(radialSegments+1) + 1));
                    geometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1) + 1,
                                                        topIndex + i*(radialSegments+1) + 1,
                                                        i*(radialSegments+1) + 1));
                }
            }
        }

        for(var i = 0; i<lengthSegments; i++){
            if (side == "right"){
                if( i == 0){
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex,
                                                        topIndex + radialSegments + 1));
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex + radialSegments+1,
                                                        radialSegments + 1));
                } else {
                    geometry.faces.push(new THREE.Face3((i)*(radialSegments+1),
                                                        topIndex + (i)*(radialSegments+1),
                                                        topIndex + (i+1)*(radialSegments+1)));
                    geometry.faces.push(new THREE.Face3(i*(radialSegments+1),
                                                        topIndex + (i+1)*(radialSegments+1),
                                                        (i+1)*(radialSegments+1)));
                }
            } else {
                if( i == 0){
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex + radialSegments + 1,
                                                        topIndex));
                    geometry.faces.push(new THREE.Face3(0,
                                                        radialSegments + 1,
                                                        topIndex + radialSegments+1));
                } else {
                    geometry.faces.push(new THREE.Face3((i)*(radialSegments+1),
                                                        topIndex + (i+1)*(radialSegments+1),
                                                        topIndex + (i)*(radialSegments+1)));
                    geometry.faces.push(new THREE.Face3(i*(radialSegments+1),
                                                        (i+1)*(radialSegments+1),
                                                        topIndex + (i+1)*(radialSegments+1)));
                }
            }
        }

        for (var i = 0; i < radialSegments; i++){
            if (side == "left"){
                geometry.faces.push(new THREE.Face3((lengthSegments-1)*(radialSegments+1)+1+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+1+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+2+i));
                geometry.faces.push(new THREE.Face3((lengthSegments-1)*(radialSegments+1)+1+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+2+i,
                                                    (lengthSegments-1)*(radialSegments+1)+2+i));
            } else {
                geometry.faces.push(new THREE.Face3((lengthSegments-1)*(radialSegments+1)+1+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+2+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+1+i));
                geometry.faces.push(new THREE.Face3((lengthSegments-1)*(radialSegments+1)+1+i,
                                                    (lengthSegments-1)*(radialSegments+1)+2+i,
                                                    topIndex + (lengthSegments-1)*(radialSegments+1)+2+i));
            }
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        var mesh = new THREE.Mesh(geometry, this.materials[2]);
        this.add(mesh);
        return mesh;
    }

    createWindShield(x,y,z,radius, sideAngle, heightAngle, sideSegments, heightSegments){
        var geometry = new THREE.Geometry();
        for (var side = 0; side <= sideAngle; side+=sideAngle/sideSegments){
            for (var height = 0; height <= heightAngle; height+=heightAngle/heightSegments){
                geometry.vertices.push(new THREE.Vector3(radius*Math.cos(side)*Math.cos(height)*0.7,
                                                        radius*Math.sin(height),
                                                        radius*Math.sin(side)*Math.cos(height)))
            }
        }
        for(var i=0; i < sideSegments; i++){
            for(var j=0; j < heightSegments; j++){
                geometry.faces.push(new THREE.Face3(i*(sideSegments + 1)+j,
                                                    (i)*(sideSegments + 1)+j+1,
                                                    (i+1)*(sideSegments + 1)+ j +1));
                geometry.faces.push(new THREE.Face3(i*(sideSegments + 1)+j,
                                                    (i+1)*(sideSegments + 1)+j+1,
                                                    (i+1)*(sideSegments + 1) + j));
            }
        }
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        var mesh = new THREE.Mesh(geometry, this.materials[1]);
        mesh.position.x+=x;
        mesh.position.y+=y;
        mesh.position.z+=z;
        mesh.name="windshield";
        this.add(mesh);
        return mesh;
    }
    
    createRotor(x,y,z){

        var radii =[[0,1.2],[0.1,1.2],[0.2,1.15],[0.3,1.05],[0.4,0.9],[0.5,0.75],[0.6,0.5],[0.7,0.2],[0.75,0]];
        var baseGeometry = this.createCustomCylinder(x,y,z, radii,16);
        baseGeometry.computeFaceNormals();
        baseGeometry.computeVertexNormals();
        this.baseMesh = new THREE.Mesh(baseGeometry, this.materials[3]);
        this.baseMesh.name = "base";
        this.add(this.baseMesh);

        var paddleGeometry=new THREE.Geometry();
        //rotor.add(this.baseMesh);

        paddleGeometry.vertices.push(new THREE.Vector3(0,0,0));
        for(var i=1; i<5; i++){
            for(var angle=0; angle<=Math.PI; angle+=Math.PI/(20)){
                paddleGeometry.vertices.push(new THREE.Vector3(Math.cos(angle)*(0.5+Math.sin(angle)*2*i/5)*i/5,
                                                            Math.sin(angle)*7*i/5,
                                                            ));
            }
        }
        var radialSegments = 20;
        for (var j = 0; j < radialSegments; j++){
            paddleGeometry.faces.push(new THREE.Face3(0,j+1,j+2))
        }
        for(var i = 1; i<4; i++){
            for(var j=0; j<radialSegments; j++){
                paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+2));
                paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
                                                (i)*(radialSegments+1)+j+2,
                                                (i-1)*(radialSegments+1)+j+2));
            }
        }
        paddleGeometry.computeFaceNormals();
        paddleGeometry.computeVertexNormals();
        this.paddle1Mesh = new THREE.Mesh(paddleGeometry, this.materials[3]);
        this.paddle2Mesh = new THREE.Mesh(paddleGeometry, this.materials[3]);
        this.paddle2Mesh.rotation.z+=Math.PI;
        this.paddle1Mesh.position.set(x,y,z+0.5);
        this.paddle2Mesh.position.set(x,y,z+0.5);
        this.paddle1Mesh.name="paddle";
        this.paddle2Mesh.name="paddle";

        this.add(this.paddle1Mesh);
        this.add(this.paddle2Mesh);
        console.log(this.paddle1Mesh);
    }
    rotateRotor(delta){
        this.paddle1Mesh.rotation.z+=50*delta;
        this.paddle2Mesh.rotation.z+=50*delta;
    }

    roll(delta, speed){
        this.rotateZ(delta*speed);
        this.leftWing.rotation.x = -speed*0.15;
        this.rightWing.rotation.x = speed*0.15;
    }

    pitch(delta,speed){
        this.rotation.x+=delta*speed;
        this.leftWing.rotation.x += speed*0.15;
        this.rightWing.rotation.x += speed*0.15;
    }

}

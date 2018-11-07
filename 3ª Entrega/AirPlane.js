class AirPlane extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            [new THREE.MeshLambertMaterial({color: 0x263b47 /*0xff09e5*/, wireframe: false, emissive: 0x000000}),
            new THREE.MeshLambertMaterial({ color: 0xff09e5, wireframe: false, side: THREE.DoubleSide }),
            new THREE.MeshLambertMaterial({ color: 0x99aaff, wireframe: false, opacity: 0.5, transparent: true , side: THREE.DoubleSide }),
            new THREE.MeshLambertMaterial({ color: 0x404040, wireframe: false})],
            "airplane");

        this.createChassis(0,0,-15);
        this.leftWing = this.createWing(2.3,0,-3,25,8,15,"left");
        this.rightWing = this.createWing(-2.3,0,-3,25,8,15,"right");
        this.rotor = new Rotor(0,0,5.5,
            [new THREE.MeshBasicMaterial({ color: 0x390022 /*0xff09e5*/, wireframe: false, side: THREE.DoubleSide })]);
        this.add(this.rotor);
        this.createWing(1,0,-18,7,5,9,"left");
        this.createWing(-1,0,-18,7,5,9,"right");
        var topStablizer = this.createWing(1,0,-18,9,5,8,"left");
        topStablizer.rotation.z+=Math.PI/2;
        this.createWindShield(0,1,-2,3,2*Math.PI,Math.PI,15,15)
        this.add(new THREE.AxisHelper(15));
        this.eulerOrder = 'ZYX';

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
        /* this.materials[0].specular = new THREE.Color(0xffffff);
        this.materials[0].shininess = 0;
        this.materials[0].shading = THREE.FlatShading;
        this.materials[0].needsUpdate = true; */


        geometry.normalsNeedUpdate = true;
        

        var mesh = new THREE.Mesh(geometry, this.materials[0]);
        this.add(mesh);
        var ballmesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 15, 15), this.materials[1]);
        //ballmesh.position.set(geometry.vertices[229].x,geometry.vertices[229].y,geometry.vertices[229].z);
        // ballmesh.position.set(15,0,5);
        // this.add(ballmesh);
    }

    createWing(x,y,z,length,width,radialSegments,side){
        if (side == "right"){
            var sideMul=-1;
        } else {
            var sideMul=1;
        }
        var geometry=new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x,y-0.5,z));
        for(var i=1; i<5; i++){
            for(var angle=0; angle<=Math.PI/2; angle+=Math.PI/(2*radialSegments)){
                geometry.vertices.push(new THREE.Vector3(sideMul * Math.cos(angle)*length*i/5 + x,
                                                            y - 0.5,
                                                            Math.sin(angle)*width*i/5 + z));

            }
        }
        var topIndex = geometry.vertices.length;
        geometry.vertices.push(new THREE.Vector3(x,y+0.5,z));
        for(var i=1; i<5; i++){
            for(var angle=0; angle<=Math.PI/2; angle+=Math.PI/(2*radialSegments)){
                geometry.vertices.push(new THREE.Vector3(sideMul * Math.cos(angle)*length*i/5 + x,
                                                            y+0.5,
                                                            Math.sin(angle)*width*i/5 + z));
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
        for(var i = 1; i<4; i++){
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
        for(var i = 1; i<4; i++){
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
        for(var i = 0; i<4; i++){
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

        for(var i = 0; i<4; i++){
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
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i));
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i,
                                                    3*(radialSegments+1)+2+i));
            } else {
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i,
                                                    topIndex + 3*(radialSegments+1)+1+i));
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    3*(radialSegments+1)+2+i,
                                                    topIndex + 3*(radialSegments+1)+2+i));
            }
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        var mesh = new THREE.Mesh(geometry, this.materials[3]);
        this.add(mesh);
        // for (var i = 0; i< geometry.vertices.length; i++){
            // var ballmesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 15, 15), this.materials[1]);
            // ballmesh.position.set(geometry.vertices[0].x,geometry.vertices[0].y,geometry.vertices[0].z);
            // this.add(ballmesh);
        // }
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
        var mesh = new THREE.Mesh(geometry, this.materials[2]);
        mesh.position.x+=x;
        mesh.position.y+=y;
        mesh.position.z+=z;
        this.add(mesh);
        // for (var i = 0; i< geometry.vertices.length; i++){
        //     var ballmesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 15, 15), this.materials[1]);
        //     ballmesh.position.set(geometry.vertices[i].x,geometry.vertices[i].y,geometry.vertices[i].z);
        //     this.add(ballmesh);
        // }
    }

    rotateRotor(delta){
        this.rotor.rotateRotor(delta);
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

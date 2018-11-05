class AirPlane extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            [new THREE.MeshBasicMaterial({ color: 0xc56836 /*0xff09e5*/, wireframe: false }),
            new THREE.MeshBasicMaterial({ color: 0xff09e5, wireframe: false })],
            "field");

        this.createChassis(0,0,-15);
        this.createWing(2.3,0,0,25,5,15,"left");
        this.createWing(-2.3,0,0,25,5,15,"right");
        this.createRotor(0,0,5.5);

    }

    createChassis(x,y,z){

        var radii=[[0,0],[1,0.2],[2,0.6],[2.5,0.7],[4,1],[5,1.3],[6,1.6],[7,2],[8,2.1],[9,2.2],[10,2.3],[11,2.4],[12,2.5],[13,2.5],[14.5,2.5],[16,2.5],[18,2.5],[18.391,2.469],[18.773,2.378],[19.135,2.228],[19.469,2.023],[19.768,1.768],[20.023,1.469],[20.228,1.135],[20.378,0.773],[20.469,0.391],[20.5,0]];
        var geometry = this.createCustomCylinder(x,y,z,radii,16);
        geometry.vertices[245].y-=0.5;
        geometry.vertices[244].y-=0.8;
        geometry.vertices[243].y-=0.5;
        geometry.vertices[229].y-=0.5;
        geometry.vertices[228].y-=1.2;
        geometry.vertices[227].y-=0.5;
        geometry.vertices[213].y-=0.6;
        geometry.vertices[212].y-=1.5;
        geometry.vertices[211].y-=0.6;
        geometry.vertices[197].y-=0.2;
        geometry.vertices[196].y-=0.4;
        geometry.vertices[195].y-=0.2;
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
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
                                                            y-0.5 ,
                                                            Math.sin(angle)*width*i/5 + z));
            }
        }
        var topIndex = geometry.vertices.length;
        geometry.vertices.push(new THREE.Vector3(x,y-0.5,z));
        for(var i=1; i<5; i++){
            for(var angle=0; angle<=Math.PI/2; angle+=Math.PI/(2*radialSegments)){
                geometry.vertices.push(new THREE.Vector3(sideMul * Math.cos(angle)*length*i/5 + x,
                                                            y+0.5 -1 +Math.sin(angle)*i/5,
                                                            Math.sin(angle)*width*i/5 + z));
            }
        }
        for (var j = 0; j < radialSegments; j++){
            if (side == "left"){
                geometry.faces.push(new THREE.Face3(0,j+1,j+2))
            } else {
                geometry.faces.push(new THREE.Face3(0,j+2,j+1))
            }
        }
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
        for (var j = 0; j < radialSegments; j++){
            if (side == "right"){
                geometry.faces.push(new THREE.Face3(topIndex,topIndex + j + 1,topIndex + j + 2))
            } else {
                geometry.faces.push(new THREE.Face3(topIndex,topIndex + j + 2,topIndex + j + 1))
            }
        }
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
        for(var i = 0; i<4; i++){
            if(side == "right"){
                if( i == 0){
                    geometry.faces.push(new THREE.Face3(0,
                                                        topIndex + 1,
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
                                                        topIndex + 1));
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
            if (side == "right"){
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i,
                                                    topIndex + 3*(radialSegments+1)+1+i));
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    3*(radialSegments+1)+2+i,
                                                    topIndex + 3*(radialSegments+1)+2+i));
            } else {
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i));
                geometry.faces.push(new THREE.Face3(3*(radialSegments+1)+1+i,
                                                    topIndex + 3*(radialSegments+1)+2+i,
                                                    3*(radialSegments+1)+2+i));
            }
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        var mesh = new THREE.Mesh(geometry, this.materials[0]);
        this.add(mesh);
        // for (var i = 0; i< geometry.vertices.length; i++){
        //     var ballmesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 15, 15), this.materials[1]);
        //     ballmesh.position.set(geometry.vertices[i].x,geometry.vertices[i].y,geometry.vertices[i].z);
        //     this.add(ballmesh);
        // }
    }

    createRotor(x,y,z){
        var radii =[[0,0],[0.1,0.15],[0.2,0.3],[0.3,0.5],[0.4,0.6],[0.5,0.6],[0.6,0.6],[0.7,0.5],[0.8,0.3],[0.9,0.15],[1,0]];
        var baseGeometry = this.createCustomCylinder(x,y,z, radii,16);
        var baseMesh = new THREE.Mesh(baseGeometry, this.materials[0]);
        this.add(baseMesh);
        var paddleGeometry=new THREE.Geometry();
        // paddleGeometry.vertices.push(new THREE.Vector3(x,y,z+5.5));
        // for(var i=1; i<5; i++){
        //     for(var angle=0; angle<=Math.PI; angle+=Math.PI/(20)){
        //         paddleGeometry.vertices.push(new THREE.Vector3(Math.cos(angle)*10*i/5 + x,
        //                                                     Math.sin(angle)*10*i/5 + y,
        //                                                     z+5.5));
        //     }
        // }
        // var radialSegments = 20;
        // for (var j = 0; j < radialSegments; j++){
        //     paddleGeometry.faces.push(new THREE.Face3(0,j+1,j+2))
        // }
        // for(var i = 1; i<4; i++){
        //     for(var j=0; j<radialSegments; j++){
        //         paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
        //                                         (i)*(radialSegments+1)+j+1,
        //                                         (i)*(radialSegments+1)+j+2));
        //         paddleGeometry.faces.push(new THREE.Face3((i-1)*(radialSegments+1)+j+1,
        //                                         (i)*(radialSegments+1)+j+2,
        //                                         (i-1)*(radialSegments+1)+j+2));
        //     }
        // }
        //
        // var paddleMesh = new THREE.Mesh(paddleGeometry, this.materials[0]);
        // this.add(paddleMesh);
    }
}

function Objects(){
    this.plane = [];
    this.blue = [];
    this.loader = new THREE.ColladaLoader();
};

Objects.prototype.constructor = Objects;

Objects.prototype.load = function(){
    this.loadBlue();
    this.loadPlane();
}
Objects.prototype.loadBlue = function(){
    this.loader.load('blue/model.dae', function(collada){
        var model = new THREE.Object3D();
        model.add(collada.scene);
        model.scale.multiplyScalar(.03);
        //model.translateX(.2);
        var mod = new THREE.Object3D();
        mod.add(model);
        for(var i = 0; i<30; i++){
            this.blue.push(mod.clone());
        }
    }.bind(this));
}
Objects.prototype.loadPlane = function(){
    this.loader.load('plane/model.dae', function(collada){
        var model = new THREE.Object3D();
        model.add(collada.scene);
        model.scale.multiplyScalar(0.02);
        model.rotateY(Math.PI/2);
        //model.translateY(.1);
        //model.translateX(-10);
        //model.translateZ(12);
        //scene.add(model);
        model.translateZ(-.6);
        var mod = new THREE.Object3D();
        mod.add(model);
        for(var i = 0; i<30; i++){
            this.plane.push(mod.clone());
        }


    }.bind(this));
}

Objects.prototype.getObject = function(){
    var num = Math.floor(Math.random()*2);
    if(num == 0){
        if(this.plane[0]!=undefined){
            var temp = new THREE.Object3D();
            temp = this.plane[0];
            this.plane.shift();
            var up = new THREE.Vector3(0,0, 1);
            var message = {type : 1,
                           up : up,
                           object : temp
            };
            return message;
        }
        return null;
    }
    else{
        if(this.blue[0]!=undefined){
            var temp = new THREE.Object3D();
            temp = this.blue[0];
            this.blue.shift();
            var up = new THREE.Vector3(0,0,1);
            var message = {type : 2,
                           up : up,
                           object : temp
            };
            return message;
        }
        return null;
    }
}           

Objects.prototype.addPlane= function(object){
    if(object.type == 1){
        this.plane.push(object);
    }
    else{
        this.blue.push(object);
    }
}

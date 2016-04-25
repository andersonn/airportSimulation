function Objects(){
    this.b737 = [];
    this.b757 = [];
    this.loader = new THREE.ColladaLoader();
};

Objects.prototype.constructor = Objects;

Objects.prototype.load = function(){
    this.loadB757();
    this.loadB737();
}
Objects.prototype.loadB757 = function(){
    this.loader.load('b757/model.dae', function(collada){
        var model = new THREE.Object3D();
        model.add(collada.scene);
        model.scale.multiplyScalar(.03);
        model.translateX(-.6);
        var mod = new THREE.Object3D();
        mod.add(model);
        for(var i = 0; i<20; i++){
            this.b757.push(mod.clone());
        }
    }.bind(this));
}
Objects.prototype.loadB737 = function(){
    this.loader.load('b737/model.dae', function(collada){
        var model = new THREE.Object3D();
        model.add(collada.scene);
        model.scale.multiplyScalar(0.04);
        //model.translateY(.1);
        //model.translateX(-10);
        //model.translateZ(12);
        //scene.add(model);
        model.translateX(-.6);
        var mod = new THREE.Object3D();
        mod.add(model);
        for(var i = 0; i<20; i++){
            this.b737.push(mod.clone());
        }


    }.bind(this));
}

Objects.prototype.getObject = function(){
    var num = Math.floor(Math.random()*2);
    if(num == 0){
        if(this.b737[0]!=undefined){
            var temp = new THREE.Object3D();
            temp = this.b737[0];
            this.b737.shift();
            var up = new THREE.Vector3(0,0,1);
            var message = {type : 1,
                           up : up,
                           object : temp
            };
            return message;
        }
        return null;
    }
    else{
        if(this.b757[0]!=undefined){
            var temp = new THREE.Object3D();
            temp = this.b757[0];
            this.b757.shift();
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
        this.b737.push(object);
    }
    else{
        this.b757.push(object);
    }
}

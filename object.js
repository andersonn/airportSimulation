function Objects(){
    this.b737 = [];
    this.loader = new THREE.ColladaLoader();
};

Objects.prototype.constructor = Objects;
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

Objects.prototype.getB737 = function(){
    if(this.b737[0]!=undefined){
        var temp = new THREE.Object3D();
        temp = this.b737[0];
        this.b737.shift();
        return temp;
    }
    return null;
}

Objects.prototype.addB737 = function(object){
    this.b737.push(object);
}

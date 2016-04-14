//Handles what an airplane can do.

function Airplane(controlTower, object, up){
        this.controlTower = controlTower;
        this.taxi = 0;
        this.obj=object;
        this.curve;
        this.up=up;
        this.axis = new THREE.Vector3();
    };
    
Airplane.prototype.constructor = Airplane;

Airplane.prototype.setObject(object){
    this.obj = object;
}


Airplane.prototype.update = function(){
    if(x<1){
        this.obj.position.copy(this.curve.getPointAt(x));
        tangent = curve.getTangentAt(this.taxi).normalize();
        this.axis.crossVectors(this.up, tangent).normalize();
        radians = Math.acos(this.up.dot(tangent));
        this.obj.quaternion.setFromAxisAngle(this.axis, radians);
    }
    this.taxi +=.001;
}

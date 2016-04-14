//Handles what an airplane can do.

function Airplane(controlTower){
        this.controlTower = controlTower;
        this.taxi = 0;
        this.obj;
        this.curve;
        this.up;
        this.axis = new THREE.Vector3();
	this.arrivalTime;
	this.comingFrom;
	this.goingTo;
	this.departureTime;
	this.taxiToGate;
	this.taxiToRunway;    
};
    
Airplane.prototype.constructor = Airplane;

Airplane.prototype.setArrival=function(time, city){
	this.arrivalTime=time;
	this.comingFrom=city;
}

Airplane.prototype.setUp=function(up){
	this.up = up;
}

Airplane.prototype.findGate=function(){
	var taxi = this.controlTower.findGate();
	if(taxi.gate == null){
	  //flyby?
	}
	else{
		this.taxiToGate = taxi.gate;
		this.taxiToRunway=taxi.runway;
	}
}

Airplane.prototype.setDeparture=function(time, city){
	this.departureTime=time;
	this.goingTo=city;
}

Airplane.prototype.getObject=function(){
	return this.obj;
}

Airplane.prototype.setObject=function(object){
    this.obj = object;
}


Airplane.prototype.update = function(){
    if(this.taxi<1){
        this.obj.position.copy(this.taxiToRunway.getPointAt(x));
        tangent = this.taxiToRunwaycurve.getTangentAt(this.taxi).normalize();
        this.axis.crossVectors(this.up, tangent).normalize();
        radians = Math.acos(this.up.dot(tangent));
        this.obj.quaternion.setFromAxisAngle(this.axis, radians);
    }
    this.taxi +=.001;
}

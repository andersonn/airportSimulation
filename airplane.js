//Handles what an airplane can do.

function Airplane(controlTower){
    this.controlTower = controlTower;
    this.move = 0;
    this.obj;
    this.up;
    this.axis = new THREE.Vector3();
    this.arrivalTime;
	this.comingFrom;
	this.goingTo;
	this.departureTime;
    this.land = new THREE.SplineCurve3([
            new THREE.Vector3(-80, 40, 1.7),
            new THREE.Vector3(-10, .1, 1.7)
    ]);
    this.takeOff = new THREE.SplineCurve3([
            new THREE.Vector3(3.5, .1, -9),
            new THREE.Vector3(80, 40, -9)
    ]);
    this.curve = this.land;
	this.taxiToGate;
	this.taxiToRunway;
    this.path = 0;
    this.curve;
    this.delta = .01;
    this.finished = false;
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

Airplane.prototype.pathSet=function(){
    switch(this.path){
        case 0:
            this.curve = this.land;
            this.move = 0;
            this.delta = .01;
            break;
        case 1:
            this.curve = this.taxiToGate;
            this.move = 0;
            this.delta = .001;
            break;
        case 2:
            this.curve = this.taxiToRunway;
            this.move = 0;
            this.delta = .001;
            break;
        case 3:
            console.log('Takeoff');
            this.curve = this.takeOff;
            this.move = 0;
            this.delta = .01;
            break;
        case 4:
            //done moving free plane
            this.finished = true;
            break;
    }

}

Airplane.prototype.departOnly = function(){
    this.path = 2;
    this.pathSet();
}

Airplane.prototype.update = function(worldTime){
    if((this.arrivalTime <= worldTime && this.path==0)||
      (this.arrivalTime <= worldTime && this.path==1)){
        if(this.move<1){
            this.obj.position.copy(this.curve.getPointAt(this.move));
            tangent = this.taxiToRunway.getTangentAt(this.move).normalize();
            this.axis.crossVectors(this.up, tangent).normalize();
            radians = Math.acos(this.up.dot(tangent));
            this.obj.quaternion.setFromAxisAngle(this.axis, radians);
        }
        
        this.move +=this.delta;
    }
    else if((this.departureTime <= worldTime && this.path==2)||
           (this.departureTime <= worldTime && this.path==3)){

        if(this.move<1){
            this.obj.position.copy(this.curve.getPointAt(this.move));
            tangent = this.taxiToRunway.getTangentAt(this.move).normalize();
            this.axis.crossVectors(this.up, tangent).normalize();
            radians = Math.acos(this.up.dot(tangent));
            this.obj.quaternion.setFromAxisAngle(this.axis, radians);
        }
     
        this.move +=this.delta;
    }
    else{
        //do nothing.
    }
    if(this.move >= 1 && !this.finished){
        this.path+=1
        console.log(this.path);
        this.pathSet();
    }
}

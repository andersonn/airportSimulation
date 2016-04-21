//Handles what an airplane can do.

function Airplane(controlTower, schedule){
    this.controlTower = controlTower;
    this.schedule = schedule;
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
    this.gate = null;
    this.delta = .01;
    this.finished = false;
    this.previousPosition=new THREE.Vector3();
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
		this.gate = taxi.number;
		this.taxiToGate = taxi.gate;
		this.taxiToRunway=taxi.runway;
	}
}

Airplane.prototype.freeGate = function(){
	this.controlTower.freeGate(this.gate);	
	this.gate = null;
}
Airplane.prototype.setDeparture=function(time, city){
	this.departureTime=time;
	this.goingTo=city;
}

Airplane.prototype.getObject=function(){
	return this.obj;
}

Airplane.prototype.removeObject = function(){
	temp = this.obj;
	this.obj=null;
	return temp;
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
            this.delta = .007;
            break;
        case 2:
            this.curve = this.taxiToRunway;
            this.move = 0;
            this.delta = .007;
            break;
        case 3:
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
    this.movement();
}

Airplane.prototype.getDirection = function(){
    var direction = new THREE.Vector3();
    if(this.previousPosition != null){
        direction.subVectors(this.obj.position, this.previousPosition);
        return direction;
    }
    return null;
}

Airplane.prototype.movement = function(){
	if(this.move<1){
            this.previousPosition.copy(this.obj.position);
            this.obj.position.copy(this.curve.getPointAt(this.move));
            tangent = this.curve.getTangentAt(this.move).normalize();
            this.axis.crossVectors(this.up, tangent).normalize();
            radians = Math.acos(this.up.dot(tangent));
            this.obj.quaternion.setFromAxisAngle(this.axis, radians);
        }
     this.move +=this.delta;
}

Airplane.prototype.update = function(worldTime){
    if((this.arrivalTime <= worldTime && this.path==0)||
      (this.arrivalTime <= worldTime && this.path==1)){
    	if(this.gate == null){
            this.findGate();
        }
        if(this.gate!=null){
            this.movement();
        }
    }
    else if((this.departureTime <= worldTime && this.path==2)||
           (this.departureTime <= worldTime && this.path==3)){
	//Free gate as you move away from the gate.
	if(this.gate != null){
		this.freeGate();
	}
	this.movement();
    }
    else{
        //do nothing.
    }
    if(this.move >= 1 && !this.finished){
        if(this.path == 1){
	        console.log('setting depart time');
	        this.departureTime = worldTime + 4;
	        this.goingTo=this.schedule.getCity();
	        console.log(this.departureTime);
	    }
	    this.path+=1;
        this.pathSet();
    }
}

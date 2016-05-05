//handles messages of the airplanes
//Take off and land

function ControlTower(){
      	this.openGates = [true, true, true, true, true, true, true];
	this.toGates = [
		new THREE.SplineCurve3([
		    new THREE.Vector3(-10, .1, 1.7),
		    new THREE.Vector3(-5.45, .1, 1.7),
		    new THREE.Vector3(-4.4,.1, .75),
		    new THREE.Vector3(-4.4, .1, -1.6),
		    new THREE.Vector3(-2.8, .1, -2.1),
		    new THREE.Vector3(2.25, .1, -2.1),
		    new THREE.Vector3(3.1, .1, -1),
		    new THREE.Vector3(3.1, .1, 3),
		    new THREE.Vector3(2.15, .1, 3.7),
		    new THREE.Vector3(-1, .1, 3.7),
		    new THREE.Vector3(-10.3, .1, 3.7),
		    new THREE.Vector3(-11.3, .1, 5),
		    new THREE.Vector3(-11.3, .1, 6),
		    new THREE.Vector3(-11.3, .1, 12)
		]),
		new THREE.SplineCurve3([
		    new THREE.Vector3(-10, .1, 1.7),
		    new THREE.Vector3(-5.45, .1, 1.7),
		    new THREE.Vector3(-4.4,.1, .75),
		    new THREE.Vector3(-4.4, .1, -1.6),
		    new THREE.Vector3(-2.8, .1, -2.1),
		    new THREE.Vector3(2.25, .1, -2.1),
		    new THREE.Vector3(3.1, .1, -1),
		    new THREE.Vector3(3.1, .1, 3),
		    new THREE.Vector3(2.15, .1, 3.7),
		    new THREE.Vector3(-1, .1, 3.7),
		    new THREE.Vector3(-6.9, .1, 3.7),
		    new THREE.Vector3(-7.9, .1, 5),
		    new THREE.Vector3(-7.9, .1, 6),
		    new THREE.Vector3(-7.9, .1, 12)
		]),
		new THREE.SplineCurve3([
		   new THREE.Vector3(-10, .1, 1.7),
		   new THREE.Vector3(-5.45, .1, 1.7),
		   new THREE.Vector3(-4.4,.1, .75),
		   new THREE.Vector3(-4.4, .1, -1.6),
		   new THREE.Vector3(-2.8, .1, -2.1),
		   new THREE.Vector3(2.25, .1, -2.1),
		   new THREE.Vector3(3.1, .1, -1),
		   new THREE.Vector3(3.1, .1, 3),
		   new THREE.Vector3(2.15, .1, 3.7),
		   new THREE.Vector3(-1, .1, 3.7),
		   new THREE.Vector3(-2, .1, 3.7),
		   new THREE.Vector3(-2.6, .1, 4),
		   new THREE.Vector3(-2.9, .1, 4.7),
		   new THREE.Vector3(-2.9, .1, 6),
		   new THREE.Vector3(-2.9, .1, 12)

		]),
		new THREE.SplineCurve3([
		   new THREE.Vector3(-10, .1, 1.7),
		   new THREE.Vector3(-5.45, .1, 1.7),
		   new THREE.Vector3(-4.4,.1, .75),
		   new THREE.Vector3(-4.4, .1, -1.6),
		   new THREE.Vector3(-2.8, .1, -2.1),
		   new THREE.Vector3(2.25, .1, -2.1),
		   new THREE.Vector3(3.1, .1, -1),
		   new THREE.Vector3(3.1, .1, 3),
		   new THREE.Vector3(2.15, .1, 3.7),
		   new THREE.Vector3(1.8, .1, 3.7),
		   new THREE.Vector3(1.2, .1, 4),
		   new THREE.Vector3(.9, .1, 4.7),
		   new THREE.Vector3(.9, .1, 6),
		   new THREE.Vector3(.9, .1, 12)

		]),
		new THREE.SplineCurve3([
		  new THREE.Vector3(-10, .1, 1.7),
		  new THREE.Vector3(-5.45, .1, 1.7),
		  new THREE.Vector3(-4.4,.1, .75),
		  new THREE.Vector3(-4.4, .1, -1.6),
		  new THREE.Vector3(-2.8, .1, -2.1),
		  new THREE.Vector3(2.25, .1, -2.1),
		  new THREE.Vector3(6.3, .1, -2.1),
		  new THREE.Vector3(7.3, .1, -1.1),
		  new THREE.Vector3(7.3, .1, 4.5),
		  new THREE.Vector3(6.3, .1, 5.5),
		  new THREE.Vector3(5.3, .1, 5.5),
		  new THREE.Vector3(4.7, .1, 5.6),
		  new THREE.Vector3(4, .1, 6.1),
		  new THREE.Vector3(3.9, .1, 7.1),
		  new THREE.Vector3(3.9, .1, 12)
		]),
		new THREE.SplineCurve3([
		  new THREE.Vector3(-10, .1, 1.7),
		  new THREE.Vector3(-5.45, .1, 1.7),
		  new THREE.Vector3(-4.4,.1, .75),
		  new THREE.Vector3(-4.4, .1, -1.6),
		  new THREE.Vector3(-2.8, .1, -2.1),
		  new THREE.Vector3(2.25, .1, -2.1),
		  new THREE.Vector3(6.3, .1, -2.1),
		  new THREE.Vector3(7.3, .1, -1.1),
		  new THREE.Vector3(7.3, .1, 4.5),
		  new THREE.Vector3(7.3, .1, 12)
		]),
		new THREE.SplineCurve3([
		  new THREE.Vector3(-10, .1, 1.7),
		  new THREE.Vector3(-5.45, .1, 1.7),
		  new THREE.Vector3(-4.4,.1, .75),
		  new THREE.Vector3(-4.4, .1, -1.6),
		  new THREE.Vector3(-2.8, .1, -2.1),
		  new THREE.Vector3(2.25, .1, -2.1),
		  new THREE.Vector3(6.3, .1, -2.1),
		  new THREE.Vector3(10.3, .1, -2.1),
		  new THREE.Vector3(11.3, .1, -1.1),
		  new THREE.Vector3(11.3, .1, 4.5),
		  new THREE.Vector3(11.3, .1, 12)
		])];

	this.toRunway=[
		 new THREE.SplineCurve3([
		    new THREE.Vector3(-11.3, .1, 12),
		    new THREE.Vector3(-11.3, .1, 7),
		    new THREE.Vector3(-11.3, .1, 8),
		    new THREE.Vector3(-11.6, .1, 8.5),
		    new THREE.Vector3(-12, .1, 8.7),
		    new THREE.Vector3(-13, .1, 9),
		    new THREE.Vector3(-17.5, .1, 9),
		    //From here down should be the same for gate 2 and 3
		    new THREE.Vector3(-18.5, .1, 8),
		    new THREE.Vector3(-18.5, .1, 7),
		    new THREE.Vector3(-18.5, .1, -1.5),
		    new THREE.Vector3(-15.5, .1, -2.1),
		    new THREE.Vector3(-15, .1, -2.1),
		    new THREE.Vector3(-5.45, .1, -2.1),
		    new THREE.Vector3(-4.4, .1, -4),
		    new THREE.Vector3(-4.4, .1, -8),
		    new THREE.Vector3(-3.4, .1, -9),
		    new THREE.Vector3(-2, .1, -9),
		    new THREE.Vector3(3.5, .1, -9)
		]),
		new THREE.SplineCurve3([
		    new THREE.Vector3(-7.8, .1, 12),
		    new THREE.Vector3(-7.8, .1, 7),
		    new THREE.Vector3(-7.8, .1, 8),
		    new THREE.Vector3(-8.1, .1, 8.5),
		    new THREE.Vector3(-8.5, .1, 8.7),
		    new THREE.Vector3(-9.5, .1, 9),
		    new THREE.Vector3(-17.5, .1, 9),
		    //From here down should be the same for gate 2 and 3
		    new THREE.Vector3(-18.5, .1, 8),
		    new THREE.Vector3(-18.5, .1, 7),
		    new THREE.Vector3(-18.5, .1, -1.5),
		    new THREE.Vector3(-15.5, .1, -2.1),
		    new THREE.Vector3(-15, .1, -2.1),
		    new THREE.Vector3(-5.45, .1, -2.1),
		    new THREE.Vector3(-4.4, .1, -4),
		    new THREE.Vector3(-4.4, .1, -8),
		    new THREE.Vector3(-3.4, .1, -9),
		    new THREE.Vector3(-2, .1, -9),
		    new THREE.Vector3(3.5, .1, -9)
		]),
		new THREE.SplineCurve3([
		    new THREE.Vector3(-2.9, .1, 12),
		    new THREE.Vector3(-2.9, .1, 7),
		    new THREE.Vector3(-2.9, .1, 8),
		    new THREE.Vector3(-3.1, .1, 8.5),
		    new THREE.Vector3(-3.4, .1, 8.8),
		    new THREE.Vector3(-4, .1, 9),
		    new THREE.Vector3(-5.5, .1, 9),
		    new THREE.Vector3(-17.5, .1, 9),
		   //From here down should be the same for gate 2 and 3
		    new THREE.Vector3(-18.5, .1, 8),
		    new THREE.Vector3(-18.5, .1, 7),
		    new THREE.Vector3(-18.5, .1, -1.5),
		    new THREE.Vector3(-15.5, .1, -2.1),
		    new THREE.Vector3(-15, .1, -2.1),
		    new THREE.Vector3(-5.45, .1, -2.1),
		    new THREE.Vector3(-4.4, .1, -4),
		    new THREE.Vector3(-4.4, .1, -8),
		    new THREE.Vector3(-3.4, .1, -9),
		    new THREE.Vector3(-2, .1, -9),
		    new THREE.Vector3(3.5, .1, -9)
		]),
		new THREE.SplineCurve3([
             new THREE.Vector3(.9, .1, 12),
            new THREE.Vector3(.9, .1, 7),
            new THREE.Vector3(.9, .1, 8),
            new THREE.Vector3(1.2, .1, 8.8),
            new THREE.Vector3(2, .1, 9),
            new THREE.Vector3(3.4, .1, 9),
            new THREE.Vector3(5, .1, 9),
            new THREE.Vector3(10, .1, 9),
            new THREE.Vector3(15, .1, 9),
            new THREE.Vector3(18, .1, 9),
            new THREE.Vector3(18.8, .1, 8.2),
            new THREE.Vector3(19, .1, 7.2),
            new THREE.Vector3(19, .1, 0),
            new THREE.Vector3(19, .1, -4.5),
            new THREE.Vector3(18, .1, -5.3),
            new THREE.Vector3(14, .1, -5.3),
            new THREE.Vector3(7, .1, -5.3),
            new THREE.Vector3(0, .1, -5.3),
            new THREE.Vector3(-3.4, .1, -5.3),
            new THREE.Vector3(-4.4, .1, -6),
            new THREE.Vector3(-4.4, .1, -7),
            new THREE.Vector3(-4.4, .1, -8),
            new THREE.Vector3(-3.4, .1, -9),
            new THREE.Vector3(-2, .1, -9),
            new THREE.Vector3(3.5, .1, -9)

		]),
		new THREE.SplineCurve3([
		   new THREE.Vector3(3.9, .1, 12),
            new THREE.Vector3(3.9, .1, 7),
            new THREE.Vector3(3.9, .1, 8),
            new THREE.Vector3(4.2, .1, 8.8),
            new THREE.Vector3(5, .1, 9),
            new THREE.Vector3(6.4, .1, 9),
            new THREE.Vector3(8, .1, 9),
            new THREE.Vector3(10, .1, 9),
            new THREE.Vector3(15, .1, 9),
            new THREE.Vector3(18, .1, 9),
            new THREE.Vector3(18.8, .1, 8.2),
            new THREE.Vector3(19, .1, 7.2),
            new THREE.Vector3(19, .1, 0),
            new THREE.Vector3(19, .1, -4.5),
            new THREE.Vector3(18, .1, -5.3),
            new THREE.Vector3(14, .1, -5.3),
            new THREE.Vector3(7, .1, -5.3),
            new THREE.Vector3(0, .1, -5.3),
            new THREE.Vector3(-3.4, .1, -5.3),
            new THREE.Vector3(-4.4, .1, -6),
            new THREE.Vector3(-4.4, .1, -7),
            new THREE.Vector3(-4.4, .1, -8),
            new THREE.Vector3(-3.4, .1, -9),
            new THREE.Vector3(-2, .1, -9),
            new THREE.Vector3(3.5, .1, -9)

        ]),
		new THREE.SplineCurve3([
		   new THREE.Vector3(7.3, .1, 12),
		    new THREE.Vector3(7.3, .1, 7),
		    new THREE.Vector3(7.3, .1, 8),
		    new THREE.Vector3(7.6, .1, 8.8),
		    new THREE.Vector3(8.4, .1, 9),
		    new THREE.Vector3(9.8, .1, 9),
		    new THREE.Vector3(11.4, .1, 9),
		    new THREE.Vector3(13, .1, 9),
		    new THREE.Vector3(15, .1, 9),
		    new THREE.Vector3(18, .1, 9),
		    new THREE.Vector3(18.8, .1, 8.2),
		    new THREE.Vector3(19, .1, 7.2),
		    new THREE.Vector3(19, .1, 0),
		    new THREE.Vector3(19, .1, -4.5),
		    new THREE.Vector3(18, .1, -5.3),
		    new THREE.Vector3(14, .1, -5.3),
		    new THREE.Vector3(7, .1, -5.3),
		    new THREE.Vector3(0, .1, -5.3),
		    new THREE.Vector3(-3.4, .1, -5.3),
		    new THREE.Vector3(-4.4, .1, -6),
		    new THREE.Vector3(-4.4, .1, -7),
		    new THREE.Vector3(-4.4, .1, -8),
		    new THREE.Vector3(-3.4, .1, -9),
		    new THREE.Vector3(-2, .1, -9),
		    new THREE.Vector3(3.5, .1, -9)
		]),
		new THREE.SplineCurve3([
		    new THREE.Vector3(11.3, .1, 12),
		    new THREE.Vector3(11.3, .1, 7),
		    new THREE.Vector3(11.3, .1, 8),
		    new THREE.Vector3(11.6, .1, 8.8),
		    new THREE.Vector3(12.4, .1, 9),
		    new THREE.Vector3(13.8, .1, 9),
		    new THREE.Vector3(15.4, .1, 9),
		    new THREE.Vector3(17, .1, 9),
		    new THREE.Vector3(18, .1, 9),
		    new THREE.Vector3(18.8, .1, 8.2),
		    new THREE.Vector3(19, .1, 7.2),
		    new THREE.Vector3(19, .1, 0),
		    new THREE.Vector3(19, .1, -4.5),
		    new THREE.Vector3(18, .1, -5.3),
		    new THREE.Vector3(14, .1, -5.3),
		    new THREE.Vector3(7, .1, -5.3),
		    new THREE.Vector3(0, .1, -5.3),
		    new THREE.Vector3(-3.4, .1, -5.3),
		    new THREE.Vector3(-4.4, .1, -6),
		    new THREE.Vector3(-4.4, .1, -7),
		    new THREE.Vector3(-4.4, .1, -8),
		    new THREE.Vector3(-3.4, .1, -9),
		    new THREE.Vector3(-2, .1, -9),
		    new THREE.Vector3(3.5, .1, -9)
		])];
		  
    };
ControlTower.prototype.constructor = ControlTower;

ControlTower.prototype.findGate = function(){
	var data = {number: null,
		    gate : null,
		    runway : null};
	for(var i = 0; i<this.openGates.length; i++){
		if(this.openGates[i]){
			data.number = i;
			data.gate=this.toGates[i];
			data.runway=this.toRunway[i];
			this.openGates[i]=false;
            break;
		}
		
	}
	return data;
}

ControlTower.prototype.freeGate = function(gate){
	this.openGates[gate]=true;
}

ControlTower.prototype.hasOpenGates = function(){
    var open = false;
    for(var i = 0; i<this.openGates.length; i++){
        if(this.openGates[i]){
            open = true;
        }
    }
    return open;
}

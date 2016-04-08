//Handles what an airplane can do.

function Airplane(controlTower){
        this.controlTower = controlTower;
        this.flightPlan = new flightPlan(); //TODO add runway locations
        this.onGround = true;
    };
    
    Airplane.prototype.constructor = Airplane;
    Airplane.prototype.requestTakeOff = function(){
        if(this.controlTower.requestTakeOff()){
            //startTakeOff
        }
        else{
            //hold at location
        }
    }

    Airplane.prototype.requestLanding = function(){
        if(this.controlTower.requestLanding()){
            //startLanding
        }
        else{
            //fly another landing pattern
        }
    }

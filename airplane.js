//Handles what an airplane can do.

class Airplane{
    contructor(controlTower){
        this.controlTower = controlTower;
        this.flightPlan = new flightPlan(); //TODO add runway locations
        this.onGround = true;
    }
    
    requestTakeOff(){
        if(this.controlTower.requestTakeOff()){
            //startTakeOff
        }
        else{
            //hold at location
        }
    }

    requestLanding(){
        if(this.controlTower.requestLanding()){
            //startLanding
        }
        else{
            //fly another landing pattern
        }
    }

}

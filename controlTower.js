//handles messages of the airplanes
//Take off and land

function ControlTower(){
        this.onTarmac = false;
    };
    ControlTower.prototype.constructor = ControlTower;

    ControlTower.prototype.requestLanding = function(){
        if(this.onTarmac){
            return false;
        }
        else{
            return true;
        }
    }

    ControlTower.prototype.requestTakeoff = function(){
        if(this.onTarmac){
            return false;
        }
        else{
            return true;
        }
    }    
    ControlTower.prototype.setTarmac = function(){
        this.onTarmac = !this.onTarmac;
    }

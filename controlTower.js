//handles messages of the airplanes
//Take off and land

class ControlTower{
    constructor(){
        this.onTarmac = false;
    }

    requestLanding(){
        if(this.onTarmac){
            return false;
        }
        else{
            return true;
        }
    }

    requestTakeoff(){
        if(this.onTarmac){
            return false;
        }
        else{
            return true;
        }
    }    
    setTarmac(){
        this.onTarmac = !this.onTarmac;
    }
}


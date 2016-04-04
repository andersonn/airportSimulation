//Set up flightplan class

class Flightplan{
    constructor(xStart, yStart, xEnd, yEnd, zStart){
        //The start and ending position of the runway.
        this.xStart = xStart;
        this.yStart = yStart;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
        this.zStart = zStart;
    }
    
    checkClimb(loc, locY, locZ){
   
    }

    checkLeft(locX, locY, locZ){

    }

    checkRight(locX, locY, locZ){

    }

    checkDown(locX, locY, locZ){

    }

    update(locX, locY, locZ){
        var climb = checkClimb(locX, locY, locZ);
        var left = checkLeft(locX, locY, locZ);
        var right = checkRight(locX, locY, locZ);
        var down = checkDown(locX, locY, locZ);
        var message = {
            climb: climb,
            left: left,
            right: right,
            down: down
        };
        return message;
    }
}

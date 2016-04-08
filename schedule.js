//Schedules planes for the day.

function Schedule(numberOfPlanesToStart, numberOfArrivals){
        this.arrivals = [];
        this.departures = [];
        this.locations = ["Atlanta", "Austin", "Baltimore", "Burlington", 
                          "Boston", "Cancun", "Cape Girardeau", "Charlotte", 
                          "Chicago", "Cincinnati", "Cleveland", "Columbus",
                          "Dallas", "Decatur", "Denver", "Des Moines", 
                          "Detroit", "Fort Dodge", "Ft. Lauderdale", 
                          "Ft. Leonard", "Ft. Myers", "Grand Rapids", "Houston",
                          "Jackson", "Jonesboro", "Kansas City", "Kirksville",
                          "Las Vegas", "Liberia", "Little Rock", "Los Angelas",
                          "Marion", "Miami", "Milwaukee", "Minneapolis",
                          "Montego Bay", "Nashville", "New Orleans", "New York",
                          "Newark", "Oklahoma", "Omaha", "Orange County", 
                          "Owensboro", "Panama City", "Philadelphia", "Pittsburgh",
                          "Phoenix", "Portland", "Puerta Vallarta", "Punta Cana",
                          "Quincy", "Raleigh", "Salt Lake", "San Diego",
                          "San Antonio", "San Fransisco", "Seattle", "Tampa",
                          "Toronto", "Tulsa", "Washington DC", "Wichita"];
        this.numberOfPlanesToStart = numberOfPlanesToStart;
        this.numberOfArrivals = numberOfArrivals;
        this.buildSchedule();        
    };
    Schedule.prototype.constructor = Schedule;
    Schedule.prototype.buildSchedule = function(){
        var intervalOfArrival = this.numberOfArrivals/24;
        var time = 0;
        for(var i = 0; i < this.numberOfPlanesToStart; i++){
            var departTime = time;
            var temp = Math.floor(Math.random()*this.locations.length);
            var city =this.locations[temp];
            var plane = {departTime: departTime,
                         city: city
                        };
            this.departures.push(plane); 
            time += 5;
        }
        time = 0
        for(var i = 0; i < this.numberOfArrivals; i++){
            var arrivalTime = time;
            var temp = Math.floor(Math.random()*this.locations.length);
            var city = this.locations[temp];
            var plane = {arrivalTime: time,
                         city: city
                        };
            this.arrivals.push(plane);
            time+=intervalOfArrival;
        }
    }
    
    Schedule.prototype.getArrival = function(){
        var temp = this.arrivals[0];
        this.arrivals.shift();
        return temp;
    }
    
    Schedule.prototype.getDeparture = function(){
        var temp = this.departures[0];
        this.departures.shift();
        return temp;
    }
    
    Schedule.prototype.setDeparture = function(time){
        var temp = Math.floor(Math.random()*this.locations.length);
        var city = this.locations[temp];
        var plane = {departTime: time,
                     city: city
                    }
        this.departures.push(plane);
    }

    Schedule.prototype.printArrivals = function(){
        for(var i = 0; i<this.arrivals.length; i++){
            console.log(this.arrivals[i]);
        }
    }

    Schedule.prototype.printDepartures = function(){
        for(var i = 0; i<this.departures.length; i++){
            console.log(this.departures[i]);
        }
    }

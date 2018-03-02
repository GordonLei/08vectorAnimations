// Context + Canvas
var svgContainer = document.getElementById("SVG");

//buttons
var clearButton = document.getElementById("clearButton");
var stopButton = document.getElementById("stopButton");
var drawCircleButton = document.getElementById("drawCircleButton");
var DVDButton = document.getElementById("DVDButton");

//temp variables
var timerID = null;
var animation = "drawCircle"; 
var fillStyle = "#b0c4de";

//animate method
var animate = function(){
    //temp variables
    var radius = 0;

    var x = svgContainer.getAttribute("width")/2;
    var y = svgContainer.getAttribute("height")/2;

    //max holds the max possible radius the circle can have (depending on canvas size)
    var max = 0;
    var expand = true;

    //decide the random motion (neither increment = 0)
    var temp = [-1,1];
    var xIncrement= temp[Math.floor(Math.random() * 2)];
    var yIncrement = temp[Math.floor(Math.random() * 2)];

    //check and store max radius possible for circle
    if (svgContainer.getAttribute("width") < svgContainer.getAttribute("height")){
        console.log("max is found");
        max = svgContainer.getAttribute("width") / 2;
    }
    else{
        console.log("max is found");
        max = svgContainer.getAttribute("height") / 2;
    }
    console.log(max);

    //draw the circle
    var drawCircle = function(){
        console.log("starting to draw circle...");
        //clear previous frame
        clear();

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        //if max is achieved, start to contract
        if(radius >= max && expand == true){
            console.log("Beginning to contract... radius = " + radius + " max = " + max);
            circle.setAttribute("cx", svgContainer.getAttribute("width")/2);
            circle.setAttribute("cy", svgContainer.getAttribute("height")/2);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "#b0c4de");
            svgContainer.appendChild(circle);
            expand=false;
        }

        //else if circle is at 0 radius and has finished contracting, start to grow smaller
        else if(radius == 0 && expand == false){
            console.log("Beginning to expand...radius = " + radius + " max = " + max);
            circle.setAttribute("cx", svgContainer.getAttribute("width")/2);
            circle.setAttribute("cy", svgContainer.getAttribute("height")/2);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "#b0c4de");
            svgContainer.appendChild(circle);
            expand=true;
        }

        //else if circle is not at max and is still increasing, continue to expand
        else if (radius <= max && expand == true){
            console.log("increasing circle size; radius = " + radius + " max = " + max);
            circle.setAttribute("cx", svgContainer.getAttribute("width")/2);
            circle.setAttribute("cy", svgContainer.getAttribute("height")/2);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "#b0c4de");
            svgContainer.appendChild(circle);
            radius++;
        }
        
        //technically an else statement will be fine since all outcomes can be achieved but I like cases...
        //else if radius is less than max and it was to decrease then decrease...
        else if(radius <= max && expand == false){
            console.log("decreasing circle size; radius = " + radius + " max = " + max);
            circle.setAttribute("cx", svgContainer.getAttribute("width")/2);
            circle.setAttribute("cy", svgContainer.getAttribute("height")/2);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "#b0c4de");
            svgContainer.appendChild(circle);
            radius--;
        }

        //fill circle
        console.log("finished drawing circle");
        
        //log
        console.log(timerID);
    };

    var drawDVD = function(){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        console.log("starting to draw circle...");
        radius = 25;
        //clear previous frame
        clear();

        //draw circle
        console.log("Drawing circle radius = " + radius + " max = " + max);
        circle.setAttribute("cx", (x + xIncrement));
        circle.setAttribute("cy", (y + yIncrement));
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", fillStyle);
        svgContainer.appendChild(circle);
        console.log("xIncrement: " + xIncrement + " yIncrement: " + yIncrement);
        x += xIncrement;
        y += yIncrement;

        //check if circle is near the edges 
        if (x - (radius + Math.abs(xIncrement))<= 0 || x + (radius + Math.abs(xIncrement)) >= svgContainer.getAttribute("width")) {
            //negate the increment to bounce back opposite direction.
            //Math.random() is to make sure that it doesn't just bounce back the same direction
                //However for some reason if you use too small of a number to minimize Math.random(),
                    //for example changing the .4 to a .2,  
                    //sometimes the circle spazzes out and sinks into the canvas edges. 
            xIncrement = -xIncrement + (Math.random() - .05);
            console.log("speed in X is now: " + xIncrement);
            //change fillcolor;
            fillStyle = "#" + Math.floor((Math.random()*16777215)).toString(16);
        }
        if (y - (radius + Math.abs(yIncrement))<= 0 || y + (radius + Math.abs(yIncrement))>= svgContainer.getAttribute("height")) {
            yIncrement = -yIncrement + (Math.random() - .05);
            console.log("speed in Y is now: " + yIncrement);
            //change fillcolor;
            fillStyle = "#" + Math.floor((Math.random()*16777215)).toString(16);
        }
        
        //fill circle
        console.log("finished drawing circle");
        
        //log next frame
        console.log(timerID);

        
    };

    //recursive callback
    if (animation == "drawCircle"){
        console.log("drawing circle next...");
        timerID = setInterval(drawCircle, 10);
    }
    else if (animation == "drawDVD"){
        console.log("drawing DVD animation next...");
        timerID = setInterval(drawDVD, 10);
    }
};

var stop = function(){
    clearInterval(timerID);
};

var clear = function(){
    svgContainer.innerHTML = "";
    tempX = null;
    tempY = null;
};

var toggleCircle = function(){
    animation = "drawCircle";
    console.log("Animation is now: " + animation)
};

var toggleDVD = function(){
    animation = "drawDVD";
    console.log("Animation is now: " + animation)
};

clearButton.addEventListener("click", clear);
stopButton.addEventListener("click", stop);
drawCircleButton.addEventListener("click", toggleCircle);
DVDButton.addEventListener("click", toggleDVD);

svgContainer.addEventListener("click", animate);


img = "";
status = "";
object = [];

function preload(){
   alarm = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(380,380); 
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized!");
    status = true;
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }

    if (results){
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Status = Baby Detected";
        }
    }
    else{
        document.getElementById("status").innerHTML = "Status = Baby Not Detected";
        alarm.play();
    }

    if(object.length<0){
        document.getElementById("status").innerHTML = "Status = Baby Not Detected";
        alarm.play();
    }
}

status="";
objects=[];

function preload(){
     video = createVideo('video.mp4'); 
    }

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}


function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            fill("orange");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("orange");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("status").innerHTML="objects detected !";
            document.getElementById("number_of_objects").innerHTML=" The number of objects are " + objects.length;
                }
    }
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
    video.speed(1);
    video.volume(0);
    video.loop();
}

function gotResults(error,results){
    if(error){
    console.error(error);
    }
    else{
        console.log(results);
        objects=results;

    }
}

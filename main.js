status = "";
object = "";
objects = [];


function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
    alarm = loadSound("security-alarm-80493.mp3");
    alarm.setVolume(0.5);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('statusm').innerHTML = 'Status: detecting objects...';
    object = document.getElementById('input').value;
}

function modelLoaded(){
console.log('Model Loaded!');
status = true;
}

function draw(){
      image(video,0,0,500,500);

    if(status != ""){
        objectDetector.detect(canvas,gotResult);
        for(i = 0; i<objects.length; i++){
            percent = floor(objects[i].confidence*100);
            label = objects[i].label;
            stroke("#FF0000");
            fill("#FF0000");
            text(label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object == objects[i].label){
                objectDetector.detect(gotResult);
                video.stop()
                document.getElementById("statuso").innerHTML = "Object found!"
                var synth = window.speechSynthesis;

                speak_data = objects[i].label + " found!";
            
                var utterThis = new SpeechSynthesisUtterance(speak_data);
            
                synth.speak(utterThis);

                alarm.play();
                
          }
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


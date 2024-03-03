status = "";
object = "";
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML = 'Status: detecting objects..';
    object = document.getElementById('input').value;
}

function modelLoaded(){
console.log('Model Loaded!');
status = true;
}

function draw(){
    translate(width,0); 
  scale(-1.0,1.0);   
    image(video,0,0,500,500);
}
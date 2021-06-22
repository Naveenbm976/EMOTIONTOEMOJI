Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

Webcam.attach('#camera');

function TakeSnapShot(){
    Webcam.snap(function(data_uri){
    document.getElementById("Result").innerHTML="<img id='capture_image' src='"+data_uri+"'>";
    });
}

prediction1="";
prediction2="";

function speak(){
    var synth=window.speechSynthesis;
    sentence1="the first prediction is"+prediction1;
    sentence2="The second prediction is"+prediction2;
    content=sentence1+sentence2;
    var utterthis=new SpeechSynthesisUtterance(content);
    synth.speak(utterthis);
}

console.log("ml5 version is ",ml5.version);

//classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/C4xbyNPhv/model.json",modelloaded);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json",modelloaded);
function modelloaded(){
    console.log("model is loaded");
}

 function check(){
     img=document.getElementById("capture_image");
     classifier.classify(img,gotresults);
 }

 function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("Emotion_name_1").innerHTML=prediction1;
        document.getElementById("Emotion_name_2").innerHTML=prediction2;
        speak();
        if(prediction1=="angry"){
        document.getElementById("Emoji_1").innerHTML="&#128548;";
        }
        if(prediction1=="sad"){
        document.getElementById("Emoji_1").innerHTML="&#128532;";
        }
        if(prediction1=="happy"){
        document.getElementById("Emoji_1").innerHTML="&#128522;";
        }

        if(prediction2=="angry"){
        document.getElementById("Emoji_2").innerHTML="&#128548;";
        }
        if(prediction2=="sad"){
        document.getElementById("Emoji_2").innerHTML="&#128532;";
        }
        if(prediction2=="happy"){
        document.getElementById("Emoji_2").innerHTML="&#128522;";
        }
    }
 }
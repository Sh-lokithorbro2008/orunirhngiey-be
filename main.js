function setup()
{
    canvas=createCanvas(280,280)
    canvas.center()
    background("white") 
    canvas.mouseReleased(classifyCanvas)
    var synth=window.speechSynthesis
}

function clear_canvas()
{
    background("white")
}

function preload()
{
    classifier=ml5.imageClassifier("DoodleNet")
}

function draw()
{
    strokeWeight(13)
    stroke(0)

    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}

function gotResult(error,result){
    if (error){
        console.log(error)
    }
    console.log(result)
    document.getElementById("label").innerHTML= " " + result[0].label
    document.getElementById("confidence").innerHTML= " " + Math.round(result[0].confidence * 100) + "%"

    utterThis=new SpeechSynthesisisUtterance(result[0].label)
    synth.speak(utterThis)
}
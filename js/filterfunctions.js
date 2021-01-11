

var medPanels = 0;

function getInputs(){
    medPanels = document.getElementById("inpMediumPanels").value;
    var shortPanels = document.getElementById("inpShortPanels").value;
    length = document.getElementById("inpLength").value/10;
    depth = document.getElementById("inpDepth").value/10;
    height = document.getElementById("inpHeight").value/10;
    
    if(document.getElementById("1over4").checked){
        panelDepth = 6.35/10;
    }else{
        panelDepth = 9.525/10;
    }
    

    document.getElementById("lblHeight").innerHTML = document.getElementById("inpHeight").value;
    document.getElementById("lblDepth").innerHTML = document.getElementById("inpDepth").value;
    document.getElementById("lblLength").innerHTML = document.getElementById("inpLength").value;

    updateDimensions();    
}

function updateDimensions(){
    console.log("Dimensions updating");
    for(var i = 0; i<longpanels.length; i++){
        longpanels[i].scale.x = length/45;
        longpanels[i].scale.y = height/4;
        
        if(i == 0){
        longpanels[i].position.x = depth/2;
        }else{
        longpanels[i].position.x = -1*(depth/2);
        }
    }

    if(medpanels.length != medPanels){
        
        for(var i = 0; i<medpanels.length; i++){
            scene.remove(medpanels[i]);
        }
        makeMediumPanels();
    }

    for(var i = 0; i<medpanels.length; i++){
        medpanels[i].scale.x = depth/45;
        medpanels[i].scale.y = height/4;
        repositionMediumPanels();
    }
}


function repositionMediumPanels(){
    var spacing = length / (medPanels-1);
    
    for(var i = 0; i<medpanels.length; i++){
    medpanels[i].position.z = 0;
    medpanels[i].position.z += i*spacing;
    medpanels[i].position.z -= .5*length;
    }
}


function makeMediumPanels(){
    var spacing = length / (medPanels-1);
    console.log("Trying to reference filters.js")
    //NEED A WAY TO REBUILD THE MEDIUM PANELS.
    //PROBLEM: CANNOT IMPORT 3JS HERE
    //PROBLEM: CANNOT REFERNECE MODULE FROM HERE
    sayHello();
}


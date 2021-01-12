var medPanels = 0;


console.log("filterfunctions.js loaded");


function getInputs(){
    medPanels = document.getElementById("inpMediumPanels").value;
    shortPanels = document.getElementById("inpShortPanels").value;
    length = document.getElementById("inpLength").value/10;
    depth = document.getElementById("inpDepth").value/10;
    height = document.getElementById("inpHeight").value/10;
    
    document.getElementById("lblHeight").innerHTML = document.getElementById("inpHeight").value;
    document.getElementById("lblDepth").innerHTML = document.getElementById("inpDepth").value;
    document.getElementById("lblLength").innerHTML = document.getElementById("inpLength").value;

    updateDimensions();    
}


/*
function updateDimensions(){
    console.log("Dimensions updating");
    for(var i = 0; i<longpanels.length; i++){
        longpanels[i].scale.x = length/tmplenscale;
        longpanels[i].scale.y = height/4;  //leaving this as 45 will break the program.  need to redraw EVERYTHING, not just medium and small panels.
        
        console.log("DEPTH: " + depth);
        if(i == 0){
        longpanels[i].position.x = depth/2;
        }else{
        longpanels[i].position.x = -1*(depth/2);
        }
    }

    for(var i = 0; i<medpanels.length; i++){
        medpanels[i].scale.x = depth/tmpdepscale;
        medpanels[i].scale.y = height/tmpheiscale;
        repositionMediumPanels();
    }

    for(var i = 0; i < shortpanels.length; i++){
        shortpanels[i].scale.x = length/tmplenscale;
        shortpanels[i].scale.y = height/tmpheiscale;
        repositionShortPanels();
    }

    rebuildMedPanels = true; //This is CPU intensive as all heck but it fixed issues.
}*/

function updateDimensions(){
    rebuildAll = true;
}

/*

function repositionMediumPanels(){
    spacing = (length / (medPanels-1)) - (panelDepth/medPanels);

    for(var i = 0; i<medpanels.length; i++){
    medpanels[i].position.z = 0;
    medpanels[i].position.z += i*spacing;
    medpanels[i].position.z -= (.5*length)-(.5*panelDepth);
    }
}

function clearCanvasThenGetInputs(){
    rebuildAll = true;
}


function repositionShortPanels(){
    var panelIndex = 0;
    var shortPanelsPerRow = medPanels - 1;
    var rowsOfShortPanels = shortPanels / (medPanels-1);
    var shortPanelRowSpacing = depth / (rowsOfShortPanels+1);

    for(var i = 0; i<rowsOfShortPanels; i++){
        for(var j = 0; j<shortPanelsPerRow; j++){

            //z is spacing between mediums
            shortpanels[panelIndex].position.z = (-length/2)+(.5*spacing)+(.5*panelDepth);
            shortpanels[panelIndex].position.z += j*spacing;

            //x is spacing between rows of short panels
            
            shortpanels[panelIndex].position.x = -depth/2;
            shortpanels[panelIndex].position.x += (i+1)*shortPanelRowSpacing;

            panelIndex++;
        }
    }

}
*/
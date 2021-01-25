var medPanels = 0;


console.log("filterfunctions.js loaded");


function getInputs(){
    medPanels = document.getElementById("inpMediumPanels").value;
    shortPanels = document.getElementById("inpShortPanels").value;
    length = document.getElementById("inpLength").value/10;
    depth = document.getElementById("inpDepth").value/10;
    height = document.getElementById("inpHeight").value/10;
    
    document.getElementById("lblHeight").value = document.getElementById("inpHeight").value;
    document.getElementById("lblDepth").value = document.getElementById("inpDepth").value;
    document.getElementById("lblLength").value = document.getElementById("inpLength").value;

    updateDimensions(); 
       
}


/*
Alternative getInputs function which prioritizes the value in the textboxes rather than the sliders.
*/
function getInputsAlt(){
    medPanels = document.getElementById("inpMediumPanels").value;
    shortPanels = document.getElementById("inpShortPanels").value;
    length = document.getElementById("lblLength").value/10;
    depth = document.getElementById("lblDepth").value/10;
    height = document.getElementById("lblHeight").value/10;
    
    document.getElementById("inpHeight").value = document.getElementById("lblHeight").value;
    document.getElementById("inpDepth").value = document.getElementById("lblDepth").value;
    document.getElementById("inpLength").value = document.getElementById("lblLength").value;

    updateDimensions(); 
       
}



function updateDimensions(){
    rebuildAll = true;
    calculateFilterWeight();
    calculateFilterVolume();
    calculateCarbonVolume();
    calculatePlasticVolume();
    calculateOpenSurfaceArea();
    calculateSmallPanelLength();
    calculateMedPanelLength();
    calculateLongPanelLength();
    calculateCutHeight();
}



function resetShortPanels(){
    shortpanelreset = true;
}

function moreShortPanels(){
    var int = document.getElementById("inpShortPanels").value;
    int = parseInt(int) + 1;
    
    document.getElementById("inpShortPanels").value = int;
    shortPanels = int;
}


///////////////////////////////////////////////////////
//////////FUNCTIONS FO RJOSH TO BUILD OUT/////////////
/////////////////////////////////////////////////////


var medPanelLength = 0;
var longPanelLength = 0
var longPanelArea = 0
var shortPanelLength = 0
var openSurfaceArea = 0;
var intVolume = 0;
var carbonVolume = 0;
var plasticVolume = 0;
//POUNDS
function calculateFilterWeight(){
    var filterWeight = 0;

    //This uses ACI plastic as a baseline. (Density of 0.646)

    var carbonDensity = 0.646;
    filterWeight = carbonDensity * length*depth*height;
    filterWeight /= 454;

    document.getElementById("spanFilterWeight").innerHTML = filterWeight.toFixed(1);
}


//CUBIC CENTIMETERS
function calculateFilterVolume(){
    var filterVolume = 0;

    //Calculations here

    filterVolume = length * depth * height;
    //console.log("Filter Volume: " + filterVolume);

    document.getElementById("spanFilterVolume").innerHTML = filterVolume.toFixed(1) + 'cc';
}

//CUBIC CENTIMETERS
function calculateCarbonVolume(){
  
}

function calculatePlasticVolume(){
   
}

function calculateOpenSurfaceArea(){
    openFaceArea = (length * depth) - (((longPanelLength*panelDepth)*longPanels)+((medPanelLength*panelDepth)*medPanels)+((shortPanelLength*panelDepth)*shortPanels));
    console.log("Open Face Area: " + openFaceArea);
    var totalFaceArea = (length)*(depth);
    console.log(totalFaceArea)
    var percentOpen = openFaceArea/totalFaceArea;

    document.getElementById("spanOpenArea").innerHTML = percentOpen.toFixed(5);
}

function calculateSmallPanelLength(){
    var chambersPerRow = medPanels - 1; //The ammount of chambers in a row is equal to the ammount of medium panels - 1
    //var chambers = 1.5 * shortPanels; //There are 1.5 times more chambers than small panels
    var shortPanelsPerRow = chambersPerRow;
    shortPanelLength = (length - (medPanels * panelDepth))/shortPanelsPerRow;
    //console.log("Short Panel Length: " + shortPanelLength*10);

    document.getElementById("spanSmallPanelLength").innerHTML = (shortPanelLength*10).toFixed(1) + 'mm';
}

function calculateMedPanelLength(){
     medPanelLength = (depth) - (2 * panelDepth);

    document.getElementById("spanMedPanelLength").innerHTML = (medPanelLength*10).toFixed(1) + 'mm';
}

function calculateLongPanelLength(){
     longPanelLength = length;
     longPanelArea = length * height;
     //console.log("Long Panel Length: " + longPanelLength*10);

    document.getElementById("spanLongPanelLength").innerHTML = (longPanelLength*10).toFixed(1) + 'mm';
}

function calculateCutHeight(){
    var cutheight = document.getElementById('lblHeight').value;
    cutheight = parseInt(cutheight) + 3;

   document.getElementById("spanCutHeight").innerHTML = cutheight;
}
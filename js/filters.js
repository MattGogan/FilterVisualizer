import * as THREE from '/THREE/build/three.module.js';
import {OrbitControls} from '/THREE/examples/jsm/controls/OrbitControls.js';

scene = new THREE.Scene();

var medPanels = 0;
var spacing = 0;

var shinyBlackMat = new THREE.MeshPhongMaterial( { 
    color: 0x202020,
    specular: 0x050505,
    shininess: 1000
});


window.onload = function(){
    console.log("filters.js loaded");
    initInputs();
    executethree(); 

}



function initInputs(){
    medPanels = document.getElementById("inpMediumPanels").value;
    shortPanels = document.getElementById("inpShortPanels").value;
    length = document.getElementById("inpLength").value/10;
    depth = document.getElementById("inpDepth").value/10;
    height = document.getElementById("inpHeight").value/10;
    
    //panelDepth = .635;
    panelDepth = document.querySelector('input[name = "plasticdepth"]:checked').value;

    var radios = document.getElementsByName('plasticdepth');
    console.log(radios)


    document.getElementById("lblHeight").innerHTML = document.getElementById("inpHeight").value;
    document.getElementById("lblDepth").innerHTML = document.getElementById("inpDepth").value;
    document.getElementById("lblLength").innerHTML = document.getElementById("inpLength").value;
}





function executethree(){

///////////////////////////////////////
///////////    CAMERA       //////////
/////////////////////////////////////   

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    var renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setSize(600, 600);
    const controls = new OrbitControls( camera, renderer.domElement );

    //camera.position.z = 100;
    camera.position.set(80,36.5,80);
    camera.rotateY(Math.PI/4);
    camera.rotateX(-Math.PI/10);

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xeeeeee, 1); 
    document.body.appendChild( renderer.domElement );
   

///////////////////////////////////////
///////////    GROUND       //////////
/////////////////////////////////////    

    const geometry = new THREE.PlaneGeometry( 2000, 2000, 100 );
    const material = new THREE.MeshBasicMaterial( {color: 0x005695, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI/2);
    plane.position.y-=150;
    scene.add( plane );

///////////////////////////////////////
///////////    LIGHTS       //////////
/////////////////////////////////////

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = .8;
const lighthemi = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(lighthemi);



///Directional light??

const color = 0xFFFFFF;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

const light2 = new THREE.DirectionalLight(color, .3);
light2.position.set(0, 10, 20);
light2.target.position.set(5, 0, 0);
//scene.add(light2);
//scene.add(light2.target);
    
///////////////////////////////////////
///////////    ACTION       //////////
/////////////////////////////////////

function animate() { 
        
        if(rebuildAll){
            panelDepth = document.querySelector('input[name = "plasticdepth"]:checked').value;
            console.log("PANEL DEPTH: " + panelDepth);
            rebuildAll = false;
            clearLongPanels();
            clearMedPanels();
            clearShortPanels();
            makeLongPanels();
        }   

        if(document.getElementById("inpMediumPanels").value != medpanels.length || rebuildMedPanels){
            //clearMedPanels();
            //clearShortPanels();
            //makeMediumPanels();

            clearLongPanels();
            clearMedPanels();
            clearShortPanels();
            makeLongPanels();
        }

        if(document.getElementById("inpShortPanels").value != shortpanels.length){
            clearShortPanels();
            makeShortPanels();
        }
        
        renderer.render( scene, camera );
        
    
        requestAnimationFrame(animate); 
}

animate();
makeLongPanels();

}

function clearLongPanels(){
    for(var i = 0; i<longpanels.length; i++){
        scene.remove(longpanels[i]);
    }
    longpanels = [];
}

function clearMedPanels(){
    for(var i = 0; i<medpanels.length; i++){
        scene.remove(medpanels[i]);
    }
    medpanels = [];
    medPanels = document.getElementById("inpMediumPanels").value;
}

function clearShortPanels(){
    for(var i = 0; i<shortpanels.length; i++){
        scene.remove(shortpanels[i]);
    }
    shortpanels = [];
    shortPanels = document.getElementById("inpShortPanels").value;
}


function makeLongPanels(){
    //console.log("Building long panels");
    tmpdepscale = document.getElementById("inpDepth").value/10;
    
    for(var i = -1; i<1.1; i+=2){
    var geometry = new THREE.BoxGeometry(length,height,panelDepth);
    //var material = new THREE.MeshPhongMaterial( { color: 0x00000 } ); 
    var cube = new THREE.Mesh( geometry, shinyBlackMat ); 
    cube.rotateY(Math.PI/2);

    cube.position.x = i*depth/2;

    longpanels.push(cube);
    scene.add(cube);
    }
    makeMediumPanels();

}

function makeMediumPanels(){
    //console.log("Building Medium Panels");
    rebuildMedPanels = false;

    shortPanels = document.getElementById("inpShortPanels").value;
    if(shortPanels % (medPanels-1) !== 0){
        shortPanels = 2*(medPanels-1);
        document.getElementById("inpShortPanels").value = shortPanels;
    }
    document.getElementById("inpShortPanels").setAttribute("step", (medPanels-1));

    console.log(panelDepth);
    console.log(medPanels);
    spacing = (length / (medPanels-1)) - (panelDepth/(medPanels-1));

    tmpdepscale = document.getElementById("inpDepth").value/10;
    tmpheiscale = document.getElementById("inpHeight").value/10;


    for(var i = 0; i<medPanels; i++){//var i = -.5*medPanels; i<.5*medPanels;i++
        var geometry = new THREE.BoxGeometry(depth - (.5*panelDepth),height,panelDepth);
        var material = new THREE.MeshPhongMaterial( { color: 0xFF0000 } ); 
        var cube = new THREE.Mesh( geometry, shinyBlackMat ); 

        cube.position.z += i*spacing;
        cube.position.z -= (.5*length)-(.5*panelDepth);


        medpanels.push(cube);

        scene.add(cube);
    }
    
    clearShortPanels();
    makeShortPanels();
}



function makeShortPanels(){

    var shortPanelsPerRow = medPanels - 1;
    var rowsOfShortPanels = shortPanels / (medPanels-1);
    var shortPanelRowSpacing = depth / (rowsOfShortPanels+1);

    if(shortPanels % (medPanels-1) !== 0){
        console.log("Trying more panels...");
        shortPanels++;
        document.getElementById("inpShortPanels").value=shortPanels;
        document.getElementById("inpShortPanels").setAttribute("step", (medPanels-1));
    }else{
    document.getElementById("inpShortPanels").setAttribute("step", (medPanels-1));
    //console.log("Building Short Panels");
    for(var i = 0; i<rowsOfShortPanels; i++){
        for(var j = 0; j<shortPanelsPerRow; j++){
            var geometry = new THREE.BoxGeometry(spacing-(panelDepth),height,panelDepth);
            var material = new THREE.MeshPhongMaterial( { color: 0x00FF00 } ); 
            var cube = new THREE.Mesh( geometry, shinyBlackMat ); 

            //z is spacing between mediums
            cube.position.z = (-length/2)+(.5*spacing)+(.5*panelDepth);
            cube.position.z += j*spacing;

            //x is spacing between rows of short panels
            
            cube.position.x = -depth/2;
            cube.position.x += (i+1)*shortPanelRowSpacing;
            
            cube.rotateY(Math.PI/2);


            shortpanels.push(cube);

            scene.add(cube);
        }
    }

    }
}
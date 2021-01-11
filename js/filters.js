import * as THREE from '/THREE/build/three.module.js';
import {OrbitControls} from '/THREE/examples/jsm/controls/OrbitControls.js';

scene = new THREE.Scene();
var panels = [];
var medPanels = 0;
var shortPanels = 0;

window.onload = function(){
    console.log("filters.js loaded");
    initInputs();
    executethree(); 

    document.getElementById("inpHeight").addEventListener('input', initInputs());



}



function initInputs(){
    medPanels = document.getElementById("inpMediumPanels").value;
    shortPanels = document.getElementById("inpShortPanels").value;
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















function executethree(){

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    const controls = new OrbitControls( camera, renderer.domElement );

    camera.position.z = 100;

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xeeeeee, 1); 
    document.body.appendChild( renderer.domElement );

    

function animate() { 
        
        for(var i = 0; i<panels.length; i++){
            //panels[i].rotateX(.01);
        }
        renderer.render( scene, camera );
        
    
        requestAnimationFrame(animate); 
}

animate();
makeLongPanels();
makeMediumPanels();

}


function makeLongPanels(){
    
    for(var i = -1; i<1.1; i+=2){
    var geometry = new THREE.BoxGeometry(length,height,panelDepth);
    var material = new THREE.MeshBasicMaterial( { color: 0x00000 } ); 
    var cube = new THREE.Mesh( geometry, material ); 
    cube.rotateY(Math.PI/2);

    cube.position.x = i*length/2;

    

    longpanels.push(cube);
    scene.add(cube);
    }
}

function makeMediumPanels(){
    var spacing = length / (medPanels-1);

    for(var i = 0; i<medPanels; i++){//var i = -.5*medPanels; i<.5*medPanels;i++
        var geometry = new THREE.BoxGeometry(length,height,panelDepth);
        var material = new THREE.MeshBasicMaterial( { color: 0x000000 } ); 
        var cube = new THREE.Mesh( geometry, material ); 

        cube.position.z += i*spacing;
        cube.position.z -= .5*length;

        medpanels.push(cube);

        scene.add(cube);
    }
}
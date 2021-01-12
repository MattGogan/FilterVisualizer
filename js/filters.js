//CDNs
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';


//import * as THREE from '/THREE/build/three.module.js';
//import {OrbitControls} from '/THREE/examples/jsm/controls/OrbitControls.js';

scene = new THREE.Scene();

var medPanels = 0;
var spacing = 0;

var shinyBlackMat = new THREE.MeshPhongMaterial( { 
    color: 0x202020,
    specular: 0x050505,
    shininess: 1000
});

var scrimMat;
var foamMat;
var labelMat;
var certMat; 

const loader = new THREE.TextureLoader();

loader.load(
    '/assets/scrim2.jpg',
    function ( texture ) {
        scrimMat = new THREE.MeshPhongMaterial( {
            map: texture,
            bumpMap: texture,
            bumpScale: 100.0,
    })});

loader.load(
    '/assets/foam2.jpg',
    function ( texture ) {
        foamMat = new THREE.MeshPhongMaterial( {
            map: texture,
            bumpMap: texture,
            bumpScale: 100.0,
    })});

loader.load(
    '/assets/conformance1.jpg',
    function ( texture ) {
        certMat = new THREE.MeshPhongMaterial( {
            map: texture,
    })});

loader.load(
    '/assets/serial1.jpg',
    function ( texture ) {
        labelMat = new THREE.MeshPhongMaterial( {
            map: texture,
    })});

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
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(600, 600);
    const controls = new OrbitControls( camera, renderer.domElement );

    //camera.position.z = 100;
    camera.position.set(80,36.5,80);
    camera.rotateY(Math.PI/4);
    camera.rotateX(-Math.PI/10);

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xeeeeee, 1); 
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    document.body.appendChild( renderer.domElement );
   

///////////////////////////////////////
///////////    GROUND       //////////
/////////////////////////////////////    
/*
    const geometry = new THREE.PlaneGeometry( 2000, 2000, 100 );
    const material = new THREE.MeshBasicMaterial( {color: 0x005695, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI/2);
    plane.position.y-=150;
    plane.receiveShadow = true;
    scene.add( plane );
    */

// Floor code taken from pointerlock example provided by three.js

    const vertex = new THREE.Vector3();
    const color2 = new THREE.Color();
    let floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 );
    

    

    let position = floorGeometry.attributes.position;

    for ( let i = 0, l = position.count; i < l; i ++ ) {

        vertex.fromBufferAttribute( position, i );

        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

        position.setXYZ( i, vertex.x, vertex.y, vertex.z );

    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for ( let i = 0, l = position.count; i < l; i ++ ) {

        color2.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        colorsFloor.push( color2.r, color2.g, color2.b );

    }

    floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

    const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.position.y-=100;
    scene.add( floor );




///////////////////////////////////////
///////////    LIGHTS       //////////
/////////////////////////////////////

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = .6;
const lighthemi = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(lighthemi);



///Directional light??

const color = 0xFFFFFF;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
light.castShadow = true;
scene.add(light);
scene.add(light.target);

const light2 = new THREE.DirectionalLight(color, .3);
light2.position.set(0, 40, 0);
light2.target.position.set(0, 0, 0);
scene.add(light2);
scene.add(light2.target);
    
///////////////////////////////////////
///////////    ACTION       //////////
/////////////////////////////////////

function animate() { 
        
        if(rebuildAll){
            panelDepth = document.querySelector('input[name = "plasticdepth"]:checked').value;
            rebuildAll = false;
            clearLongPanels();
            clearMedPanels();
            clearShortPanels();
            clearScrims();
            clearAccessories();
            makeLongPanels();
            
            if(document.getElementById("ckbxShowScrim").checked){
                makeScrim();
            }

            if(document.getElementById("ckbxTopGasket").checked){
                makeTopGasket();
            }
            
            if(document.getElementById("ckbxBotGasket").checked){
                makeBottomGasket();
            }
            
            if(document.getElementById("ckbxShowLabels").checked){
                makeLabels();
            }

        }   

        if(document.getElementById("inpMediumPanels").value != medpanels.length || rebuildMedPanels){
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

function clearScrims(){
    for(var i = 0; i<scrims.length; i++){
        scene.remove(scrims[i]);
    }
    scrims = [];
}

function clearAccessories(){
    for(var i = 0; i<accessories.length; i++){
        scene.remove(accessories[i]);
    }
    accessories = [];
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


function makeScrim(){
        for(var i = -1; i<1.1; i+=2){
            var geometry = new THREE.BoxGeometry(depth,.05,length);
            var cube = new THREE.Mesh( geometry, scrimMat ); 
        
            cube.position.y = height*.49*i;

            scrims.push(cube);
            scene.add(cube);
            }
}


function makeTopGasket(){
    var gasketWidth = 1.905;

    for(var i = -1; i<2; i+=2){
        for(var j = -1; j<2; j+=2){
            var gasket;
            if(i == -1){
            var geom = new THREE.BoxGeometry(depth, .635, gasketWidth);
            gasket = new THREE.Mesh(geom, foamMat);
            gasket.position.z = (length*.5*j)
            if(j==-1){
                gasket.position.z+=(gasketWidth/2);
            }else{
                gasket.position.z-=(gasketWidth/2);
            }
        
            }else{
            var geom = new THREE.BoxGeometry(gasketWidth, .635, length);
            gasket = new THREE.Mesh(geom, foamMat);
            gasket.position.x = depth*.5*j;
            if(j==-1){
                gasket.position.x+=(gasketWidth/2);
            }else{
                gasket.position.x-=(gasketWidth/2);
            }
            }

            gasket.position.y += (height/2)+(.635/2);

            accessories.push(gasket);
            scene.add(gasket);
        }
    }
}


function makeBottomGasket(){
    var gasketWidth = 1.905;

    for(var i = -1; i<2; i+=2){
        for(var j = -1; j<2; j+=2){
            var gasket;
            if(i == -1){
            var geom = new THREE.BoxGeometry(depth, .635, gasketWidth);
            gasket = new THREE.Mesh(geom, foamMat);
            gasket.position.z = (length*.5*j)
            if(j==-1){
                gasket.position.z+=(gasketWidth/2);
            }else{
                gasket.position.z-=(gasketWidth/2);
            }
        
            }else{
            var geom = new THREE.BoxGeometry(gasketWidth, .635, length);
            gasket = new THREE.Mesh(geom, foamMat);
            gasket.position.x = depth*.5*j;
            if(j==-1){
                gasket.position.x+=(gasketWidth/2);
            }else{
                gasket.position.x-=(gasketWidth/2);
            }
            }

            gasket.position.y -= (height/2)+(.635/2);

            accessories.push(gasket);
            scene.add(gasket);
        }
    }
}


function makeLabels(){
    var labelGeometry = new THREE.BoxGeometry(10, 3.5, .05);
    var labelMesh = new THREE.Mesh(labelGeometry, labelMat);
    labelMesh.position.x += depth/2;
    var plus = panelDepth/2;
    labelMesh.position.x+=plus;
    labelMesh.rotateY(Math.PI/2);

    accessories.push(labelMesh);
    scene.add(labelMesh);


    var certMesh = new THREE.Mesh(labelGeometry, certMat);
    certMesh.position.z += length/2;
    //certMesh.position.z += plus;
    certMesh.position.x = depth/2;
    certMesh.position.x-=5;
    certMesh.position.y+=((height/2)-1.75);
    accessories.push(certMesh);
    scene.add(certMesh);

}
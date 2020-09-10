//const { Loader } = require("./three");

let treeMeshes = [];
let treecount = 0;
var scene = new THREE.Scene();

window.onload = function(){
    console.log("Bazooper");
    winloaded();
}


function winloaded(){
    treeMeshes = [];
    executethree(); 
}



function executethree(){

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 20;

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xffffff, 1); 
    document.body.appendChild( renderer.domElement );


      let messages = [
          "Carbon Footprint Questionnaire",
          "More Trees?",
          "Even more trees?"   
      ]
    
      let textobjects = [];
      
      

      for(i = 0; i<messages.length; i++){
        
        textobjects[i] = new THREE.TextSprite({
        fillStyle: '#00000',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 5,
        fontStyle: 'italic',
        text: [
            messages[i]
            ].join('\n'),
        });

      }

    textobjects[0].position.y+=10;
    textobjects[0].position.x-=20;
    scene.add(textobjects[0]);
    scene.add(textobjects[1]);

    function animate() { 
        requestAnimationFrame(animate); 
        renderer.render( scene, camera );
        
        textobjects[0].position.x +=.1;
        if(textobjects[0].position.x > 25 && textobjects[1].position.y<10){
            textobjects[1].position.y+=.05;
        }

        for(i = 0; i<treeMeshes.length; i++){
            treeMeshes[i].rotation.y+=.01;
        }

    }

    animate();

}


function addTree(){
    var geometry = new THREE.BoxGeometry(); 

    //var loader = new OBJLoader();

    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
    var cube = new THREE.Mesh( geometry, material ); 
    cube.position.z = -5;
    cube.position.x += Math.random()*40-20;
    cube.position.y += Math.random()*30-15;
    treeMeshes.push(cube);
    scene.add(cube);
}
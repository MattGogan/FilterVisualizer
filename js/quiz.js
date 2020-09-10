//const { Loader } = require("./three");

window.onload = function(){
    console.log("Bazooper");
    winloaded();
}


function winloaded(){
    executethree();
}


function executethree(){


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 20;

    renderer.setSize( window.innerWidth, window.innerHeight ); 
    document.body.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry(); 
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
    var cube = new THREE.Mesh( geometry, material ); 
    cube.position.x +=3;
    cube.position.y -=3;
    scene.add( cube ); 

    let sprite = new THREE.TextSprite({
        fillStyle: '#24ff00',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 10,
        fontStyle: 'italic',
        text: [
          'Some Test Font'
        ].join('\n'),
      });
      scene.add(sprite);
      sprite.fontSize = 5;


      let messages = [
          "Carbon Footprint Questionnaire",
          "More Trees?",
          "Even more trees?"   
      ]
    
      let textobjects = [];

      for(i = 0; i<messages.length; i++){
        
        textobjects[i] = new THREE.TextSprite({
        fillStyle: '#24ff00',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 10,
        fontStyle: 'italic',
        text: [
            messages[i]
            ].join('\n'),
        });

      }


    scene.add(textobjects[1]);

    function animate() { 
        requestAnimationFrame(animate); 
        renderer.render( scene, camera );
        
        sprite.position.x +=.1;

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;


    }

    animate();

}
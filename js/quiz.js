window.onload = function(){
    console.log("Bazooper");
    winloaded();
}


function winloaded(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight ); 
    document.body.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry(); var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); var cube = new THREE.Mesh( geometry, material ); scene.add( cube ); camera.position.z = 5;

    var welcomeMessage = "Welcome to Lauren's Tree Quiz";

    var loader = new THREE.FontLoader();

    loader.load()
    
    function animate() { 
        requestAnimationFrame(animate); 
        renderer.render( scene, camera );
        
        
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;


    }

    animate();
}


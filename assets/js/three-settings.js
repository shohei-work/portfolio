


var renderer;
var renderer2;
var scene;
var scene2;
var camera;
var camera2;
var light;
var mesh;
var materialTexture;
var canvasAspect;
var canvasWidth;
var canvasHeight;
var currentPosition;
var defaultCameraPositon = 850;
var defaultCameraPositon2 = 200;
var isSp = false;


function init() {
    new init3dRenderer();
    new init3dRenderer2();
    window.addEventListener("scroll", function() {
        _.throttle(onScroll, 300)();
    });
}


var init3dRenderer = function() {

    currentPosition = $(window).scrollTop();

    setCanvasSize();
    setDefaultPosition();

    renderer = wglRenderer(canvasWidth, canvasHeight);


    container = document.getElementById("canvas-container");
    container.appendChild(renderer.domElement);


    camera = new THREE.PerspectiveCamera(60, canvasAspect, 0.1, 1000);
    camera.position.z = defaultCameraPositon;


    scene = new THREE.Scene();


    var loader = new THREE.TextureLoader();
    var material;
    loader.crossOrigin = "";
    let imgFile = "../assets/images/main.png";
    if (isSp) {
        imgFile = "../assets/images/main-sp.png";
    } 
    loader.load(
        imgFile,
        function ( texture ) {
            materialTexture = texture;
            cover(materialTexture, canvasAspect);
            geometry = new THREE.PlaneBufferGeometry( 1, 1 );
            material = new THREE.MeshBasicMaterial( {
                map: texture,
                side: THREE.FrontSide
            } );
            mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(canvasWidth, canvasHeight);
            scene.add(mesh);
            camera.lookAt(scene.position);
            if (currentPosition == 0) {
                render();
            }
            particlesInit();
        }
    );


};

function setDefaultPosition() {
    let docWidth = document.documentElement.clientWidth
    let docHeight = document.documentElement.clientHeight
    if (isSp) {
        switch(true){
            case docWidth <= 360:
                defaultCameraPositon = 550;
                break;
            case docWidth <= 375:
                defaultCameraPositon = 570;
                break;
            case docWidth <= 480:
                defaultCameraPositon = 600;
                break;
            case docWidth <= 700:
                defaultCameraPositon = 600;
                break;
            case docWidth <= 800:
                defaultCameraPositon = 800;
                break;
        }
    } else {
        switch(true){
            case docHeight <= 700:
                defaultCameraPositon = 560;
                break;
            case docHeight <= 800:
                defaultCameraPositon = 650;
                break;
            case docHeight <= 900:
                defaultCameraPositon = 700;
                break;
            case docHeight <= 1000:
                defaultCameraPositon = 790;                
                break;
        }
    }
}

function setCanvasSize() {
    canvasWidth = $("#canvas-container").width();
    canvasHeight = $("#canvas-container").height();
    canvasAspect = canvasWidth / canvasHeight;
    if (canvasWidth < 769) {
        isSp = true;
    }
}

function render() {
    if (materialTexture) {
        cover(materialTexture, canvasAspect);
    }
    renderer.clear();
    renderer.render(scene, camera);
}

function cover( texture, aspect ) {
    texture.matrixAutoUpdate = false;
    var imageAspect = texture.image.width / texture.image.height;



            texture.matrix.setUvTransform( 0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5 );




}

function onWindowResize() {
    setDefaultPosition();
    setCanvasSize();
    mesh.scale.set(canvasWidth, canvasHeight);
    renderer.setSize(canvasWidth, canvasHeight);

    renderer.setPixelRatio(1);
    camera.aspect = canvasAspect;
    camera.updateProjectionMatrix();

    renderer2.setSize(canvasWidth, canvasHeight);

    renderer2.setPixelRatio(1);
    camera2.aspect = canvasAspect;
    camera2.updateProjectionMatrix();

    render();
    render2();
}

var onScroll = function() {
    currentPosition = $(window).scrollTop();
    camera.position.z = defaultCameraPositon - currentPosition;
    if (!isSp && currentPosition < 700) {
        camera.position.x = currentPosition / 2;
    }

    render();
};


var init3dRenderer2 = function() {

    currentPosition = $(window).scrollTop();

    setDefaultPosition();
    setCanvasSize();

    renderer2 = wglRenderer(canvasWidth, canvasHeight);


    container = document.getElementById("canvas-container2");
    container.appendChild(renderer2.domElement);


    camera2 = new THREE.PerspectiveCamera(60, canvasAspect, 0.1, 1000);
    camera2.position.z = 500;



    scene2 = new THREE.Scene();


    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1000, 800, 1000);


    scene2.add(light);


    ambient = new THREE.AmbientLight(0x222222, 2);
    scene2.add(ambient);


    addEarthMesh(scene2);

    window.addEventListener("resize", function() {
        _.throttle(onWindowResize, 500)();
    });
};

var frameCnt = 0;
function render2() {
    updateEarth();
    requestAnimationFrame(render2);

    frameCnt++;
    if (frameCnt%2 == 0) {
        return;
    }
    renderer2.clear();
    renderer2.render(scene2, camera2);
}
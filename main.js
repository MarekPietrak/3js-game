import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB, 1); // Sky blue background
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create a simple ground plane
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create some cubes as obstacles
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(
        (Math.random() - 0.5) * 10,
        0.5,
        (Math.random() - 0.5) * 10
    );
    scene.add(cube);
}

// Player object (a simple sphere)
const playerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const playerMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0.3, 0);
scene.add(player);

// Camera setup
camera.position.set(0, 2, 5);
camera.lookAt(player.position);

// Controls
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
});

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Player movement
    const moveSpeed = 0.1;
    if (keys.w) player.position.z -= moveSpeed;
    if (keys.s) player.position.z += moveSpeed;
    if (keys.a) player.position.x -= moveSpeed;
    if (keys.d) player.position.x += moveSpeed;

    // Keep player on ground
    player.position.y = 0.3;

    // Camera follows player
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 5;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the game
animate();
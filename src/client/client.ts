import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)
// controller.addEventListener('change', render)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI

// GUI CONTROLLER - CUBE
const cubeFolder = gui.addFolder('Cube')
cubeFolder.open() //remove this to close by default

// GUI CONTROLLER - ROTATION
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeRotationFolder.open() //remove this to close by default

// GUI CONTROLLER - CAMERA
// const cameraFolder = gui.addFolder("Camera")
// cameraFolder.add(camera.position, 'z', 0, 20)
// cameraFolder.open() //remove this to close by default

// GUI CONTROLLER - POSITION
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.1)
cubePositionFolder.add(cube.position, 'y', -10, 10, 0.1)
cubePositionFolder.add(cube.position, 'z', -10, 10, 0.1)
cubePositionFolder.open() //remove this to close by default

// GUI CONTROLLER - SCALE
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5)
cubeScaleFolder.add(cube.scale, 'y', -5, 5)
cubeScaleFolder.add(cube.scale, 'z', -5, 5)
cubeScaleFolder.open() //remove this to close by default

cubeFolder.add(cube, "visible") //remove this to close by default

function animate() {
    requestAnimationFrame(animate)

    //     cube.rotation.x += 0.01
    //     cube.rotation.y += 0.01

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
// render()
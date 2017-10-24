import { Plane } from "app/plane";
import * as THREE from 'three';
import { FoldFeature } from "app/fold-feature";
import * as _ from "lodash";

export class Sketch3d {
  private features: FoldFeature[];

  private cube: THREE.Mesh;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;

  constructor(features: FoldFeature[], container: HTMLElement) {
    this.features = features;
    this.container = container;
  }

  public addFeature(feature: FoldFeature) {
    this.features.push(feature);

    this.features =  [feature]
    const planes = _.flatten(this.features.map((feature) => { return feature.planes() }));
    // const plane = planes[0];
    for (const plane of planes) {
      var planeShape = new THREE.Shape();
      planeShape.moveTo(plane.points[0].x, plane.points[0].y);
      for (const point of plane.points) {
        planeShape.lineTo(point.x, point.y);
      }
      var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
      var geometry = new THREE.ExtrudeGeometry(planeShape, extrudeSettings);

      // let geometry = new THREE.PlaneGeometry(10, 5),
      let material = new THREE.MeshPhongMaterial({ color: plane.color, wireframe: false });
      // this.plane = 

      this.cube = new THREE.Mesh(geometry, material);
      this.cube.position.set(0, 0, 0);
      const scalingFactor = 0.009;
      this.cube.scale.set(scalingFactor, scalingFactor, scalingFactor);
      this.camera.lookAt(this.cube.position);

      this.scene.add(this.cube);
    }

    this.render();
  }

  public init() {
    let screen = {
      width: 600,
      height: 800
    },
      view = {
        angle: 45,
        aspect: screen.width / screen.height,
        near: 0.1,
        far: 1000
      };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view.near, view.far);
    this.renderer = new THREE.WebGLRenderer();

    this.scene.add(this.camera);
    this.scene.add(new THREE.AxisHelper(20));

    this.camera.position.set(10, 10, 10);

    this.renderer.setSize(screen.width, screen.height);
    this.container.appendChild(this.renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 8, 100);
    light.position.set(50, 50, 50);
    this.scene.add(light);

    this.render();
  }
  public render() {
    let self: Sketch3d = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);

      self.animate();
    }());
  }
  public animate() {
    // this.cube.rotateX(0.1);
    // this.cube.rotateY(0.1);
    // this.camera.position.addScalar(0.2);
  }
}

import { Plane, OrientationKind } from "app/plane";
import * as THREE from 'three';
import { FoldFeature } from "app/fold-feature";
import * as _ from "lodash";
import * as polygon from "polygon";

export class Plane3d extends Plane {
  mesh?: THREE.Mesh
  pivot?: THREE.Mesh
}

export class Sketch3d {
  private features: FoldFeature[];

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private planes: Plane3d[] = [];

  constructor(features: FoldFeature[], container: HTMLElement) {
    this.features = features;
    this.container = container;
  }

  public addFeature(feature: FoldFeature) {
    this.features.push(feature);

    this.features = [feature]
    const newPlanes = _.flatten(this.features.map((feature) => { return feature.planes() })) as Plane3d[];
    this.planes.push(...newPlanes)


    for (const plane of newPlanes) {
      var planeShape = new THREE.Shape();
      planeShape.moveTo(plane.points[0].x, -plane.points[0].y);
      for (const point of plane.points) {
        planeShape.lineTo(point.x, -point.y);
      }
      var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
      var geometry = new THREE.ExtrudeGeometry(planeShape, extrudeSettings);
      let material = new THREE.MeshPhongMaterial({ color: plane.color });
      plane.mesh = new THREE.Mesh(geometry, material);
      const s = plane.pivotPoint;
      plane.mesh.position.set(-s.x, s.y, 0);

      var pointGeo = new THREE.SphereGeometry(10);
      var pointMesh = new THREE.Mesh(pointGeo, new THREE.MeshPhongMaterial({ color: plane.color }));
      pointMesh.position.set(s.x, -s.y, 0);
      plane.pivot = pointMesh;
      // console.log(plane.pivot.getWorldPosition());
      //   pointMesh.position.set(0,0, 0).multiplyScalar(scalingFactor);
      //   (plane.parent as Plane3d).mesh.add(pointMesh)
      // }
      // else{
      this.scene.add(pointMesh);
      // }
      pointMesh.add(plane.mesh);

    }

    if (this.planes.length === 6) {
      // calculate parent offset

      // child plane test
      const childPlane = new THREE.Shape();
      childPlane.moveTo(30, -30);
      childPlane.lineTo(30, -200);
      childPlane.lineTo(200, -200);
      childPlane.lineTo(200, -30);
      childPlane.lineTo(30, -30);
      var geometry = new THREE.ExtrudeGeometry(childPlane, extrudeSettings);
      let material = new THREE.MeshPhongMaterial({ color: "#FF0000" });
      const childPlaneMesh = new THREE.Mesh(geometry, material);
      // this.planes[1].pivot.getWorldPosition();    
      const pivotPos = this.planes[5].pivotPoint;
      childPlaneMesh.position.set(-pivotPos.x, pivotPos.y, 0);
      this.planes[5].pivot.add(childPlaneMesh);
    }


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
        far: 10000
      };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view.near, view.far);
    this.renderer = new THREE.WebGLRenderer();

    this.scene.add(this.camera);
    this.scene.add(new THREE.AxisHelper(2));

    this.camera.position.set(1500, 0, 1500);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.setSize(screen.width, screen.height);
    this.container.appendChild(this.renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 9, 2600);
    light.position.set(1500, 0, 1500);
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

  private accumulatedRotation = 0;
  private direction = -1;

  public animate() {
    this.accumulatedRotation += 0.01 * this.direction;
    if (Math.abs(this.accumulatedRotation) + 0.05 > Math.PI) {
      this.direction *= -1;
    }

    for (const plane of this.planes) {
      console.log(plane.pivot.getWorldPosition());
      switch (plane.orientation) {
        case OrientationKind.Vertical:
          break;
        case OrientationKind.Horizontal:
          plane.pivot.setRotationFromEuler(new THREE.Euler(this.accumulatedRotation, 0, 0));
          break;
      }
    }
  }
}

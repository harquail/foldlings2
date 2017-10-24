import { Plane, OrientationKind } from "app/plane";
import * as THREE from 'three';
import { FoldFeature } from "app/fold-feature";
import * as _ from "lodash";

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
    this.planes = _.flatten(this.features.map((feature) => { return feature.planes() }));
    // const plane = planes[0];
    for (const plane of this.planes) {
      var planeShape = new THREE.Shape();
      planeShape.moveTo(plane.points[0].x, -plane.points[0].y);
      for (const point of plane.points) {
        planeShape.lineTo(point.x, -point.y);
      }
      var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
      var geometry = new THREE.ExtrudeGeometry(planeShape, extrudeSettings);
      // geometry.rotateX(THREE.Math.degToRad(180));
      // let geometry = new THREE.PlaneGeometry(10, 5),
      let material = new THREE.MeshPhongMaterial({ color: plane.color });
      // this.plane = 
      plane.mesh = new THREE.Mesh(geometry, material);
      const s = plane.pivotPoint;
      const scalingFactor = 0.009;
      plane.mesh.scale.set(scalingFactor, scalingFactor, scalingFactor);
      plane.mesh.position.set(0, 0, 0).set(-s.x, s.y, 0).multiplyScalar(scalingFactor);

      this.camera.lookAt(plane.mesh.position);

      var pointGeo = new THREE.SphereGeometry(0.1);
      var pointMesh = new THREE.Mesh(pointGeo, new THREE.MeshPhongMaterial({ color: plane.color }));
      pointMesh.position.set(s.x, -s.y, 0).multiplyScalar(scalingFactor);

      plane.pivot = pointMesh;
      this.scene.add(pointMesh);
      pointMesh.add(plane.mesh);
      // this.scene.add(plane.mesh);
      // pointMesh.add(plane.mesh)
    }

    this.render();
  }

  private rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
      obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld) {
      obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
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

    this.camera.position.set(10, 0, 20);

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
    for (const plane of this.planes) {
      switch (plane.orientation) {
        case OrientationKind.Vertical:
          // plane.pivot.rotateX(-0.01);
          break;
        case OrientationKind.Horizontal:
          plane.pivot.rotateX(-0.01);
          break;
      }
      // console.log(pointMesh.getWorldPosition());
      // var pad2 = new THREE.Vector3(e.x, e.y, 0);
      // const rawr = (pad1.add(pad2)).multiplyScalar(0.5);
      // dir.subVectors(new THREE.Vector3(s.x, s.y, 0), new THREE.Vector3(e.x, e.y, 0));
      // plane.mesh.rotateOnAxis(dir,0.01)
      // plane.mesh.rotateOnAxis(dir,0.01);

      // var geometry = new THREE.Geometry();
      // geometry.vertices.push(pad1);
      // geometry.vertices.push(pad2);
      // var line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
      // this.camera.lookAt(line.aab);
      // renderer.render(scene, camera);

    }
  }
}

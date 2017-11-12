import { Plane, OrientationKind } from "app/plane";
import * as THREE from 'three';
import { FoldFeature } from "app/fold-feature";
import * as _ from "lodash";
import * as Polygon from "polygon";

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

    const newPlanes = feature.planes();
    this.planes.push(...newPlanes);

    for (const plane of newPlanes) {
      const p = this.plane2Dto3D(plane);
      const s = p.pivotPoint;
      var pointGeo = new THREE.SphereGeometry(5);
      var pointMesh = new THREE.Mesh(pointGeo, new THREE.MeshPhongMaterial({ color: p.color, transparent: true, opacity: 1 }));
      p.pivot = pointMesh;

      if (plane.parent) {
        let parent = plane.parent;
        const totalParentOffset = new THREE.Vector2(0, 0);
        while (parent) {
          totalParentOffset.x += parent.pivotPoint.x;
          totalParentOffset.y += parent.pivotPoint.y;
          parent = parent.parent;
        }
        pointMesh.position.set(s.x - p.parent.pivotPoint.x, -s.y + p.parent.pivotPoint.y, 0);
        // p.mesh.position.set(-s.x, s.y, 0);
        (p.parent as Plane3d).pivot.add(p.pivot);
        p.pivot.add(p.mesh);
      }
      else {
        // p.mesh.position.set(-s.x, s.y, 0);
        pointMesh.position.set(s.x, -s.y, 0);
        this.scene.add(pointMesh);
        pointMesh.add((plane as Plane3d).mesh);
      }

    }


    // cut out holes for new planes
    for (const plane of newPlanes) {
      for (let p3 of this.planes) {
        plane.cutBy(p3);
        if (p3.points.length > 4) {
          p3.pivot.remove(p3.mesh);
          const p3New = this.plane2Dto3D(p3);
          const s = p3.pivotPoint;
          p3.pivot.add(p3.mesh);

        }
      }
    }

    // again... TODO: this is a terrible hack
    for (const plane of newPlanes) {
      for (let p3 of this.planes) {
        plane.cutBy(p3);
        if (p3.points.length > 4) {
          p3.pivot.remove(p3.mesh);
          const p3New = this.plane2Dto3D(p3);
          const s = p3.pivotPoint;
          p3.pivot.add(p3.mesh);

        }
      }
    }
    // }
    this.setPlanePositions();
  }

  private plane2Dto3D(plane: Plane): Plane3d {
    const plane3d = plane as Plane3d;
    var planeShape = new THREE.Shape();
    planeShape.moveTo(plane.points[0].x, -plane.points[0].y);
    for (const point of plane.points) {
      planeShape.lineTo(point.x, -point.y);
    }
    var extrudeSettings = { amount: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var geometry = new THREE.ExtrudeGeometry(planeShape, extrudeSettings);
    let material = new THREE.MeshPhongMaterial({ color: "#666" });
    plane3d.mesh = new THREE.Mesh(geometry, material);
    const s = plane.pivotPoint;
    // if(plane.feature){
    plane3d.mesh.position.set(-s.x, s.y, 0);
    // } 

    return plane3d;
  }

  public init() {
    let screen = {
      width: 600,
      height: 800
    },
      view = {
        angle: 45,
        aspect: screen.width / screen.height,
        near: 1000,
        far: 2500
      };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view.near, view.far);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

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
    this.setPlanePositions();
  }
  private setPlanePositions() {
    // console.log(this.planes);
    for (const plane of this.planes) {
      if (plane.pivot) {
        switch (plane.orientation) {
          case OrientationKind.Vertical:
            if (plane.parent) {
              plane.pivot.setRotationFromEuler(new THREE.Euler(-this.accumulatedRotation, 0, 0));
            }
            break;
          case OrientationKind.Horizontal:
            plane.pivot.setRotationFromEuler(new THREE.Euler(this.accumulatedRotation, 0, 0));
            break;
        }
      }
    }
  }
}

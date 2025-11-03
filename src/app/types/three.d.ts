import {
  MeshProps,
  GroupProps,
  AmbientLightProps,
  DirectionalLightProps,
  PrimitiveProps,
} from "@react-three/fiber"; // Ceci dépend de votre installation R3F

import { MeshStandardMaterial, SphereGeometry, Mesh } from "three";

declare namespace JSX {
  interface IntrinsicElements {
    primitive: AmbientLightProps;
    directionalLight: DirectionalLightProps;
    group: GroupProps;
    mesh: MeshProps;
    primitive: PrimitiveProps;
    meshStandardMaterial: JSX.IntrinsicElements["meshStandardMaterial"];
    sphereGeometry: JSX.IntrinsicElements["sphereGeometry"];
  }
}

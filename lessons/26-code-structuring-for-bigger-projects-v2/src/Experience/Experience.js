import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";

export default class Experience {
  constructor(canvas) {
    // console.log("Here starts a great experience");

    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;
    //Global access
    window.experience = this;
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // Resize event
    this.sizes.on("resize", () => {
      // Listening for the resize event
      console.log("A resize occurred");
      //   console.log(this.sizes.width);
      //   console.log(this.sizes.height);
      //   console.log(this.sizes.pixelRatio);

      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {}
  update() {}
}

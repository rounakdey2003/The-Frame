import { Renderer, Camera, Transform, Plane } from "ogl";
import Media from "./Media.js";
import NormalizeWheel from "normalize-wheel";
import { lerp } from "../utils/math";
import AutoBind from "../utils/bind";

export default class Canvas {
  constructor() {
    this.images = [
      "/img/1.jpg",
      "/img/2.jpg",
      "/img/3.jpg",
      "/img/4.jpg",
      "/img/5.jpg",
      "/img/6.jpg",
      "/img/7.jpg",
      "/img/8.jpg",
      "/img/9.jpg",
      "/img/10.jpg",
      "/img/11.jpg",
    ];

    this.scroll = {
      ease: 0.01,
      current: 0,
      target: 0,
      last: 0,
    };

    this.mouse = {
      x: 0,
      y: 0,
      normalizedX: 0,
      normalizedY: 0,
    };

    this.hoveredMediaIndex = -1;
    this.blackoutIntensity = 0;
    this.targetBlackoutIntensity = 0;

    AutoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();

    this.onResize();

    this.createGeometry();
    this.createMedias();

    this.update();

    this.addEventListeners();
    this.createPreloader();
  }

  createPreloader() {
    Array.from(this.images).forEach((source) => {
      const image = new Image();

      this.loaded = 0;

      image.src = source;
      image.onload = (_) => {
        this.loaded += 1;

        if (this.loaded === this.images.length) {
          document.documentElement.classList.remove("loading");
          document.documentElement.classList.add("loaded");
        }
      };
    });
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: document.querySelector("#gl"),
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    this.gl = this.renderer.gl;
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 100,
    });
  }
  createMedias() {
    this.medias = this.images.map((image, index) => {
      return new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        scene: this.scene,
        renderer: this.renderer,
        screen: this.screen,
        viewport: this.viewport,
        image,
        length: this.images.length,
        index,
      });
    });
  }
  onResize() {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = {
      height,
      width,
    };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({
          screen: this.screen,
          viewport: this.viewport,
        })
      );
    }
  }
  easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  onTouchDown(event) {
    this.isDown = true;

    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientY : event.clientY;
  }

  onTouchMove(event) {
    if (!this.isDown) {
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      
      this.mouse.x = clientX;
      this.mouse.y = clientY;
      this.mouse.normalizedX = (clientX / this.screen.width) * 2 - 1;
      this.mouse.normalizedY = -((clientY / this.screen.height) * 2 - 1);
      
      this.checkHover();
      return;
    }

    const y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = (this.start - y) * 0.1;

    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(event) {
    this.isDown = false;
  }

  onWheel(event) {
    const normalized = NormalizeWheel(event);
    const speed = normalized.pixelY;

    this.scroll.target += speed * 0.005;
  }

  checkHover() {
    if (!this.medias) return;

    let newHoveredIndex = -1;
    
    const mouseViewportY = (this.mouse.normalizedY * this.viewport.height) / 2;
    const mouseViewportX = (this.mouse.normalizedX * this.viewport.width) / 2;
    
    this.medias.forEach((media, index) => {
      const mediaTop = media.plane.position.y + media.plane.scale.y / 2;
      const mediaBottom = media.plane.position.y - media.plane.scale.y / 2;
      const mediaLeft = media.plane.position.x - media.plane.scale.x / 2;
      const mediaRight = media.plane.position.x + media.plane.scale.x / 2;
      
      if (mouseViewportY <= mediaTop && 
          mouseViewportY >= mediaBottom &&
          mouseViewportX >= mediaLeft && 
          mouseViewportX <= mediaRight) {
        newHoveredIndex = index;
      }
    });

    if (newHoveredIndex !== this.hoveredMediaIndex) {
      if (this.hoveredMediaIndex >= 0) {
        this.medias[this.hoveredMediaIndex].setHover(false);
      }
      
      this.hoveredMediaIndex = newHoveredIndex;
      
      if (newHoveredIndex >= 0) {
        this.medias[newHoveredIndex].setHover(true);
        this.targetBlackoutIntensity = 1.0;
        document.body.classList.add('photo-blackout');
      } else {
        this.targetBlackoutIntensity = 0.0;
        document.body.classList.remove('photo-blackout');
      }
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current > this.scroll.last) {
      this.direction = "up";
    } else {
      this.direction = "down";
    }

    this.blackoutIntensity += (this.targetBlackoutIntensity - this.blackoutIntensity) * 0.1;

    if (this.medias) {
      this.medias.forEach((media) => {
        media.update(this.scroll, this.direction);
        media.setBlackout(this.blackoutIntensity);
      });
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;

    window.requestAnimationFrame(this.update);
  }
  addEventListeners() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", this.onWheel);
    window.addEventListener("mousewheel", this.onWheel);

    window.addEventListener("mousedown", this.onTouchDown);
    window.addEventListener("mousemove", this.onTouchMove);
    window.addEventListener("mouseup", this.onTouchUp);

    window.addEventListener("touchstart", this.onTouchDown);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchUp);
  }
}

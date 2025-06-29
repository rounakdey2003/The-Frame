import { Mesh, Program, Texture } from "ogl";

export default class FireEffect {
  constructor({ gl, geometry, scene, renderer, viewport }) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.renderer = renderer;
    this.viewport = viewport;
    
    this.isActive = false;
    this.intensity = 0;
    this.targetIntensity = 0;
    this.position = { x: 0, y: 0 };
    
    this.createShader();
    this.createMesh();
  }

  createShader() {
    const vertexShader = `
      attribute vec3 position;
      attribute vec2 uv;
      
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform vec2 uPosition;
      uniform vec2 uPlaneSize;
      uniform float uTime;
      uniform float uIntensity;
      
      varying vec2 vUv;
      varying float vIntensity;
      
      void main() {
        vUv = uv;
        vIntensity = uIntensity;
        
        vec3 pos = position;
        
        float fireDisplacement = sin(pos.x * 3.0 + uTime * 8.0) * cos(pos.y * 2.0 + uTime * 6.0);
        pos.z += fireDisplacement * uIntensity * 0.1;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      uniform float uTime;
      uniform float uIntensity;
      uniform vec2 uViewportSize;
      
      varying vec2 vUv;
      varying float vIntensity;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        
        for(int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        
        return value;
      }
      
      void main() {
        vec2 st = vUv;
        
        float borderDist = min(min(st.x, 1.0 - st.x), min(st.y, 1.0 - st.y));
        
        float borderWidth = 0.15;
        float borderMask = smoothstep(borderWidth, 0.0, borderDist);
        
        float fireShape = 0.0;
        
        if (st.y < borderWidth) {
          float bottomFire = 1.0 - smoothstep(0.0, borderWidth, st.y);
          bottomFire *= smoothstep(0.0, 0.05, st.x) * smoothstep(1.0, 0.95, st.x);
          fireShape = max(fireShape, bottomFire * 1.2);
        }
        
        if (st.y > 1.0 - borderWidth) {
          float topFire = smoothstep(1.0 - borderWidth, 1.0, st.y);
          topFire *= smoothstep(0.0, 0.05, st.x) * smoothstep(1.0, 0.95, st.x);
          fireShape = max(fireShape, topFire * 0.8);
        }
        
        if (st.x < borderWidth) {
          float leftFire = 1.0 - smoothstep(0.0, borderWidth, st.x);
          leftFire *= smoothstep(0.0, 0.05, st.y) * smoothstep(1.0, 0.95, st.y);
          fireShape = max(fireShape, leftFire * 0.9);
        }
        
        if (st.x > 1.0 - borderWidth) {
          float rightFire = smoothstep(1.0 - borderWidth, 1.0, st.x);
          rightFire *= smoothstep(0.0, 0.05, st.y) * smoothstep(1.0, 0.95, st.y);
          fireShape = max(fireShape, rightFire * 0.9);
        }
        
        vec2 fireUv = st;
        fireUv.y -= uTime * 0.3;
        fireUv.x += sin(st.y * 12.0 + uTime * 4.0) * 0.08;
        
        vec2 center = vec2(0.5, 0.5);
        float distFromCenter = length(st - center);
        float radialFlicker = sin(distFromCenter * 15.0 + uTime * 6.0) * 0.05;
        fireUv += radialFlicker;
        
        float fireNoise = fbm(fireUv * 10.0);
        fireNoise += fbm(fireUv * 20.0) * 0.5;
        fireNoise += fbm(fireUv * 40.0) * 0.25;
        
        float fire = fireShape * fireNoise;
        fire = smoothstep(0.2, 0.7, fire);
        
        fire *= borderMask;
        
        vec3 fireColorCore = vec3(1.0, 0.9, 0.6);
        vec3 fireColorMid = vec3(1.0, 0.4, 0.1);
        vec3 fireColorEdge = vec3(0.9, 0.1, 0.0);
        vec3 fireColorOuter = vec3(0.3, 0.0, 0.1);
        
        vec3 fireColor = mix(fireColorOuter, fireColorEdge, fire);
        fireColor = mix(fireColor, fireColorMid, fire * fire);
        fireColor = mix(fireColor, fireColorCore, fire * fire * fire);
        
        float sparkNoise = noise(st * 60.0 + uTime * 12.0);
        float sparks = smoothstep(0.92, 1.0, sparkNoise) * fire * borderMask;
        fireColor += sparks * vec3(1.0, 0.8, 0.4);
        
        float emberNoise = noise((st + uTime * 0.1) * 30.0);
        float embers = smoothstep(0.95, 1.0, emberNoise) * borderMask * 0.5;
        fireColor += embers * vec3(1.0, 0.3, 0.0);
        
        float alpha = fire * vIntensity;
        
        float glowDist = smoothstep(borderWidth * 1.5, 0.0, borderDist);
        float glow = glowDist * 0.2 * vIntensity;
        alpha = max(alpha, glow);
        
        float heatWave = sin(st.x * 20.0 + uTime * 8.0) * sin(st.y * 15.0 + uTime * 6.0);
        heatWave *= borderMask * 0.1;
        alpha += heatWave * vIntensity;
        
        gl_FragColor = vec4(fireColor, alpha);
      }
    `;

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uPosition: { value: [0, 0] },
        uPlaneSize: { value: [0, 0] },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
      },
      transparent: true,
      cullFace: false,
      depthTest: false,
      depthWrite: false,
    });
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.plane.setParent(this.scene);
    this.plane.visible = false;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.plane.position.x = x;
    this.plane.position.y = y;
  }

  setScale(width, height) {
    const fireScale = 1.0;
    this.plane.scale.x = width * fireScale;
    this.plane.scale.y = height * fireScale;
    
    this.program.uniforms.uPlaneSize.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
  }

  show() {
    this.isActive = true;
    this.targetIntensity = 1.0;
    this.plane.visible = true;
  }

  hide() {
    this.isActive = false;
    this.targetIntensity = 0.0;
  }

  onResize({ viewport } = {}) {
    if (viewport) {
      this.viewport = viewport;
      this.program.uniforms.uViewportSize.value = [
        this.viewport.width,
        this.viewport.height,
      ];
    }
  }

  update() {
    if (!this.isActive && this.intensity <= 0.01) {
      this.plane.visible = false;
      return;
    }

    this.intensity += (this.targetIntensity - this.intensity) * 0.1;
    
    if (this.intensity <= 0.01 && this.targetIntensity === 0) {
      this.plane.visible = false;
      this.intensity = 0;
      return;
    }

    this.program.uniforms.uTime.value += 0.016;
    this.program.uniforms.uIntensity.value = this.intensity;
    
    this.program.uniforms.uPosition.value = [
      this.position.x,
      this.position.y,
    ];
  }
}

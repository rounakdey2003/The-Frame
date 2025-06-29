export default class GlitchEffect {
  constructor() {
    this.canvasTexts = document.querySelectorAll('.canvas-text');
    this.isHovering = false;
    this.glitchTimeouts = new Map();
    this.animationFrameId = null;
    this.colorPalettes = [
      ['#ff0040', '#00ff41', '#4000ff'],
      ['#ff4000', '#40ff00', '#0040ff'],
      ['#ff0080', '#80ff00', '#0080ff'],
      ['#ff8000', '#00ff80', '#8000ff'],
      ['#ff004a', '#4aff00', '#004aff']
    ];
    
    this.init();
  }

  init() {
    this.addEventListeners();
    this.preloadEffects();
  }

  preloadEffects() {
    this.canvasTexts.forEach(text => {
      text.style.setProperty('--glitch-intensity', '1');
      text.style.setProperty('--glitch-speed', '0.3s');
    });
  }

  addEventListeners() {
    this.canvasTexts.forEach(text => {
      text.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
      text.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
      text.addEventListener('mousemove', (e) => this.onMouseMove(e));
      text.addEventListener('click', (e) => this.onTextClick(e));
      
      text.addEventListener('touchstart', (e) => this.onTouchStart(e));
      text.addEventListener('touchend', (e) => this.onTouchEnd(e));
    });
    
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  onMouseEnter(event) {
    const element = event.target;
    this.isHovering = true;
    
    this.clearTimeouts(element);
    
    this.startGlitchSequence(element);
    
    this.applyRandomColorPalette(element);
    
    this.createScanLines(element);
    
    this.animateIntensity(element, 'enter');
  }

  onMouseLeave(event) {
    const element = event.target;
    this.isHovering = false;
    
    this.animateIntensity(element, 'leave');
    
    setTimeout(() => {
      this.resetElement(element);
    }, 300);
  }

  onMouseMove(event) {
    if (!this.isHovering) return;
    
    const element = event.target;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const distanceX = (mouseX - centerX) / rect.width;
    const distanceY = (mouseY - centerY) / rect.height;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const intensity = Math.min(distance * 3, 3);
    element.style.setProperty('--glitch-intensity', intensity.toString());
    
    const speed = Math.max(0.1, 0.5 - distance * 0.3);
    element.style.setProperty('--glitch-speed', `${speed}s`);
  }

  onTextClick(event) {
    const element = event.target;
    
    this.triggerGlitchBurst(element);
    
    this.createScreenShake();
    
    this.applyRandomColorPalette(element);
  }

  onTouchStart(event) {
    event.preventDefault();
    this.onMouseEnter(event);
  }

  onTouchEnd(event) {
    event.preventDefault();
    this.onMouseLeave(event);
  }

  onKeyDown(event) {
    if (event.key.toLowerCase() === 'g') {
      const randomText = this.canvasTexts[Math.floor(Math.random() * this.canvasTexts.length)];
      this.triggerGlitchBurst(randomText);
    }
  }

  startGlitchSequence(element) {
    element.classList.add('glitch-active');
    
    if (Math.random() > 0.6) {
      setTimeout(() => {
        element.classList.add('glitch-intense');
      }, Math.random() * 200);
    }
  }

  animateIntensity(element, direction) {
    const startTime = performance.now();
    const duration = 300;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      let intensity;
      if (direction === 'enter') {
        intensity = progress * 2;
      } else {
        intensity = (1 - progress) * 2;
      }
      
      element.style.setProperty('--glitch-intensity', intensity.toString());
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  createMangaEffects(element) {
    this.createSpeedLines(element);
    
    this.triggerMangaSFX();
    
    this.flashActionLines();
  }

  createSpeedLines(element) {
    const speedLinesContainer = document.createElement('div');
    speedLinesContainer.className = 'manga-speed-lines';
    speedLinesContainer.style.cssText = `
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    
    for (let i = 0; i < 12; i++) {
      const line = document.createElement('div');
      line.style.cssText = `
        position: absolute;
        width: 2px;
        height: 60px;
        background: linear-gradient(to bottom, transparent, #2A1458, transparent);
        top: 50%;
        left: 50%;
        transform-origin: bottom center;
        transform: translate(-50%, -100%) rotate(${i * 30}deg);
        opacity: 0;
        animation: speed-line-flash 0.3s ease-out ${i * 0.02}s;
      `;
      speedLinesContainer.appendChild(line);
    }
    
    element.appendChild(speedLinesContainer);
    
    setTimeout(() => {
      if (speedLinesContainer.parentNode) {
        speedLinesContainer.parentNode.removeChild(speedLinesContainer);
      }
    }, 500);
  }

  triggerMangaSFX() {
    const sfxElements = document.querySelectorAll('.manga-sfx');
    sfxElements.forEach(sfx => {
      sfx.style.animation = 'none';
      sfx.offsetHeight;
      sfx.style.animation = 'sfx-burst 0.6s ease-out';
    });
  }

  flashActionLines() {
    const actionLines = document.querySelectorAll('.action-line');
    actionLines.forEach(line => {
      line.style.opacity = '0.8';
      line.style.transform = line.style.transform + ' scale(1.5)';
      
      setTimeout(() => {
        line.style.opacity = '0.1';
        line.style.transform = line.style.transform.replace(' scale(1.5)', '');
      }, 200);
    });
  }

  triggerGlitchBurst(element) {
    element.classList.add('glitch-intense');
    element.style.setProperty('--glitch-intensity', '4');
    element.style.setProperty('--glitch-speed', '0.05s');
    
    this.createDistortionWaves(element);
    
    this.createMangaEffects(element);
    
    setTimeout(() => {
      element.classList.remove('glitch-intense');
      element.style.setProperty('--glitch-intensity', '1');
      element.style.setProperty('--glitch-speed', '0.3s');
    }, 800);
  }

  createDistortionWaves(element) {
    let waveCount = 0;
    const maxWaves = 8;
    
    const wave = () => {
      if (waveCount >= maxWaves) return;
      
      const transforms = [
        'perspective(100px) rotateX(5deg)',
        'perspective(100px) rotateY(3deg)',
        'skew(3deg, 2deg)',
        'scaleX(1.05) scaleY(0.95)',
        'scaleX(0.95) scaleY(1.05)',
        'rotateZ(2deg)'
      ];
      
      const randomTransform = transforms[Math.floor(Math.random() * transforms.length)];
      const isLeftText = element.classList.contains('canvas-text--left');
      
      if (isLeftText) {
        element.style.transform = `translateY(-50%) rotate(-90deg) ${randomTransform}`;
      } else {
        element.style.transform = `translateY(-50%) ${randomTransform}`;
      }
      
      const filters = [
        'contrast(1.8) brightness(1.3)',
        'hue-rotate(180deg) saturate(2)',
        'blur(1px) brightness(1.5)',
        'invert(0.2) contrast(1.4)',
        'sepia(0.3) saturate(1.5)'
      ];
      
      const randomFilter = filters[Math.floor(Math.random() * filters.length)];
      element.style.filter = randomFilter;
      
      waveCount++;
      
      const timeout = setTimeout(() => {
        wave();
      }, Math.random() * 80 + 30);
      
      this.glitchTimeouts.set(`wave-${waveCount}`, timeout);
    };
    
    wave();
  }

  createScanLines(element) {
    const scanLine = document.createElement('div');
    scanLine.className = 'glitch-scan-line';
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.08) 2px,
        rgba(255, 255, 255, 0.08) 4px
      );
      pointer-events: none;
      z-index: 1;
      mix-blend-mode: overlay;
      animation: scan-lines 0.08s linear infinite;
    `;
    
    element.appendChild(scanLine);
    
    this.glitchTimeouts.set('scanline', setTimeout(() => {
      if (scanLine.parentNode) {
        scanLine.parentNode.removeChild(scanLine);
      }
    }, 200));
  }

  createScreenShake() {
    const canvas = document.querySelector('#gl');
    if (!canvas) return;
    
    canvas.style.animation = 'screen-shake 0.5s ease-in-out';
    
    setTimeout(() => {
      canvas.style.animation = '';
    }, 500);
  }

  applyRandomColorPalette(element) {
    const palette = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
    
    element.style.setProperty('--glitch-color-1', palette[0]);
    element.style.setProperty('--glitch-color-2', palette[1]);
    element.style.setProperty('--glitch-color-3', palette[2]);
  }

  clearTimeouts(element) {
    this.glitchTimeouts.forEach((timeout, key) => {
      clearTimeout(timeout);
    });
    this.glitchTimeouts.clear();
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resetElement(element) {
    element.classList.remove('glitch-active', 'glitch-intense');
    
    const isLeftText = element.classList.contains('canvas-text--left');
    if (isLeftText) {
      element.style.transform = 'translateY(-50%) rotate(-90deg)';
    } else {
      element.style.transform = 'translateY(-50%)';
    }
    
    element.style.filter = '';
    element.style.setProperty('--glitch-intensity', '1');
    element.style.setProperty('--glitch-speed', '0.3s');
    
    const scanLines = element.querySelectorAll('.glitch-scan-line');
    scanLines.forEach(line => line.remove());
    
    this.clearTimeouts(element);
  }

  triggerRandomGlitch() {
    const randomText = this.canvasTexts[Math.floor(Math.random() * this.canvasTexts.length)];
    this.triggerGlitchBurst(randomText);
  }

  setGlitchMode(mode) {
    this.canvasTexts.forEach(text => {
      text.classList.toggle('glitch-intense', mode === 'intense');
    });
  }

  destroy() {
    this.canvasTexts.forEach(text => {
      this.resetElement(text);
    });
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

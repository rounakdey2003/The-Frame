import MangaSvgIcons from './MangaSvgIcons.js';

export default class MangaEffects {
  constructor() {
    this.isActive = false;
    this.animationState = 'idle';
    this.sfxQueue = [];
    this.currentIntensity = 0;
    this.targetIntensity = 0;
    
    this.body = document.body;
    this.canvasText = document.querySelectorAll('.canvas-text');
    this.onomatopoeia = document.querySelectorAll('.manga-onomatopoeia');
    this.speechBubbles = document.querySelectorAll('.manga-speech');
    this.emotions = document.querySelectorAll('.manga-emotion');
    this.bgEffects = document.querySelector('.manga-bg-effects');
    
    this.update = this.update.bind(this);
    this.triggerImpactEffect = this.triggerImpactEffect.bind(this);
    this.triggerEmotionBurst = this.triggerEmotionBurst.bind(this);
    this.createSpeedLines = this.createSpeedLines.bind(this);
    
    this.init();
  }
  
  init() {
    this.addEventListeners();
    this.startAnimationLoop();
    this.initializeRandomEffects();
    
    console.log('🎌 Manga Effects initialized! Experience authentic Japanese manga atmosphere.');
    console.log('👆 Click anywhere to trigger anger/sweat/question/exclamation emotions!');
    console.log('✨ Love/shock/star/heart emotions will randomly pop up on their own!');
  }
  
  addEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });
    
    document.addEventListener('click', (e) => {
      this.handleClick(e);
    });
    
    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
    
    this.canvasText.forEach((text, index) => {
      text.addEventListener('mouseenter', () => {
        this.triggerTextEffect(text, 'hover');
      });
      
      text.addEventListener('mouseleave', () => {
        this.resetTextEffect(text);
      });
      
      text.addEventListener('click', () => {
        this.triggerTextEffect(text, 'click');
      });
    });
    
    window.addEventListener('photo-hover-start', (e) => {
      this.triggerPhotoFocusEffect(e.detail.index);
    });
    
    window.addEventListener('photo-hover-end', () => {
      this.resetPhotoFocusEffect();
    });
  }
  
  handleMouseMove(e) {
    const intensity = Math.sqrt(e.movementX ** 2 + e.movementY ** 2) / 50;
    this.targetIntensity = Math.min(intensity, 1);
    
    if (intensity > 0.3) {
      this.createMouseSpeedLines(e.clientX, e.clientY, intensity);
    }
  }
  
  handleClick(e) {
    this.triggerImpactEffect(e.clientX, e.clientY);
    
    this.triggerClickEmotion(e.clientX, e.clientY);
    
    if (Math.random() < 0.3) {
      this.playSoundEffect(['パン！', 'クリック！', 'タップ！']);
    }
  }
  
  handleKeyPress(e) {
    switch(e.key.toLowerCase()) {
      case 'm':
        this.toggleMangaMode();
        break;
      case 'i':
        this.triggerImpactEffect(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
        break;
      case 'e':
        this.triggerRandomEmotion();
        break;
      case 's':
        this.createFullScreenSpeedLines();
        break;
      case 'b':
        this.triggerActionBurst();
        break;
      case 'escape':
        this.resetAllEffects();
        break;
    }
  }
  
  triggerImpactEffect(x, y) {
    const impact = document.createElement('div');
    impact.className = 'manga-impact-burst';
    impact.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,107,157,0.8) 30%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      z-index: 1000;
      pointer-events: none;
      animation: manga-impact-burst 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(impact);
    
    this.createRadialSpeedLines(x, y, 8);
    
    this.triggerScreenShake(0.3);
    
    this.playSoundEffect(['ドカン！', 'バン！', 'ドーン！']);
    
    setTimeout(() => {
      if (impact.parentNode) {
        impact.parentNode.removeChild(impact);
      }
    }, 600);
  }
  
  triggerEmotionBurst(emotion = 'random') {
    const emotions = {
      love: 'love',
      shock: 'shock',
      anger: 'anger',
      sweat: 'sweat',
      question: 'question',
      star: 'star',
      heart: 'heart',
      exclamation: 'exclamation'
    };
    
    const selectedEmotion = emotion === 'random' 
      ? emotions[Object.keys(emotions)[Math.floor(Math.random() * Object.keys(emotions).length)]]
      : emotions[emotion] || 'star';
    
    const burstIcon = this.createGlowingSvgIcon(selectedEmotion, '3rem', 'pulse');
    burstIcon.style.cssText += `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: ${Math.random() * window.innerHeight}px;
      z-index: 1000;
      pointer-events: none;
      animation: manga-emotion-burst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(burstIcon);
    
    setTimeout(() => {
      if (burstIcon.parentNode) {
        burstIcon.parentNode.removeChild(burstIcon);
      }
    }, 2000);
  }
  
  createSpeedLines(x, y, count = 6, duration = 800) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const length = 100 + Math.random() * 100;
      
      const line = document.createElement('div');
      line.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 2px;
        height: ${length}px;
        background: linear-gradient(to bottom, transparent, rgba(42, 20, 88, 0.8), transparent);
        transform-origin: top center;
        transform: translate(-50%, 0) rotate(${angle}rad);
        z-index: 500;
        pointer-events: none;
        animation: manga-speed-line-fade ${duration}ms ease-out forwards;
      `;
      
      document.body.appendChild(line);
      
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, duration);
    }
  }
  
  createMouseSpeedLines(x, y, intensity) {
    if (Math.random() < intensity) {
      const line = document.createElement('div');
      line.style.cssText = `
        position: fixed;
        left: ${x + (Math.random() - 0.5) * 100}px;
        top: ${y + (Math.random() - 0.5) * 100}px;
        width: 1px;
        height: ${20 + intensity * 30}px;
        background: linear-gradient(to bottom, transparent, rgba(42, 20, 88, ${intensity * 0.5}), transparent);
        transform: rotate(${Math.random() * 360}deg);
        z-index: 100;
        pointer-events: none;
        animation: manga-fade-out 500ms ease-out forwards;
      `;
      
      document.body.appendChild(line);
      
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, 500);
    }
  }
  
  createRadialSpeedLines(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const length = 80 + Math.random() * 60;
      const distance = 50 + Math.random() * 30;
      
      const startX = x + Math.cos(angle) * distance;
      const startY = y + Math.sin(angle) * distance;
      
      const line = document.createElement('div');
      line.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: 3px;
        height: ${length}px;
        background: linear-gradient(to bottom, transparent, rgba(42, 20, 88, 0.9), transparent);
        transform-origin: top center;
        transform: translate(-50%, 0) rotate(${angle + Math.PI/2}rad);
        z-index: 800;
        pointer-events: none;
        animation: manga-speed-line-extend 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      `;
      
      document.body.appendChild(line);
      
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, 400);
    }
  }
  
  createFullScreenSpeedLines() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    this.createSpeedLines(centerX, centerY, 16, 1200);
    
    const focus = document.createElement('div');
    focus.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      width: 200px;
      height: 200px;
      border: 3px solid rgba(42, 20, 88, 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 600;
      pointer-events: none;
      animation: manga-focus-pulse 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(focus);
    
    setTimeout(() => {
      if (focus.parentNode) {
        focus.parentNode.removeChild(focus);
      }
    }, 1200);
  }
  
  triggerScreenShake(intensity = 0.5) {
    const duration = intensity * 500;
    this.body.style.animation = `manga-screen-shake ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      this.body.style.animation = '';
    }, duration);
  }
  
  triggerTextEffect(element, type) {
    switch(type) {
      case 'hover':
        element.classList.add('glitch-active');
        this.createSpeedLines(
          element.offsetLeft + element.offsetWidth / 2,
          element.offsetTop + element.offsetHeight / 2,
          4,
          600
        );
        break;
      case 'click':
        element.classList.add('glitch-intense');
        this.triggerImpactEffect(
          element.offsetLeft + element.offsetWidth / 2,
          element.offsetTop + element.offsetHeight / 2
        );
        setTimeout(() => {
          element.classList.remove('glitch-intense');
        }, 1000);
        break;
    }
  }
  
  resetTextEffect(element) {
    element.classList.remove('glitch-active');
  }
   triggerPhotoFocusEffect(index) {
    this.createSpeedLines(
      window.innerWidth / 2,
      window.innerHeight / 2,
      12,
      1000
    );
    
    this.playSoundEffect(['フォーカス', 'ズーム']);
  }

  resetPhotoFocusEffect() {
  }
  
  playSoundEffect(effects) {
    if (effects.length === 0) return;
    
    const effect = effects[Math.floor(Math.random() * effects.length)];
    const sfx = document.createElement('div');
    sfx.textContent = effect;
    sfx.className = 'manga-temp-sfx';
    sfx.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: ${Math.random() * window.innerHeight}px;
      font-family: 'Jember Sketch', sans-serif;
      font-size: 1.5rem;
      font-weight: 900;
      color: #2A1458;
      z-index: 1000;
      pointer-events: none;
      text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white;
      animation: manga-sfx-popup 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(sfx);
    
    setTimeout(() => {
      if (sfx.parentNode) {
        sfx.parentNode.removeChild(sfx);
      }
    }, 1500);
  }
  
  triggerRandomEmotion() {
    this.triggerEmotionBurst('random');
  }
  
  triggerActionBurst() {
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
      z-index: 999;
      pointer-events: none;
      animation: manga-action-burst 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(burst);
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createFullScreenSpeedLines();
      }, i * 200);
    }
    
    this.triggerScreenShake(0.8);
    
    this.playSoundEffect(['ドーン！', 'バースト！', 'エクスプロージョン！']);
    
    setTimeout(() => {
      if (burst.parentNode) {
        burst.parentNode.removeChild(burst);
      }
    }, 800);
  }
  
  toggleMangaMode() {
    this.isActive = !this.isActive;
    this.body.classList.toggle('manga-mode-active', this.isActive);
    
    if (this.isActive) {
      this.playSoundEffect(['マンガモード！', '漫画スタイル！']);
      this.triggerActionBurst();
    } else {
      this.resetAllEffects();
    }
    
    console.log(`🎌 Manga mode ${this.isActive ? 'activated' : 'deactivated'}`);
  }
  
  resetAllEffects() {
    document.querySelectorAll('.manga-temp-sfx, .manga-impact-burst').forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    
    this.canvasText.forEach(text => {
      text.classList.remove('glitch-active', 'glitch-intense');
    });
    
    this.body.style.animation = '';
    
    this.currentIntensity = 0;
    this.targetIntensity = 0;
  }
  
  initializeRandomEffects() {
    setInterval(() => {
      if (Math.random() < 0.15) {
        this.triggerRandomPopEmotion();
      }
    }, 5000);
    
    setInterval(() => {
      if (Math.random() < 0.08) {
        this.triggerEmotionBurst('random');
      }
    }, 8000);
    
    setInterval(() => {
      if (Math.random() < 0.05) {
        this.createSpeedLines(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          3,
          600
        );
      }
    }, 15000);
    
    setInterval(() => {
      if (Math.random() < 0.1) {
        this.createFloatingCornerEmotion();
      }
    }, 12000);
  }
  
  update() {
    this.currentIntensity += (this.targetIntensity - this.currentIntensity) * 0.1;
    
    if (this.bgEffects) {
      this.bgEffects.style.opacity = 0.3 + this.currentIntensity * 0.2;
    }    
    this.updateRandomEffectIntensity();
    
    requestAnimationFrame(this.update);
  }

  updateRandomEffectIntensity() {
    if (this.currentIntensity > 0.5) {
      if (Math.random() < 0.2) {
        this.triggerRandomPopEmotion();
      }
    }
  }
  
  startAnimationLoop() {
    this.update();
  }
  
  createGlowingSvgIcon(iconType, size = '2rem', intensity = 'normal') {
    const icon = MangaSvgIcons.createIcon(iconType, '', size);
    
    switch(intensity) {
      case 'subtle':
        icon.style.filter = 'drop-shadow(0 0 5px currentColor)';
        break;
      case 'normal':
        icon.style.filter = 'drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor)';
        break;
      case 'intense':
        icon.style.filter = 'drop-shadow(0 0 15px currentColor) drop-shadow(0 0 30px currentColor) drop-shadow(0 0 45px currentColor)';
        icon.classList.add('manga-glow-intense');
        break;
      case 'pulse':
        icon.classList.add('manga-glow-pulse');
        break;
    }
    
    return icon;
  }
  
  triggerClickEmotion(x, y) {
    const clickEmotions = ['anger', 'sweat', 'question', 'exclamation'];
    
    const numEmotions = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numEmotions; i++) {
      const selectedEmotion = clickEmotions[Math.floor(Math.random() * clickEmotions.length)];
      
      const angle = (Math.PI * 2 * i) / numEmotions + (Math.random() - 0.5) * 1;
      const distance = 40 + Math.random() * 80;
      const scatterX = x + Math.cos(angle) * distance;
      const scatterY = y + Math.sin(angle) * distance;
      
      const finalX = Math.max(50, Math.min(window.innerWidth - 50, scatterX));
      const finalY = Math.max(50, Math.min(window.innerHeight - 50, scatterY));
      
      const emotionIcon = this.createGlowingSvgIcon(selectedEmotion, '2rem', 'intense');
      emotionIcon.style.cssText += `
        position: fixed;
        left: ${finalX}px;
        top: ${finalY}px;
        z-index: 1000;
        pointer-events: none;
        transform: translate(-50%, -50%) scale(0);
        animation: manga-click-emotion-scatter 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      document.body.appendChild(emotionIcon);
      
      setTimeout(() => {
        if (emotionIcon.parentNode) {
          emotionIcon.parentNode.removeChild(emotionIcon);
        }
      }, 2000 + (i * 100));
    }
  }
  
  triggerRandomPopEmotion() {
    const randomEmotions = ['love', 'shock', 'star', 'heart'];
    const selectedEmotion = randomEmotions[Math.floor(Math.random() * randomEmotions.length)];
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const emotionIcon = this.createGlowingSvgIcon(selectedEmotion, '2rem', 'pulse');
    emotionIcon.style.cssText += `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      z-index: 900;
      pointer-events: none;
      animation: manga-random-pop 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(emotionIcon);
    
    setTimeout(() => {
      if (emotionIcon.parentNode) {
        emotionIcon.parentNode.removeChild(emotionIcon);
      }
    }, 3000);
  }
  
  createFloatingCornerEmotion() {
    const corners = [
      { x: 50, y: 50 },
      { x: window.innerWidth - 50, y: 50 },
      { x: 50, y: window.innerHeight - 50 },
      { x: window.innerWidth - 50, y: window.innerHeight - 50 }
    ];
    
    const randomCorner = corners[Math.floor(Math.random() * corners.length)];
    const floatingEmotions = ['love', 'star', 'heart'];
    const selectedEmotion = floatingEmotions[Math.floor(Math.random() * floatingEmotions.length)];
    
    const emotionIcon = this.createGlowingSvgIcon(selectedEmotion, '1.5rem', 'subtle');
    emotionIcon.style.cssText += `
      position: fixed;
      left: ${randomCorner.x}px;
      top: ${randomCorner.y}px;
      z-index: 800;
      pointer-events: none;
      opacity: 0.7;
      animation: manga-corner-float 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    `;
    
    document.body.appendChild(emotionIcon);
    
    setTimeout(() => {
      if (emotionIcon.parentNode) {
        emotionIcon.parentNode.removeChild(emotionIcon);
      }
    }, 6000);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes manga-impact-burst {
    0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.2) rotate(180deg); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(2) rotate(360deg); opacity: 0; }
  }
  
  @keyframes manga-emotion-burst {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    20% { transform: scale(1.3) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg) translateY(-50px); opacity: 0; }
  }
  
  @keyframes manga-click-emotion {
    0% { 
      transform: translate(-50%, -50%) scale(0) rotate(-20deg); 
      opacity: 1; 
    }
    30% { 
      transform: translate(-50%, -50%) scale(1.4) rotate(10deg); 
      opacity: 1; 
    }
    100% { 
      transform: translate(-50%, -50%) scale(1) rotate(0deg) translateY(-30px); 
      opacity: 0; 
    }
  }
  
  @keyframes manga-random-pop {
    0% { 
      transform: scale(0) rotate(0deg); 
      opacity: 0; 
    }
    20% { 
      transform: scale(1.2) rotate(15deg); 
      opacity: 1; 
    }
    80% { 
      transform: scale(1) rotate(-5deg); 
      opacity: 1; 
    }
    100% { 
      transform: scale(0.8) rotate(0deg) translateY(-20px); 
      opacity: 0; 
    }
  }
  
  @keyframes manga-corner-float {
    0% { 
      transform: scale(0.8) translateY(0); 
      opacity: 0; 
    }
    20% { 
      transform: scale(1) translateY(-10px); 
      opacity: 0.7; 
    }
    80% { 
      transform: scale(1) translateY(-15px); 
      opacity: 0.7; 
    }
    100% { 
      transform: scale(0.8) translateY(-30px); 
      opacity: 0; 
    }
  }
  
  @keyframes manga-speed-line-fade {
    0% { opacity: 0; transform: translate(-50%, 0) rotate(var(--angle)) scale(0, 1); }
    30% { opacity: 1; transform: translate(-50%, 0) rotate(var(--angle)) scale(1, 1); }
    100% { opacity: 0; transform: translate(-50%, 0) rotate(var(--angle)) scale(1, 1); }
  }
  
  @keyframes manga-speed-line-extend {
    0% { transform: translate(-50%, 0) rotate(var(--angle)) scaleY(0); opacity: 1; }
    50% { transform: translate(-50%, 0) rotate(var(--angle)) scaleY(1); opacity: 1; }
    100% { transform: translate(-50%, 0) rotate(var(--angle)) scaleY(1); opacity: 0; }
  }
  
  @keyframes manga-fade-out {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.5); }
  }
  
  @keyframes manga-focus-pulse {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }
  
  @keyframes manga-screen-shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  @keyframes manga-sfx-popup {
    0% { transform: scale(0) rotate(-10deg); opacity: 1; }
    20% { transform: scale(1.2) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg) translateY(-30px); opacity: 0; }
  }
  
  @keyframes manga-action-burst {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(1.2); }
  }
  
  @keyframes manga-glow-pulse {
    0% { 
      filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor); 
      transform: scale(1);
    }
    50% { 
      filter: drop-shadow(0 0 16px currentColor) drop-shadow(0 0 32px currentColor) drop-shadow(0 0 48px currentColor); 
      transform: scale(1.05);
    }
    100% { 
      filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor); 
      transform: scale(1);
    }
  }
  
  @keyframes manga-click-emotion-scatter {
    0% { 
      transform: translate(-50%, -50%) scale(0) rotate(-20deg); 
      opacity: 0; 
    }
    20% { 
      transform: translate(-50%, -50%) scale(1.3) rotate(10deg); 
      opacity: 1; 
    }
    60% { 
      transform: translate(-50%, -50%) scale(1) rotate(-5deg); 
      opacity: 1; 
    }
    100% { 
      transform: translate(-50%, -50%) scale(0.8) rotate(0deg) translateY(-20px); 
      opacity: 0; 
    }
  }
  
  .manga-mode-active .manga-bg-effects {
    opacity: 0.6 !important;
  }
  
  .manga-mode-active .manga-onomatopoeia {
    animation-duration: 1s !important;
  }
  
  .manga-svg-icon svg {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .manga-svg-icon:hover svg {
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);

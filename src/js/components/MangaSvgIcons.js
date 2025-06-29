export default class MangaSvgIcons {
  static createSvgElement(svgContent, className = '', size = '2rem') {
    const container = document.createElement('div');
    container.className = `manga-svg-icon ${className}`;
    container.style.cssText = `
      display: inline-block;
      width: ${size};
      height: ${size};
      filter: drop-shadow(0 0 8px currentColor);
    `;
    container.innerHTML = svgContent;
    return container;
  }

  static getIconSvg(iconType) {
    const icons = {
      anger: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="anger-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="anger-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#ff4444;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#cc0000;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#anger-glow)" fill="url(#anger-gradient)">
            <rect x="20" y="35" width="60" height="12" rx="6" transform="rotate(45 50 50)"/>
            <rect x="20" y="35" width="60" height="12" rx="6" transform="rotate(-45 50 50)"/>
            <circle cx="30" cy="30" r="8" opacity="0.8"/>
            <circle cx="70" cy="30" r="6" opacity="0.6"/>
            <circle cx="25" cy="70" r="5" opacity="0.7"/>
            <circle cx="75" cy="75" r="7" opacity="0.5"/>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            values="1;1.2;1;1.1;1" 
            dur="0.5s" 
            repeatCount="indefinite"/>
        </svg>
      `,
      
      love: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="love-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="love-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#ff69b4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff1493;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#love-glow)" fill="url(#love-gradient)">
            <path d="M50,75 C50,75 20,50 20,35 C20,25 30,15 40,15 C45,15 50,20 50,20 C50,20 55,15 60,15 C70,15 80,25 80,35 C80,50 50,75 50,75 Z"/>
            <path d="M75,25 C75,25 65,15 65,10 C65,7 68,5 71,5 C72,5 75,7 75,7 C75,7 78,5 79,5 C82,5 85,7 85,10 C85,15 75,25 75,25 Z" opacity="0.8"/>
            <path d="M25,65 C25,65 15,55 15,50 C15,47 18,45 21,45 C22,45 25,47 25,47 C25,47 28,45 29,45 C32,45 35,47 35,50 C35,55 25,65 25,65 Z" opacity="0.7"/>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            values="1;1.3;1" 
            dur="2s" 
            repeatCount="indefinite"/>
        </svg>
      `,
      
      shock: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shock-glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="shock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#ffd700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g filter="url(#shock-glow)">
            <path d="M30,10 L60,10 L45,40 L70,40 L40,90 L55,50 L30,50 Z" 
                  fill="url(#shock-gradient)" 
                  stroke="#ffffff" 
                  stroke-width="2"/>
            <circle cx="25" cy="25" r="3" fill="#ffff00" opacity="0.8">
              <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75" cy="35" r="2" fill="#ffd700" opacity="0.6">
              <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="20" cy="60" r="2.5" fill="#ff8c00" opacity="0.7">
              <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="80" cy="70" r="2" fill="#ffff00" opacity="0.5">
              <animate attributeName="opacity" values="0;1;0" dur="0.6s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
      `,
      
      sweat: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="sweat-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="sweat-gradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#4682b4;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#sweat-glow)">
            <path d="M50,20 C45,20 40,25 40,35 C40,50 50,70 50,70 C50,70 60,50 60,35 C60,25 55,20 50,20 Z" 
                  fill="url(#sweat-gradient)" 
                  stroke="#ffffff" 
                  stroke-width="1" 
                  opacity="0.9"/>
            <ellipse cx="48" cy="35" rx="8" ry="12" fill="#b0e0e6" opacity="0.6"/>
            
            <circle cx="25" cy="45" r="6" fill="url(#sweat-gradient)" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; 0,20; 0,40" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;0.3;0" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            
            <circle cx="75" cy="35" r="4" fill="url(#sweat-gradient)" opacity="0.6">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; 0,15; 0,30" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0.2;0" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
      `,
      
      question: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="question-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="question-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#9370db;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#663399;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#question-glow)" fill="url(#question-gradient)" stroke="#ffffff" stroke-width="3">
            <path d="M30,30 C30,20 40,15 50,15 C60,15 70,20 70,30 C70,40 50,40 50,55" 
                  fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="70" r="5"/>
            
            <g opacity="0.6" stroke-width="2">
              <path d="M20,50 C20,45 22,43 25,43 C28,43 30,45 30,48 C30,51 25,51 25,56" 
                    fill="none" stroke-linecap="round"/>
              <circle cx="25" cy="62" r="2"/>
              
              <path d="M70,65 C70,60 72,58 75,58 C78,58 80,60 80,63 C80,66 75,66 75,71" 
                    fill="none" stroke-linecap="round"/>
              <circle cx="75" cy="77" r="2"/>
            </g>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            values="0 50 50;10 50 50;-10 50 50;0 50 50" 
            dur="3s" 
            repeatCount="indefinite"/>
        </svg>
      `,
      
      star: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="star-glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ffb347;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#star-glow)">
            <g fill="url(#star-gradient)" stroke="#ffffff" stroke-width="1">
              <path d="M50,10 L55,35 L80,35 L60,50 L65,75 L50,60 L35,75 L40,50 L20,35 L45,35 Z"/>
              
              <g opacity="0.8">
                <path d="M15,20 L17,25 L22,25 L18,28 L20,33 L15,30 L10,33 L12,28 L8,25 L13,25 Z"/>
                <path d="M85,70 L87,75 L92,75 L88,78 L90,83 L85,80 L80,83 L82,78 L78,75 L83,75 Z"/>
                <path d="M25,80 L27,85 L32,85 L28,88 L30,93 L25,90 L20,93 L22,88 L18,85 L23,85 Z"/>
                <path d="M75,15 L77,20 L82,20 L78,23 L80,28 L75,25 L70,28 L72,23 L68,20 L73,20 Z"/>
              </g>
              
              <circle cx="30" cy="30" r="2" opacity="0.7">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="70" cy="40" r="1.5" opacity="0.8">
                <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="60" cy="80" r="2.5" opacity="0.6">
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
              </circle>
            </g>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            values="0 50 50;360 50 50" 
            dur="4s" 
            repeatCount="indefinite"/>
        </svg>
      `,
      
      heart: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="heart-glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="heart-gradient" cx="50%" cy="40%" r="60%">
              <stop offset="0%" style="stop-color:#ff69b4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#dc143c;stop-opacity:1" />
            </radialGradient>
          </defs>
          <g filter="url(#heart-glow)">
            <path d="M50,80 C50,80 15,55 15,35 C15,20 25,10 40,10 C45,10 50,15 50,15 C50,15 55,10 60,10 C75,10 85,20 85,35 C85,55 50,80 50,80 Z" 
                  fill="url(#heart-gradient)" 
                  stroke="#ffffff" 
                  stroke-width="2"/>
            
            <ellipse cx="42" cy="30" rx="12" ry="8" fill="#ffb6c1" opacity="0.6"/>
            
            <g opacity="0.7">
              <path d="M20,25 C20,25 10,15 10,10 C10,7 13,5 16,5 C17,5 20,7 20,7 C20,7 23,5 24,5 C27,5 30,7 30,10 C30,15 20,25 20,25 Z" 
                    fill="#ff69b4">
                <animateTransform attributeName="transform" type="translate" 
                  values="0,0; -5,-10; -10,-20" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0.3;0" dur="3s" repeatCount="indefinite"/>
              </path>
              
              <path d="M80,30 C80,30 70,20 70,15 C70,12 73,10 76,10 C77,10 80,12 80,12 C80,12 83,10 84,10 C87,10 90,12 90,15 C90,20 80,30 80,30 Z" 
                    fill="#ff1493">
                <animateTransform attributeName="transform" type="translate" 
                  values="0,0; 5,-8; 10,-16" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0.3;0" dur="2.5s" repeatCount="indefinite"/>
              </path>
            </g>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            values="1;1.2;1" 
            dur="1.5s" 
            repeatCount="indefinite"/>
        </svg>
      `,
      
      exclamation: `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="exclamation-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="exclamation-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#ff6347;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#dc143c;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g filter="url(#exclamation-glow)" fill="url(#exclamation-gradient)" stroke="#ffffff" stroke-width="2">
            <rect x="45" y="15" width="10" height="55" rx="5"/>
            
            <circle cx="50" cy="80" r="7"/>
            
            <g opacity="0.6" stroke-width="3" fill="none" stroke-linecap="round">
              <line x1="25" y1="30" x2="35" y2="25"/>
              <line x1="75" y1="30" x2="65" y2="25"/>
              <line x1="20" y1="50" x2="30" y2="45"/>
              <line x1="80" y1="50" x2="70" y2="45"/>
              <line x1="25" y1="70" x2="35" y2="65"/>
              <line x1="75" y1="70" x2="65" y2="65"/>
            </g>
          </g>
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            values="1;1.3;1;1.1;1" 
            dur="0.8s" 
            repeatCount="indefinite"/>
        </svg>
      `
    };

    return icons[iconType] || icons.star;
  }

  static createIcon(iconType, className = '', size = '2rem') {
    const svgContent = this.getIconSvg(iconType);
    return this.createSvgElement(svgContent, className, size);
  }
}

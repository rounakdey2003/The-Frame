precision highp float;
 
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uViewportSize;
uniform float uHoverIntensity;
uniform float uBlackoutIntensity;
uniform float uIsHovered;
 
varying vec2 vUv;

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
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for(int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

float fireEffect(vec2 uv, float time, float intensity) {
    if (intensity <= 0.0) return 0.0;
    
    float borderDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    
    float fireWidth = 0.08;
    
    float fireMask = 1.0 - smoothstep(0.0, fireWidth, borderDist);
    
    vec2 fireUv = uv;
    fireUv.y -= time * 0.4;
    fireUv.x += sin(uv.y * 15.0 + time * 5.0) * 0.06;
    
    float fireNoise = fbm(fireUv * 12.0 + vec2(0.0, time * 2.0));
    fireNoise += fbm(fireUv * 24.0) * 0.5;
    fireNoise += sin(time * 8.0 + uv.x * 20.0) * 0.1;
    
    float flameShape = fireMask;
    
    if (uv.y < fireWidth) {
        flameShape *= 1.5;
    }
    
    float fire = flameShape * fireNoise;
    fire = smoothstep(0.3, 0.8, fire);
    
    float sparkNoise = noise(uv * 80.0 + time * 15.0);
    float sparks = smoothstep(0.95, 1.0, sparkNoise) * fireMask;
    fire += sparks * 0.3;
    
    return fire * intensity;
}

float mangaBorder(vec2 uv, float thickness, float roughness) {
    float distanceFromEdge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    
    float sketchyNoise = noise(uv * 50.0 + uTime * 0.5) * roughness;
    float fineNoise = noise(uv * 200.0 + uTime * 0.3) * roughness * 0.3;
    
    float border = smoothstep(thickness - sketchyNoise - fineNoise, thickness + 0.01, distanceFromEdge);
    
    return 1.0 - border;
}

float screenTone(vec2 uv, float scale, float density) {
    vec2 gridUv = uv * scale;
    vec2 gridId = floor(gridUv);
    vec2 gridFract = fract(gridUv);
    
    float circle = length(gridFract - 0.5);
    float tone = smoothstep(density * 0.4, density * 0.6, circle);
    
    tone *= (0.8 + 0.4 * random(gridId));
    
    return tone;
}

float inkSplatter(vec2 uv, float time) {
    float splatter = 0.0;
    
    for(int i = 0; i < 8; i++) {
        vec2 offset = vec2(random(vec2(float(i), 0.5)), random(vec2(0.3, float(i)))) * 2.0 - 1.0;
        vec2 splatPos = uv + offset * 0.3;
        
        float dist = length(splatPos - 0.5);
        float size = 0.05 + 0.03 * sin(time + float(i) * 2.0);
        
        float spot = smoothstep(size, size * 0.7, dist);
        spot *= random(vec2(float(i), time * 0.1));
        
        splatter += spot * 0.15;
    }
    
    return clamp(splatter, 0.0, 0.3);
}

void main() {
  vec2 ratio = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
  );
 
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  
  vec3 texColor = texture2D(tMap, uv).rgb;
  
  float fireIntensity = uHoverIntensity > 0.0 ? uHoverIntensity : 0.0;
  float fire = fireEffect(vUv, uTime, fireIntensity);
  
  vec3 fireColorCore = vec3(1.0, 0.95, 0.7);
  vec3 fireColorMid = vec3(1.0, 0.5, 0.1);
  vec3 fireColorEdge = vec3(0.9, 0.2, 0.05);
  
  vec3 fireColor = mix(fireColorEdge, fireColorMid, fire);
  fireColor = mix(fireColor, fireColorCore, fire * fire);
  
  float fireGlow = fire * 0.3;
  vec3 glowColor = vec3(1.0, 0.4, 0.1) * fireGlow;
  
  float borderThickness = 0.08;
  float borderRoughness = 0.02;
  float frameBorder = mangaBorder(vUv, borderThickness, borderRoughness);
  
  frameBorder *= (1.0 - fireIntensity * 0.7);
  
  float innerBorder = mangaBorder(vUv, borderThickness * 0.5, borderRoughness * 0.5);
  innerBorder *= (1.0 - fireIntensity * 0.8);
  
  float tone = screenTone(vUv, 80.0, 0.3);
  
  float splatter = inkSplatter(vUv, uTime * 0.5);
  
  vec3 frameColor = vec3(0.95, 0.92, 0.85);
  vec3 inkColor = vec3(0.1, 0.1, 0.15);
  
  float aging = noise(vUv * 100.0) * 0.15;
  frameColor -= aging;
  
  vec3 finalColor = texColor;
  
  finalColor += fireColor * fire;
  finalColor += glowColor;
  
  finalColor = mix(finalColor, frameColor, frameBorder * 0.9);
  finalColor = mix(finalColor, inkColor, frameBorder * innerBorder * 0.8);
  
  finalColor -= tone * frameBorder * 0.3;
  
  finalColor = mix(finalColor, inkColor, splatter * frameBorder);
  
  vec2 cornerUv = abs(vUv - 0.5) * 2.0;
  float cornerDist = max(cornerUv.x, cornerUv.y);
  float cornerDecoration = smoothstep(0.7, 0.9, cornerDist);
  cornerDecoration *= noise(vUv * 30.0 + uTime * 0.2);
  cornerDecoration *= (1.0 - fireIntensity * 0.6);
  
  finalColor = mix(finalColor, inkColor, cornerDecoration * 0.4 * frameBorder);
  
  float globalTone = screenTone(vUv, 150.0, 0.15);
  finalColor *= (1.0 - globalTone * 0.1);
  
  if (fireIntensity > 0.0) {
    vec2 distortionUv = vUv;
    float heatWave = sin(vUv.x * 30.0 + uTime * 10.0) * sin(vUv.y * 25.0 + uTime * 8.0);
    heatWave *= fire * 0.005;
    distortionUv += heatWave;
    
    vec2 distortedRatio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    
    vec2 distortedUv = vec2(
      distortionUv.x * distortedRatio.x + (1.0 - distortedRatio.x) * 0.5,
      distortionUv.y * distortedRatio.y + (1.0 - distortedRatio.y) * 0.5
    );
    
    if (distortedUv.x >= 0.0 && distortedUv.x <= 1.0 && distortedUv.y >= 0.0 && distortedUv.y <= 1.0) {
      vec3 distortedColor = texture2D(tMap, distortedUv).rgb;
      finalColor = mix(finalColor, distortedColor, fire * 0.3);
    }
  }
  
  if (uBlackoutIntensity > 0.0 && uIsHovered < 0.5) {
    float blackoutStrength = uBlackoutIntensity * 0.85;
    finalColor = mix(finalColor, vec3(0.0), blackoutStrength);
    
    float edgeLight = 1.0 - smoothstep(0.0, 0.1, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
    finalColor += edgeLight * 0.05 * blackoutStrength;
  }
  
  gl_FragColor.rgb = finalColor;
  gl_FragColor.a = 1.0;
}
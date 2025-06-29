import Canvas from "./components/Canvas";
import GlitchEffect from "./components/GlitchEffect";
import MangaEffects from "./components/MangaEffects";

window.addEventListener("load", () => {
  const canvas = new Canvas();
  
  const mangaEffects = new MangaEffects();
  
  setTimeout(() => {
    const glitchEffect = new GlitchEffect();
    
    window.glitchEffect = glitchEffect;
    window.mangaEffects = mangaEffects;
    
    console.log('🎮 Effects loaded!');
    console.log('🎌 Manga Controls: M=Toggle Mode, I=Impact, E=Emotion, S=Speed Lines, B=Action Burst');
    console.log('👆 Click=Anger/Sweat/Question/Exclamation | Random=Love/Shock/Star/Heart');
    console.log('⚡ Glitch Controls: G=Random Glitch');
  }, 100);
});

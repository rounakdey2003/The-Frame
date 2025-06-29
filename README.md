# The Frame

An interactive WebGL-powered visual art gallery with dynamic manga-style effects and smooth animations.

## ✨ Features

- **Interactive WebGL Gallery**: Smooth scrolling image gallery powered by OGL (WebGL library)
- **Manga-Style Effects**: Dynamic visual effects inspired by manga and anime aesthetics
- **Glitch Effects**: Real-time glitch distortions and visual corruptions
- **Responsive Design**: Optimized for various screen sizes and devices
- **GLSL Shaders**: Custom fragment and vertex shaders for advanced visual effects
- **Interactive Controls**: Keyboard shortcuts for triggering various effects

## 🎮 Controls

### Manga Effects
- `M` - Toggle manga mode
- `I` - Impact effect
- `E` - Emotion effect  
- `S` - Speed lines
- `B` - Action burst
- **Click** - Cycle through: Anger → Sweat → Question → Exclamation
- **Random Effects** - Love, Shock, Star, Heart animations

### Glitch Effects
- `G` - Random glitch effect

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: WebGL with OGL library
- **Styling**: SCSS/Sass
- **Build Tool**: Vite
- **Shaders**: GLSL (OpenGL Shading Language)

## 📦 Dependencies

- **OGL** (`^1.0.8`) - Lightweight WebGL library
- **Sass** (`^1.62.0`) - CSS preprocessor
- **normalize-wheel** (`^1.0.1`) - Cross-browser wheel event normalization
- **Vite** (`^5.3.2`) - Fast build tool and dev server
- **vite-plugin-glsl** (`^1.3.0`) - GLSL shader support for Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Frame
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
├── js/
│   ├── index.js           # Entry point
│   ├── components/        # Core components
│   │   ├── Canvas.js      # WebGL canvas controller
│   │   ├── FireEffect.js  # Fire particle effects
│   │   ├── GlitchEffect.js # Glitch distortion effects
│   │   ├── MangaEffects.js # Manga-style visual effects
│   │   ├── MangaSvgIcons.js # SVG icon animations
│   │   └── Media.js       # Image media handling
│   └── utils/
│       ├── bind.js        # Auto-binding utility
│       └── math.js        # Math helper functions
├── public/
│   ├── fonts/             # Custom fonts
│   └── img/               # Image assets (1.jpg - 12.jpg)
├── shaders/
│   ├── fragment.glsl      # Fragment shader
│   └── vertex.glsl        # Vertex shader
└── styles/
    ├── index.scss         # Main stylesheet
    ├── frame.scss         # Frame-specific styles
    ├── manga-components.scss # Manga effect styles
    ├── manga-globals.scss # Global manga styles
    └── core/              # Core SCSS files
        ├── _globals.scss
        ├── _reset.scss
        └── _variables.scss
```

## 🎨 Visual Effects

### Canvas Effects
- Smooth parallax scrolling
- Mouse-responsive transformations
- WebGL-powered image rendering
- Custom shader effects

### Manga Effects
- Speed lines and action bursts
- Emotion indicators (love, shock, anger, etc.)
- Speech bubbles and thought clouds
- Screen tones and halftone patterns
- Onomatopoeia text effects

### Glitch Effects
- RGB channel separation
- Digital noise and corruption
- Scan line distortions
- Random glitch triggers

## 🎌 Theming

The project features a manga/anime-inspired aesthetic with:
- Japanese typography elements
- Cherry blossom patterns
- Manga panel layouts
- Action-oriented visual effects
- Sketch-style borders and frames

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).


## 🙏 Acknowledgments

- Inspired by manga and anime visual storytelling
- Built with modern web technologies
- Special thanks to the open-source community

---

Made with ❤️ by [Rounak Dey](https://www.github.com/rounakdey2003)

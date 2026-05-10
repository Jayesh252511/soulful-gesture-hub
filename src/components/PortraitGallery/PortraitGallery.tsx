import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortraitGallery.scss';

// INTEGRATING CUSTOM ASSETS - MAPPED TO PROPER LINGUISTIC DATA
const SIGN_DATA = [
  { label: 'L', soulMessage: "Finding your way.", howTo: 'Point your index finger up and stick your thumb out to the side like an "L".', deepMeaning: 'This represents a corner or a foundation.', usageExample: 'Used for "Look", "Listen", or "Love".', category: 'ALPHABET', info: 'The Pillar of Direction', confidence: '0.99', geometry: '1_VERT_1_HORIZ', color: '#00f2ff', url: '/signs/l.jpg', videoUrl: '/videos/01_L.mp4', fingerStates: [1, 1, 0, 0, 0] },
  { label: 'Y', soulMessage: "Staying balanced.", howTo: 'Stick your thumb and pinky finger out. Tuck your other fingers in.', deepMeaning: 'The shape represents the letter "Y".', usageExample: "Use this to say 'Yellow' or 'Same'.", category: 'ALPHABET', info: 'The Balance Point', confidence: '0.98', geometry: 'Y-SHAPE', color: '#ff00ff', url: '/signs/y.jpg', videoUrl: '/videos/02_Y.mp4', fingerStates: [1, 0, 0, 0, 1] },
  { label: 'A', soulMessage: "Solid and steady.", howTo: 'Make a tight fist with your thumb resting against the side of your index finger.', deepMeaning: 'The most basic handshape, representing "A".', usageExample: "Use this for the letter 'A' or to say 'My'.", category: 'ALPHABET', info: 'The Origin Point', confidence: '0.99', geometry: 'CLOSED_SPHERE', color: '#fffb00', url: '/signs/a.jpg', videoUrl: '/videos/03_A.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'F', soulMessage: "Everything is good.", howTo: 'Touch your thumb and index finger to make a circle. Point your other fingers up.', deepMeaning: "The letter 'F', also used for the 'OK' sign.", usageExample: "Use this to show that something is correct.", category: 'SIGNS', info: 'The Lens of Clarity', confidence: '0.97', geometry: 'OK-SHAPE', color: '#00ff9d', url: '/signs/f.jpg', videoUrl: '/videos/04_F.mp4', fingerStates: [1, 0, 1, 1, 1] },
  { label: 'C', soulMessage: "Open heart.", howTo: 'Curve your hand like you are holding a large cup.', deepMeaning: 'An arc that welcomes and holds space.', usageExample: 'The start of "Care" or "Change".', category: 'ALPHABET', info: 'The Open Arc', confidence: '0.96', geometry: 'CURVED_SEMICIRCLE', color: '#ff2e63', url: '/signs/c.jpg', videoUrl: '/videos/05_C.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'HELLO', soulMessage: "Friendly greeting.", howTo: 'Place your hand near your forehead and move it away in a small salute.', deepMeaning: 'A beam of light reaching out to acknowledge another soul.', usageExample: 'The first step to making a new friend.', category: 'GREETINGS', info: 'The Connection Beam', confidence: '0.99', geometry: 'OPEN_PALM_WAVE', color: '#00d1ff', url: '/signs/hello.jpg', videoUrl: '/videos/06_Hello.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'RAIN', soulMessage: "Falling water.", howTo: 'Spread your fingers and move your hands down while wiggling them.', deepMeaning: 'Mimes the action of raindrops falling.', usageExample: 'Use this to talk about rainy weather.', category: 'NATURE', info: 'Water Flow', confidence: '0.95', geometry: 'FALLING', color: '#0066ff', url: '/signs/rain.jpg', videoUrl: '/videos/07_Rain.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'DRINK', soulMessage: "Thirst-quencher.", howTo: 'Make a "C" shape and bring it to your mouth like a cup.', deepMeaning: 'Mimics the physical act of drinking.', usageExample: 'Use this to ask for water or a beverage.', category: 'DAILY', info: 'Life Fluid', confidence: '0.98', geometry: 'CUP-TO-MOUTH', color: '#00ffcc', url: '/signs/drink.jpg', videoUrl: '/videos/08_Drink.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'EAT', soulMessage: "Energy boost.", howTo: 'Touch your fingers to your thumb and tap your mouth.', deepMeaning: 'Universal sign for putting food in your mouth.', usageExample: 'Use this to say you are hungry or eating.', category: 'DAILY', info: 'Life Energy', confidence: '0.99', geometry: 'HAND-TO-LIPS', color: '#ffcc00', url: '/signs/food.jpg', videoUrl: '/videos/09_Eat.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'THIRSTY', soulMessage: "Dry throat.", howTo: 'Point your index finger and draw it down your throat.', deepMeaning: 'Traces the path of water going down.', usageExample: 'Use this to say you need a drink.', category: 'DAILY', info: 'Dry Path', confidence: '0.97', geometry: 'THROAT-LINE', color: '#ff3300', url: '/signs/thirsty.jpg', videoUrl: '/videos/10_Thirsty.mp4', fingerStates: [0, 1, 0, 0, 0] },
  { label: 'LOVE', soulMessage: "Deep care.", howTo: 'Cross your arms over your chest like a warm hug.', deepMeaning: 'A gesture of affection and protection.', usageExample: 'Use this to show love for friends and family.', category: 'FEELINGS', info: 'Heart Resonance', confidence: '0.99', geometry: 'HUG', color: '#ff0066', url: '/signs/love.jpg', videoUrl: '/videos/11_Love.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'MILK', soulMessage: "Simple rhythm.", howTo: 'Make a fist and squeeze it open and shut repeatedly.', deepMeaning: 'Mimics the action of milking a cow.', usageExample: 'Use this for milk or when feeding a baby.', category: 'DAILY', info: 'Rhythmic Squeeze', confidence: '0.96', geometry: 'SQUEEZE', color: '#ffffff', url: '/signs/milk.jpg', videoUrl: '/videos/12_Milk.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'KNOW', soulMessage: "Clear mind.", howTo: 'Tap the side of your forehead with your fingertips.', deepMeaning: 'Points to where your knowledge is kept.', usageExample: "Use this to say 'I understand' or 'I know'.", category: 'THINKING', info: 'Mind Tap', confidence: '0.99', geometry: 'HEAD-TAP', color: '#00ff99', url: '/signs/know.jpg', videoUrl: '/videos/13_Know.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'FORGET', soulMessage: "Wipe it away.", howTo: 'Swipe your palm across your forehead from one side to the other.', deepMeaning: 'Like wiping a thought off a whiteboard.', usageExample: "Use this when you can't remember something.", category: 'THINKING', info: 'Mind Wipe', confidence: '0.94', geometry: 'WIPE', color: '#9900ff', url: '/signs/forget.jpg', videoUrl: '/videos/14_Forget.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'LINK', soulMessage: "Strong bond.", howTo: 'Interlock your thumb and index finger circles like a chain.', deepMeaning: 'Shows how two things are joined together.', usageExample: 'Use this for a connection or relationship.', category: 'SIGNS', info: 'Soul Link', confidence: '0.98', geometry: 'CHAIN', color: '#00f2ff', url: '/signs/link.jpg', videoUrl: '/videos/15_Link.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'BOOK', soulMessage: "Open mind.", howTo: 'Place your palms together and open them like a book.', deepMeaning: 'Exactly like opening a real physical book.', usageExample: 'Use this for reading, school, or library.', category: 'DAILY', info: 'Knowledge Gate', confidence: '0.99', geometry: 'OPEN-BOOK', color: '#00ccff', url: '/signs/book.jpg', videoUrl: '/videos/16_Book.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'SEE', soulMessage: "Watch closely.", howTo: 'Make a "V" shape with your fingers and move it away from your eyes.', deepMeaning: 'Points in the direction you are looking.', usageExample: "Use this to say 'Look over there'.", category: 'SENSES', info: 'Vision Path', confidence: '0.99', geometry: 'V-EYES', color: '#ff0099', url: '/signs/see.jpg', videoUrl: '/videos/17_See.mp4', fingerStates: [0, 1, 1, 0, 0] },
  { label: 'SKY', soulMessage: "The high blue.", howTo: 'Wave your hand in a big arc above your head.', deepMeaning: 'Tracing the giant dome of the sky above us.', usageExample: 'Use this for weather or the heavens.', category: 'NATURE', info: 'Infinite Arc', confidence: '0.95', geometry: 'SKY-ARC', color: '#0033ff', url: '/signs/sky.jpg', videoUrl: '/videos/18_Sky.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'BABY', soulMessage: "New life.", howTo: "Cradle your arms like you're holding a baby and rock them.", deepMeaning: 'Mimics the act of holding an infant.', usageExample: 'Use this for babies or young children.', category: 'FAMILY', info: 'The Cradle', confidence: '0.99', geometry: 'CRADLE', color: '#ff99cc', url: '/signs/baby.jpg', videoUrl: '/videos/19_Baby.mp4', fingerStates: [0, 0, 0, 0, 0] },
  { label: 'WALK', soulMessage: "Steady steps.", howTo: 'Alternate moving your flat hands forward like they are feet.', deepMeaning: 'Mimics the physical rhythm of walking.', usageExample: 'Use this to talk about going for a walk.', category: 'DAILY', info: 'Physical Flow', confidence: '0.97', geometry: 'WALK-HANDS', color: '#66ff00', url: '/signs/walk.jpg', videoUrl: '/videos/20_Walk.mp4', fingerStates: [1, 1, 1, 1, 1] },
  { label: 'ILY', soulMessage: "Pure love.", howTo: 'Stick your thumb, index, and pinky out at the same time.', deepMeaning: "The universal sign for 'I Love You'.", usageExample: 'Use this to show love to anyone you care about.', category: 'FEELINGS', info: 'Universal Heart', confidence: '1.00', geometry: 'ILY-SHAPE', color: '#ff00ff', url: '/signs/iloveyou.jpg', videoUrl: '/videos/21_ILoveYou.mp4', fingerStates: [1, 1, 0, 0, 1] },
];

export const PortraitGallery = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hoveredSign, setHoveredSign] = useState<any>(null);
  const [revealedSign, setRevealedSign] = useState<any>(null);
  const [isSoulRevealing, setIsSoulRevealing] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceAccuracy, setPracticeAccuracy] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("ALL");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const engineRef = useRef<any>(null);
  const videoRefMedia = useRef<HTMLVideoElement>(null);
  const canvasRefMedia = useRef<HTMLCanvasElement>(null);
  const handsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Jump to specific category logic
  const jumpToCategory = (cat: string) => {
    setCurrentCategory(cat);
    if (!engineRef.current) return;
    
    // Find the average position of signs in this category
    const filteredSigns = SIGN_DATA.map((s, i) => ({ ...s, index: i }))
      .filter(s => cat === "ALL" || s.category === cat);
    
    if (filteredSigns.length === 0) return;
    
    // Simple logic: jump to the first one in the category for now
    const firstIndex = filteredSigns[0].index;
    const cols = 5;
    const gridX = firstIndex % cols;
    const gridY = Math.floor(firstIndex / cols);
    
    const targetX = -(gridX * (engineRef.current.imageWidth + engineRef.current.gap)) + window.innerWidth/2;
    const targetY = -(gridY * (engineRef.current.imageHeight + engineRef.current.gap)) + window.innerHeight/2;
    
    engineRef.current.viewOffset.x = targetX;
    engineRef.current.viewOffset.y = targetY;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    class GalleryEngine {
      canvas: HTMLCanvasElement;
      gl: WebGLRenderingContext;
      images: (HTMLImageElement | null)[] = new Array(SIGN_DATA.length).fill(null);
      textures: (WebGLTexture | null)[] = new Array(SIGN_DATA.length).fill(null);
      imageWidth = window.innerWidth < 768 ? 120 : 180;
      imageHeight = window.innerWidth < 768 ? 120 : 180;
      gap = window.innerWidth < 768 ? 15 : 25;
      viewOffset = { x: 0, y: 0 };
      drag = { isDragging: false, lastX: 0, lastY: 0, velocityX: 0, velocityY: 0 };
      inertia = 0.95;
      bulgeStrength = window.innerWidth < 768 ? 0.3 : 0.5;
      bulgeRadius = window.innerWidth < 768 ? 1.0 : 1.6;
      adjustedBulgeRadius = window.innerWidth < 768 ? 1.0 : 1.6;
      program: WebGLProgram | null = null;
      particleProgram: WebGLProgram | null = null;
      positionBuffer: WebGLBuffer | null = null;
      texCoordBuffer: WebGLBuffer | null = null;
      indexBuffer: WebGLBuffer | null = null;
      particleBuffer: WebGLBuffer | null = null;
      particleColorBuffer: WebGLBuffer | null = null;
      particleSizeBuffer: WebGLBuffer | null = null;
      
      // Video Handling
      videoElement: HTMLVideoElement;
      videoTexture: WebGLTexture;
      currentVideoUrl: string = "";
      hoverFactor: number = 0;
      targetHoverFactor: number = 0;
      audioData: Uint8Array | null = null;

      indexCount = 0;
      animationFrameId: number = 0;
      hoveredTile: { x: number, y: number, gridX: number, gridY: number } | null = null;
      time: number = 0;

      // Particle Data
      particleCount = window.innerWidth < 768 ? 1200 : 2500;
      particlePositions: Float32Array;
      particleVelocities: Float32Array;
      particleColors: Float32Array;
      particleSizes: Float32Array;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })!;
        
        // Setup hidden video element
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.videoElement.loop = true;
        this.videoElement.muted = true;
        this.videoElement.playsInline = true;
        this.videoTexture = this.gl.createTexture()!;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        // Initialize Particles
        this.particlePositions = new Float32Array(this.particleCount * 2);
        this.particleVelocities = new Float32Array(this.particleCount * 2);
        this.particleColors = new Float32Array(this.particleCount * 3);
        this.particleSizes = new Float32Array(this.particleCount);
        this.initParticles();
        
        this.resize();
        this.init();
      }

      initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
          this.particlePositions[i * 2] = Math.random() * 2 - 1;
          this.particlePositions[i * 2 + 1] = Math.random() * 2 - 1;
          
          // Varying speeds for parallax depth
          const speedScale = 0.0005 + Math.random() * 0.0015;
          this.particleVelocities[i * 2] = (Math.random() - 0.5) * speedScale;
          this.particleVelocities[i * 2 + 1] = (Math.random() - 0.5) * speedScale;
          
          const signIndex = Math.floor(Math.random() * SIGN_DATA.length);
          const rgb = this.hexToRgb(SIGN_DATA[signIndex].color);
          
          // Color Jitter: slight random offset for "multi-color" feel
          const jitter = (Math.random() - 0.5) * 0.2;
          this.particleColors[i * 3] = Math.max(0, Math.min(1, rgb.r / 255 + jitter));
          this.particleColors[i * 3 + 1] = Math.max(0, Math.min(1, rgb.g / 255 + jitter));
          this.particleColors[i * 3 + 2] = Math.max(0, Math.min(1, rgb.b / 255 + jitter));
          
          this.particleSizes[i] = 1.0 + Math.random() * 3.0;
        }
      }

      triggerExplosion(mouseX: number, mouseY: number, color: string) {
        const rgb = this.hexToRgb(color);
        // Convert screen coords to clip space
        const cx = (mouseX / this.canvas.width) * 2 - 1;
        const cy = (1 - mouseY / this.canvas.height) * 2 - 1;

        for (let i = 0; i < this.particleCount; i++) {
          this.particlePositions[i * 2] = cx;
          this.particlePositions[i * 2 + 1] = cy;
          
          const angle = Math.random() * Math.PI * 2;
          const force = 0.01 + Math.random() * 0.04;
          this.particleVelocities[i * 2] = Math.cos(angle) * force;
          this.particleVelocities[i * 2 + 1] = Math.sin(angle) * force;
          
          this.particleColors[i * 3] = rgb.r / 255;
          this.particleColors[i * 3 + 1] = rgb.g / 255;
          this.particleColors[i * 3 + 2] = rgb.b / 255;
        }
      }

      resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const isMobile = window.innerWidth < 768;
        this.imageWidth = isMobile ? 130 : 180;
        this.imageHeight = isMobile ? 130 : 180;
        this.gap = isMobile ? 12 : 25;
        const diagonal = Math.sqrt(Math.pow(this.canvas.width / Math.min(this.canvas.width, this.canvas.height), 2) + Math.pow(this.canvas.height / Math.min(this.canvas.width, this.canvas.height), 2));
        this.adjustedBulgeRadius = isMobile ? 1.0 : Math.max(this.bulgeRadius, diagonal * 0.6 * 1.2);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }

      init() {
        const vsSource = `
          attribute vec2 aPosition;
          attribute vec2 aTexCoord;
          varying vec2 vTexCoord;
          varying float vIsHovered;
          uniform vec2 uResolution;
          uniform vec2 uOffset;
          uniform vec2 uImagePosition;
          uniform vec2 uHoveredTile;
          uniform float uBulgeStrength;
          uniform float uBulgeRadius;
          uniform vec2 uImageSize;
          vec2 applyBulgeEffect(vec2 pos){
              vec2 normalizedPos = pos / uResolution;
              vec2 center = vec2(0.5, 0.5);
              vec2 delta = normalizedPos - center;
              float aspect = uResolution.x / uResolution.y;
              delta.x *= aspect;
              float dist = length(delta);
              if(dist < uBulgeRadius){
                  float t = dist / uBulgeRadius;
                  float z = sqrt(0.5 - t * t);
                  delta *= 0.35 + uBulgeStrength / z;
                  delta.x /= aspect;
                  normalizedPos = center + delta;
                  pos = normalizedPos * uResolution;
              }
              return pos;
          }
          void main(){
              vec2 pos = aPosition * uImageSize;
              pos += uImagePosition;
              pos -= uOffset;
              vIsHovered = 0.0;
              if(abs(uImagePosition.x - uHoveredTile.x) < 1.0 && abs(uImagePosition.y - uHoveredTile.y) < 1.0){
                  vIsHovered = 1.0;
              }
              pos = applyBulgeEffect(pos);
              vec2 clip = pos / uResolution * 2.0 - 1.0;
              gl_Position = vec4(clip, 0.0, 1.0);
              vTexCoord = aTexCoord;
          }
        `;
        const fsSource = `
          precision mediump float;
          varying vec2 vTexCoord;
          varying float vIsHovered;
          uniform sampler2D uSampler;
          uniform sampler2D uVideoSampler;
          uniform vec3 uHoverColor;
          uniform vec3 uBaseColor;
          uniform float uTime;
          uniform bool uHasTexture;
          uniform bool uShowVideo;
          uniform float uHoverFactor; // 0.0 to 1.0

          float getLuminance(vec3 color) { return dot(color, vec3(0.299, 0.587, 0.114)); }
          
          void main(){
              if(!uHasTexture){ gl_FragColor = vec4(0.02, 0.02, 0.02, 1.0); return; }
              vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
              
              // Apply slight zoom-in effect during transition
              vec2 centeredUv = uv - 0.5;
              centeredUv *= (1.0 - uHoverFactor * 0.1); 
              uv = centeredUv + 0.5;

              vec4 photoColor = texture2D(uSampler, uv);
              vec4 videoColor = uShowVideo ? texture2D(uVideoSampler, uv) : photoColor;
              
              // Smooth cross-fade between photo and video
              vec4 color = mix(photoColor, videoColor, uHoverFactor);

              float lum = getLuminance(color.rgb);
              vec3 neonColor = uBaseColor * (lum + 0.15);
              color.rgb = mix(color.rgb, neonColor, 0.85);

              if(vIsHovered > 0.5){
                  float glow = 1.0 - length(vTexCoord - 0.5) * 2.0;
                  color.rgb += uHoverColor * pow(glow, 3.0) * (0.6 + uHoverFactor * 0.4);
                  float scan = step(0.98, fract(vTexCoord.y * 10.0 + uTime * 2.0));
                  color.rgb += uHoverColor * scan * 0.3;
                  float edge = step(0.96, vTexCoord.x) + step(vTexCoord.x, 0.04) + step(0.96, vTexCoord.y) + step(vTexCoord.y, 0.04);
                  color.rgb = mix(color.rgb, uHoverColor, edge * 0.5);
              }
              if(color.a < 0.01) discard;
              gl_FragColor = color;
          }
        `;
        this.program = this.createProgram(vsSource, fsSource);

        const particleVsSource = `
          attribute vec2 aPosition;
          attribute vec3 aColor;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uTime;
          void main(){
              vec2 pos = aPosition;
              // Organic drifting motion
              pos.x += sin(uTime * 0.3 + pos.y * 5.0) * 0.015;
              pos.y += cos(uTime * 0.4 + pos.x * 7.0) * 0.015;
              
              gl_Position = vec4(pos, 0.0, 1.0);
              
              // Holographic shimmering size
              gl_PointSize = aSize * (1.0 + sin(uTime * 3.0 + pos.x * 100.0) * 0.5);
              
              vColor = aColor;
              // Shimmering alpha
              vAlpha = 0.2 + sin(uTime * 5.0 + pos.x * 200.0) * 0.15;
          }
        `;
        const particleFsSource = `
          precision mediump float;
          varying vec3 vColor;
          varying float vAlpha;
          void main(){
              float dist = length(gl_PointCoord - 0.5);
              // Circular soft glow
              float softGlow = smoothstep(0.5, 0.2, dist);
              if(dist > 0.5) discard;
              gl_FragColor = vec4(vColor, vAlpha * softGlow);
          }
        `;
        this.particleProgram = this.createProgram(particleVsSource, particleFsSource);

        const SUBDIV = 16;
        const positions: number[] = [];
        const texCoords: number[] = [];
        const indices: number[] = [];
        for (let y = 0; y <= SUBDIV; y++) {
          for (let x = 0; x <= SUBDIV; x++) {
            positions.push(x / SUBDIV, y / SUBDIV);
            texCoords.push(x / SUBDIV, y / SUBDIV);
          }
        }
        for (let y = 0; y < SUBDIV; y++) {
          for (let x = 0; x < SUBDIV; x++) {
            const i = y * (SUBDIV + 1) + x;
            indices.push(i, i + 1, i + SUBDIV + 1);
            indices.push(i + 1, i + SUBDIV + 2, i + SUBDIV + 1);
          }
        }
        this.indexCount = indices.length;
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        this.texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);
        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

        this.particleBuffer = this.gl.createBuffer();
        this.particleColorBuffer = this.gl.createBuffer();
        this.particleSizeBuffer = this.gl.createBuffer();

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      }

      async loadImages(onProgress: (p: number) => void) {
        let loaded = 0;
        const total = SIGN_DATA.length;
        const loadPromises = SIGN_DATA.map((data, i) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = data.url;
            img.onload = () => {
              this.images[i] = img;
              this.textures[i] = this.createTexture(img);
              loaded++;
              onProgress(Math.round((loaded / total) * 100));
              resolve();
            };
            img.onerror = () => resolve();
          });
        });
        await Promise.all(loadPromises);
        onProgress(100);
      }

      createTexture(img: HTMLImageElement) {
        const tex = this.gl.createTexture()!;
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        return tex;
      }

      getTileAtPosition(mouseX: number, mouseY: number) {
        const tileW = this.imageWidth + this.gap;
        const tileH = this.imageHeight + this.gap;
        const worldX = mouseX + this.viewOffset.x;
        const worldY = (this.canvas.height - mouseY) + this.viewOffset.y;
        const x = Math.floor(worldX / tileW);
        const y = Math.floor(worldY / tileH);
        return { x: x * tileW, y: y * tileH, gridX: x, gridY: y };
      }

      updateVideoTexture() {
        if (this.videoElement.readyState >= this.videoElement.HAVE_CURRENT_DATA) {
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.videoElement);
        }
      }

      render(avgFreq: number = 0) {
        if (!this.program || !this.particleProgram) return;
        this.time += 0.016;

        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // Render Particles First (Background)
        this.gl.useProgram(this.particleProgram);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particlePositions, this.gl.DYNAMIC_DRAW);
        const pPosLoc = this.gl.getAttribLocation(this.particleProgram, 'aPosition');
        this.gl.enableVertexAttribArray(pPosLoc);
        this.gl.vertexAttribPointer(pPosLoc, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleColorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particleColors, this.gl.DYNAMIC_DRAW);
        const pColLoc = this.gl.getAttribLocation(this.particleProgram, 'aColor');
        this.gl.enableVertexAttribArray(pColLoc);
        this.gl.vertexAttribPointer(pColLoc, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleSizeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particleSizes, this.gl.DYNAMIC_DRAW);
        const pSizeLoc = this.gl.getAttribLocation(this.particleProgram, 'aSize');
        this.gl.enableVertexAttribArray(pSizeLoc);
        this.gl.vertexAttribPointer(pSizeLoc, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.uniform1f(this.gl.getUniformLocation(this.particleProgram, 'uTime'), this.time);
        this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount);

        // Render Image Grid
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.program, 'aPosition'));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.program, 'aPosition'), 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.program, 'aTexCoord'));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
        this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.program, 'aTexCoord'), 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'uResolution'), this.canvas.width, this.canvas.height);
        this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'uImageSize'), this.imageWidth, this.imageHeight);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'uTime'), this.time);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'uBulgeStrength'), this.bulgeStrength);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'uBulgeRadius'), this.adjustedBulgeRadius);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'uHoverFactor'), this.hoverFactor);

        const tileW = this.imageWidth + this.gap;
        const tileH = this.imageHeight + this.gap;
        const offsetLoc = this.gl.getUniformLocation(this.program, 'uOffset');
        const imgPosLoc = this.gl.getUniformLocation(this.program, 'uImagePosition');
        const hasTexLoc = this.gl.getUniformLocation(this.program, 'uHasTexture');
        const showVidLoc = this.gl.getUniformLocation(this.program, 'uShowVideo');
        const hoverTileLoc = this.gl.getUniformLocation(this.program, 'uHoveredTile');
        const hoverColorLoc = this.gl.getUniformLocation(this.program, 'uHoverColor');
        const baseColorLoc = this.gl.getUniformLocation(this.program, 'uBaseColor');
        const videoSampLoc = this.gl.getUniformLocation(this.program, 'uVideoSampler');

        if (this.hoveredTile) {
          this.updateVideoTexture();
          this.gl.uniform2f(hoverTileLoc, this.hoveredTile.x, this.hoveredTile.y);
          const hash = Math.abs((this.hoveredTile.gridX * 7919 + this.hoveredTile.gridY * 7307) % SIGN_DATA.length);
          const rgb = this.hexToRgb(SIGN_DATA[hash].color);
          this.gl.uniform3f(hoverColorLoc, rgb.r / 255, rgb.g / 255, rgb.b / 255);
        } else { this.gl.uniform2f(hoverTileLoc, -9999, -9999); }

        for (let y = Math.floor((this.viewOffset.y - this.canvas.height) / tileH) - 1; y <= Math.ceil((this.viewOffset.y + this.canvas.height * 2) / tileH) + 1; y++) {
          for (let x = Math.floor((this.viewOffset.x - this.canvas.width) / tileW) - 1; x <= Math.ceil((this.viewOffset.x + this.canvas.width * 2) / tileW) + 1; x++) {
            const hash = Math.abs((x * 7919 + y * 7307) % SIGN_DATA.length);
            const tex = this.textures[hash];
            const rgb = this.hexToRgb(SIGN_DATA[hash].color);
            this.gl.uniform2f(offsetLoc, this.viewOffset.x, this.viewOffset.y);
            this.gl.uniform2f(imgPosLoc, x * tileW, y * tileH);
            this.gl.uniform1i(hasTexLoc, tex ? 1 : 0);
            this.gl.uniform3f(baseColorLoc, rgb.r / 255, rgb.g / 255, rgb.b / 255);

            const isHovered = this.hoveredTile && this.hoveredTile.gridX === x && this.hoveredTile.gridY === y;
            this.gl.uniform1i(showVidLoc, isHovered ? 1 : 0);

            if (isHovered) {
              this.gl.activeTexture(this.gl.TEXTURE1);
              this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);
              this.gl.uniform1i(videoSampLoc, 1);
              this.gl.activeTexture(this.gl.TEXTURE0);
            }

            if (tex) this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, 0);
          }
        }
      }

      hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 255, g: 255, b: 255 };
      }

      animate() {
        this.hoverFactor += (this.targetHoverFactor - this.hoverFactor) * 0.15;
        
        let avgFreq = 0;
        if (this.audioData && analyserRef.current) {
          analyserRef.current.getByteFrequencyData(this.audioData as any);
          let sum = 0;
          for(let i=0; i<this.audioData.length; i++) sum += this.audioData[i];
          avgFreq = sum / this.audioData.length / 255;
        }

        // Update Particles with Audio
        for (let i = 0; i < this.particleCount; i++) {
          const speedMod = 1.0 + avgFreq * 3.0;
          this.particlePositions[i * 2] += this.particleVelocities[i * 2] * speedMod;
          this.particlePositions[i * 2 + 1] += this.particleVelocities[i * 2 + 1] * speedMod;
          
          if (this.particlePositions[i * 2] > 1) this.particlePositions[i * 2] = -1;
          if (this.particlePositions[i * 2] < -1) this.particlePositions[i * 2] = 1;
          if (this.particlePositions[i * 2 + 1] > 1) this.particlePositions[i * 2 + 1] = -1;
          if (this.particlePositions[i * 2 + 1] < -1) this.particlePositions[i * 2 + 1] = 1;
        }

        if (!this.drag.isDragging) {
          this.viewOffset.x -= this.drag.velocityX;
          this.viewOffset.y -= this.drag.velocityY;
          this.drag.velocityX *= this.inertia;
          this.drag.velocityY *= this.inertia;
        }
        this.render(avgFreq);
        
        // Final Polish: Pulse the nebula background if in overlay
        if (isSoulRevealing) {
          const nebula = document.querySelector('.nebula') as HTMLElement;
          if (nebula) {
            nebula.style.opacity = (0.15 + avgFreq * 0.3).toString();
            nebula.style.transform = `scale(${1 + avgFreq * 0.1}) rotate(${this.time * 2}deg)`;
          }
        }

        this.animationFrameId = requestAnimationFrame(() => this.animate());
      }

      createProgram(vsSource: string, fsSource: string) {
        const vs = this.loadShader(this.gl.VERTEX_SHADER, vsSource)!;
        const fs = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource)!;
        const prog = this.gl.createProgram()!;
        this.gl.attachShader(prog, vs);
        this.gl.attachShader(prog, fs);
        this.gl.linkProgram(prog);
        return prog;
      }

      loadShader(type: number, source: string) {
        const shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        return shader;
      }

      destroy() { cancelAnimationFrame(this.animationFrameId); }
    }

    const engine = new GalleryEngine(canvasRef.current);
    engineRef.current = engine;
    engine.loadImages((p) => {
      setLoadingPercent(p);
      if (p === 100) setTimeout(() => setIsLoading(false), 500);
    });
    engine.animate();

    const handleInputMove = (x: number, y: number) => {
      const tile = engine.getTileAtPosition(x, y);
      const hash = Math.abs((tile.gridX * 7919 + tile.gridY * 7307) % SIGN_DATA.length);
      const sign = SIGN_DATA[hash];
      
      if (!engine.hoveredTile || engine.hoveredTile.gridX !== tile.gridX || engine.hoveredTile.gridY !== tile.gridY) {
        engine.hoveredTile = tile;
        setHoveredSign(sign);
        engine.targetHoverFactor = 1;
        
        // Update video source
        if (engine.currentVideoUrl !== sign.videoUrl) {
          engine.currentVideoUrl = sign.videoUrl;
          engine.videoElement.src = sign.videoUrl;
          engine.videoElement.play().catch(() => {});
        }
      }

      const tiltX = (y / window.innerHeight - 0.5) * 20;
      const tiltY = (x / window.innerWidth - 0.5) * -20;
      setTilt({ x: tiltX, y: tiltY });
      if (engine.drag.isDragging) {
        const dx = x - engine.drag.lastX;
        const dy = y - engine.drag.lastY;
        engine.drag.velocityX = dx * 0.3 + engine.drag.velocityX * 0.7;
        engine.drag.velocityY = dy * 0.3 + engine.drag.velocityY * 0.7;
        engine.viewOffset.x -= engine.drag.velocityX;
        engine.viewOffset.y -= engine.drag.velocityY;
        engine.drag.lastX = x;
        engine.drag.lastY = y;
      }
    };

    const handleInputLeave = () => {
      engine.hoveredTile = null;
      setHoveredSign(null);
      engine.targetHoverFactor = 0;
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const tile = engine.getTileAtPosition(e.clientX, e.clientY);
      const hash = Math.abs((tile.gridX * 7919 + tile.gridY * 7307) % SIGN_DATA.length);
      const sign = SIGN_DATA[hash];
      
      setRevealedSign(sign);
      setIsSoulRevealing(true);
      engine.triggerExplosion(e.clientX, e.clientY, sign.color);

      // Low-pass audio effect (simulated)
      if (audioRef.current) {
        audioRef.current.style.filter = 'blur(4px) brightness(0.7)';
        audioRef.current.volume = 0.3;
      }
    };

    let touchStartTime = 0;
    window.addEventListener('mousedown', (e) => { engine.drag.isDragging = true; engine.drag.lastX = e.clientX; engine.drag.lastY = e.clientY; });
    window.addEventListener('mousemove', (e) => handleInputMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => engine.drag.isDragging = false);
    window.addEventListener('dblclick', handleDoubleClick);
    window.addEventListener('mouseleave', handleInputLeave);
    window.addEventListener('touchstart', (e) => { 
      engine.drag.isDragging = true; 
      engine.drag.lastX = e.touches[0].clientX; 
      engine.drag.lastY = e.touches[0].clientY; 
      touchStartTime = Date.now();
    }, { passive: false });
    window.addEventListener('touchmove', (e) => handleInputMove(e.touches[0].clientX, e.touches[0].clientY), { passive: false });
    window.addEventListener('touchend', (e) => { 
      engine.drag.isDragging = false; 
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration < 250) {
        // Handle as a tap
        const touch = e.changedTouches[0];
        const tile = engine.getTileAtPosition(touch.clientX, touch.clientY);
        const hash = Math.abs((tile.gridX * 7919 + tile.gridY * 7307) % SIGN_DATA.length);
        const sign = SIGN_DATA[hash];
        
        // If already hovered, reveal it
        if (hoveredSign && hoveredSign.label === sign.label) {
          handleDoubleClick(touch as unknown as MouseEvent);
        } else {
          handleInputMove(touch.clientX, touch.clientY);
        }
      }
    });
    window.addEventListener('resize', () => engine.resize());

    return () => engine.destroy();
  }, []);

  const initHands = async () => {
    if (handsRef.current) return;
    
    console.log("AI_BOOT: System initializing...");
    
    try {
      // @ts-ignore
      if (typeof window.Hands === 'undefined') {
        console.error("AI_FAIL: MediaPipe Hands brain not found. Retrying in 1s...");
        setTimeout(initHands, 1000);
        return;
      }

      // @ts-ignore
      const hands = new window.Hands({
        locateFile: (file: any) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
      });

      const getFingerStates = (landmarks: any) => {
        const wrist = landmarks[0];
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];
        
        // Helper to check if tip is further from wrist than the knuckle
        const check = (tipIdx: number, baseIdx: number) => {
          const tip = landmarks[tipIdx];
          const base = landmarks[baseIdx];
          const dTip = Math.sqrt(Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2));
          const dBase = Math.sqrt(Math.pow(base.x - wrist.x, 2) + Math.pow(base.y - wrist.y, 2));
          return dTip > dBase * 1.2; // 20% margin
        };

        return [
          check(4, 2),  // Thumb
          check(8, 6),  // Index
          check(12, 10), // Middle
          check(16, 14), // Ring
          check(20, 18)  // Pinky
        ];
      };

      hands.onResults((results: any) => {
        if (!canvasRefMedia.current || !revealedSign) return;
        const canvasCtx = canvasRefMedia.current.getContext('2d')!;
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRefMedia.current.width, canvasRefMedia.current.height);
        
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          let bestMatch = 0;
          
          for (const landmarks of results.multiHandLandmarks) {
            // Draw skeleton
            // @ts-ignore
            window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#00f2ff', lineWidth: 4 });
            // @ts-ignore
            window.drawLandmarks(canvasCtx, landmarks, { color: '#ff00ff', lineWidth: 2 });

            // Analyze DNA
            const currentStates = getFingerStates(landmarks);
            const targetStates = revealedSign.fingerStates || [0, 0, 0, 0, 0];
            
            let matches = 0;
            for(let i=0; i<5; i++) {
              const current = currentStates[i] ? 1 : 0;
              if (current === targetStates[i]) matches++;
            }
            
            const matchScore = (matches / 5) * 100;
            if (matchScore > bestMatch) bestMatch = matchScore;
          }

          setPracticeAccuracy(prev => {
            const delta = (bestMatch - prev) * 0.08; // Ultra-smooth glide
            return prev + delta;
          });

        } else {
          setPracticeAccuracy(prev => Math.max(0, prev - 1.5));
        }
        canvasCtx.restore();
      });

      handsRef.current = hands;
      console.log("AI_STATUS: Brain Online.");

      if (videoRefMedia.current) {
        console.log("AI_STATUS: Activating Vision...");
        let frameCount = 0;
        // @ts-ignore
        const camera = new window.Camera(videoRefMedia.current, {
          onFrame: async () => {
            frameCount++;
            // Skip every other frame for performance stabilization
            if (frameCount % 2 !== 0) return; 
            
            if (handsRef.current) {
              try {
                await handsRef.current.send({ image: videoRefMedia.current! });
              } catch(e) {
                console.warn("AI_FRAME_SKIP: System busy.");
              }
            }
          },
          width: 640,
          height: 480
        });
        camera.start()
          .then(() => console.log("AI_SUCCESS: Vision Stabilized."))
          .catch((err: any) => console.error("AI_VISION_ERROR:", err));
        cameraRef.current = camera;
      }
    } catch (error) {
      console.error("AI_CRITICAL_FAIL:", error);
    }
  };

  const startPractice = () => {
    setIsPracticeMode(true);
    setPracticeAccuracy(0);
    setTimeout(() => initHands(), 500);
  };

  const stopPractice = () => {
    setIsPracticeMode(false);
    if (cameraRef.current) {
      try { cameraRef.current.stop(); } catch(e) {}
      cameraRef.current = null;
    }
    if (handsRef.current) {
      try { handsRef.current.close(); } catch(e) {}
      handsRef.current = null;
    }
    setPracticeAccuracy(0);
  };

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      
      // Initialize Audio Analysis
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        // Pass data reference to engine
        if (engineRef.current) {
          engineRef.current.audioData = dataArrayRef.current;
        }
      }
    }
  };
  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } };
  const closeSoulReveal = () => {
    setIsSoulRevealing(false);
    stopPractice(); // Clear camera and AI
    if (audioRef.current) {
      audioRef.current.style.filter = 'none';
      audioRef.current.volume = 1.0;
    }
    setPracticeAccuracy(0);
    setRevealedSign(null);
  };

  return (
    <div className="portraitGallery">
      <canvas ref={canvasRef} />
      <audio ref={audioRef} src="/bgm.mp3" loop />
      {!hasStarted && (
        <div className="startOverlay">
          <div className="content">
            <h1 className="title">SIGN_LANGUAGE_HUB</h1>
            <p className="subtitle">AI GESTURE DIAGNOSTIC INTERFACE v4.0</p>
            
            <div className="bioBrief">
              <div className="bioTag">PROJECT MISSION</div>
              <p>Welcome to a bridge between AI technology and human spirit. This interface uses neural vision to decode the physical geometry of sign language, revealing the simple, beautiful meanings hidden within every movement.</p>
            </div>

            <button className="startButton" onClick={startExperience}>INITIALIZE SYSTEM</button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="loadingOverlay">
          <div className="spinner" /><div className="text">STABILIZING HUD... {loadingPercent}%</div>
        </div>
      )}

      {/* Category Navigation */}
      {hasStarted && (
        <div className="categoryNav">
          <div className="navLabel">NEURAL_CLUSTERS</div>
          {["ALL", ...Array.from(new Set(SIGN_DATA.map(s => s.category)))].map(cat => (
            <div 
              key={cat} 
              className={`catItem ${currentCategory === cat ? 'active' : ''}`}
              onClick={() => jumpToCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      )}

      {/* Persistent Info Toggle */}
      <div className="infoToggle" onClick={() => setIsInfoOpen(true)}>[SYSTEM_INFO]</div>

      <AnimatePresence>
        {isInfoOpen && (
          <motion.div 
            className="bioOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInfoOpen(false)}
          >
            <div className="blurBack" />
            <motion.div 
              className="bioCard"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="header">MISSION_GENESIS</div>
              <h1>Soulful Gestures Hub</h1>
              <p>This project is an interactive 3D gallery designed to teach the beauty of ASL (American Sign Language). We combine high-performance WebGL graphics with cinematic video data to help you learn signs by **visual intuition.**</p>
              
              <div className="guideGrid">
                <div className="guideItem"><span>HOVER</span><p>Deep-scan any sign to see its linguistic data and video.</p></div>
                <div className="guideItem"><span>{window.innerWidth > 768 ? 'DBL_CLICK' : 'TAP'}</span><p>Unlock the 'Soul Reveal' to see deep meanings and how-to steps.</p></div>
                <div className="guideItem"><span>DRAG</span><p>Explore the infinite grid of 21 core signs.</p></div>
              </div>

              <div className="closeBtn">CLICK ANYWHERE TO RESUME</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div 
        className={`proDashboard ${hoveredSign && hasStarted ? 'visible' : ''}`} 
        style={{ '--accent': hoveredSign?.color, transform: window.innerWidth > 768 ? `translateY(-50%) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'translateY(-20px)' } as any}
      >
        <div className="blurLayer" />
        <div className="mainInfo">
          <div className="hudLines" />
          <div className="metaRow"><span className="status">AI IDENTIFIED</span><span className="confidence">ACCURACY: {hoveredSign?.confidence}</span></div>
          <h1 className="signLabel">{hoveredSign?.label}</h1>
          <div className="categoryBadge">{hoveredSign?.category}</div>
          <p className="description">{hoveredSign?.info}</p>
          <div className="dataSection"><div className="dataItem"><span className="tag">GEOMETRY_BUFFER</span><span className="val">{hoveredSign?.geometry}</span></div></div>
          <div className="visualizer">
            {[...Array(15)].map((_, i) => (<div key={i} className="bar" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s` }} />))}
          </div>
          
          {/* Interaction Hint */}
          <motion.div 
            className="interactionHint"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={hoveredSign?.label}
          >
            <div className="pulse" />
            <span>{window.innerWidth > 768 ? 'DOUBLE_CLICK_FOR_SOUL_REVEAL' : 'TAP_FOR_SOUL_REVEAL'}</span>
          </motion.div>
        </div>
        <div className="ticker"><div className="tickerContent">SYSTEM_STATUS: OK // {window.innerWidth > 768 ? 'DOUBLE CLICK' : 'TAP'} ANY SIGN TO UNLOCK SOUL DATA // DICTIONARY: 21_SIGNS // BGM: ACTIVE // </div></div>
      </div>
      <div className="muteControl" onClick={toggleMute}>{isMuted ? 'UNMUTE' : 'MUTE'}</div>

      {/* Soul Reveal Detail View */}
      <AnimatePresence>
        {isSoulRevealing && revealedSign && (
          <motion.div 
            className="soulOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSoulReveal}
          >
            <div className="nebula" style={{ '--color': revealedSign.color } as any} />
            
            <motion.div 
              className="soulContent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="leftPanel">
                <h1 className="signLabel">{revealedSign.label}</h1>
                <p className="soulMessage">{revealedSign.soulMessage}</p>
                <div className="videoContainer">
                  <video key={revealedSign.videoUrl} src={revealedSign.videoUrl} autoPlay loop muted playsInline />
                </div>
              </div>

              <div className="rightPanel">
                <div className="infoSection">
                  <span className="specLabel">SPIRITUAL_MEANING</span>
                  <p className="specValue">{revealedSign.deepMeaning}</p>
                </div>
                <div className="infoSection">
                  <span className="specLabel">PHYSICAL_GUIDE</span>
                  <p className="specValue">{revealedSign.howTo}</p>
                </div>
                <div className="infoSection">
                  <span className="specLabel">CONTEXTUAL_USAGE</span>
                  <p className="specValue">{revealedSign.usageExample}</p>
                </div>

                <div className="soulActions">
                  <button className="practiceBtn" onClick={() => setIsPracticeMode(true)}>START_AI_PRACTICE</button>
                  <button className="closeSoulBtn" onClick={closeSoulReveal}>CLOSE_INTERFACE</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Practice Mode Overlay */}
      <AnimatePresence>
        {isPracticeMode && (
          <motion.div 
            className="practiceOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="practiceHeader">
              <div className="title">MIRROR_VISION_ACTIVE // {revealedSign?.label}</div>
              <div className="accuracy">RESONANCE: {Math.floor(practiceAccuracy)}%</div>
            </div>

            <div className="videoContainer">
              <video ref={videoRefMedia} className="hiddenVideo" style={{ display: 'none' }} />
              <canvas ref={canvasRefMedia} width="640" height="480" className="skeletonCanvas" />
              <div className="guideOutline" />
            </div>

            <div className="practiceControls">
              <button className="stopBtn" onClick={stopPractice}>EXIT_PRACTICE</button>
            </div>

            {practiceAccuracy < 50 && practiceAccuracy > 5 && (
              <div className="errorMsg">!! GESTURE_NOT_RECOGNIZED !!</div>
            )}

            {practiceAccuracy >= 95 && (
              <motion.div className="successMsg" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                SIGN_VALIDATED // RESONANCE_MATCHED
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="technicalOverlay">
        <div className="corner-tl" /><div className="corner-tr" />
        <div className="corner-bl" /><div className="corner-br" />
        <div className="scanline" />
      </div>
    </div>
  );
};

// Built-in presets inspired by the wooden puzzle board screenshot
// Rich, high-contrast, visually distinct SVG artwork that normalize cleanly into 1:1 square canvas textures

export const PRESET_IMAGES = [
  {
    id: 'safari-train',
    name: 'Jungle Safari Express',
    category: 'Wildlife',
    description: 'Playful animal train journey through a vibrant lush rainforest',
    badge: 'Popular',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4fc3f7"/>
          <stop offset="55%" stop-color="#b3e5fc"/>
          <stop offset="100%" stop-color="#e1f5fe"/>
        </linearGradient>
        <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81c784"/>
          <stop offset="100%" stop-color="#388e3c"/>
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#aed581"/>
          <stop offset="100%" stop-color="#558b2f"/>
        </linearGradient>
        <linearGradient id="trainRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#d32f2f"/>
          <stop offset="50%" stop-color="#f44336"/>
          <stop offset="100%" stop-color="#b71c1c"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffe082"/>
          <stop offset="50%" stop-color="#ffb300"/>
          <stop offset="100%" stop-color="#ff8f00"/>
        </linearGradient>
        <linearGradient id="woodCar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffb74d"/>
          <stop offset="100%" stop-color="#e65100"/>
        </linearGradient>
      </defs>
      <!-- Sky Background -->
      <rect width="800" height="800" fill="url(#skyGrad)"/>
      <!-- Fluffy Clouds -->
      <g fill="#ffffff" opacity="0.95">
        <circle cx="160" cy="120" r="45"/><circle cx="210" cy="110" r="55"/><circle cx="260" cy="125" r="40"/><circle cx="180" cy="140" r="35"/>
        <circle cx="620" cy="140" r="40"/><circle cx="670" cy="125" r="50"/><circle cx="720" cy="140" r="35"/>
      </g>
      <!-- Sun -->
      <circle cx="710" cy="90" r="55" fill="#fbc02d"/>
      <circle cx="710" cy="90" r="65" fill="#fff59d" opacity="0.3"/>
      <!-- Background Mountains & Hills -->
      <path d="M-20 420 Q180 290 420 380 T820 340 L820 800 L-20 800 Z" fill="url(#hillGrad2)"/>
      <path d="M-20 480 Q240 380 500 460 T820 440 L820 800 L-20 800 Z" fill="url(#hillGrad1)"/>
      <!-- Rainforest Canopy Trees -->
      <g>
        <rect x="70" y="240" width="40" height="300" fill="#5d4037" rx="8"/>
        <circle cx="90" cy="220" r="110" fill="#2e7d32"/>
        <circle cx="50" cy="180" r="70" fill="#388e3c"/>
        <circle cx="140" cy="190" r="65" fill="#43a047"/>
        <rect x="710" y="260" width="45" height="300" fill="#5d4037" rx="8"/>
        <circle cx="730" cy="240" r="120" fill="#2e7d32"/>
        <circle cx="680" cy="200" r="75" fill="#43a047"/>
      </g>
      <!-- Vine with Monkey -->
      <path d="M90 260 Q 250 240 380 320" stroke="#33691e" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- Monkey -->
      <g transform="translate(290, 260)">
        <ellipse cx="40" cy="50" rx="30" ry="36" fill="#8d6e63"/>
        <ellipse cx="40" cy="52" rx="20" ry="24" fill="#d7ccc8"/>
        <circle cx="40" cy="22" r="28" fill="#8d6e63"/>
        <circle cx="20" cy="15" r="10" fill="#8d6e63"/><circle cx="20" cy="15" r="6" fill="#ffccbc"/>
        <circle cx="60" cy="15" r="10" fill="#8d6e63"/><circle cx="60" cy="15" r="6" fill="#ffccbc"/>
        <ellipse cx="40" cy="26" rx="20" ry="16" fill="#ffccbc"/>
        <circle cx="33" cy="22" r="4" fill="#212121"/><circle cx="47" cy="22" r="4" fill="#212121"/>
        <path d="M34 32 Q40 38 46 32" stroke="#212121" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Hanging arm -->
        <path d="M20 35 Q10 10 25 -10" stroke="#8d6e63" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M55 45 Q75 60 70 85" stroke="#8d6e63" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>
      <!-- Giraffe -->
      <g transform="translate(220, 310)">
        <path d="M40 280 L40 100 Q40 60 70 50 L95 45" stroke="#ffb300" stroke-width="32" stroke-linecap="round" fill="none"/>
        <!-- Giraffe Head -->
        <ellipse cx="110" cy="40" rx="26" ry="18" fill="#ffb300"/>
        <ellipse cx="125" cy="42" rx="14" ry="12" fill="#ffe082"/>
        <circle cx="112" cy="34" r="4.5" fill="#212121"/>
        <!-- Horns -->
        <line x1="96" y1="28" x2="92" y2="10" stroke="#ff8f00" stroke-width="5" stroke-linecap="round"/>
        <circle cx="92" cy="8" r="5" fill="#6d4c41"/>
        <line x1="104" y1="26" x2="104" y2="8" stroke="#ff8f00" stroke-width="5" stroke-linecap="round"/>
        <circle cx="104" cy="6" r="5" fill="#6d4c41"/>
        <!-- Giraffe Spots -->
        <circle cx="44" cy="120" r="9" fill="#e65100"/>
        <circle cx="50" cy="170" r="11" fill="#e65100"/>
        <circle cx="42" cy="220" r="10" fill="#e65100"/>
        <circle cx="46" cy="260" r="8" fill="#e65100"/>
      </g>
      <!-- Smiling Lion in Middle Carriage -->
      <g transform="translate(420, 360)">
        <!-- Lion Mane -->
        <circle cx="80" cy="90" r="72" fill="#e65100"/>
        <!-- Ears -->
        <circle cx="35" cy="45" r="16" fill="#ffb300"/>
        <circle cx="35" cy="45" r="9" fill="#ff8f00"/>
        <circle cx="125" cy="45" r="16" fill="#ffb300"/>
        <circle cx="125" cy="45" r="9" fill="#ff8f00"/>
        <!-- Face -->
        <circle cx="80" cy="95" r="50" fill="#ffc107"/>
        <ellipse cx="70" cy="108" rx="14" ry="11" fill="#fff9c4"/>
        <ellipse cx="90" cy="108" rx="14" ry="11" fill="#fff9c4"/>
        <path d="M74 98 L86 98 L80 105 Z" fill="#3e2723"/>
        <circle cx="65" cy="84" r="6" fill="#212121"/><circle cx="67" cy="82" r="2" fill="#ffffff"/>
        <circle cx="95" cy="84" r="6" fill="#212121"/><circle cx="97" cy="82" r="2" fill="#ffffff"/>
        <!-- Lion Paws Waving -->
        <ellipse cx="25" cy="130" rx="18" ry="14" fill="#ffc107"/>
        <ellipse cx="135" cy="130" rx="18" ry="14" fill="#ffc107"/>
      </g>
      <!-- Railway Track -->
      <rect x="0" y="650" width="800" height="24" fill="#5d4037"/>
      <g fill="#8d6e63">
        <rect x="30" y="666" width="30" height="20" rx="3"/><rect x="110" y="666" width="30" height="20" rx="3"/>
        <rect x="190" y="666" width="30" height="20" rx="3"/><rect x="270" y="666" width="30" height="20" rx="3"/>
        <rect x="350" y="666" width="30" height="20" rx="3"/><rect x="430" y="666" width="30" height="20" rx="3"/>
        <rect x="510" y="666" width="30" height="20" rx="3"/><rect x="590" y="666" width="30" height="20" rx="3"/>
        <rect x="670" y="666" width="30" height="20" rx="3"/><rect x="750" y="666" width="30" height="20" rx="3"/>
      </g>
      <rect x="0" y="644" width="800" height="10" fill="#90a4ae"/>
      <!-- Train Engine (Red Steam Locomotive) -->
      <g transform="translate(30, 470)">
        <!-- Locomotive Body -->
        <rect x="20" y="40" width="180" height="110" rx="15" fill="url(#trainRed)"/>
        <!-- Cabin -->
        <rect x="110" y="-30" width="95" height="150" rx="12" fill="#c62828"/>
        <rect x="125" y="-15" width="65" height="50" rx="8" fill="#e1f5fe"/>
        <!-- Elephant Driver inside cabin -->
        <ellipse cx="155" cy="10" rx="24" ry="22" fill="#78909c"/>
        <circle cx="140" cy="10" r="16" fill="#90a4ae"/>
        <circle cx="160" cy="6" r="3.5" fill="#212121"/>
        <path d="M165 14 Q 175 22 178 30" stroke="#78909c" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- Chimney & Smoke -->
        <rect x="45" y="0" width="35" height="46" fill="#212121" rx="4"/>
        <ellipse cx="62" cy="0" rx="22" ry="6" fill="url(#goldGrad)"/>
        <!-- Smoke Puffs -->
        <circle cx="58" cy="-25" r="18" fill="#ffffff" opacity="0.8"/>
        <circle cx="48" cy="-55" r="24" fill="#ffffff" opacity="0.7"/>
        <circle cx="30" cy="-90" r="32" fill="#ffffff" opacity="0.6"/>
        <!-- Cowcatcher grill -->
        <polygon points="5,150 25,100 25,150" fill="#37474f"/>
        <!-- Locomotive Wheels -->
        <circle cx="60" cy="155" r="26" fill="#212121"/><circle cx="60" cy="155" r="14" fill="#b0bec5"/>
        <circle cx="130" cy="155" r="34" fill="#212121"/><circle cx="130" cy="155" r="18" fill="url(#goldGrad)"/>
        <circle cx="185" cy="155" r="24" fill="#212121"/><circle cx="185" cy="155" r="12" fill="#b0bec5"/>
        <!-- Gold Trim -->
        <rect x="20" y="80" width="90" height="8" fill="url(#goldGrad)"/>
      </g>
      <!-- Train Car 1 (Giraffe carriage) -->
      <g transform="translate(250, 520)">
        <rect x="0" y="30" width="160" height="75" rx="10" fill="url(#woodCar)"/>
        <rect x="10" y="42" width="140" height="12" fill="#ffe082" rx="4"/>
        <rect x="10" y="66" width="140" height="12" fill="#ffe082" rx="4"/>
        <circle cx="40" cy="110" r="22" fill="#212121"/><circle cx="40" cy="110" r="10" fill="#b0bec5"/>
        <circle cx="120" cy="110" r="22" fill="#212121"/><circle cx="120" cy="110" r="10" fill="#b0bec5"/>
        <rect x="-20" y="70" width="25" height="8" fill="#424242"/>
      </g>
      <!-- Train Car 2 (Lion carriage) -->
      <g transform="translate(440, 520)">
        <rect x="0" y="30" width="160" height="75" rx="10" fill="#1e88e5"/>
        <rect x="10" y="42" width="140" height="12" fill="#bbdefb" rx="4"/>
        <rect x="10" y="66" width="140" height="12" fill="#bbdefb" rx="4"/>
        <circle cx="40" cy="110" r="22" fill="#212121"/><circle cx="40" cy="110" r="10" fill="#b0bec5"/>
        <circle cx="120" cy="110" r="22" fill="#212121"/><circle cx="120" cy="110" r="10" fill="#b0bec5"/>
        <rect x="-30" y="70" width="35" height="8" fill="#424242"/>
      </g>
      <!-- Colorful Flowers in Foreground -->
      <g transform="translate(0, 690)">
        <rect x="0" y="0" width="800" height="110" fill="#2e7d32"/>
        <g fill="#e91e63"><circle cx="80" cy="45" r="14"/><circle cx="240" cy="55" r="16"/><circle cx="480" cy="40" r="15"/><circle cx="660" cy="50" r="17"/></g>
        <g fill="#ffeb3b"><circle cx="80" cy="45" r="6"/><circle cx="240" cy="55" r="7"/><circle cx="480" cy="40" r="6"/><circle cx="660" cy="50" r="7"/></g>
        <g fill="#ab47bc"><circle cx="160" cy="65" r="13"/><circle cx="370" cy="50" r="15"/><circle cx="580" cy="60" r="14"/><circle cx="740" cy="45" r="16"/></g>
        <g fill="#fff"><circle cx="160" cy="65" r="5"/><circle cx="370" cy="50" r="6"/><circle cx="580" cy="60" r="5"/><circle cx="740" cy="45" r="6"/></g>
      </g>
    </svg>`
  },
  {
    id: 'space-odyssey',
    name: 'Cosmic Solar Odyssey',
    category: 'Sci-Fi',
    description: 'Majestic solar system with swirling gas giants, space station, and starry nebula',
    badge: 'High Contrast',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <radialGradient id="spaceBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1a0933"/>
          <stop offset="50%" stop-color="#0a0314"/>
          <stop offset="100%" stop-color="#020005"/>
        </radialGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#fff59d"/>
          <stop offset="65%" stop-color="#ff9800"/>
          <stop offset="100%" stop-color="#d84315"/>
        </radialGradient>
        <linearGradient id="jupiterBands" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d7ccc8"/>
          <stop offset="20%" stop-color="#bcaaa4"/>
          <stop offset="35%" stop-color="#8d6e63"/>
          <stop offset="50%" stop-color="#d7ccc8"/>
          <stop offset="70%" stop-color="#a1887f"/>
          <stop offset="85%" stop-color="#6d4c41"/>
          <stop offset="100%" stop-color="#d7ccc8"/>
        </linearGradient>
        <linearGradient id="neptuneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#80d8ff"/>
          <stop offset="50%" stop-color="#0091ea"/>
          <stop offset="100%" stop-color="#01579b"/>
        </linearGradient>
      </defs>
      <!-- Space Background -->
      <rect width="800" height="800" fill="url(#spaceBg)"/>
      <!-- Nebula Dust Glow -->
      <ellipse cx="200" cy="300" rx="350" ry="180" fill="#7b1fa2" opacity="0.25" transform="rotate(-25 200 300)"/>
      <ellipse cx="600" cy="600" rx="300" ry="200" fill="#0288d1" opacity="0.2" transform="rotate(20 600 600)"/>
      <!-- Twinkling Stars -->
      <g fill="#ffffff">
        <circle cx="80" cy="80" r="2.5"/><circle cx="150" cy="40" r="1.5"/><circle cx="260" cy="90" r="2"/>
        <circle cx="340" cy="50" r="3"/><circle cx="480" cy="110" r="1.5"/><circle cx="600" cy="40" r="2.5"/>
        <circle cx="740" cy="120" r="2"/><circle cx="90" cy="220" r="1.5"/><circle cx="180" cy="270" r="2"/>
        <circle cx="50" cy="450" r="3"/><circle cx="120" cy="620" r="2"/><circle cx="280" cy="740" r="2.5"/>
        <circle cx="420" cy="780" r="1.5"/><circle cx="560" cy="680" r="2.5"/><circle cx="730" cy="700" r="2"/>
        <circle cx="700" cy="400" r="3"/><circle cx="750" cy="520" r="1.5"/><circle cx="620" cy="280" r="2"/>
        <circle cx="400" cy="320" r="1.5"/><circle cx="310" cy="480" r="2"/>
        <!-- Star Crosses -->
        <path d="M120 180 L120 196 M112 188 L128 188" stroke="#ffffff" stroke-width="2"/>
        <path d="M680 180 L680 200 M670 190 L690 190" stroke="#ffffff" stroke-width="2.5"/>
        <path d="M220 680 L220 696 M212 688 L228 688" stroke="#ffffff" stroke-width="2"/>
      </g>
      <!-- Blazing Sun (Upper Right Corner) -->
      <circle cx="780" cy="50" r="180" fill="url(#sunGlow)"/>
      <circle cx="780" cy="50" r="220" fill="#ffb74d" opacity="0.2"/>
      <!-- Orbit Rings -->
      <ellipse cx="780" cy="50" rx="360" ry="320" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.35"/>
      <ellipse cx="780" cy="50" rx="550" ry="480" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10 10" opacity="0.3"/>
      <ellipse cx="780" cy="50" rx="720" ry="620" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="12 12" opacity="0.25"/>
      <!-- Giant Jupiter (Upper Left) -->
      <g transform="translate(180, 220)">
        <circle cx="0" cy="0" r="95" fill="url(#jupiterBands)"/>
        <!-- Great Red Spot -->
        <ellipse cx="35" cy="30" rx="20" ry="12" fill="#d84315"/>
        <ellipse cx="35" cy="30" rx="14" ry="7" fill="#ff8a65"/>
        <!-- Atmosphere Shadow -->
        <path d="M0 -95 A 95 95 0 0 1 0 95 A 95 95 0 0 0 0 -95" fill="#000000" opacity="0.45" transform="rotate(30)"/>
      </g>
      <!-- Earth & Moon (Center Stage) -->
      <g transform="translate(480, 420)">
        <circle cx="0" cy="0" r="55" fill="#1e88e5"/>
        <!-- Continents -->
        <path d="M-25 -20 Q-10 -40 10 -25 Q30 -10 20 20 Q-5 35 -20 15 Z" fill="#43a047"/>
        <path d="M-15 15 Q-5 45 15 35 Q5 10 -15 15 Z" fill="#66bb6a"/>
        <!-- Atmosphere shine -->
        <circle cx="0" cy="0" r="55" fill="none" stroke="#80d8ff" stroke-width="4" opacity="0.6"/>
        <!-- Moon -->
        <circle cx="95" cy="-60" r="14" fill="#cfd8dc"/>
        <circle cx="92" cy="-62" r="3" fill="#90a4ae"/>
      </g>
      <!-- Neptune / Blue Gas Giant (Bottom Left) -->
      <g transform="translate(140, 560)">
        <circle cx="0" cy="0" r="75" fill="url(#neptuneGrad)"/>
        <!-- Rings -->
        <ellipse cx="0" cy="0" rx="130" ry="28" fill="none" stroke="#b3e5fc" stroke-width="9" opacity="0.65" transform="rotate(-20)"/>
      </g>
      <!-- High-Tech Space Station / Satellite -->
      <g transform="translate(560, 240) rotate(-15)">
        <!-- Core Hub -->
        <rect x="-20" y="-20" width="40" height="40" rx="8" fill="#eceff1" stroke="#37474f" stroke-width="3"/>
        <circle cx="0" cy="0" r="10" fill="#00e676"/>
        <!-- Trusses -->
        <line x1="-90" y1="0" x2="-20" y2="0" stroke="#78909c" stroke-width="6"/>
        <line x1="20" y1="0" x2="90" y2="0" stroke="#78909c" stroke-width="6"/>
        <!-- Solar Panels Left -->
        <rect x="-95" y="-35" width="70" height="70" rx="4" fill="#0d47a1" stroke="#ffeb3b" stroke-width="2"/>
        <line x1="-60" y1="-35" x2="-60" y2="35" stroke="#ffeb3b" stroke-width="1.5"/>
        <line x1="-95" y1="0" x2="-25" y2="0" stroke="#ffeb3b" stroke-width="1.5"/>
        <!-- Solar Panels Right -->
        <rect x="25" y="-35" width="70" height="70" rx="4" fill="#0d47a1" stroke="#ffeb3b" stroke-width="2"/>
        <line x1="60" y1="-35" x2="60" y2="35" stroke="#ffeb3b" stroke-width="1.5"/>
        <line x1="25" y1="0" x2="95" y2="0" stroke="#ffeb3b" stroke-width="1.5"/>
        <!-- Communication Dish -->
        <path d="M0 -20 Q0 -45 25 -45" stroke="#cfd8dc" stroke-width="4" fill="none"/>
        <circle cx="28" cy="-45" r="5" fill="#f44336"/>
      </g>
      <!-- Fiery Comet -->
      <g transform="translate(360, 640) rotate(-40)">
        <polygon points="0,0 -160,-15 -240,-4 -160,8" fill="#ff7043" opacity="0.8"/>
        <polygon points="0,0 -120,-8 -180,-2 -120,4" fill="#ffeb3b" opacity="0.9"/>
        <circle cx="0" cy="0" r="14" fill="#ffffff"/>
      </g>
    </svg>`
  },
  {
    id: 'dino-valley',
    name: 'Prehistoric Dino Valley',
    category: 'Adventure',
    description: 'Volcanic jurassic realm with flying pterosaurs and mighty dinosaurs',
    badge: 'Dynamic',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="dinoSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff7043"/>
          <stop offset="40%" stop-color="#ffa726"/>
          <stop offset="80%" stop-color="#ffe082"/>
          <stop offset="100%" stop-color="#80deea"/>
        </linearGradient>
        <linearGradient id="volcanoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3e2723"/>
          <stop offset="60%" stop-color="#4e342e"/>
          <stop offset="100%" stop-color="#271c19"/>
        </linearGradient>
        <linearGradient id="lavaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffff00"/>
          <stop offset="50%" stop-color="#ff3d00"/>
          <stop offset="100%" stop-color="#dd2c00"/>
        </linearGradient>
      </defs>
      <!-- Sunset Sky -->
      <rect width="800" height="800" fill="url(#dinoSky)"/>
      <!-- Smoking Volcano -->
      <polygon points="400,260 220,540 580,540" fill="url(#volcanoGrad)"/>
      <!-- Crater & Lava Stream -->
      <ellipse cx="400" cy="260" rx="35" ry="10" fill="#212121"/>
      <path d="M400 265 Q390 330 420 400 T390 520" stroke="url(#lavaGrad)" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M405 265 Q420 320 405 380" stroke="url(#lavaGrad)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- Volcanic Smoke Cloud -->
      <g fill="#546e7a" opacity="0.85">
        <circle cx="400" cy="210" r="38"/><circle cx="370" cy="170" r="45"/><circle cx="430" cy="160" r="52"/>
        <circle cx="410" cy="110" r="60"/><circle cx="470" cy="90" r="70"/><circle cx="530" cy="80" r="55"/>
      </g>
      <!-- Flying Pterodactyls in Sky -->
      <g transform="translate(180, 190) scale(0.7)">
        <polygon points="0,0 80,-40 50,0 120,20 60,15 0,30 -20,10" fill="#424242"/>
        <!-- Beak -->
        <polygon points="-20,10 -60,0 -20,16" fill="#f57c00"/>
      </g>
      <g transform="translate(620, 160) scale(0.6) scale(-1, 1)">
        <polygon points="0,0 80,-40 50,0 120,20 60,15 0,30 -20,10" fill="#424242"/>
        <polygon points="-20,10 -60,0 -20,16" fill="#f57c00"/>
      </g>
      <!-- Prehistoric Jungle Hills -->
      <path d="M-20 500 Q160 410 400 480 T820 440 L820 800 L-20 800 Z" fill="#2e7d32"/>
      <path d="M-20 570 Q220 500 500 560 T820 530 L820 800 L-20 800 Z" fill="#1b5e20"/>
      <!-- Giant Long-neck Sauropod (Brachiosaurus) -->
      <g transform="translate(160, 410)">
        <!-- Massive Body -->
        <ellipse cx="140" cy="180" rx="100" ry="65" fill="#00897b"/>
        <!-- Legs -->
        <rect x="70" y="200" width="36" height="120" rx="15" fill="#00796b"/>
        <rect x="180" y="200" width="36" height="120" rx="15" fill="#00796b"/>
        <!-- Long Curved Neck -->
        <path d="M70 170 C40 80 80 -40 140 -90" stroke="#00897b" stroke-width="48" fill="none" stroke-linecap="round"/>
        <!-- Head -->
        <ellipse cx="160" cy="-105" rx="30" ry="18" fill="#00897b"/>
        <circle cx="170" cy="-110" r="4.5" fill="#212121"/><circle cx="172" cy="-112" r="1.5" fill="#fff"/>
        <!-- Long Tail -->
        <path d="M220 160 Q340 140 400 210" stroke="#00897b" stroke-width="32" fill="none" stroke-linecap="round"/>
      </g>
      <!-- Cute T-Rex in Foreground -->
      <g transform="translate(540, 480)">
        <!-- Body -->
        <ellipse cx="90" cy="120" rx="60" ry="50" fill="#f57c00"/>
        <!-- Head & Jaw -->
        <ellipse cx="50" cy="50" rx="45" ry="32" fill="#f57c00"/>
        <circle cx="40" cy="40" r="6" fill="#212121"/><circle cx="42" cy="38" r="2" fill="#fff"/>
        <path d="M15 65 L85 65" stroke="#b71c1c" stroke-width="4"/>
        <polygon points="30,65 35,55 40,65" fill="#ffffff"/>
        <polygon points="50,65 55,55 60,65" fill="#ffffff"/>
        <!-- Small Arms -->
        <path d="M45 105 L25 115" stroke="#f57c00" stroke-width="12" stroke-linecap="round"/>
        <!-- Powerful Legs -->
        <rect x="70" y="150" width="30" height="90" rx="12" fill="#e65100"/>
        <rect x="110" y="150" width="30" height="90" rx="12" fill="#e65100"/>
        <!-- Tail -->
        <path d="M140 110 Q200 100 230 140" stroke="#f57c00" stroke-width="26" fill="none" stroke-linecap="round"/>
      </g>
      <!-- Exotic Ferns & Flora -->
      <g fill="#33691e" transform="translate(0, 710)">
        <path d="M0 90 Q 60 20 120 40 Q 60 70 0 90 Z"/>
        <path d="M80 90 Q 140 10 210 30 Q 140 65 80 90 Z"/>
        <path d="M680 90 Q 740 10 800 35 Q 740 65 680 90 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'city-rescue',
    name: 'Metropolis Highway Rescue',
    category: 'Urban',
    description: 'Overpass highway with emergency fire truck, green coupe, and skyline over ocean',
    badge: 'Vibrant',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="citySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0288d1"/>
          <stop offset="50%" stop-color="#4fc3f7"/>
          <stop offset="100%" stop-color="#b3e5fc"/>
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0277bd"/>
          <stop offset="100%" stop-color="#01579b"/>
        </linearGradient>
      </defs>
      <!-- Sky -->
      <rect width="800" height="800" fill="url(#citySky)"/>
      <!-- Sun -->
      <circle cx="120" cy="120" r="50" fill="#fbc02d"/>
      <!-- Distant Modern City Skyline -->
      <g fill="#78909c" opacity="0.6">
        <rect x="80" y="240" width="70" height="240"/>
        <rect x="170" y="190" width="85" height="290"/>
        <polygon points="212,140 170,190 255,190"/>
        <rect x="280" y="260" width="60" height="220"/>
        <rect x="360" y="160" width="100" height="320"/>
        <rect x="480" y="220" width="75" height="260"/>
        <rect x="580" y="180" width="90" height="300"/>
        <rect x="690" y="250" width="70" height="230"/>
      </g>
      <!-- Ocean Bay -->
      <rect x="0" y="470" width="800" height="150" fill="url(#waterGrad)"/>
      <!-- Sailboats on water -->
      <g transform="translate(680, 500) scale(0.6)">
        <polygon points="0,0 20,-50 0,-50" fill="#ffffff"/>
        <polygon points="5,0 35,-40 5,-40" fill="#e53935"/>
        <path d="M-15 0 L45 0 L35 15 L-5 15 Z" fill="#37474f"/>
      </g>
      <!-- Grand Concrete Overpass Bridge -->
      <g>
        <!-- Bridge Support Pillars -->
        <rect x="140" y="480" width="50" height="240" fill="#b0bec5"/>
        <rect x="380" y="480" width="50" height="240" fill="#90a4ae"/>
        <rect x="620" y="480" width="50" height="240" fill="#b0bec5"/>
        <!-- Bridge Deck -->
        <rect x="0" y="430" width="800" height="65" fill="#455a64"/>
        <rect x="0" y="420" width="800" height="10" fill="#cfd8dc"/>
        <line x1="0" y1="465" x2="800" y2="465" stroke="#ffeb3b" stroke-width="5" stroke-dasharray="35 25"/>
        <!-- Guardrails -->
        <rect x="0" y="405" width="800" height="15" fill="#78909c" opacity="0.8"/>
      </g>
      <!-- Bright Red Fire Rescue Truck -->
      <g transform="translate(80, 310)">
        <!-- Firetruck Cab & Body -->
        <rect x="20" y="30" width="220" height="95" rx="12" fill="#d32f2f"/>
        <!-- Cab Window -->
        <rect x="175" y="40" width="55" height="40" rx="6" fill="#e0f7fa"/>
        <!-- Ladder on top -->
        <rect x="30" y="12" width="160" height="12" fill="#ffffff" stroke="#9e9e9e" stroke-width="2"/>
        <line x1="60" y1="12" x2="60" y2="24" stroke="#9e9e9e" stroke-width="3"/>
        <line x1="90" y1="12" x2="90" y2="24" stroke="#9e9e9e" stroke-width="3"/>
        <line x1="120" y1="12" x2="120" y2="24" stroke="#9e9e9e" stroke-width="3"/>
        <line x1="150" y1="12" x2="150" y2="24" stroke="#9e9e9e" stroke-width="3"/>
        <!-- Flashing Emergency Beacon -->
        <rect x="185" y="16" width="24" height="14" rx="4" fill="#00e5ff"/>
        <circle cx="197" cy="14" r="10" fill="#80d8ff" opacity="0.6"/>
        <!-- Wheels -->
        <circle cx="70" cy="125" r="24" fill="#212121"/><circle cx="70" cy="125" r="11" fill="#cfd8dc"/>
        <circle cx="190" cy="125" r="24" fill="#212121"/><circle cx="190" cy="125" r="11" fill="#cfd8dc"/>
        <!-- White Stripes & Gold Emblem -->
        <rect x="20" y="80" width="140" height="12" fill="#ffffff"/>
        <circle cx="100" cy="86" r="12" fill="#ffb300"/>
      </g>
      <!-- Sleek Green Sports Coupe -->
      <g transform="translate(390, 345)">
        <!-- Aerodynamic Body -->
        <path d="M10 65 L35 25 Q90 10 160 25 L185 65 Z" fill="#43a047"/>
        <rect x="0" y="55" width="200" height="40" rx="8" fill="#2e7d32"/>
        <!-- Windshield & Windows -->
        <path d="M45 30 L60 52 L140 52 L150 30 Z" fill="#b2dfdb"/>
        <!-- Headlights & Taillights -->
        <rect x="185" y="60" width="12" height="10" rx="3" fill="#ffeb3b"/>
        <rect x="0" y="60" width="8" height="10" rx="3" fill="#e53935"/>
        <!-- Wheels -->
        <circle cx="45" cy="95" r="20" fill="#212121"/><circle cx="45" cy="95" r="9" fill="#e0e0e0"/>
        <circle cx="155" cy="95" r="20" fill="#212121"/><circle cx="155" cy="95" r="9" fill="#e0e0e0"/>
      </g>
      <!-- Lower Shoreline Highway & Palms -->
      <g transform="translate(0, 680)">
        <rect x="0" y="0" width="800" height="120" fill="#388e3c"/>
        <rect x="0" y="40" width="800" height="50" fill="#37474f"/>
        <line x1="0" y1="65" x2="800" y2="65" stroke="#ffffff" stroke-width="4" stroke-dasharray="25 20"/>
      </g>
    </svg>`
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neon Cyberpunk Metropolis',
    category: 'Cyberpunk',
    description: 'Electric cyan and magenta futuristic skyline with glowing synthwave grid',
    badge: 'Ultra High Contrast',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="neonSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#090014"/>
          <stop offset="60%" stop-color="#2d004d"/>
          <stop offset="100%" stop-color="#ff007f"/>
        </linearGradient>
        <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff007f"/>
          <stop offset="100%" stop-color="#00ffff"/>
        </linearGradient>
      </defs>
      <!-- Sky -->
      <rect width="800" height="800" fill="url(#neonSky)"/>
      <!-- Synthwave Giant Sun -->
      <circle cx="400" cy="400" r="160" fill="#ffea00"/>
      <!-- Sun Horizontal Slice Blinds -->
      <g fill="#2d004d">
        <rect x="230" y="380" width="340" height="6"/>
        <rect x="230" y="400" width="340" height="9"/>
        <rect x="230" y="425" width="340" height="14"/>
        <rect x="230" y="455" width="340" height="20"/>
        <rect x="230" y="490" width="340" height="28"/>
      </g>
      <!-- Neon Skyline -->
      <g fill="#100326" stroke="#00ffff" stroke-width="2">
        <rect x="60" y="280" width="70" height="260"/>
        <rect x="150" y="200" width="90" height="340"/>
        <line x1="195" y1="130" x2="195" y2="200" stroke="#ff007f" stroke-width="4"/>
        <rect x="260" y="320" width="60" height="220"/>
        <rect x="480" y="240" width="80" height="300"/>
        <rect x="580" y="170" width="100" height="370"/>
        <polygon points="630,90 580,170 680,170"/>
        <rect x="700" y="290" width="70" height="250"/>
      </g>
      <!-- Perspective Neon Grid Floor -->
      <g stroke="#00ffff" stroke-width="2" opacity="0.85">
        <line x1="400" y1="520" x2="-200" y2="800"/>
        <line x1="400" y1="520" x2="0" y2="800"/>
        <line x1="400" y1="520" x2="160" y2="800"/>
        <line x1="400" y1="520" x2="280" y2="800"/>
        <line x1="400" y1="520" x2="400" y2="800"/>
        <line x1="400" y1="520" x2="520" y2="800"/>
        <line x1="400" y1="520" x2="640" y2="800"/>
        <line x1="400" y1="520" x2="800" y2="800"/>
        <line x1="400" y1="520" x2="1000" y2="800"/>
        <!-- Horizontal grid lines -->
        <line x1="0" y1="540" x2="800" y2="540" stroke="#ff007f" stroke-width="1.5"/>
        <line x1="0" y1="570" x2="800" y2="570" stroke="#ff007f" stroke-width="2"/>
        <line x1="0" y1="615" x2="800" y2="615" stroke="#ff007f" stroke-width="2.5"/>
        <line x1="0" y1="675" x2="800" y2="675" stroke="#00ffff" stroke-width="3"/>
        <line x1="0" y1="755" x2="800" y2="755" stroke="#00ffff" stroke-width="4"/>
      </g>
    </svg>`
  }
];


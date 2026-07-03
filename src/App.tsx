import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Palette, 
  Type, 
  Bot, 
  Maximize2, 
  Eye, 
  Sparkles, 
  Info,
  ExternalLink,
  Sliders,
  CheckCircle2,
  XCircle,
  Search,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  User,
  ShieldAlert,
  ShieldCheck,
  Layers,
  Monitor,
  RefreshCw,
  Facebook,
  Youtube,
  Music,
  Video
} from 'lucide-react';
import { motion } from 'motion/react';

// Brand colors
const BRAND_COLORS = [
  {
    name: 'Rosa Neon (Primário)',
    hex: '#FF00FF',
    rgb: '255, 0, 255',
    usage: 'Destaques principais do degradê primário oficial, botões ultra-futuristas e acentos.',
    text: 'text-[#FF00FF]',
    bg: 'bg-[#FF00FF]',
    glow: 'shadow-[0_0_15px_rgba(255,0,255,0.4)]'
  },
  {
    name: 'Roxo Nexa (Primário)',
    hex: '#8A2BE2',
    rgb: '138, 43, 226',
    usage: 'Cor de transição intermediária no degradê primário oficial e elementos principais.',
    text: 'text-[#8A2BE2]',
    bg: 'bg-[#8A2BE2]',
    glow: 'shadow-[0_0_15px_rgba(138,43,226,0.4)]'
  },
  {
    name: 'Ciano Elétrico (Primário)',
    hex: '#00FFFF',
    rgb: '0, 255, 255',
    usage: 'Cor de acento do degradê primário oficial, links rápidos e transições de hover.',
    text: 'text-[#00FFFF]',
    bg: 'bg-[#00FFFF]',
    glow: 'shadow-[0_0_15px_rgba(0,255,255,0.4)]'
  },
  {
    name: 'Azul Elétrico (Secundário)',
    hex: '#0070F3',
    rgb: '0, 112, 243',
    usage: 'Destaques modernos corporativos, início do degradê de suporte/secundário.',
    text: 'text-[#0070F3]',
    bg: 'bg-[#0070F3]',
    glow: 'shadow-[0_0_15px_rgba(0,112,243,0.4)]'
  },
  {
    name: 'Roxo Violeta (Secundário)',
    hex: '#8B5CF6',
    rgb: '139, 92, 246',
    usage: 'Acento secundário de alta tecnologia, finalização do degradê de suporte/secundário.',
    text: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]'
  },
  {
    name: 'Espaço Escuro (Fundo)',
    hex: '#0B0E14',
    rgb: '11, 14, 20',
    usage: 'Cor oficial para interfaces em modo escuro (Dark Mode).',
    text: 'text-[#0B0E14]',
    bg: 'bg-[#0B0E14]',
    border: 'border-gray-800',
    glow: ''
  },
  {
    name: 'Branco Puro (Fundo)',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    usage: 'Cor oficial para interfaces em modo claro (Light Mode) e contraste.',
    text: 'text-white',
    bg: 'bg-white',
    border: 'border-gray-200',
    glow: 'shadow-sm'
  }
];

// Logos structure based on the files created
const LOGO_ASSETS = [
  // Core Logos (Transparent)
  {
    id: 'logo_horiz_light_transp',
    name: 'Logo Horizontal - Light (Transparente)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_horizontal_dark_transp.svg`,
    desc: 'Versão principal para telas claras (Fundo Claro). O símbolo possui degradê neon e o texto é escuro.',
    type: 'Horizontal',
    bgPreference: 'dark'
  },
  {
    id: 'logo_horiz_dark_transp',
    name: 'Logo Horizontal - Dark (Transparente)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_horizontal_light_transp.svg`,
    desc: 'Versão principal para telas escuras (Fundo Escuro). O símbolo possui degradê neon e o texto é branco.',
    type: 'Horizontal',
    bgPreference: 'light'
  },
  {
    id: 'logo_vert_light_transp',
    name: 'Logo Vertical - Light (Transparente)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_vertical_dark_transp.svg`,
    desc: 'Versão empilhada para fundos claros. Ideal para documentos impressos simplificados ou menus claros.',
    type: 'Vertical',
    bgPreference: 'dark'
  },
  {
    id: 'logo_vert_dark_transp',
    name: 'Logo Vertical - Dark (Transparente)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_vertical_light_transp.svg`,
    desc: 'Versão empilhada para fundos escuros. Ideal para espaços verticais ou cabeçalhos centralizados.',
    type: 'Vertical',
    bgPreference: 'light'
  },
  {
    id: 'isomark_light_transp',
    name: 'Isomark (Ícone N) - Light',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_isomark_dark_transp.svg`,
    desc: 'Símbolo isolado com degradê neon. Usado para avatares e marcas d\'água em fundos claros.',
    type: 'Símbolo',
    bgPreference: 'dark'
  },
  {
    id: 'isomark_dark_transp',
    name: 'Isomark (Ícone N) - Dark',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`,
    desc: 'O símbolo isolado da marca com degradê neon. Usado para avatares, favicons e elementos de apoio em fundos escuros.',
    type: 'Símbolo',
    bgPreference: 'light'
  },
  {
    id: 'wordmark_light_transp',
    name: 'Wordmark - Light',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_wordmark_dark_transp.svg`,
    desc: 'Apenas a escrita geométrica "NEXA" na cor escura. Usada para rodapés claros ou correspondências.',
    type: 'Apenas Texto',
    bgPreference: 'dark'
  },
  {
    id: 'wordmark_dark_transp',
    name: 'Wordmark - Dark',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_wordmark_light_transp.svg`,
    desc: 'Apenas a escrita geométrica "NEXA" na cor branca. Utilizada quando o símbolo já está presente em outra parte.',
    type: 'Apenas Texto',
    bgPreference: 'light'
  },

  // Core Logos (Solid)
  {
    id: 'logo_horiz_light_solid',
    name: 'Logo Horizontal - Light (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_horizontal_dark_solid.svg`,
    desc: 'Versão horizontal com fundo claro sólido oficial (#FFFFFF) incorporado para garantir as proporções de contraste.',
    type: 'Horizontal',
    bgPreference: 'dark'
  },
  {
    id: 'logo_horiz_dark_solid',
    name: 'Logo Horizontal - Dark (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_horizontal_light_solid.svg`,
    desc: 'Versão horizontal com fundo escuro sólido oficial (#0B0D17) incorporado para garantir as proporções de contraste.',
    type: 'Horizontal',
    bgPreference: 'light'
  },
  {
    id: 'logo_vert_light_solid',
    name: 'Logo Vertical - Light (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_vertical_dark_solid.svg`,
    desc: 'Versão vertical empilhada com fundo claro sólido oficial (#FFFFFF) incorporado.',
    type: 'Vertical',
    bgPreference: 'dark'
  },
  {
    id: 'logo_vert_dark_solid',
    name: 'Logo Vertical - Dark (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_logo_vertical_light_solid.svg`,
    desc: 'Versão vertical empilhada com fundo escuro sólido oficial (#0B0D17) incorporado.',
    type: 'Vertical',
    bgPreference: 'light'
  },
  {
    id: 'isomark_light_solid',
    name: 'Isomark - Light (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_isomark_dark_solid.svg`,
    desc: 'Símbolo isolado com fundo claro sólido oficial (#FFFFFF).',
    type: 'Símbolo',
    bgPreference: 'dark'
  },
  {
    id: 'isomark_dark_solid',
    name: 'Isomark - Dark (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_solid.svg`,
    desc: 'Símbolo isolado com fundo escuro sólido oficial (#0B0D17).',
    type: 'Símbolo',
    bgPreference: 'light'
  },
  {
    id: 'wordmark_light_solid',
    name: 'Wordmark - Light (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_wordmark_dark_solid.svg`,
    desc: 'Escrita "NEXA" com fundo claro sólido oficial (#FFFFFF).',
    type: 'Apenas Texto',
    bgPreference: 'dark'
  },
  {
    id: 'wordmark_dark_solid',
    name: 'Wordmark - Dark (Sólido)',
    category: 'core',
    path: `${import.meta.env.BASE_URL}assets/core/nexa_wordmark_light_solid.svg`,
    desc: 'Escrita "NEXA" com fundo escuro sólido oficial (#0B0D17).',
    type: 'Apenas Texto',
    bgPreference: 'light'
  },

  // CNC/Flat Logos
  {
    id: 'cnc_horiz_flat_black',
    name: 'Logo Horizontal Monocromático - Black',
    category: 'cnc',
    path: `${import.meta.env.BASE_URL}assets/cnc/nexa_logo_horizontal_flat_black.svg`,
    desc: 'Logo horizontal plano totalmente preto. Indicado para corte a laser (CNC), carimbos ou impressões xerox.',
    type: 'Monocromático',
    bgPreference: 'light'
  },
  {
    id: 'cnc_horiz_flat_white',
    name: 'Logo Horizontal Monocromático - White',
    category: 'cnc',
    path: `${import.meta.env.BASE_URL}assets/cnc/nexa_logo_horizontal_flat_white.svg`,
    desc: 'Logo horizontal plano totalmente branco. Indicado para gravação a laser sobre materiais escuros, bordados ou carimbos.',
    type: 'Monocromático',
    bgPreference: 'dark'
  },
  {
    id: 'cnc_isomark_flat_black',
    name: 'Isomark Monocromático - Black',
    category: 'cnc',
    path: `${import.meta.env.BASE_URL}assets/cnc/nexa_isomark_flat_black.svg`,
    desc: 'O símbolo "N" plano em preto puro. Para aplicações físicas em baixo contraste.',
    type: 'Monocromático',
    bgPreference: 'light'
  },
  {
    id: 'cnc_isomark_flat_white',
    name: 'Isomark Monocromático - White',
    category: 'cnc',
    path: `${import.meta.env.BASE_URL}assets/cnc/nexa_isomark_flat_white.svg`,
    desc: 'O símbolo "N" plano em branco puro. Para gravações físicas em superfícies escuras.',
    type: 'Monocromático',
    bgPreference: 'dark'
  },

  // Print Logos
  {
    id: 'print_logo_horiz',
    name: 'Logo Horizontal - CMYK',
    category: 'print',
    path: `${import.meta.env.BASE_URL}assets/print/nexa_logo_horizontal_cmyk.svg`,
    desc: 'Logo horizontal ajustado com as especificações de cores ideais para impressoras industriais (Gráficas).',
    type: 'CMYK',
    bgPreference: 'light'
  },
  {
    id: 'print_logo_vert',
    name: 'Logo Vertical - CMYK',
    category: 'print',
    path: `${import.meta.env.BASE_URL}assets/print/nexa_logo_vertical_cmyk.svg`,
    desc: 'Logo vertical empilhado com cores CMYK calibradas para fidelidade em papel e mídias físicas.',
    type: 'CMYK',
    bgPreference: 'light'
  },
  {
    id: 'print_wordmark',
    name: 'Wordmark - CMYK',
    category: 'print',
    path: `${import.meta.env.BASE_URL}assets/print/nexa_wordmark_cmyk.svg`,
    desc: 'Apenas a escrita "NEXA" com cores CMYK ideais para materiais impressos.',
    type: 'CMYK',
    bgPreference: 'light'
  },
  {
    id: 'print_isomark',
    name: 'Isomark - CMYK',
    category: 'print',
    path: `${import.meta.env.BASE_URL}assets/print/nexa_isomark_cmyk.svg`,
    desc: 'O símbolo isolado com cores otimizadas para garantir a fidelidade do degradê no papel e tecidos.',
    type: 'CMYK',
    bgPreference: 'light'
  },

  // Web Logos
  {
    id: 'web_favicon_svg',
    name: 'Favicon do Site (Vetor)',
    category: 'web',
    path: `${import.meta.env.BASE_URL}assets/web/favicon.svg`,
    desc: 'Ícone vetorial de alta performance que aparece na aba do navegador. Altamente leve.',
    type: 'Favicon',
    bgPreference: 'dark'
  },

  {
    id: 'web_apple_touch_svg',
    name: 'Apple Touch Icon (Vetor)',
    category: 'web',
    path: `${import.meta.env.BASE_URL}assets/web/apple_touch_icon.svg`,
    desc: 'Ícone de alta qualidade para atalhos em dispositivos iOS (iPhones/iPads).',
    type: 'Apple Touch',
    bgPreference: 'dark'
  },

  {
    id: 'web_og_image_svg',
    name: 'OpenGraph Capa (Vetor)',
    category: 'web',
    path: `${import.meta.env.BASE_URL}assets/web/og_image_thumbnail.svg`,
    desc: 'Versão vetorial para geração dinâmica de capas e compartilhamento em redes sociais.',
    type: 'OpenGraph',
    bgPreference: 'dark'
  },

  {
    id: 'splash_logo',
    name: 'Splash Screen Logo (Vetor)',
    category: 'web',
    path: `${import.meta.env.BASE_URL}assets/splash/splash-logo.svg`,
    desc: 'Logo central de inicialização para aplicativos mobile, PWAs ou sistemas de desktop.',
    type: 'Splash Screen',
    bgPreference: 'dark'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [logoSearch, setLogoSearch] = useState<string>('');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedGradient, setCopiedGradient] = useState<boolean>(false);
  const [copiedPrimaryGradient, setCopiedPrimaryGradient] = useState<boolean>(false);
  const [copiedTitleTw, setCopiedTitleTw] = useState<boolean>(false);
  const [copiedTitleCss, setCopiedTitleCss] = useState<boolean>(false);
  const [copiedBtnSolid, setCopiedBtnSolid] = useState<boolean>(false);
  const [copiedBtnOutline, setCopiedBtnOutline] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);
  
  // Custom states for the Enhanced Multi-Format Exporter
  const [selectedExportLogo, setSelectedExportLogo] = useState<typeof LOGO_ASSETS[0]>(LOGO_ASSETS[0]);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'webp' | 'gif' | 'svg' | 'html5' | 'tag'>('png');
  const [exportSizeSelection, setExportSizeSelection] = useState<'sd' | 'hd' | 'fhd' | '4k' | '8k' | 'custom'>('fhd');
  const [exportCustomSizeValue, setExportCustomSizeValue] = useState<number>(1920);
  const [exportBgType, setExportBgType] = useState<'transparent' | 'dark' | 'light' | 'custom'>('transparent');
  const [exportCustomColor, setExportCustomColor] = useState<string>('#8B5CF6');
  const [exportQuality, setExportQuality] = useState<number>(1.0);
  const [liveFileSize, setLiveFileSize] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Package Queue structures
  interface QueueItem {
    id: string;
    logo: typeof LOGO_ASSETS[0];
    format: 'png' | 'jpg' | 'webp' | 'gif' | 'svg' | 'html5' | 'tag';
    sizeSelection: 'sd' | 'hd' | 'fhd' | '4k' | '8k' | 'custom';
    customSizeValue: number;
    bgType: 'transparent' | 'dark' | 'light' | 'custom';
    customColor: string;
    quality: number;
  }
  const [packageQueue, setPackageQueue] = useState<QueueItem[]>([]);
  const [isDownloadingPackage, setIsDownloadingPackage] = useState<boolean>(false);

  // Background previews per logo ID
  const [logoBgPreviews, setLogoBgPreviews] = useState<Record<string, 'dark' | 'light' | 'grid'>>({});
  const [copiedLogoId, setCopiedLogoId] = useState<string | null>(null);

  // States for Mockup Sandbox
  const [mockupTemplate, setMockupTemplate] = useState<'instagram' | 'linkedin' | 'badge' | 'website' | 'facebook' | 'youtube' | 'tiktok'>('instagram');
  const [mockupText, setMockupText] = useState<string>('MOLDANDO O AMANHÃ INDUSTRIAL COM DESIGN E IA.');
  const [mockupBg, setMockupBg] = useState<'dark_ambient' | 'neon_glow' | 'minimal_white' | 'tech_grid'>('dark_ambient');
  const [mockupLogo, setMockupLogo] = useState<typeof LOGO_ASSETS[0]>(LOGO_ASSETS[0]);

  // States for Compliance Sandbox
  const [sandboxBg, setSandboxBg] = useState<'dark' | 'light' | 'pink'>('dark');
  const [sandboxLogoType, setSandboxLogoType] = useState<'light' | 'dark' | 'isomark_light' | 'isomark_dark'>('light');
  const [sandboxDistorted, setSandboxDistorted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Copy helper
  const copyToClipboard = (text: string, setter: (val: any) => void, duration = 2000) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), duration);
  };

  const getActiveSizeValue = (selection: 'sd' | 'hd' | 'fhd' | '4k' | '8k' | 'custom', customValue: number): number => {
    switch (selection) {
      case 'sd': return 640;
      case 'hd': return 1280;
      case 'fhd': return 1920;
      case '4k': return 3840;
      case '8k': return 7680;
      case 'custom': return customValue;
      default: return 1920;
    }
  };

  const fetchSvgText = async (path: string): Promise<string> => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch SVG at ${path}`);
    return await response.text();
  };

  const resolveDimensions = (logo: typeof LOGO_ASSETS[0], targetSize: number, originalSvgText?: string) => {
    let vbWidth = 100;
    let vbHeight = 100;

    if (originalSvgText) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(originalSvgText, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;
      const viewBox = svgElement.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(' ').map(Number);
        if (parts.length === 4 && !parts.some(isNaN)) {
          vbWidth = parts[2];
          vbHeight = parts[3];
        }
      } else {
        const wAttr = parseFloat(svgElement.getAttribute('width') || '100');
        const hAttr = parseFloat(svgElement.getAttribute('height') || '100');
        if (!isNaN(wAttr) && !isNaN(hAttr)) {
          vbWidth = wAttr;
          vbHeight = hAttr;
        }
      }
    } else {
      const type = logo.type;
      if (type === 'Horizontal') {
        vbWidth = 350;
        vbHeight = 100;
      } else if (type === 'Vertical') {
        vbWidth = 100;
        vbHeight = 100;
      } else {
        vbWidth = 120;
        vbHeight = 100;
      }
    }

    const aspectRatio = vbWidth / vbHeight;
    let targetWidth = targetSize;
    let targetHeight = targetSize;

    if (vbWidth >= vbHeight) {
      targetWidth = targetSize;
      targetHeight = Math.round(targetSize / aspectRatio);
      if (targetHeight < 16) {
        targetHeight = 16;
        targetWidth = Math.round(16 * aspectRatio);
      }
    } else {
      targetHeight = targetSize;
      targetWidth = Math.round(targetSize * aspectRatio);
      if (targetWidth < 16) {
        targetWidth = 16;
        targetHeight = Math.round(16 / aspectRatio);
      }
    }

    return { width: targetWidth, height: targetHeight, vbWidth, vbHeight };
  };

  const renderToBlob = (
    logo: typeof LOGO_ASSETS[0],
    targetSize: number,
    format: 'png' | 'jpg' | 'webp' | 'gif' | 'svg' | 'html5' | 'tag',
    bgType: 'transparent' | 'dark' | 'light' | 'custom',
    customColor: string,
    quality: number = 1.0
  ): Promise<{ blob: Blob; filename: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const svgText = await fetchSvgText(logo.path);
        const { width, height } = resolveDimensions(logo, targetSize, svgText);

        const bgName = bgType === 'transparent' ? 'transp' : bgType === 'custom' ? `custom_${customColor.replace('#', '')}` : bgType;
        const extension = format === 'html5' ? 'html' : format === 'tag' ? 'txt' : format;
        const filename = `${logo.id}_${targetSize}px_${bgName}.${extension}`;

        if (format === 'svg') {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const svgElement = svgDoc.documentElement;
          
          svgElement.setAttribute('width', `${width}`);
          svgElement.setAttribute('height', `${height}`);

          if (bgType !== 'transparent') {
            let bgColor = '#FFFFFF';
            if (bgType === 'dark') bgColor = '#0B0E14';
            else if (bgType === 'custom') bgColor = customColor;

            const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', '100%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', bgColor);
            svgElement.insertBefore(rect, svgElement.firstChild);
          }

          const serializer = new XMLSerializer();
          const processedSvgText = serializer.serializeToString(svgDoc);
          const blob = new Blob([processedSvgText], { type: 'image/svg+xml;charset=utf-8' });
          resolve({ blob, filename });
          return;
        }

        if (format === 'html5') {
          let bgColor = '#FFFFFF';
          if (bgType === 'dark') bgColor = '#0B0E14';
          else if (bgType === 'custom') bgColor = customColor;
          else if (bgType === 'transparent') bgColor = '#111827';

          const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexa Brand Asset - ${logo.name}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: ${bgColor};
      font-family: system-ui, -apple-system, sans-serif;
    }
    .asset-container {
      width: 100%;
      max-width: ${width}px;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    svg {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
    }
    .tag-label {
      font-size: 11px;
      font-family: monospace;
      color: rgba(255,255,255,0.4);
      background: rgba(255,255,255,0.05);
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="asset-container">
    ${svgText}
    <div class="tag-label">NEXA BRAND KIT - ${width}x${height}px</div>
  </div>
</body>
</html>`;
          const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
          resolve({ blob, filename });
          return;
        }

        if (format === 'tag') {
          const base64Svg = btoa(unescape(encodeURIComponent(svgText)));
          const mimeType = 'image/svg+xml';
          const dataUri = `data:${mimeType};base64,${base64Svg}`;

          const tagContent = `================================================================================
NEXA BRAND KIT - EMBED CODES & HTML TAGS
Asset: ${logo.name} (${width}x${height}px)
================================================================================

1. DIRECT INLINE SVG TAG (Recomendado para máxima performance e nitidez):
--------------------------------------------------------------------------------
${svgText}


2. IMG EMBED WITH BASE64 DATA-URI (Fácil integração em qualquer HTML):
--------------------------------------------------------------------------------
<img src="${dataUri}" alt="${logo.name}" width="${width}" height="${height}" style="display: block; max-width: 100%; height: auto;" />


3. STANDARD IMG SOURCE LINK (Para carregar de um servidor ou pasta local):
--------------------------------------------------------------------------------
<img src="${logo.path.split('/').pop()}" alt="${logo.name}" width="${width}" height="${height}" style="display: block; max-width: 100%; height: auto;" />
`;
          const blob = new Blob([tagContent], { type: 'text/plain;charset=utf-8' });
          resolve({ blob, filename });
          return;
        }

        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(url);
            reject(new Error('Could not get 2D context'));
            return;
          }

          ctx.clearRect(0, 0, width, height);

          if (format === 'jpg' && bgType === 'transparent') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          } else if (bgType !== 'transparent') {
            let bgColor = '#FFFFFF';
            if (bgType === 'dark') bgColor = '#0B0E14';
            else if (bgType === 'custom') bgColor = customColor;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          let mimeType = 'image/png';
          if (format === 'webp') mimeType = 'image/webp';
          else if (format === 'jpg') mimeType = 'image/jpeg';
          else if (format === 'gif') mimeType = 'image/gif';

          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              resolve({ blob, filename });
            } else {
              reject(new Error('Blob generation failed'));
            }
          }, mimeType, quality);
        };

        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(new Error('Image load failed'));
        };

      } catch (err) {
        reject(err);
      }
    });
  };

  // Live estimated/actual size calculator
  useEffect(() => {
    let active = true;
    const updateSize = async () => {
      try {
        const sizeValue = getActiveSizeValue(exportSizeSelection, exportCustomSizeValue);
        const { blob } = await renderToBlob(
          selectedExportLogo,
          sizeValue,
          exportFormat,
          exportBgType,
          exportCustomColor,
          exportQuality
        );
        if (active) {
          setLiveFileSize(blob.size);
        }
      } catch (err) {
        // Keep silented or log error
        console.warn('Real-time size calculation skipped:', err);
      }
    };
    updateSize();
    return () => {
      active = false;
    };
  }, [selectedExportLogo, exportFormat, exportSizeSelection, exportCustomSizeValue, exportBgType, exportCustomColor, exportQuality]);

  const handleSingleExport = async () => {
    try {
      setIsExporting(true);
      const sizeValue = getActiveSizeValue(exportSizeSelection, exportCustomSizeValue);
      const { blob, filename } = await renderToBlob(
        selectedExportLogo,
        sizeValue,
        exportFormat,
        exportBgType,
        exportCustomColor,
        exportQuality
      );

      const downloadLink = document.createElement('a');
      downloadLink.download = filename;
      downloadLink.href = URL.createObjectURL(blob);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
      setIsExporting(false);
    } catch (error) {
      console.error('Failed to export:', error);
      setIsExporting(false);
    }
  };

  const addToPackageQueue = () => {
    const newItem: QueueItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      logo: selectedExportLogo,
      format: exportFormat,
      sizeSelection: exportSizeSelection,
      customSizeValue: exportCustomSizeValue,
      bgType: exportBgType,
      customColor: exportCustomColor,
      quality: exportQuality
    };
    setPackageQueue(prev => [...prev, newItem]);
  };

  const removeFromPackageQueue = (id: string) => {
    setPackageQueue(prev => prev.filter(item => item.id !== id));
  };

  const clearPackageQueue = () => {
    setPackageQueue([]);
  };

  const downloadCompletePackage = async () => {
    if (packageQueue.length === 0) return;
    try {
      setIsDownloadingPackage(true);
      const zip = new JSZip();

      for (const item of packageQueue) {
        const sizeValue = getActiveSizeValue(item.sizeSelection, item.customSizeValue);
        const { blob, filename } = await renderToBlob(
          item.logo,
          sizeValue,
          item.format,
          item.bgType,
          item.customColor,
          item.quality
        );
        zip.file(filename, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadLink = document.createElement('a');
      downloadLink.download = `nexa_brand_kit_pacote_${Date.now()}.zip`;
      downloadLink.href = URL.createObjectURL(content);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);

      setIsDownloadingPackage(false);
    } catch (error) {
      console.error('Failed to generate zip package:', error);
      setIsDownloadingPackage(false);
    }
  };

  const copySvgCode = async (logo: typeof LOGO_ASSETS[0]) => {
    try {
      if (logo.path.endsWith('.png')) {
        // For PNG, copy the absolute URL path
        navigator.clipboard.writeText(window.location.origin + logo.path);
        setCopiedLogoId(logo.id);
        setTimeout(() => setCopiedLogoId(null), 2000);
        return;
      }
      const response = await fetch(logo.path);
      const svgText = await response.text();
      navigator.clipboard.writeText(svgText);
      setCopiedLogoId(logo.id);
      setTimeout(() => setCopiedLogoId(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar código SVG:', error);
    }
  };

  const filteredLogos = LOGO_ASSETS.filter(logo => {
    const matchesCategory = activeCategory === 'all' || logo.category === activeCategory;
    const matchesSearch = logoSearch.trim() === '' || 
      logo.name.toLowerCase().includes(logoSearch.toLowerCase()) || 
      logo.type.toLowerCase().includes(logoSearch.toLowerCase()) || 
      logo.desc.toLowerCase().includes(logoSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // AI Instructions markdown text
  const aiMarkdownText = `# Guia de Identidade Visual e Instruções para IA: NEXA

Este documento foi criado para treinar e orientar modelos de Inteligência Artificial (e profissionais de marketing) na criação de materiais, códigos e peças publicitárias seguindo à risca a identidade visual da **Nexa**.

---

## 1. Visão Geral e Essência da Marca
A **Nexa** possui uma identidade visual moderna, futurista, tecnológica e vibrante. Sua essência baseia-se no contraste marcante entre fundos escuros e limpos (minimalistas) e um logotipo com um degradê de cores neon fluidas e dinâmicas.

Sempre que a IA gerar conteúdo para a Nexa, deve manter o tom de voz **profissional, moderno, inovador, acessível e direto**. O design deve ser limpo, com bastante espaço em branco (respiro) e focar em tipografia geométrica elegante.

---

## 2. Paleta de Cores Oficiais
O uso correto das cores é o pilar mais importante da identidade visual da Nexa. Utilize os códigos hexadecimais exatos abaixo para qualquer elemento de design (botões, detalhes, bordas ou textos secundários):

- **Azul Elétrico Nexa:** #0070F3
- **Roxo Violeta Nexa:** #8B5CF6
- **Fundo Oficial Escuro (Dark Mode):** #0B0E14
- **Fundo Oficial Claro (Light Mode):** #FFFFFF

### Regra de Degradê (Gradient Rule)
O degradê oficial deve seguir a ordem de transição linear de 135 graus ou horizontal:
linear-gradient(45deg, #0070F3 0%, #8B5CF6 100%)

---

## 3. Mapeamento de Logotipos por Contexto (Asset Map)
- **Uso Digital / Telas (/core)**
  - Fundo Escuro: \`/core/nexa_logo_horizontal_light_transp.svg\`
  - Fundo Claro: \`/core/nexa_logo_horizontal_dark_transp.svg\`
  - Apenas Símbolo: \`/core/nexa_isomark_light_transp.svg\`
- **Uso Web e SEO (/web)**
  - Favicon: \`/web/favicon.svg\`
  - Capa de Compartilhamento (OpenGraph): \`/web/og_image_thumbnail.svg\`
- **Monocromático / Silhuetas (/cnc)**
  - Fundo Escuro (Branco Plano): \`/cnc/nexa_logo_horizontal_flat_white.svg\`
  - Fundo Claro (Preto Plano): \`/cnc/nexa_logo_horizontal_flat_black.svg\`
- **Uso em Impressão (/print)**
  - Logo Horizontal CMYK: \`/print/nexa_logo_horizontal_cmyk.svg\`

---

## 4. Tipografia Oficial
- **Títulos de Exibição (Display):** Satoshi (Sempre com peso negrito ou extra-negrito, com tracking levemente condensado/tight).
- **Textos de Apoio / Subtítulos:** Inter (Peso médio ou regular).
- **Metadados, Códigos e Status:** JetBrains Mono.

---

## 5. Regras Proibitivas (Não faça isso)
1. Não rotacione, estique ou modifique as proporções das letras ou do símbolo.
2. Não remova ou inverta as cores do degradê neon do símbolo original.
3. Não use a versão de texto claro sobre fundos claros, nem a versão de texto escuro sobre fundos escuros. Mantenha sempre alto contraste.`;

  // Wrap markdown for prompt copying
  const aiPromptWrapper = `Abaixo está o manual de identidade visual da minha empresa NEXA. Por favor, utilize-o em todos os designs, textos, páginas HTML, códigos React ou sugestões de conteúdo que criar para mim. Respeite estritamente as regras de cores, fontes e os caminhos oficiais de imagens fornecidos:

${aiMarkdownText}`;

  return (
    <div id="brand_kit_app" className="min-h-screen bg-[#0B0E14] text-gray-200 font-sans selection:bg-[#00FFFF]/30 selection:text-[#00FFFF] relative overflow-x-hidden">
      {/* Hidden canvas for PNG exporting */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top cosmic ambient light gradients */}
      <div className="absolute top-0 left-1/4  w-150h-150 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute top-40 right-1/4 w-150 h-150 bg-cyan-600/5 rounded-full blur-[130px] pointer-events-none animate-pulse duration-7000" />
      <div className="absolute top-[30%] left-10 w-[400px] h-[400px] bg-pink-600/3 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Banner / Header */}
      <header id="header_section" className="relative border-b border-white/5 bg-[#0B0E14]/85 backdrop-blur-xl sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#121625] border border-white/10 flex items-center justify-center shadow-lg shadow-purple-500/5 shrink-0 p-1.5 bg-gradient-to-br from-[#121625] to-[#0B0E14] hover:border-purple-500/40 transition-all duration-300">
              <img 
                src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} 
                alt="NEXA Isomark" 
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white tracking-tight leading-tight flex items-center gap-2">
                NEXA <span className="text-[10px] tracking-widest px-2 py-0.5 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] rounded-full text-white font-extrabold font-mono">BRAND KIT</span>
              </h1>
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.25em] font-semibold">Guia Oficial</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-wider font-semibold">
            <a href="#logos_section" className="text-gray-400 hover:text-[#0070F3] transition-all duration-300 hover:translate-y-[-1px]">Logotipos</a>
            <a href="#mockup_sandbox_section" className="text-gray-400 hover:text-[#0070F3] transition-all duration-300 hover:translate-y-[-1px]">Mockups</a>
            <a href="#colors_section" className="text-gray-400 hover:text-[#8B5CF6] transition-all duration-300 hover:translate-y-[-1px]">Cores</a>
            <a href="#typography_section" className="text-gray-400 hover:text-[#8B5CF6] transition-all duration-300 hover:translate-y-[-1px]">Tipografia</a>
            <a href="#rules_section" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-y-[-1px]">Boas Práticas</a>
          </nav>

          <div className="flex flex-wrap items-center gap-2">


            <a 
              id="download_md_top_btn"
              href="/identidade_visual_nexa.md" 
              download="identidade_visual_nexa.md"
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] hover:opacity-95 rounded-lg text-xs font-bold text-white transition-all shadow-md shadow-blue-500/10 border border-white/10 flex items-center gap-1.5 cursor-pointer active:scale-95 hover:shadow-[0_0_15px_rgba(0,112,243,0.2)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Guia (.md)</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        
        {/* Welcome Hero Panel */}
        <motion.section 
          id="hero_section" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#121625]/85 via-[#0B0E14]/95 to-[#121625]/85 border border-white/5 p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-sm shadow-[0_15px_50px_-15px_rgba(0,112,243,0.12)]"
        >
          {/* Glowing particle orb */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-[#0070F3]/8 via-[#8B5CF6]/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
          
          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Portal de Identidade Corporativa Oficial</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.12]">
              <span className="bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-md">
                A energia e precisão da marca NEXA em suas mãos.
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Bem-vindo ao centro oficial de diretrizes de marca. Se você é um designer parceiro, criador de conteúdo, assessor ou desenvolvedor, este portal fornece todos os logotipos oficiais organizados por finalidade, além de paletas exatas de cores, tipografia recomendada e um documento instrucional otimizado para Inteligências Artificiais.
            </p>

            <div className="pt-2 flex flex-wrap gap-y-3 gap-x-8 text-xs">
              <div className="flex items-center gap-2.5 text-gray-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0070F3] shadow-[0_0_10px_#0070F3]" />
                <span>Cores Oficiais RGB / HEX</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]" />
                <span>Vetores Puros (SVG)</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <span>Instruções Prontas para IAs</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* LOGOS SECTION */}
        <section id="logos_section" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/5 pb-6 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest font-bold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3] shadow-[0_0_6px_#0070F3]" />
                <span>01. REPOSITÓRIO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
                Logotipos Oficiais
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
                Nossos logos foram desenhados para ter máxima legibilidade. Filtre de acordo com o contexto ou utilize nosso exportador avançado para obter resoluções sob medida.
              </p>
            </div>

            {/* Quick Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto self-start lg:self-end">
              {/* Search box with magnifying glass */}
              <div className="relative w-full sm:w-64 shrink-0">
                <input 
                  id="logo_search_input"
                  type="text"
                  placeholder="Buscar logo..."
                  value={logoSearch}
                  onChange={(e) => setLogoSearch(e.target.value)}
                  className="w-full bg-[#0F121D] border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                {logoSearch && (
                  <button 
                    onClick={() => setLogoSearch('')}
                    className="absolute right-2.5 top-2.5 text-gray-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-black/40 border border-white/5 rounded-xl">
                <button 
                  id="filter_all"
                  onClick={() => { setActiveCategory('all'); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-[#1e2335] text-white border border-white/10 shadow-md' : 'text-gray-400 hover:text-white border border-transparent'}`}
                >
                  Todos <span className="text-[10px] opacity-60 ml-0.5 font-mono font-normal">({LOGO_ASSETS.length})</span>
                </button>
                <button 
                  id="filter_core"
                  onClick={() => { setActiveCategory('core'); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'core' ? 'bg-[#1e2335] text-white border border-white/10 shadow-md' : 'text-gray-400 hover:text-white border border-transparent'}`}
                >
                  Geral <span className="text-[10px] opacity-60 ml-0.5 font-mono font-normal">({LOGO_ASSETS.filter(l => l.category === 'core').length})</span>
                </button>
                <button 
                  id="filter_cnc"
                  onClick={() => { setActiveCategory('cnc'); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'cnc' ? 'bg-[#1e2335] text-white border border-white/10 shadow-md' : 'text-gray-400 hover:text-white border border-transparent'}`}
                >
                  CNC <span className="text-[10px] opacity-60 ml-0.5 font-mono font-normal">({LOGO_ASSETS.filter(l => l.category === 'cnc').length})</span>
                </button>
                <button 
                  id="filter_print"
                  onClick={() => { setActiveCategory('print'); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'print' ? 'bg-[#1e2335] text-white border border-white/10 shadow-md' : 'text-gray-400 hover:text-white border border-transparent'}`}
                >
                  Print <span className="text-[10px] opacity-60 ml-0.5 font-mono font-normal">({LOGO_ASSETS.filter(l => l.category === 'print').length})</span>
                </button>
                <button 
                  id="filter_web"
                  onClick={() => { setActiveCategory('web'); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'web' ? 'bg-[#1e2335] text-white border border-white/10 shadow-md' : 'text-gray-400 hover:text-white border border-transparent'}`}
                >
                  Web <span className="text-[10px] opacity-60 ml-0.5 font-mono font-normal">({LOGO_ASSETS.filter(l => l.category === 'web').length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid of Logos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLogos.map((logo, index) => {
              // Get selected preview background (defaults to the asset preference)
              const bgPref = logoBgPreviews[logo.id] || logo.bgPreference;
              const hoverGlowClass = logo.id.includes('light') 
                ? 'neon-glow-pink' 
                : logo.id.includes('dark') 
                ? 'neon-glow-cyan' 
                : 'neon-glow-purple';
              
              return (
                <motion.div 
                  id={`card_${logo.id}`}
                  key={logo.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className={`relative bg-[#0F121D]/90 rounded-2xl border border-white/5 p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/30 ${hoverGlowClass}`}
                >
                  <div className="space-y-4">
                    {/* Header bar within card */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300 font-bold uppercase tracking-wider">
                        {logo.type}
                      </span>
                      
                      {/* Interactive background toggler for preview */}
                      <div className="flex items-center gap-1 p-0.5 bg-black/50 border border-white/5 rounded-lg">
                        <button
                          onClick={() => setLogoBgPreviews(prev => ({ ...prev, [logo.id]: 'dark' }))}
                          className={`p-1 rounded-md text-xs transition-all ${bgPref === 'dark' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          title="Fundo Escuro"
                        >
                          <div className="w-2.5 h-2.5 bg-[#0B0E14] rounded-sm border border-white/5" />
                        </button>
                        <button
                          onClick={() => setLogoBgPreviews(prev => ({ ...prev, [logo.id]: 'light' }))}
                          className={`p-1 rounded-md text-xs transition-all ${bgPref === 'light' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          title="Fundo Claro"
                        >
                          <div className="w-2.5 h-2.5 bg-white rounded-sm border border-gray-200" />
                        </button>
                        <button
                          onClick={() => setLogoBgPreviews(prev => ({ ...prev, [logo.id]: 'grid' }))}
                          className={`p-1 rounded-md text-xs transition-all ${bgPref === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          title="Fundo Transparente (Grade)"
                        >
                          <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm border border-gray-400 relative overflow-hidden flex flex-wrap" style={{ width: '10px', height: '10px' }}>
                            <div className="w-1/2 h-1/2 bg-gray-500" />
                            <div className="w-1/2 h-1/2 bg-white" />
                            <div className="w-1/2 h-1/2 bg-white" />
                            <div className="w-1/2 h-1/2 bg-gray-500" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Image Sandbox Area */}
                    <div 
                      className={`h-40 rounded-xl flex items-center justify-center p-6 border transition-all duration-300 relative overflow-hidden ${
                        bgPref === 'dark' 
                          ? 'bg-[#0B0E14] border-white/5' 
                          : bgPref === 'light' 
                          ? 'bg-white border-gray-200' 
                          : 'checkered-bg border-white/5'
                      }`}
                    >
                      <img 
                        src={logo.path} 
                        alt={logo.name} 
                        className="max-h-full max-w-full object-contain pointer-events-none transition-transform group-hover:scale-105 duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Asset Text Details */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight line-clamp-1">
                        {logo.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 h-8 leading-normal">
                        {logo.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer inside card */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (logo.path.endsWith('.png')) {
                          copyToClipboard(logo.path, (val) => setCopiedLogoId(val ? logo.id : null));
                        } else {
                          copySvgCode(logo);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
                      title={logo.path.endsWith('.png') ? "Copiar caminho do arquivo" : "Copiar código SVG"}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLogoId === logo.id ? 'Copiado!' : (logo.path.endsWith('.png') ? 'Copiar Caminho' : '')}</span>
                    </button>

                    <a
                      href={logo.path}
                      download={logo.path.split('/').pop()}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/20 hover:border-pink-500/40 text-xs font-semibold text-white hover:text-cyan-300 transition-all cursor-pointer"
                      title={logo.path.endsWith('.png') ? "Baixar imagem original" : "Baixar arquivo SVG original"}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{logo.path.endsWith('.png') ? 'Baixar PNG' : 'SVG'}</span>
                    </a>

                    <button
                      onClick={() => {
                        setSelectedExportLogo(logo);
                        const exporterSection = document.getElementById('exporter_section');
                        if (exporterSection) exporterSection.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/5 text-gray-400 hover:text-cyan-400 transition-all cursor-pointer"
                      title={logo.path.endsWith('.png') ? "Baixar imagem original diretamente" : "Exportar para PNG personalizado"}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ADVANCED EXPORTER PANEL */}
        <section id="exporter_section" className="rounded-3xl bg-[#0F121D]/90 border border-white/5 p-6 sm:p-8 space-y-8 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>02. EXPORTADOR AVANÇADO DE ALTA RESOLUÇÃO</span>
            </div>
            {packageQueue.length > 0 && (
              <span className="self-start sm:self-auto text-xs font-mono bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {packageQueue.length} {packageQueue.length === 1 ? 'Item no Pacote' : 'Itens no Pacote'}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left controls Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                  Exportador Dinâmico e Personalizado
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                  Gere logos em alta resolução para apresentações, web ou impressão. Altere o formato, defina o tamanho pelo lado maior mantendo a proporção exata, e exporte arquivos individuais ou agrupe múltiplos formatos em um pacote ZIP completo.
                </p>
              </div>

              {/* 1. Logo Select Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">1. Selecione o Logotipo:</label>
                <select 
                  id="exporter_logo_select"
                  value={selectedExportLogo.id}
                  onChange={(e) => {
                    const found = LOGO_ASSETS.find(l => l.id === e.target.value);
                    if (found) setSelectedExportLogo(found);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all cursor-pointer"
                >
                  {LOGO_ASSETS.map((logo) => (
                    <option key={logo.id} value={logo.id} className="bg-[#0B0E14] text-white text-xs">
                      {logo.name} ({logo.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Format Selection */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">2. Formato do Arquivo:</label>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5">
                  {(['png', 'jpg', 'webp', 'gif', 'svg', 'html5', 'tag'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`px-2 py-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                        exportFormat === fmt 
                          ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/5' 
                          : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Resolution presets (longest side) */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">3. Resolução (Lado Maior):</label>
                <div className="grid grid-cols-6 gap-1">
                  {(['sd', 'hd', 'fhd', '4k', '8k', 'custom'] as const).map((sz) => {
                    const labels = { sd: 'SD', hd: 'HD', fhd: 'FHD', '4k': '4K', '8k': '8K', custom: 'Pers.' };
                    const dims = { sd: '640px', hd: '1280px', fhd: '1920px', '4k': '3840px', '8k': '7680px', custom: 'Seu' };
                    return (
                      <button
                        key={sz}
                        onClick={() => setExportSizeSelection(sz)}
                        className={`px-1 py-1.5 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                          exportSizeSelection === sz 
                            ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300' 
                            : 'bg-black/35 border-white/5 text-gray-400 hover:text-white'
                        }`}
                        title={dims[sz]}
                      >
                        <span>{labels[sz]}</span>
                        <span className="text-[8px] opacity-75 font-mono">{dims[sz]}</span>
                      </button>
                    );
                  })}
                </div>

                {exportSizeSelection === 'custom' && (
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Definir Lado Maior (px):</span>
                      <span className="text-xs font-mono font-semibold text-cyan-400">{exportCustomSizeValue} px</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="16" 
                        max="8192" 
                        step="1"
                        value={exportCustomSizeValue}
                        onChange={(e) => setExportCustomSizeValue(Number(e.target.value))}
                        className="flex-1 h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                      />
                      <input
                        type="number"
                        min="16"
                        max="10000"
                        value={exportCustomSizeValue}
                        onChange={(e) => {
                          const val = Math.max(16, Math.min(10000, Number(e.target.value)));
                          setExportCustomSizeValue(val);
                        }}
                        className="w-20 bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-xs text-center font-mono text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-gray-500">
                      <span>Mín: 16px</span>
                      <span>Máx: 10000px</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Background Options */}
              <div className="space-y-3">
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">4. Cor de Fundo:</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setExportBgType('transparent')}
                    className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${exportBgType === 'transparent' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Transp.
                  </button>
                  <button
                    onClick={() => setExportBgType('dark')}
                    className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${exportBgType === 'dark' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Escuro
                  </button>
                  <button
                    onClick={() => setExportBgType('light')}
                    className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${exportBgType === 'light' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Claro
                  </button>
                  <button
                    onClick={() => setExportBgType('custom')}
                    className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${exportBgType === 'custom' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Personaliz.
                  </button>
                </div>

                {exportBgType === 'custom' && (
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Seletor Livre:</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color" 
                          value={exportCustomColor}
                          onChange={(e) => setExportCustomColor(e.target.value)}
                          className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                        />
                        <span className="text-xs font-mono text-white font-semibold uppercase">{exportCustomColor}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="block text-[9px] font-mono text-gray-500 uppercase">Paleta Rápida (Nexa Presets):</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {[
                          { hex: '#0070F3', label: 'Azul' },
                          { hex: '#8B5CF6', label: 'Roxo' },
                          { hex: '#1E2335', label: 'Grafite' },
                          { hex: '#EF4444', label: 'Vermelho' },
                          { hex: '#10B981', label: 'Verde' },
                          { hex: '#F59E0B', label: 'Laranja' }
                        ].map((preset) => (
                          <button
                            key={preset.hex}
                            onClick={() => setExportCustomColor(preset.hex)}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[9px] text-gray-300 font-semibold border border-white/5 transition-all flex items-center gap-1 cursor-pointer"
                            style={{ borderLeftColor: preset.hex, borderLeftWidth: '3px' }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Quality Controls & Real-Time compression info */}
              <div className="space-y-3">
                {['jpg', 'webp'].includes(exportFormat) ? (
                  <div className="space-y-2 p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Ajuste de Qualidade:</span>
                      <span className="font-mono text-cyan-400 font-bold">{Math.round(exportQuality * 100)}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={exportQuality}
                      onChange={(e) => setExportQuality(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <p className="text-[9px] text-gray-400 leading-normal">
                      Arraste para comprimir o peso final do arquivo e cumprir limites de KB exigidos (ex. 50KB).
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[10px] text-gray-400">
                    {exportFormat === 'png' && 'Qualidade Máxima: PNG preserva nitidez extrema por padrão (lossless).'}
                    {exportFormat === 'gif' && 'Qualidade Máxima: GIF exporta com cores otimizadas sem artefatos.'}
                    {exportFormat === 'svg' && 'Vetorização Infinita: SVG não utiliza pixelização ou compressão de qualidade.'}
                    {exportFormat === 'html5' && 'Alta Fidelidade Web: HTML5 incorporado de forma vetorial e responsiva.'}
                    {exportFormat === 'tag' && 'Pronto para Uso: TAG gera código-fonte inline e imagens em Base64 nativo.'}
                  </div>
                )}

                {/* File size preview feedback panel */}
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-gray-400">TAMANHO ESTIMADO:</span>
                  <span className="text-cyan-400 font-bold tracking-wider">
                    {(() => {
                      if (liveFileSize === null) return 'Calculando...';
                      if (liveFileSize === 0) return '0 Bytes';
                      const k = 1024;
                      const dm = 1;
                      const sizes = ['Bytes', 'KB', 'MB'];
                      const i = Math.floor(Math.log(liveFileSize) / Math.log(k));
                      return parseFloat((liveFileSize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                    })()}
                  </span>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  id="exporter_download_btn"
                  onClick={handleSingleExport}
                  disabled={isExporting}
                  className="py-3.5 rounded-xl bg-gradient-to-r from-[#0070F3] to-[#00DFD8] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{isExporting ? 'Processando...' : 'Baixar Imagem'}</span>
                </button>

                <button
                  onClick={addToPackageQueue}
                  className="py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/25 cursor-pointer active:scale-98"
                >
                  <Copy className="w-4 h-4 shrink-0" />
                  <span>+ Add ao Pacote</span>
                </button>
              </div>
            </div>

            {/* Right preview Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl h-full min-h-[360px] relative overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Preview de Renderização</span>
              </div>

              <div className="absolute top-3 right-3 text-[10px] font-mono bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 px-2.5 py-0.5 rounded-md">
                {exportFormat.toUpperCase()}
              </div>
              
              <div 
                className={`w-full max-w-md h-64 rounded-xl flex items-center justify-center p-8 border transition-all duration-300 relative overflow-hidden ${
                  exportBgType === 'dark' 
                    ? 'bg-[#0B0E14] border-white/5' 
                    : exportBgType === 'light' 
                    ? 'bg-white border-gray-200' 
                    : exportBgType === 'transparent'
                    ? 'checkered-bg border-white/5'
                    : 'border-white/5'
                }`}
                style={exportBgType === 'custom' ? { backgroundColor: exportCustomColor } : undefined}
              >
                <img 
                  src={selectedExportLogo.path} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Render calculation details */}
              {(() => {
                const activeSizeValue = getActiveSizeValue(exportSizeSelection, exportCustomSizeValue);
                const isHoriz = selectedExportLogo.type === 'Horizontal';
                const isVert = selectedExportLogo.type === 'Vertical';
                const originalRatio = isHoriz ? 3.5 : isVert ? 1.0 : 1.2;
                
                let w = activeSizeValue;
                let h = activeSizeValue;
                if (originalRatio >= 1) {
                  w = activeSizeValue;
                  h = Math.round(activeSizeValue / originalRatio);
                  if (h < 16) {
                    h = 16;
                    w = Math.round(16 * originalRatio);
                  }
                } else {
                  h = activeSizeValue;
                  w = Math.round(activeSizeValue * originalRatio);
                  if (w < 16) {
                    w = 16;
                    h = Math.round(16 / originalRatio);
                  }
                }

                const isClamped = (isHoriz && (activeSizeValue / originalRatio < 16)) || (!isHoriz && (activeSizeValue * originalRatio < 16));

                return (
                  <div className="mt-4 text-center space-y-1">
                    <p className="text-xs text-white font-semibold">{selectedExportLogo.name}</p>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-gray-400">
                        <span>Dimensões: <strong className="text-cyan-400">{w} x {h} px</strong></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span>Lado Maior: <strong className="text-cyan-400">{activeSizeValue}px</strong></span>
                      </div>
                      {isClamped && (
                        <p className="text-[9px] text-amber-400 font-mono italic">
                          ⚠️ Lado menor limitado a 16px para preservar legibilidade mínima.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

          {/* PACKAGE LIST (BATCH DOWNLOAD ENGINE) */}
          <div className="mt-8 border-t border-white/5 pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                Seu Pacote de Download (.ZIP)
              </h4>
              {packageQueue.length > 0 && (
                <button
                  onClick={clearPackageQueue}
                  className="text-xs font-mono text-gray-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Limpar Fila</span>
                </button>
              )}
            </div>

            {packageQueue.length === 0 ? (
              <div className="p-6 rounded-2xl bg-black/20 border border-white/5 text-center space-y-2">
                <p className="text-xs text-gray-400">
                  Nenhum item adicionado ao pacote ainda.
                </p>
                <p className="text-[10px] text-gray-500 max-w-md mx-auto">
                  Ajuste o formato, tamanho e fundo desejados para o logo atual, e clique em <strong className="text-pink-400">+ Add ao Pacote</strong> para agrupar múltiplos arquivos em um download unificado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {packageQueue.map((item) => {
                    const activeSize = getActiveSizeValue(item.sizeSelection, item.customSizeValue);
                    const bgDesc = item.bgType === 'transparent' 
                      ? 'Transparente' 
                      : item.bgType === 'dark' 
                      ? 'Escuro' 
                      : item.bgType === 'light' 
                      ? 'Claro' 
                      : `Cor ${item.customColor}`;

                    return (
                      <div 
                        key={item.id} 
                        className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:border-white/20 transition-all group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div 
                            className={`w-10 h-10 rounded-lg p-1.5 flex items-center justify-center border border-white/5 ${
                              item.bgType === 'dark' ? 'bg-[#0B0E14]' : item.bgType === 'light' ? 'bg-white' : 'checkered-bg'
                            }`}
                            style={item.bgType === 'custom' ? { backgroundColor: item.customColor } : undefined}
                          >
                            <img 
                              src={item.logo.path} 
                              alt="" 
                              className="max-w-full max-h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-semibold text-white truncate leading-tight">{item.logo.name}</p>
                            <div className="flex items-center gap-1 text-[9px] font-mono text-gray-400 mt-0.5">
                              <span className="text-cyan-400 font-bold uppercase">{item.format}</span>
                              <span>•</span>
                              <span>{activeSize}px</span>
                              <span>•</span>
                              <span className="truncate max-w-[80px]">{bgDesc}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromPackageQueue(item.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                          title="Remover do pacote"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={downloadCompletePackage}
                    disabled={isDownloadingPackage}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Download className={`w-4 h-4 shrink-0 ${isDownloadingPackage ? 'animate-spin' : ''}`} />
                    <span>{isDownloadingPackage ? 'Gerando Pacote ZIP...' : `Baixar Pacote Completo (${packageQueue.length} itens)`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* MOCKUP SANDBOX SECTION */}
        <section id="mockup_sandbox_section" className="rounded-3xl bg-[#0F121D]/95 border border-white/5 p-6 sm:p-8 space-y-6 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#00FFFF] font-mono text-xs uppercase tracking-widest font-bold">
                <Layers className="w-4 h-4 text-[#00FFFF]" />
                <span>03. APRESENTAÇÃO</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Simulador de Peças de Marketing (Live Mockups)
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Visualize como a identidade visual da Nexa se aplica instantaneamente em mídias sociais, papelaria ou web design. Altere os textos e os planos de fundo abaixo para testar!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Mockup Configuration Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                {/* 1. Select Template */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">1. Escolha a Peça / Formato:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMockupTemplate('instagram');
                        setMockupText('MOLDANDO O AMANHÃ INDUSTRIAL COM DESIGN E IA.');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'instagram' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      <span className="truncate">Instagram Post</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('linkedin');
                        setMockupText('SISTEMAS INTEGRADOS DE ALTÍSSIMO DESEMPENHO.');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'linkedin' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">LinkedIn Banner</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('facebook');
                        setMockupText('LIDERANDO A REVOLUÇÃO COGNITIVA NA INDÚSTRIA COM IA.');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'facebook' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="truncate">Capa Facebook</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('youtube');
                        setMockupText('TECNOLOGIA, DESIGN E IA INDUSTRIAL • NOVOS VÍDEOS');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'youtube' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                      <span className="truncate">YouTube Banner</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('tiktok');
                        setMockupText('#NEXA: INTELIGÊNCIA ARTIFICIAL NO CHÃO DE FÁBRICA ⚙️🤖');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'tiktok' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">TikTok Overlay</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('badge');
                        setMockupText('NEXA CREW - OPERAÇÃO INDUSTRIAL');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'badge' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span className="truncate">Crachá Digital</span>
                    </button>
                    <button
                      onClick={() => {
                        setMockupTemplate('website');
                        setMockupText('A Próxima Geração Industrial.');
                      }}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${mockupTemplate === 'website' ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.1)]' : 'bg-black/35 border-white/5 text-gray-400 hover:text-white hover:border-white/10'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      <span className="truncate">Layout Web</span>
                    </button>
                  </div>
                </div>

                {/* 2. Select Logo to overlay */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">2. Escolha o Logotipo:</label>
                  <select 
                    id="mockup_logo_select"
                    value={mockupLogo.id}
                    onChange={(e) => {
                      const found = LOGO_ASSETS.find(l => l.id === e.target.value);
                      if (found) setMockupLogo(found);
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    {LOGO_ASSETS.filter(l => !l.path.includes('favicon') && !l.id.includes('android')).map((logo) => (
                      <option key={logo.id} value={logo.id} className="bg-[#0B0E14] text-white text-xs">
                        {logo.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Customize Background */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">3. Plano de Fundo (Background Style):</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() => setMockupBg('dark_ambient')}
                      className={`py-1.5 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${mockupBg === 'dark_ambient' ? 'bg-cyan-500/10 border-cyan-400/30 text-white' : 'bg-black/35 border-white/5 text-gray-400'}`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setMockupBg('neon_glow')}
                      className={`py-1.5 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${mockupBg === 'neon_glow' ? 'bg-cyan-500/10 border-cyan-400/30 text-white' : 'bg-black/35 border-white/5 text-gray-400'}`}
                    >
                      Neon Gradient
                    </button>
                    <button
                      onClick={() => setMockupBg('minimal_white')}
                      className={`py-1.5 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${mockupBg === 'minimal_white' ? 'bg-cyan-500/10 border-cyan-400/30 text-white' : 'bg-black/35 border-white/5 text-gray-400'}`}
                    >
                      White
                    </button>
                    <button
                      onClick={() => setMockupBg('tech_grid')}
                      className={`py-1.5 rounded-lg text-center border text-[10px] font-bold transition-all cursor-pointer ${mockupBg === 'tech_grid' ? 'bg-cyan-500/10 border-cyan-400/30 text-white' : 'bg-black/35 border-white/5 text-gray-400'}`}
                    >
                      Technical Grid
                    </button>
                  </div>
                </div>

                {/* 4. Customize text on piece */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">4. Edite a Frase / Headline (Satoshi Font):</label>
                  <textarea
                    id="mockup_text_input"
                    value={mockupText}
                    onChange={(e) => setMockupText(e.target.value)}
                    rows={2}
                    maxLength={100}
                    placeholder="Escreva uma frase de efeito..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-display uppercase tracking-tight"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>*Será convertida em maiúsculas por padrão</span>
                    <span>{mockupText.length}/100</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/10 text-[11px] text-cyan-300 leading-relaxed space-y-1 mt-4">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Observação do Designer:
                </p>
                <p>
                  A margem de segurança ao redor do logo está pré-calibrada de acordo com as regras de respiro mínimas recomendadas de 24px (ou 15% do tamanho da peça).
                </p>
              </div>
            </div>

            {/* Mockup Rendering Arena (7 cols) */}
            <div className="lg:col-span-7 flex items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl min-h-[400px] relative overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Simulação em Tempo Real</span>
              </div>

              {/* LIVE CARD RENDERING */}
              <div className="w-full max-w-[380px] transition-all duration-500 hover:scale-[1.01]">
                
                {/* Instagram Post Template */}
                {mockupTemplate === 'instagram' && (
                  <div className="bg-[#0c0f16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3.5 py-3 border-b border-white/5 bg-[#0f121d]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-[#0070F3] to-[#8B5CF6] flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-[#0b0e14] flex items-center justify-center overflow-hidden">
                            <img src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} alt="Nexa Avatar" className="w-[75%] h-[75%] object-contain" referrerPolicy="no-referrer" />
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white tracking-tight">nexa_industrial</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      </div>
                    </div>

                    {/* Arena */}
                    <div 
                      className={`aspect-square w-full relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-500 ${
                        mockupBg === 'dark_ambient' ? 'bg-[#0B0E14] text-white' :
                        mockupBg === 'neon_glow' ? 'bg-gradient-to-br from-[#0070F3]/15 to-[#8B5CF6]/15 border-white/5' :
                        mockupBg === 'minimal_white' ? 'bg-white text-gray-900' :
                        'checkered-bg'
                      }`}
                    >
                      {/* Tech grid elements if grid is active */}
                      {mockupBg === 'tech_grid' && (
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                      )}

                      {/* Header Logo */}
                      <div className="flex justify-between items-start z-10">
                        <span className="text-[9px] font-mono tracking-widest text-[#0070F3] bg-[#0070F3]/10 px-2 py-0.5 rounded-full border border-[#0070F3]/20">NEXA DIRECT</span>
                        <div className="h-7 w-24 flex items-center justify-end p-1 rounded-lg">
                          <img 
                            src={mockupLogo.path} 
                            alt="Mockup Logo" 
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Headline Text */}
                      <div className="space-y-2 z-10">
                        <h4 className="text-xl font-display font-black tracking-tight leading-tight uppercase bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
                          {mockupText || 'MOLDANDO O AMANHÃ INDUSTRIAL COM DESIGN E IA.'}
                        </h4>
                        <div className="w-12 h-1 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6]" />
                      </div>

                      {/* Abstract technical badge */}
                      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none font-mono text-[8px] text-right">
                        <span>SYS_ID: 5E3FA287</span><br />
                        <span>LOC: CH_LAT_45</span>
                      </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="px-4 py-3 bg-[#0f121d] border-t border-white/5 flex items-center justify-between text-gray-400">
                      <div className="flex items-center gap-4">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 cursor-pointer hover:scale-110 transition-transform" />
                        <MessageCircle className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                        <Send className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                      </div>
                      <Bookmark className="w-5 h-5 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* LinkedIn Banner Template */}
                {mockupTemplate === 'linkedin' && (
                  <div className="bg-[#0A0D14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="px-3.5 py-2.5 border-b border-white/5 bg-[#0F121D] text-[10px] text-gray-400 flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                      <span>Capa de Perfil Corporativo LinkedIn</span>
                    </div>

                    <div 
                      className={`h-44 w-full relative flex flex-col justify-between p-5 overflow-hidden transition-all duration-500 ${
                        mockupBg === 'dark_ambient' ? 'bg-[#0B0E14] text-white' :
                        mockupBg === 'neon_glow' ? 'bg-gradient-to-r from-[#0070F3]/10 to-[#8B5CF6]/10 border-white/5' :
                        mockupBg === 'minimal_white' ? 'bg-white text-gray-900' :
                        'checkered-bg'
                      }`}
                    >
                      {/* Tech grid elements if grid is active */}
                      {mockupBg === 'tech_grid' && (
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
                      )}

                      {/* Header Logo */}
                      <div className="flex justify-between items-start z-10">
                        <div className="h-6 w-20">
                          <img 
                            src={mockupLogo.path} 
                            alt="Mockup Logo" 
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[7px] font-mono tracking-widest text-gray-500">OFFICIAL PARTNER</span>
                      </div>

                      {/* Center Content */}
                      <div className="space-y-1.5 z-10 max-w-[240px]">
                        <h4 className="text-[13px] font-display font-bold tracking-tight leading-snug uppercase text-white">
                          {mockupText || 'SISTEMAS INTEGRADOS DE ALTÍSSIMO DESEMPENHO.'}
                        </h4>
                        <p className="text-[7px] font-mono text-blue-400 uppercase tracking-widest">NEXA INDUSTRIAL SYSTEMS & MARKETING KIT</p>
                      </div>

                      {/* Minimal visual progress strip */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6]" />
                    </div>

                    {/* LinkedIn User Meta Preview */}
                    <div className="p-4 bg-[#0F121D] flex items-center gap-3 relative">
                      <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-[#0A0D14] -mt-8 flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Nexa Corp</p>
                        <p className="text-[9px] text-gray-400">125,483 seguidores • Empresa de Tecnologia Industrial</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Digital Employee Badge Template */}
                {mockupTemplate === 'badge' && (
                  <div className="bg-[#121625] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 text-center relative">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6]" />
                    
                    {/* Badge top lanyard clip slot */}
                    <div className="w-10 h-2 bg-black/60 rounded-full mx-auto mb-4 border border-white/10" />

                    {/* Logo */}
                    <div className="h-8 w-24 mx-auto mb-4">
                      <img 
                        src={mockupLogo.path} 
                        alt="Badge Logo" 
                        className="max-h-full max-w-full mx-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Profile avatar frame */}
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-b from-[#0070F3] to-[#8B5CF6] flex items-center justify-center overflow-hidden shadow-lg">
                        <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center">
                          <User className="w-8 h-8 text-blue-400" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border border-[#121625] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Member details */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white tracking-wide">MARIANA SILVA</h4>
                      <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{mockupText || 'NEXA CREW - OPERAÇÃO INDUSTRIAL'}</p>
                    </div>

                    {/* Grid card backgrounds */}
                    <div className="mt-4 p-2 bg-black/30 rounded-lg border border-white/5 text-[9px] font-mono text-left text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>ID DEACESSO:</span>
                        <span className="text-cyan-400">993-NEXA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EMISSÃO:</span>
                        <span>07/2026</span>
                      </div>
                    </div>

                    {/* Simulated barcode */}
                    <div className="mt-4 h-6 bg-white/5 rounded-md flex items-center justify-center gap-0.5 px-4 opacity-70">
                      {[1,3,2,4,1,2,5,3,1,2,4,2,1,3,2,1,4,3,2,1,3].map((h, i) => (
                        <div key={i} className="bg-white flex-1" style={{ height: `${h * 4 + 6}px` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Web Site Header Navbar */}
                {mockupTemplate === 'website' && (
                  <div className="bg-[#0b0d17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-left">
                    <div className="px-3.5 py-1.5 border-b border-white/5 bg-[#0F121D] text-[9px] text-gray-400 flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-cyan-500 rounded-sm" />
                      <span>Simulação de Menu / Navegação Web</span>
                    </div>

                    {/* Simulated Navbar */}
                    <div className="px-4 py-3 bg-[#0B0E14] border-b border-white/5 flex items-center justify-between">
                      <div className="h-5 w-16">
                        <img 
                          src={mockupLogo.path} 
                          alt="Navbar Logo" 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex gap-2.5 text-[8px] font-mono uppercase tracking-wider text-gray-400">
                        <span className="text-white font-bold">Início</span>
                        <span>Produtos</span>
                        <span>Sobre</span>
                      </div>
                    </div>

                    {/* Content Section below navbar */}
                    <div className="p-5 space-y-3 bg-[#090b11] h-32 relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                      <span className="text-[7px] font-mono tracking-widest text-[#0070F3] uppercase font-bold">PRODUTO OFICIAL NEXA</span>
                      <h4 className="text-sm font-display font-bold text-white tracking-tight leading-snug">
                        {mockupText || 'A Próxima Geração Industrial.'}
                      </h4>
                      <button className="px-2.5 py-1 bg-[#8B5CF6] hover:opacity-90 rounded text-[8px] font-bold text-white w-max">
                        Saiba Mais
                      </button>
                    </div>
                  </div>
                )}

                {/* Facebook Cover Template */}
                {mockupTemplate === 'facebook' && (
                  <div className="bg-[#0b0e14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="px-3.5 py-2 border-b border-white/5 bg-[#0F121D] text-[10px] text-gray-400 flex items-center gap-1.5">
                      <Facebook className="w-3.5 h-3.5 text-blue-500" />
                      <span>Capa de Página Comercial Facebook</span>
                    </div>

                    <div 
                      className={`h-40 w-full relative flex flex-col justify-between p-5 overflow-hidden transition-all duration-500 ${
                        mockupBg === 'dark_ambient' ? 'bg-[#0B0E14] text-white' :
                        mockupBg === 'neon_glow' ? 'bg-gradient-to-r from-[#0070F3]/15 to-[#8B5CF6]/15 border-white/5' :
                        mockupBg === 'minimal_white' ? 'bg-white text-gray-900' :
                        'checkered-bg'
                      }`}
                    >
                      {/* Tech grid elements if grid is active */}
                      {mockupBg === 'tech_grid' && (
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      )}

                      {/* Header Logo */}
                      <div className="flex justify-between items-start z-10">
                        <div className="h-6 w-20">
                          <img 
                            src={mockupLogo.path} 
                            alt="Facebook Logo" 
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[7px] font-mono tracking-widest text-[#0070F3] bg-[#0070F3]/10 px-1.5 py-0.5 rounded uppercase border border-[#0070F3]/20">Corporativo</span>
                      </div>

                      {/* Cover Main Headline */}
                      <div className="space-y-1 z-10">
                        <h4 className="text-[12px] sm:text-[13px] font-display font-black tracking-tight leading-tight uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {mockupText || 'LIDERANDO A REVOLUÇÃO COGNITIVA NA INDÚSTRIA COM IA.'}
                        </h4>
                        <div className="w-8 h-[2px] bg-gradient-to-r from-[#0070F3] to-[#8B5CF6]" />
                      </div>
                    </div>

                    {/* Facebook Meta Details Container */}
                    <div className="p-3.5 bg-[#0F121D] flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-black/60 border-2 border-[#0A0D14] -mt-7 flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                          <img src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} alt="Nexa Profile" className="w-[80%] h-[80%] object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">Nexa Industrial</p>
                          <p className="text-[9px] text-gray-400 truncate">52.4K curtidas • 89.2K seguidores</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition-all cursor-pointer">
                          Curtir
                        </button>
                        <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded text-[10px] font-bold transition-all cursor-pointer">
                          Mensagem
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* YouTube Banner Template */}
                {mockupTemplate === 'youtube' && (
                  <div className="bg-[#0c0e14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="px-3.5 py-2 border-b border-white/5 bg-[#0F121D] text-[10px] text-gray-400 flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                      <span>Capa de Canal YouTube (Widescreen TV/Desktop)</span>
                    </div>

                    <div 
                      className={`h-32 w-full relative flex flex-col justify-center items-center text-center p-6 overflow-hidden transition-all duration-500 ${
                        mockupBg === 'dark_ambient' ? 'bg-[#0B0E14] text-white' :
                        mockupBg === 'neon_glow' ? 'bg-gradient-to-tr from-[#0070F3]/10 to-[#8B5CF6]/15 border-white/5' :
                        mockupBg === 'minimal_white' ? 'bg-white text-gray-900' :
                        'checkered-bg'
                      }`}
                    >
                      {/* Tech grid elements if grid is active */}
                      {mockupBg === 'tech_grid' && (
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                      )}

                      {/* Brand Logo in Center */}
                      <div className="space-y-2 z-10 flex flex-col items-center">
                        <div className="h-7 w-24 flex items-center justify-center">
                          <img 
                            src={mockupLogo.path} 
                            alt="YouTube Banner Logo" 
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <h4 className="text-[10px] sm:text-[11px] font-display font-bold tracking-tight uppercase max-w-[280px] text-white drop-shadow-md">
                          {mockupText || 'TECNOLOGIA, DESIGN E IA INDUSTRIAL • NOVOS VÍDEOS TODA SEMANA'}
                        </h4>
                      </div>

                      {/* Simulated overlay social badge */}
                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono text-blue-400 border border-white/5">
                        nexa.io/subscribe
                      </div>
                    </div>

                    {/* YouTube Channel Meta Info */}
                    <div className="p-3.5 bg-[#0F121D] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-red-600/20 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          <img src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} alt="Nexa Youtube Avatar" className="w-[70%] h-[70%] object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Nexa Tech Corp</p>
                          <p className="text-[9px] text-gray-400">650K inscritos • 1.2K vídeos</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold transition-all cursor-pointer">
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                )}

                {/* TikTok Video Overlay Template */}
                {mockupTemplate === 'tiktok' && (
                  <div className="bg-[#0b0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="px-3.5 py-2 border-b border-white/5 bg-[#0F121D] text-[10px] text-gray-400 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Simulador de Tela Cheia / Feed TikTok</span>
                    </div>

                    <div 
                      className={`h-[350px] w-full relative flex flex-col justify-between p-4 overflow-hidden transition-all duration-500 bg-cover bg-center ${
                        mockupBg === 'dark_ambient' ? 'bg-[#05070a]' :
                        mockupBg === 'neon_glow' ? 'bg-gradient-to-b from-[#180a2b] via-[#05070a] to-[#041d24]' :
                        mockupBg === 'minimal_white' ? 'bg-[#F3F4F6] text-gray-900' :
                        'checkered-bg'
                      }`}
                    >
                      {/* Tech grid elements if grid is active */}
                      {mockupBg === 'tech_grid' && (
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                      )}

                      {/* Header Tab Bar */}
                      <div className="flex justify-between items-center z-10 w-full text-white/60 text-[9px] font-semibold">
                        <span className="text-white/40 font-mono">LIVE</span>
                        <div className="flex gap-3">
                          <span className="cursor-pointer">Seguindo</span>
                          <span className="text-white font-bold border-b-2 border-white pb-0.5">Para Você</span>
                        </div>
                        <Search className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Watermark Logo top-left */}
                      <div className="absolute top-12 left-4 h-6 w-16 bg-black/45 rounded px-1.5 py-0.5 border border-white/10 flex items-center justify-center opacity-65 z-10">
                        <img 
                          src={mockupLogo.path} 
                          alt="TikTok Watermark" 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Middle layout: Interactive Action Sidebar on the right */}
                      <div className="flex justify-between items-end w-full mt-auto z-10">
                        
                        {/* Caption details bottom-left */}
                        <div className="max-w-[70%] space-y-1.5 text-left text-white text-xs pb-1">
                          <p className="font-bold">@nexa_industrial</p>
                          <p className="text-[11px] leading-snug font-medium text-gray-200">
                            {mockupText || '#NEXA: INTELIGÊNCIA ARTIFICIAL NO CHÃO DE FÁBRICA ⚙️🤖'}
                          </p>
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded-full w-max border border-cyan-400/20">
                            <Music className="w-2.5 h-2.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                            <span>Som original - Nexa Industrial</span>
                          </div>
                        </div>

                        {/* TikTok icons column bottom-right */}
                        <div className="flex flex-col items-center gap-3 pb-1 text-white shrink-0">
                          
                          {/* Profile Avatar Frame */}
                          <div className="relative w-8 h-8 mb-1.5">
                            <div className="w-full h-full rounded-full border border-white bg-black p-0.5">
                              <img src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} alt="Nexa Avatar" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold text-white border border-[#05070a]">
                              +
                            </div>
                          </div>

                          {/* Heart */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
                              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            </div>
                            <span className="text-[8px] font-semibold mt-0.5 text-gray-300">142.5K</span>
                          </div>

                          {/* Comments */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
                              <MessageCircle className="w-4 h-4 fill-white text-black" />
                            </div>
                            <span className="text-[8px] font-semibold mt-0.5 text-gray-300">1.2K</span>
                          </div>

                          {/* Bookmark */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
                              <Bookmark className="w-4 h-4 fill-amber-400 text-amber-400" />
                            </div>
                            <span className="text-[8px] font-semibold mt-0.5 text-gray-300">8.9K</span>
                          </div>

                          {/* Spinning disk icon */}
                          <div className="w-7 h-7 rounded-full bg-black/80 border border-white/20 p-1 flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] flex items-center justify-center text-[5px]">
                              💿
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* COLOR PALETTE SECTION */}
        <section id="colors_section" className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
              <span>04. VITALIDADE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Paleta de Cores Oficiais</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              Nossa identidade visual é composta por duas paletas oficiais: o vibrante degradê primário original (Rosa, Roxo e Ciano) e o elegante degradê secundário tecnológico (Azul e Roxo Violeta) sobre o vácuo espacial profundo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {BRAND_COLORS.map((color) => {
              // Accessibility/usage badge
              const getBadgeText = (name: string) => {
                if (name.includes('Rosa')) return 'Primário / Destaque';
                if (name.includes('Roxo Nexa')) return 'Primário / Transição';
                if (name.includes('Ciano')) return 'Primário / Hover';
                if (name.includes('Azul')) return 'Secundário / Início';
                if (name.includes('Violeta')) return 'Secundário / Fim';
                if (name.includes('Escuro')) return 'Fundo Escuro';
                return 'Fundo Claro';
              };
              
              return (
                <div 
                  id={`color_card_${color.name.toLowerCase().replace(/\s/g, '_')}`}
                  key={color.name} 
                  className="rounded-2xl bg-[#0F121D]/90 border border-white/5 p-5 space-y-4 hover:border-white/10 transition-all duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Swatch */}
                    <div className={`h-24 w-full rounded-xl ${color.bg} ${color.border ? `border ${color.border}` : ''} ${color.glow} transition-transform duration-300 hover:scale-[1.02]`} />
                    
                    {/* Info */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-sm font-bold text-white leading-none">{color.name}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-mono font-medium text-gray-400 border border-white/5 whitespace-nowrap">
                          {getBadgeText(color.name)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 leading-normal h-12 overflow-hidden">{color.usage}</p>
                    </div>
                  </div>

                  {/* Values copy area */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 bg-black/45 rounded-xl border border-white/5 group">
                      <span className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">HEX:</span>
                      <span className="text-white font-semibold text-xs">{color.hex}</span>
                      <button
                        onClick={() => copyToClipboard(color.hex, (val) => setCopiedColor(val ? color.hex : null))}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Copiar HEX"
                      >
                        {copiedColor === color.hex ? <Check className="w-3.5 h-3.5 text-green-400 animate-scale-up" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-black/45 rounded-xl border border-white/5 group">
                      <span className="text-gray-500 text-[9px] font-mono uppercase tracking-wider">RGB:</span>
                      <span className="text-gray-300 font-semibold text-[10px]">{color.rgb}</span>
                      <button
                        onClick={() => copyToClipboard(color.rgb, (val) => setCopiedColor(val ? color.rgb : null))}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Copiar RGB"
                      >
                        {copiedColor === color.rgb ? <Check className="w-3.5 h-3.5 text-green-400 animate-scale-up" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gradient Card Copier & Brand Guidelines */}
          <div className="space-y-6">
            
            {/* General Gradients Info - Both Primary & Secondary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Primary Gradient Card */}
              <div className="rounded-2xl border border-white/5 bg-[#0F121D]/90 p-6 flex flex-col justify-between gap-6 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl shadow-lg shadow-pink-500/10 shrink-0 border border-white/10" 
                    style={{ background: 'linear-gradient(45deg, #FF00FF, #8A2BE2, #00FFFF)' }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">Degradê Primário (Original Neon)</h4>
                      <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-[8px] font-mono font-bold text-pink-400 border border-pink-500/20 uppercase tracking-wider">PRINCIPAL</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Transição clássica fluida de Rosa Neon (#FF00FF) para Roxo Nexa (#8A2BE2) e Ciano Elétrico (#00FFFF). Representa a inovação e o futurismo vibrante da marca Nexa.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="bg-black/50 px-3 py-2.5 rounded-xl border border-white/5 text-[10px] font-mono text-gray-300 overflow-x-auto whitespace-nowrap flex-1">
                    linear-gradient(45deg, #FF00FF, #8A2BE2, #00FFFF)
                  </div>
                  <button
                    onClick={() => copyToClipboard('linear-gradient(45deg, #FF00FF, #8A2BE2, #00FFFF)', setCopiedPrimaryGradient)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-all shrink-0 cursor-pointer active:scale-95"
                  >
                    {copiedPrimaryGradient ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPrimaryGradient ? 'Copiado!' : 'Copiar CSS'}</span>
                  </button>
                </div>
              </div>

              {/* Secondary Gradient Card */}
              <div className="rounded-2xl border border-white/5 bg-[#0F121D]/90 p-6 flex flex-col justify-between gap-6 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl shadow-lg shadow-blue-500/20 shrink-0 border border-white/10" 
                    style={{ background: 'linear-gradient(45deg, #0070F3, #8B5CF6)' }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">Degradê Secundário (Tech Corporate)</h4>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-[8px] font-mono font-bold text-blue-400 border border-blue-500/20 uppercase tracking-wider">SUPORTE</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Transição corporativa moderna de Azul Elétrico (#0070F3) para Roxo Violeta (#8B5CF6). Ideal para interfaces sóbrias, botões institucionais e legibilidade equilibrada.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="bg-black/50 px-3 py-2.5 rounded-xl border border-white/5 text-[10px] font-mono text-gray-300 overflow-x-auto whitespace-nowrap flex-1">
                    linear-gradient(45deg, #0070F3, #8B5CF6)
                  </div>
                  <button
                    onClick={() => copyToClipboard('linear-gradient(45deg, #0070F3, #8B5CF6)', setCopiedGradient)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-all shrink-0 cursor-pointer active:scale-95"
                  >
                    {copiedGradient ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedGradient ? 'Copiado!' : 'Copiar CSS'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Title & Button Specific Usage Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Gradient in Titles */}
              <div className="rounded-2xl border border-white/5 bg-[#0F121D]/90 p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">1. Aplicação em Títulos</h4>
                  <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-semibold text-blue-400 font-mono">DISPLAY ONLY</span>
                </div>

                <div className="p-6 bg-black/45 rounded-xl border border-white/5 flex items-center justify-center min-h-[100px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(0,112,243,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                  <h1 className="text-2xl font-display font-black tracking-tight text-center uppercase bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-md select-none group-hover:scale-105 transition-all duration-300">
                    NEXA INTELLIGENCE
                  </h1>
                </div>

                <div className="space-y-3.5">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Para títulos grandes e marcantes, use o degradê oficial com máscara de texto para dar um toque de alta tecnologia e confiança. Evite em textos corridos.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-xl border border-white/5">
                      <div className="truncate pr-4 text-left">
                        <p className="text-[9px] font-mono text-gray-500">CLASSES TAILWIND CSS</p>
                        <p className="text-xs font-mono bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent font-semibold truncate">bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent', setCopiedTitleTw)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                      >
                        {copiedTitleTw ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-xl border border-white/5">
                      <div className="truncate pr-4 text-left">
                        <p className="text-[9px] font-mono text-gray-500">CÓDIGO CSS NATIVO</p>
                        <p className="text-xs font-mono bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent font-semibold truncate">background: linear-gradient(45deg, #0070F3, #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('background: linear-gradient(45deg, #0070F3, #8B5CF6);\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;', setCopiedTitleCss)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                      >
                        {copiedTitleCss ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Gradient in Buttons */}
              <div className="rounded-2xl border border-white/5 bg-[#0F121D]/90 p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">2. Aplicação em Botões</h4>
                  <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] font-semibold text-cyan-400 font-mono">TWO VARIANTS</span>
                </div>

                {/* Previews and Demos */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-black/45 rounded-xl border border-white/5 min-h-[100px] items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <button className="w-full py-2.5 bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] hover:opacity-95 text-white shadow-[0_0_15px_rgba(0,112,243,0.3)] font-bold text-[11px] rounded-lg tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer">
                      Sólido
                    </button>
                    <span className="text-[9px] font-mono text-gray-500">Botão Sólido</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <button className="w-full p-[1px] bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] rounded-lg transition-all duration-300 active:scale-95 cursor-pointer">
                      <div className="w-full py-2.5 bg-[#0B0E14] hover:bg-[#121625]/90 rounded-[7px] text-white font-bold text-[11px] tracking-wider uppercase transition-colors">
                        Outline
                      </div>
                    </button>
                    <span className="text-[9px] font-mono text-gray-500">Botão Borda</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Use o preenchimento sólido para chamadas de ação críticas (CTA Primário) ou o design com borda degradê vazada para ações secundárias refinadas.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-xl border border-white/5">
                      <div className="truncate pr-4 text-left">
                        <p className="text-[9px] font-mono text-gray-500">CTA SÓLIDO (CLASSES)</p>
                        <p className="text-xs font-mono bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent font-semibold truncate">bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(0,112,243,0.3)]</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] hover:opacity-95 text-white shadow-[0_0_15px_rgba(0,112,243,0.3)] font-bold py-3 px-6 rounded-xl transition-all duration-300 active:scale-95', setCopiedBtnSolid)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                      >
                        {copiedBtnSolid ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-xl border border-white/5">
                      <div className="truncate pr-4 text-left">
                        <p className="text-[9px] font-mono text-gray-500">CTA BORDA (MARCADO)</p>
                        <p className="text-xs font-mono bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] bg-clip-text text-transparent font-semibold truncate">p-[1px] bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] com div interna bg-[#0B0E14]</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('<button className="p-[1px] bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] rounded-xl transition-all duration-300 active:scale-95">\n  <div className="px-6 py-3 bg-[#0B0E14] hover:bg-[#121625] rounded-[11px] text-white font-bold transition-colors">\n    CTA Secundário\n  </div>\n</button>', setCopiedBtnOutline)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                      >
                        {copiedBtnOutline ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* TYPOGRAPHY SECTION */}
        <section id="typography_section" className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_6px_#00FFFF]" />
              <span>04. COMUNICAÇÃO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Tipografia Oficial</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              Nossa voz escrita é expressada com força, modernidade e legibilidade técnica usando duas famílias tipográficas integradas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Display Typography */}
            <div id="typo_card_display" className="rounded-2xl bg-[#0F121D]/90 border border-white/5 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-display">Satoshi</h4>
                  <p className="text-xs text-gray-400">Fonte Oficial de Exibição & Títulos</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#00FFFF]/10 text-[9px] font-mono text-[#00FFFF] border border-[#00FFFF]/20 font-bold tracking-wider">TÍTULOS E ACCENTS</span>
              </div>

              <div className="p-5 bg-black/45 rounded-xl border border-white/5 font-display space-y-4">
                <p className="text-4xl font-black tracking-tight text-white uppercase">A B C D E F G H I</p>
                <p className="text-3xl font-bold tracking-tight text-gray-300">Nexa Inteligência IA</p>
                <p className="text-lg text-medium text-gray-400">Futuro em constante evolução integrada.</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <p className="text-white font-semibold">Regras de uso em títulos:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Utilizada em cabeçalhos de seções, banners, grandes painéis e logotipos.</li>
                  <li>Prefira usar sempre com pesos em negrito (<span className="text-white font-semibold">Bold / Black</span>).</li>
                  <li>Ideal para aplicação do degradê neon em títulos curtos.</li>
                </ul>
              </div>
            </div>

            {/* Sans Typography */}
            <div id="typo_card_sans" className="rounded-2xl bg-[#0F121D]/90 border border-white/5 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">Inter</h4>
                  <p className="text-xs text-gray-400">Fonte Oficial para Conteúdo Geral</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[9px] font-mono text-[#8B5CF6] border border-[#8B5CF6]/20 font-bold tracking-wider">TEXTO CORRIDO</span>
              </div>

              <div className="p-5 bg-black/45 rounded-xl border border-white/5 font-sans space-y-4">
                <p className="text-3xl font-bold text-white">Interface Nexa Portal</p>
                <p className="text-base font-medium text-gray-300">O equilíbrio perfeito entre legibilidade e geometria.</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Para textos corridos, e-mails, relatórios, posts de blogs e descritivos em geral, usamos a fonte Inter. Ela garante excelente legibilidade tanto em tamanhos grandes quanto muito pequenos nas telas de celulares e computadores.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <p className="text-white font-semibold">Regras de uso em textos:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Utilizar para blocos longos de parágrafos, tabelas e botões padrão.</li>
                  <li>Pesos recomendados: <span className="text-white font-semibold">Regular (400)</span> e <span className="text-white font-semibold">Medium (500)</span>.</li>
                  <li>Combine com uma altura de linha confortável (ex: <span className="text-white">leading-relaxed</span>).</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* RULES / DO'S AND DON'TS */}
        <section id="rules_section" className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[#8B5CF6] font-mono text-xs uppercase tracking-widest font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
              <span>06. INTEGRIDADE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Boas Práticas & Restrições (Do's & Don'ts)</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              Nossa imagem é construída em cada detalhe. Veja as boas práticas e o que é expressamente proibido com o logotipo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* DO'S CONTAINER */}
            <div id="dos_container" className="rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-6 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-display">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Boas Práticas Recomendadas (Do's)</span>
              </div>
              
              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="text-emerald-400 shrink-0 font-bold font-mono">✓ 01.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Sempre Garanta Alto Contraste</strong>
                    Use logotipos com texto branco (light) sobre fundos escuros e logotipos escuros (dark) sobre fundos predominantemente claros.
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="text-emerald-400 shrink-0 font-bold font-mono">✓ 02.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Mantenha a Margem de Respiro Mínima</strong>
                    Dê ao menos 24px de espaço vazio ao redor do logo para que ele mantenha impacto visual e se destaque adequadamente na peça.
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="text-emerald-400 shrink-0 font-bold font-mono">✓ 03.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Use Monocromáticos Apenas em Físicos</strong>
                    Utilize os arquivos da pasta <code className="text-emerald-300 font-mono text-xs bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-500/10">/cnc</code> para carimbos, relevos de papel, corte de metais ou gravação física sem suporte a cores.
                  </div>
                </div>
              </div>
            </div>

            {/* DONT'S CONTAINER */}
            <div id="donts_container" className="rounded-3xl border border-rose-500/10 bg-rose-500/5 p-6 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-rose-400 font-bold font-display">
                <XCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>O que Nunca Deve Ser Feito (Don'ts)</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex gap-3 p-4 bg-rose-950/20 rounded-xl border border-rose-500/10 hover:border-rose-500/20 transition-all duration-300">
                  <div className="text-rose-400 shrink-0 font-bold font-mono">✗ 01.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Nunca Distorça ou Estique o Logo</strong>
                    Não achate o logotipo ou altere a proporção. Ele deve ser sempre dimensionado mantendo a proporção de aspecto intacta.
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-rose-950/20 rounded-xl border border-rose-500/10 hover:border-rose-500/20 transition-all duration-300">
                  <div className="text-rose-400 shrink-0 font-bold font-mono">✗ 02.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Não Inverta ou Modifique as Cores do Degradê</strong>
                    Não substitua as cores do degradê neon por outras. A ordem correta é Rosa Neon para Roxo para Ciano.
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-rose-950/20 rounded-xl border border-rose-500/10 hover:border-rose-500/20 transition-all duration-300">
                  <div className="text-rose-400 shrink-0 font-bold font-mono">✗ 03.</div>
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Evite Efeitos de Sombra Pesada 3D</strong>
                    Nossa identidade é minimalista e moderna. Evite aplicar sombras pesadas tridimensionais, contornos brilhantes adicionais ou bizarras texturas no logo.
                  </div>
                </div>
              </div>
            </div>

          </div>


        </section>

        {/* AI INTEGRATOR PORTAL */}
        <section id="ai_section" className="relative rounded-3xl bg-[#0F121D]/90 border border-white/5 p-6 sm:p-8 space-y-8 overflow-hidden shadow-2xl backdrop-blur-sm">
          
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#00FFFF]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-semibold text-[#00FFFF]">
                <Bot className="w-3.5 h-3.5 shrink-0" />
                <span>EXCLUSIVO PARA INTEGRAÇÃO COM IA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Treine e instrua sua IA sobre nossa Identidade Visual
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
                As Inteligências Artificiais criadoras de conteúdo e desenvolvedoras geram resultados infinitamente melhores se souberem de antemão as regras exatas e os caminhos reais dos logotipos. Use o manual estruturado abaixo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                id="copy_md_btn"
                onClick={() => copyToClipboard(aiMarkdownText, setCopiedMd)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 transition-all border border-white/10 cursor-pointer active:scale-95"
              >
                {copiedMd ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMd ? 'Copiado!' : 'Copiar Manual (Markdown)'}</span>
              </button>

              <button
                id="copy_prompt_wrapped_btn"
                onClick={() => copyToClipboard(aiPromptWrapper, setCopiedPrompt)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0070F3] to-[#8B5CF6] text-white text-xs font-bold transition-all shadow-lg hover:opacity-95 cursor-pointer active:scale-95 hover:shadow-[0_0_15px_rgba(0,112,243,0.2)]"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-green-400" /> : <Sparkles className="w-4 h-4" />}
                <span>{copiedPrompt ? 'Prompt Copiado!' : 'Copiar Prompt de Instrução'}</span>
              </button>
            </div>
          </div>

          {/* Code panel resembling mockup IDE window */}
          <div className="rounded-2xl border border-white/5 bg-[#07090E] overflow-hidden shadow-2xl">
            {/* Mock IDE Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c0e14] border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/5">
                <FileText className="w-3.5 h-3.5 text-[#00FFFF]" />
                <span>identidade_visual_nexa.md</span>
              </div>
              <div className="w-12" /> {/* spacer balance */}
            </div>
            
            <div className="p-6 font-mono text-xs max-h-[450px] overflow-y-auto">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed select-all">
                {aiMarkdownText}
              </pre>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-400 leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold">Como usar isso?</p>
              <p className="mt-1">
                Sempre que for solicitar a criação de uma nova campanha, post de redes sociais, página de vendas ou design de código para a Nexa no ChatGPT, Claude ou Gemini, comece colando este prompt instrucional. A IA saberá usar as cores corretas e referenciará as imagens reais sem errar nenhum diretório.
              </p>
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer id="footer_section" className="border-t border-white/5 bg-[#0B0E14]/90 backdrop-blur-md py-12 mt-16 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src={`${import.meta.env.BASE_URL}assets/core/nexa_isomark_light_transp.svg`} 
                alt="NEXA" 
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wide">NEXA INDUSTRIAL</span>
          </div>
          <p>© 2026 Nexa. Todos os direitos reservados. Guia oficial de marca para uso interno e parceiros autorizados.</p>
          <div className="flex justify-center gap-4 text-gray-400">
            <a href="/identidade_visual_nexa.md" download className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold">
              <span>Guia MD</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a href="#brand_kit_app" className="hover:text-white transition-colors cursor-pointer font-semibold">Voltar ao topo</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

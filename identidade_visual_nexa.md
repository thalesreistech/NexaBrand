# Guia de Identidade Visual e Instruções para IA: NEXA

Este documento foi criado para treinar e orientar modelos de Inteligência Artificial (e profissionais de marketing) na criação de materiais, códigos e peças publicitárias seguindo à risca a identidade visual da **Nexa**.

---

## 1. Visão Geral e Essência da Marca
A **Nexa** possui uma identidade visual moderna, futurista, tecnológica e vibrante. Sua essência baseia-se no contraste marcante entre fundos escuros e limpos (minimalistas) e um logotipo com um degradê de cores neon fluidas e dinâmicas.

Sempre que a IA gerar conteúdo para a Nexa, deve manter o tom de voz **profissional, moderno, inovador, acessível e direto**. O design deve ser limpo, com bastante espaço em branco (respiro) e focar em tipografia geométrica elegante.

---

## 2. Paletas de Cores Oficiais
O uso correto das cores é o pilar mais importante da identidade visual da Nexa. Dispomos de duas paletas e degradês oficiais que devem ser aplicados rigorosamente nos respectivos contextos:

### A. Paleta e Degradê Primário (Original Neon)
Esta é a identidade principal clássica da Nexa, representando a energia, inovação e futurismo vibrante da marca.

- **Rosa Neon (Rosa Vibrante):** `#FF00FF` (Para destaques principais, botões importantes e acentos)
- **Roxo Nexa (Transição):** `#8A2BE2` (Cor de conexão e profundidade)
- **Ciano Elétrico:** `#00FFFF` (Para acentos secundários, hovers e links)

#### Degradê Primário Oficial (Nexa Prime Gradient)
O degradê primário deve seguir a transição linear de **135 graus** (ou horizontal):
`linear-gradient(45deg, #FF00FF 0%, #8A2BE2 50%, #00FFFF 100%)`

---

### B. Paleta e Degradê Secundário (Tech Corporate)
Esta é a paleta secundária corporativa de alta tecnologia, ideal para aplicações limpas, institucionais e interfaces que exigem maior sobriedade sem perder o contraste moderno.

- **Azul Elétrico Nexa:** `#0070F3` (Destaque principal moderno, botões secundários)
- **Roxo Violeta Nexa:** `#8B5CF6` (Acento e sofisticação tecnológica)

#### Degradê Secundário Oficial (Nexa Tech Gradient)
O degradê secundário oficial segue a transição linear de **135 graus**:
`linear-gradient(45deg, #0070F3 0%, #8B5CF6 100%)`

---

### C. Cores de Suporte e Fundo (Neutras)
- **Fundo Oficial Escuro (Dark Mode):** `#0B0E14` (O "Espaço Escuro" profundo para fundos)
- **Fundo Oficial Claro (Light Mode):** `#FFFFFF` (O "Branco Estelar" limpo para fundos e alto contraste)

### Regras Gerais de Aplicação:
1. Destaque em títulos importantes (efeito de gradiente no texto) usando preferencialmente o degradê primário.
2. Botões principais (Call to Action) com efeitos sutis de hover.
3. Elementos gráficos decorativos muito discretos.
4. **Nunca** use o degradê de fundo de uma página inteira de texto, pois isso prejudica drasticamente a legibilidade.

---

## 3. Mapeamento de Logotipos por Contexto (Asset Map)
Sempre que a IA ou um desenvolvedor for inserir imagens do logotipo em códigos (HTML, CSS, React, etc.), deve utilizar o caminho de pasta correto correspondente ao cenário desejado:

### A. Uso Geral Digital / Telas (Pasta `/core`)
Esta pasta contém os arquivos ideais para exibição em sites, aplicativos, apresentações de slides e telas em geral.

*   **Fundo Escuro (Dark Mode):**
    *   Logo Horizontal Completo: `/core/nexa_logo_horizontal_light_transp.svg` (Texto branco, fundo transparente).
    *   Logo Vertical: `/core/nexa_logo_vertical_light_transp.svg` (Texto branco, empilhado, transparente).
    *   Apenas Símbolo (N): `/core/nexa_isomark_light_transp.svg` (Transparente).
    *   Apenas Texto: `/core/nexa_wordmark_light_transp.svg` (Texto branco).
*   **Fundo Claro (Light Mode):**
    *   Logo Horizontal Completo: `/core/nexa_logo_horizontal_dark_transp.svg` (Texto escuro, fundo transparente).
    *   Logo Vertical: `/core/nexa_logo_vertical_dark_transp.svg` (Texto escuro, empilhado, transparente).
    *   Apenas Símbolo (N): `/core/nexa_isomark_dark_transp.svg` (Transparente).
    *   Apenas Texto: `/core/nexa_wordmark_dark_transp.svg` (Texto escuro).

### B. Uso Web, SEO e Ícones (Pasta `/web`)
Arquivos otimizados para navegadores e carregamento rápido de imagem de cabeçalho ou pré-visualização.

*   **Favicon (Ícone do Navegador):** `/web/favicon.svg` (Vetor leve)
*   **Ícone para Apple (Touch Icon):** `/web/apple_touch_icon.svg` (Vetor de alta qualidade)
*   **Imagem de Compartilhamento (Redes Sociais / WhatsApp / SEO):** `/web/og_image_thumbnail.svg` (Vetor otimizado)

### C. Aplicações Físicas, Corte e Silhuetas (Pasta `/cnc`)
Versões totalmente planas, sem degradê ou detalhes de sombreamento. Ideal para corte a laser, bordados, impressão monocromática ou carimbos.

*   **Silhueta Preta (Para fundos claros):** `/cnc/nexa_logo_horizontal_flat_black.svg`
*   **Silhueta Branca (Para fundos escuros):** `/cnc/nexa_logo_horizontal_flat_white.svg`
*   **Símbolo Plano Preto:** `/cnc/nexa_isomark_flat_black.svg`
*   **Símbolo Plano Branco:** `/cnc/nexa_isomark_flat_white.svg`

### D. Materiais Gráficos / Impressos (Pasta `/print`)
Arquivos configurados no espaço de cores correto para gráficas convencionais (representação vetorial CMYK). Use para panfletos, cartões de visita, banners e camisas.

*   **Logo Horizontal:** `/print/nexa_logo_horizontal_cmyk.svg`
*   **Símbolo CMYK:** `/print/nexa_isomark_cmyk.svg`

---

## 4. Tipografia Oficial
- **Títulos de Exibição (Display):** **Inter** ou **Space Grotesk** (Sempre em caixa alta ou peso extra-negrito, com tracking levemente espaçado).
- **Textos de Apoio / Subtítulos:** **Inter** (Peso médio ou regular).
- **Metadados, Códigos e Status:** **JetBrains Mono** ou **Fira Code**.

---

## 5. Regras Proibitivas (Do's & Don'ts)
- **Não** rotacione, estique ou modifique as proporções das letras ou do símbolo.
- **Não** remova ou inverta as cores do degradê neon do símbolo original.
- **Não** coloque o logotipo com texto escuro sobre fundos escuros, ou texto claro sobre fundos claros. Mantenha sempre um contraste visível e acessível para todos os usuários.
- **Não** aplique sombras tridimensionais pesadas ou filtros que descaracterizem o design minimalista.

---
name: Heritage Crimson
colors:
  surface: '#fff8f7'
  surface-dim: '#e7d6d7'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f1'
  surface-container: '#fbeaeb'
  surface-container-high: '#f5e4e5'
  surface-container-highest: '#f0dee0'
  on-surface: '#22191a'
  on-surface-variant: '#544245'
  inverse-surface: '#382e2f'
  inverse-on-surface: '#feedee'
  outline: '#877274'
  outline-variant: '#dac0c3'
  surface-tint: '#9b4054'
  primary: '#350010'
  on-primary: '#ffffff'
  primary-container: '#570a22'
  on-primary-container: '#da7286'
  inverse-primary: '#ffb2be'
  secondary: '#8f485e'
  on-secondary: '#ffffff'
  secondary-container: '#fea5be'
  on-secondary-container: '#7a374d'
  tertiary: '#001a14'
  on-tertiary: '#ffffff'
  tertiary-container: '#003127'
  on-tertiary-container: '#6f9a8d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2be'
  on-primary-fixed: '#400014'
  on-primary-fixed-variant: '#7d293d'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c6'
  on-secondary-fixed: '#3c041c'
  on-secondary-fixed-variant: '#733147'
  tertiary-fixed: '#beecdd'
  tertiary-fixed-dim: '#a3d0c1'
  on-tertiary-fixed: '#002019'
  on-tertiary-fixed-variant: '#234e43'
  background: '#fff8f7'
  on-background: '#22191a'
  surface-variant: '#f0dee0'
  background-subtle: '#FCF8F9'
  text-primary: '#1B0E12'
  input-surface: '#F3E7EB'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.5'
    letterSpacing: 0.015em
  caption:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  section-gap: 2rem
  container-padding: 1rem
  element-gap: 1rem
---

## Brand & Style

Heritage Crimson is a design system crafted for institutional trust, specifically catering to religious, non-profit, or traditional community management platforms. It strikes a balance between **Corporate Modern** and **Traditional Academic** aesthetics.

The personality is authoritative yet welcoming, utilizing deep jewel tones to evoke a sense of history and stability, while maintaining a clean, high-white-space layout to ensure modern usability. The visual language is defined by intentional minimalism, focusing on high-quality typography and a singular, strong accent color to guide user actions.

## Colors

The palette is rooted in a deep "Black Cherry" primary color (#570A22) which conveys warmth and gravity. 

- **Primary:** Used for key actions (buttons) and brand identifiers. 
- **Secondary:** A muted rose-tinted mauve (#974E65) used for secondary text and decorative icons to soften the interface.
- **Background:** A very light "warm white" (#FCF8F9) provides a softer alternative to pure white, reducing eye strain and feeling more organic.
- **Surface:** Components use a slightly more saturated variant of the background (#F3E7EB) to indicate interactivity or depth without relying on shadows.

## Typography

The system utilizes a dual-sans pairing. **Inter** is reserved for high-impact headlines and functional labels where clarity and a modern feel are paramount. **Noto Sans** is used for body copy and long-form text, providing a neutral, highly readable experience that handles varied character sets gracefully.

Key headlines use a tight tracking (-0.02em) to appear more editorial and grounded. Action labels (like buttons) use slightly wider tracking (+0.015em) to improve legibility on dark backgrounds.

## Layout & Spacing

The system follows a **Fixed Grid** approach for internal content, centered within the viewport. 

- **Mobile:** Uses a single-column layout with 16px (`1rem`) side margins.
- **Desktop:** Content is constrained to a maximum width of 480px for focused tasks (like Auth or Forms) to maintain readability and reduce scan-length.
- **Vertical Rhythm:** Spacing follows a 4px baseline, with standard gaps of 16px (`1rem`) between related elements and 32px (`2rem`) between distinct sections.

## Elevation & Depth

Heritage Crimson prioritizes **Tonal Layers** over heavy shadows. Depth is communicated through:

1.  **Color Shifts:** Interactive elements like input fields use a slightly darker fill (#F3E7EB) than the background to create "wells" of interaction.
2.  **Soft Shadows:** A single, very subtle "ambient" shadow (`shadow-sm`) is used on primary buttons to provide a tactile lift without breaking the clean, flat aesthetic.
3.  **Opacity:** Tertiary information (like footers or legal text) uses reduced opacity (80%) rather than a lighter color hex to ensure it blends naturally with the surface underneath.

## Shapes

The shape language is "Rounded-Soft." 

- **Standard Elements:** Buttons and Input fields use a 12px (`rounded-xl` in this configuration) corner radius to feel modern and accessible.
- **Containers:** Large image cards or layout containers use an 8px (`rounded-lg`) radius.
- **Consistency:** All interactive edges must be rounded; sharp 0px corners are forbidden to maintain the brand's "welcoming" persona.

## Components

### Buttons
Primary buttons use the Brand Primary color (#570A22) with white text. They should have a minimum height of 56px (h-14) to be touch-friendly. On hover, apply a simple 90% opacity; on active/click, use a subtle `scale-98` transform.

### Inputs
Input fields should use the `input-surface` color (#F3E7EB) as a background with no border, or a very thin subtle border. Labels should follow the `label-lg` typographic style.

### Imagery
Images within the system should utilize soft-focus or high-quality photography, often with a slight tonal overlay to ensure text legibility if text is placed on top.

### Legal/Footer
Small print and secondary links should be centered, 12px font size, and use underlines for links rather than color changes to keep the visual hierarchy focused on the primary call to action.
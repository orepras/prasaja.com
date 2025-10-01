declare module './writing-guidelines-client' {
  export default function WritingGuidelinesClient(): React.ReactNode;
}

declare module './components/style-guide' {
  const StyleGuide: React.ComponentType<any>;
  export default StyleGuide;
}

declare module './components/tone-quadrant' {
  const ToneQuadrant: React.ComponentType<any>;
  export default ToneQuadrant;
}

declare module './components/grammar-mechanics' {
  const GrammarMechanics: React.ComponentType<any>;
  export default GrammarMechanics;
}

declare module './components/terminology' {
  const Terminology: React.ComponentType<any>;
  export default Terminology;
}

declare module './components/voice-attributes' {
  const VoiceAttributes: React.ComponentType<any>;
  export default VoiceAttributes;
}

declare module './components/context-adaptation' {
  const ContextAdaptation: React.ComponentType<any>;
  export default ContextAdaptation;
}

declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
} 
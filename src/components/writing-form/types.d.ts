export type TaskFormData = {
  // Contact Details
  name: string;
  email: string;
  companyName: string;
  
  // Task Overview
  taskDescription: string;
  copyUsage: {
    mobileApp: boolean;
    website: boolean;
    email: boolean;
    pushNotification: boolean;
    inAppMessage: boolean;
    chatbot: boolean;
    other: boolean;
    otherDetails: string;
  };
  copyGoal: string;
  
  // Target Audience
  audience: string;
  isGlobalAudience: string;
  
  // Tone and Voice
  tone: {
    friendly: boolean;
    professional: boolean;
    reassuring: boolean;
    funPlayful: boolean;
    neutral: boolean;
    other: boolean;
    otherDetails: string;
  };
  hasToneGuidelines: string;
  toneGuidelinesLink: string;
  
  // Technical Constraints
  hasCharacterLimit: string;
  characterLimit: string;
  hasDesignFile: string;
  designFileLink: string;
  
  // Other Considerations
  hasLegalRequirements: string;
  legalRequirements: string;
  successCriteria: string;
  
  // Timeline
  deadline: string;
  deadlineDays: string;
  revisionRounds: string;
  
  // Files
  uploadedFiles: File[];
  fileLinks: Array<{ url: string; description: string; }>;
}; 
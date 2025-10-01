'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type TonePosition = {
  x: number; // 0-1 range, left to right
  y: number; // 0-1 range, bottom to top
};

interface ToneQuadrantProps {
  currentTone: TonePosition;
  onToneChange: (x: number, y: number) => void;
}

// More granular tone mapping - dividing each quadrant into 4 specific tones
type ToneDetails = {
  name: string;
  description: string;
  example: string;
};

export default function ToneQuadrant({ currentTone, onToneChange }: ToneQuadrantProps) {
  const [isDragging, setIsDragging] = useState(false);
  const quadrantRef = useRef<HTMLDivElement>(null);
  const [toneDescription, setToneDescription] = useState('');
  const [specificTone, setSpecificTone] = useState<ToneDetails>({
    name: '',
    description: '',
    example: ''
  });

  // Calculate the tone description based on the position
  const calculateToneDescription = (x: number, y: number): string => {
    // x: 0 (left) = Matter-of-fact, 1 (right) = Enthusiastic
    // y: 0 (bottom) = Formal, 1 (top) = Casual
    let tone = '';
    if (y < 0.5) {
      tone += 'Formal';
    } else {
      tone += 'Casual';
    }
    tone += ' & ';
    if (x < 0.5) {
      tone += 'Matter-of-fact';
    } else {
      tone += 'Enthusiastic';
    }
    return tone;
  };

  // Get specific tone details based on 16 areas
  const getSpecificTone = (x: number, y: number): ToneDetails => {
    // Divide each axis into 4 segments (0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1)
    const xSegment = Math.floor(x * 4);
    const ySegment = Math.floor(y * 4);
    const xIdx = Math.min(Math.max(xSegment, 0), 3);
    const yIdx = Math.min(Math.max(ySegment, 0), 3);
    // 16 specific tones (4x4 grid) - y=0 is bottom (formal), y=3 is top (casual)
    const tones: ToneDetails[][] = [
      // y=0: Bottom row (Formal)
      [
        { name: "Legal & Technical", description: "Highly formal and factual. Precise, unambiguous language that conveys critical information with technical accuracy.", example: "In accordance with Section 3.2 of the Terms of Service, transactions exceeding regulatory thresholds will require additional verification within 24 hours of initiation." },
        { name: "Regulatory", description: "Formal and methodical. Focuses on compliance, regulations, and procedural accuracy.", example: "All users must complete full KYC verification as required by current regulations. Unverified accounts will have limited transaction capabilities." },
        { name: "Instructional", description: "Professional and direct. Provides clear guidance and procedural instructions.", example: "To set up automated payments, navigate to Account Settings, select Payment Methods, and add your preferred bank account or card details." },
        { name: "Educational", description: "Professional with teaching elements. Explains concepts clearly while maintaining authority.", example: "Diversifying your investment portfolio spreads risk across different asset classes. This approach helps protect your capital during market fluctuations." }
      ],
      // y=1: Second row (Formal & Enthusiastic)
      [
        { name: "Diplomatic", description: "Formal with measured positivity. Balances professionalism with diplomatic encouragement and acknowledgment.", example: "We appreciate your patience during this verification process. For security purposes, we request additional documentation to finalize your investment account setup." },
        { name: "Ceremonial", description: "Formal and celebratory. Uses elevated language to mark significant achievements or milestones.", example: "We are pleased to announce our organization has been recognized with the Fintech Innovation Award for creating accessible financial solutions across emerging markets." },
        { name: "Appreciative", description: "Professional with warmth. Expresses genuine acknowledgment and recognition.", example: "Thank you for being a valued customer for 3 years. Your trust has helped us build better financial tools, and we're pleased to offer you priority access to our new premium services." },
        { name: "Supportive", description: "Professional with empathy. Acknowledges challenges while providing structured solutions.", example: "We understand that managing cash flow can be challenging. Our bill scheduling feature allows you to align payment dates with your income schedule for better financial planning." }
      ],
      // y=2: Third row (Casual & Matter-of-Fact)
      [
        { name: "Advisory", description: "Friendly and informative. Offers suggestions and guidance in an accessible way.", example: "You might want to review your recurring subscriptions. We noticed you have 3 similar services that could be consolidated to save $24 monthly." },
        { name: "Practical", description: "Conversational and straightforward. Focuses on useful information without unnecessary embellishment.", example: "Your free premium trial ends tomorrow. Update to a paid plan in your account settings to keep using advanced budgeting features." },
        { name: "Friendly", description: "Casual and personable. Creates connection through warm, approachable language.", example: "Thanks for your message about the transfer issue! We're looking into it right now and someone from our team will get back to you really soon." },
        { name: "Conversational", description: "Relaxed and natural. Uses everyday language that feels like talking to a helpful friend.", example: "Hey there! Just letting you know we'll be updating our app tonight. It might be offline for about 10 minutes around midnight while we add some cool new features." }
      ],
      // y=3: Top row (Casual & Enthusiastic)
      [
        { name: "Reassuring", description: "Warm and confident. Provides comfort and builds trust through clear communication.", example: "No problem at all! We've fixed the duplicate transaction on your account. Your balance is correct now, and all your savings goals are still on track." },
        { name: "Encouraging", description: "Upbeat and supportive. Motivates action while maintaining approachability.", example: "You're making great progress on your savings goal! Just $120 more to reach your vacation fund target. Keep it up! 👏" },
        { name: "Playful", description: "Fun and expressive. Uses humor and personality to create engagement.", example: "Oops! Looks like our expense categorization got confused by that purchase. 🕵️ Was that coffee shop visit really 'Healthcare'? Let's fix that with a quick tap! ✨" },
        { name: "Enthusiastic", description: "Energetic and positive. Conveys excitement and celebration.", example: "Amazing work! 🎉 You've hit your savings goal 3 months early! That's some serious financial discipline and we're super excited for your upcoming home purchase!" },
      ]
    ];
    // Return the specific tone for the current position (no Y inversion)
    return tones[yIdx][xIdx];
  };

  // Update description when tone changes
  useEffect(() => {
    setToneDescription(calculateToneDescription(currentTone.x, currentTone.y));
    setSpecificTone(getSpecificTone(currentTone.x, currentTone.y));
  }, [currentTone]);

  // Handle mouse/touch events for dragging
  useEffect(() => {
    if (!quadrantRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !quadrantRef.current) return;
      
      const rect = quadrantRef.current.getBoundingClientRect();
      
      // Calculate position within the quadrant (0-1 range)
      let x = (e.clientX - rect.left) / rect.width;
      let y = 1 - (e.clientY - rect.top) / rect.height; // Invert Y since 0,0 is top-left
      
      // Clamp values
      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));
      
      onToneChange(x, y);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onToneChange]);

  // Handle start of drag
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // Handle click directly on quadrant
  const handleQuadrantClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!quadrantRef.current) return;
    
    const rect = quadrantRef.current.getBoundingClientRect();
    
    // Calculate position
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height; // Invert Y
    
    onToneChange(x, y);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Tone Spectrum</h3>
      
      {/* The quadrant visualization */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Top label */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-4 py-1 rounded-full border text-sm font-medium z-10">
          Casual
        </div>
        
        {/* Quadrant container */}
        <Card className="rounded-xl overflow-hidden border-2">
          <CardContent className="p-0">
            <div
              ref={quadrantRef}
              className="relative w-full h-[600px] cursor-pointer"
              onClick={handleQuadrantClick}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-green-100 dark:from-blue-950 dark:via-slate-900 dark:to-green-950" />
              
              {/* Grid lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300 dark:bg-slate-700" />
              
              {/* Quadrant labels */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Casual & Matter-of-fact
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tips, general information, <br />neutral updates
                </p>
              </div>
              
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Casual & Enthusiastic
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Onboarding, celebrations, <br />positive feedback
                </p>
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Formal & Matter-of-fact
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Legal information, error <br />messages, warnings
                </p>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Formal & Enthusiastic
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Major announcements, <br />achievements, milestones
                </p>
              </div>
              
              {/* Position marker (draggable) */}
              <div
                className="absolute w-5 h-5 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2 cursor-grab z-20"
                style={{
                  left: `${currentTone.x * 100}%`,
                  top: `${(1 - currentTone.y) * 100}%`, // Invert Y for display
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Bottom label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 px-4 py-1 rounded-full border text-sm font-medium z-10">
          Formal
        </div>
        
        {/* Left label */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-4 py-1 rounded-full border text-sm font-medium z-10 rotate-90">
          Matter-of-fact
        </div>
        
        {/* Right label */}
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-4 py-1 rounded-full border text-sm font-medium z-10 -rotate-90">
          Enthusiastic
        </div>
      </div>
      
      {/* Current tone description - enhanced with specific tone */}
      <div className="mt-8">
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2 mb-2">
              <h4 className="text-lg font-medium">Current Tone:</h4>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-base font-medium">
                  {specificTone.name}
                </span>
                <span className="text-sm text-slate-500">({toneDescription})</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                {specificTone.description}
              </p>
              
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg italic">
                {specificTone.example}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
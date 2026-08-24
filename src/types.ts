/** * @license * SPDX-License-Identifier: Apache-2.0 */
export type TrackType = 'heros_journey' | 'different_but_truthful' | 'intellectual_journey';
export type CinematicToolType = 'none' | 'bulletTime' | 'montage';
export type MontageVariant = 'habit' | 'iteration' | 'ripple_effect';

export interface MontageData {
  variant: MontageVariant;
  theme: string;
  scenes: string[]; 
}

export interface BulletTimeData {
  intent: string;
  sight: string;
  sound: string;
  internal: string;
  physical: string;
  smell: string;
  taste: string;
  texture: string;
}

export interface MicroAnswer {
  questionLabel: string;
  answer: string;
}

export interface EssayBlock {
  id: string;            
  promptId: string;      
  title: string;
  subtitle?: string;         
  description: string;   
  content: string;
  draftText?: string;       
  isStuck?: boolean;
  microAnswers?: MicroAnswer[];     
  activeTool?: CinematicToolType;   
  montageData?: MontageData;
  bulletTimeData?: BulletTimeData;
}

export interface PromptField {
  id: string;
  label: string;
  subtitle?: string;
  description: string;
  placeholder: string;
  tip?: string;
  pitfallWarning?: string;
  suggestedWeight?: number; 
  tools?: ('montage' | 'bullet_time' | 'excavator')[];
  examples?: {
    title: string;
    text: string;
  }[];
}

export interface PatternSlot {
  promptId: string;
  label: string;
  targetRangePercentage: [number, number];
  isLeftover?: boolean;
}

export interface NarrativePattern {
  id: string;
  name: string;
  description: string;
  compatibleTrackId: TrackType;
  layout: PatternSlot[];
}

export interface EssayDraft {
  id: string;
  title: string;
  targetWordCount: number;
  limitType?: 'words' | 'characters';
  limitValue?: number;
  track: TrackType;
  herosJourneyAnswers: Record<string, string>;
  differentTruthfulAnswers: Record<string, string>;
  intellectualJourneyAnswers: Record<string, string>;
  blocks?: EssayBlock[];
  montageElements?: { era: string; theme: string; collegePromise: string }[];
  scratchpad?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuideChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: string;
  tags: string[];
}

export interface AntiPatternCard {
  id: string;
  trap: string;
  fix: string;
  explanation: string;
  exampleBad: string;
  exampleGood: string;
}

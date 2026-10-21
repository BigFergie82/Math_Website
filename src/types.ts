export type MathOperation='addition'|'subtraction'|'multiplication'|'division';
export type DifficultyLevel=1|2|3|4;
export interface Question { operation:MathOperation; difficulty:DifficultyLevel; a:number; b:number; answer:number; choices:number[]; patternId?:string; }
export interface PracticeAttempt extends Question { id:string; sessionId:string; correct:boolean; selected:number; at:string; }
export interface SessionConfig {operations:MathOperation[];difficulty:DifficultyLevel;length:5|10|20|'continuous';mode:'regular'|'review'}
export interface PracticeSession { id:string;config:SessionConfig;started:string;ended:string;attempted:number;correct:number;incorrect:number;accuracy:number; }
export interface MistakePattern extends Question {id:string;misses:number;successes:number;mastered:boolean;lastMiss:string;}
export interface AppSettings extends Omit<SessionConfig,'mode'> {sound:boolean;animation:boolean;explanations:boolean;encouragement:boolean;mastery:number;}
export interface AppStatistics {attempted:number;correct:number;incorrect:number;accuracy:number;}

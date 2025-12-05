export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface IGreeting {
  recipient: string;
  message: string;
}

export interface TreeConfig {
  layers: number;
  baseRadius: number;
  height: number;
}
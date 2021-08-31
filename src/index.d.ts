import { ReactNode } from 'react'

export interface ToolTipProps {
  children?: Array<ReactNode>;
  content?: string;
}

export interface ToolBarProps {
  fullScreen: boolean;
  mode: string;
  iconLength: number;
  appendContent: Function;
  fullScreenChange: Function;
  modeChange: Function;
}

export interface EditorProps {
  mode: string;
  fullScreen: boolean;
  placeholder: string;
  theme: string;
  showLineNum: boolean;
  value: string;
  onFullScreenChange?: Function;
  onChange?: Function;
  contentType?: string;
}


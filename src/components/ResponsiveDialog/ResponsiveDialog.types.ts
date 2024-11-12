import { StringLiteral } from "typescript";

export interface ResponsiveDialogType {
  title: string;
  description: string;
  fullScreen?: boolean;
  open: boolean;
  handleClose: () => void;
  handleContinue: () => void;
  showContinueButton: boolean;
  CloseButtonName: string;
}

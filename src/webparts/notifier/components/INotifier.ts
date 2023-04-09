import { INotification } from "../model";

export interface INotifierProps {
  
}
export interface INotifierState{
  isPreferences:boolean;
  isPanelOpen: boolean;
  notifications:INotification[];
}

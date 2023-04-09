import { INotification } from "../../model";

export interface INotificationCardProps{
    notification:INotification;
    onNotificationClose:()=>void;
    onRead:()=>void;
}
export interface INotificationCardState{
    
}
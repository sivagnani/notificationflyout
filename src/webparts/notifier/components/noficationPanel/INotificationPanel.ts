import { INotification } from "../../model";

export interface INotificationPanelProps{
    newNotifications:INotification[];
    onNotificationRead:(id:number)=>void;
    updateNotifications:()=>void;
    updateNotificationStatus:()=>void;
}
export interface INotificationPanelState{
}
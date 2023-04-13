import { INotification } from "../../model";

export interface INotificationPanelProps{
    newNotifications:INotification[];
    onNotificationRead:(id:number)=>void;
    updateNotifications:()=>void;
    updateNotificationsStatus:()=>void;
    onNotificationClose:(notification:number)=>void;
}
export interface INotificationPanelState{
}
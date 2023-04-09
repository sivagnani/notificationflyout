import { IActiveNoticationPrefence } from "../../model";

export interface INotificationsPreferencePanelProps{
    onCancel:()=>void;
}
export interface INotificationsPreferencePanelState{
    notificationOptions:IActiveNoticationPrefence[];
    initialNotifications:IActiveNoticationPrefence[];
    didPreferenceChange:boolean;
}
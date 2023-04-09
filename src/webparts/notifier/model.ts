export interface IActiveNoticationPrefence{
    Id:number;
    NotificationOption:string;
    NotificationTitle:string;
    HaveAccess:boolean;
    Tray:boolean;
    Email:boolean;
}
export interface INotification{
    Id:number;
    NotificationSubject:string;
    IsRead:boolean;
    Created:string;
}
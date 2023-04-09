import {IWeb, Web} from "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IActiveNoticationPrefence, INotification } from "../model";
export default class Services{
    context:IWeb = Web("https://7zmht7.sharepoint.com/sites/NotificationManager");
    getNotificationPreferences():Promise<IActiveNoticationPrefence[]>{
        return this.context.lists.getByTitle("Notification Preferences").items.select('Id','NotificationOption','NotificationTitle','HaveAccess','Tray','Email').get();
    }
    updateNotificationPreference(preferences:IActiveNoticationPrefence[]):Promise<boolean>{
        return Promise.all(preferences.map((preference)=>this.context.lists.getByTitle("Notification Preferences").items.getById(preference.Id).update(preference))).then(()=>true).catch(()=>false);
    }
    getNewNotifications():Promise<INotification[]>{
        return this.context.lists.getByTitle("Notifications").items.select('Id','IsRead','NotificationSubject','Created').filter(`IsRead eq 'false'`).orderBy("Created", false).top(8).get();
    }
    setAllNotificationsRead():Promise<boolean>{
        return this.context.lists.getByTitle("Notifications").items.select("Id", "IsRead").get().then((items) => {
            items.map((item) => {
                this.context.lists.getByTitle("Notifications").items.getById(item.ID).update({
                    IsRead:true 
                });
            });
        }).then(()=>true).catch(()=>false);
    }
    updateNotificationsStatus(notifications:INotification[]):Promise<boolean>{
       return Promise.all(notifications.map((notification)=>this.context.lists.getByTitle('Notifications').items.getById(notification.Id).update(notification))).then(()=>true).catch(()=>false); 
    }
}

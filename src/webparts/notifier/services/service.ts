import {IWeb, Web} from "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IActiveNoticationPrefence } from "../model";
export default class Services{
    context:IWeb = Web("https://7zmht7.sharepoint.com/sites/NotificationManager");
    getNotificationPreferences():Promise<IActiveNoticationPrefence[]>{
        return this.context.lists.getByTitle("Notification Preferences").items.select('NotificationOption','NotificationTitle','HaveAccess','Tray','Email').get();
    }
}

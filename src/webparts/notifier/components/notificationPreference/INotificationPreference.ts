import { IActiveNoticationPrefence } from "../../model";

export interface INotificationsPreferenceProps{
    preference:IActiveNoticationPrefence;
    onPrefenceChange:(id:number,type:string)=>void;
}
export interface INotificationsPreferenceState{
    
}
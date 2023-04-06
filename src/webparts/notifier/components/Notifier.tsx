import * as React from 'react';
// import styles from './Notifier.module.scss';
import { INotifierProps, INotifierState } from './INotifier';
import NotificationTrayHeader from './notificationFlyoutHeader/notificationTrayHeader';
import NotificationPanel from './noficationPanel/notificationPanel';
import Services from '../services/service';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class Notifier extends React.Component<INotifierProps,INotifierState> {
  service = new Services;
  constructor(props:INotifierProps){
    super(props);
    this.state={
      isPreferences:true,
    }
  }
  changePreferencesNavigation():void{
    this.setState({
      isPreferences:!this.state.isPreferences,
    });
  }
  public render(): React.ReactElement<INotifierProps> {
    return (
      <div>
        <NotificationTrayHeader isNotificationTray={this.state.isPreferences} onPreferenceClick={()=>this.changePreferencesNavigation()}/>
        <NotificationPanel isNotificationTray={this.state.isPreferences}/>

        {/* <button disabled={!this.state.isPreferences} onClick={()=>this.changePreferencesNavigation()}>sample</button> */}
      </div>
    );
  }
}

import * as React from 'react';
// import styles from './Notifier.module.scss';
import { INotifierProps, INotifierState } from './INotifier';
import NotificationTrayHeader from './notificationFlyoutHeader/notificationTrayHeader';
import NotificationPanel from './noficationPanel/notificationPanel';
import Services from '../services/service';
import { Panel, PanelType } from 'office-ui-fabric-react';
import styles from './Notifier.module.scss';
import NotificationPreferencePanel from './notificationPreferencesPanel/notificationsPreferencePanel';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class Notifier extends React.Component<INotifierProps, INotifierState> {
  service = new Services;
  constructor(props: INotifierProps) {
    super(props);
    this.state = {
      isPreferences: false,
      isPanelOpen: true,
      notifications:[]
    }
  }
  componentDidMount(): void {
    this.service.getNewNotifications().then(
      (newNotifications)=>{
        this.setState({
          notifications:newNotifications
        })
    })
  }
  getNotifications(){
    this.service.getNewNotifications().then(
      (newNotifications)=>{
        this.setState({
          notifications:newNotifications
        })
    })
  }
  changePreferencesNavigation(): void {
    this.setState({
      isPreferences: !this.state.isPreferences,
    });
  }
  dismissNotifications(){
    this.service.setAllNotificationsRead().then((status:boolean)=>
    status && this.setState({
      notifications:[],
    }))
  }

  makeNotificationRead(notificationId:number){
    let allNotifications=[...this.state.notifications];
    allNotifications.filter((notification)=>notification.Id===notificationId).map((notification)=>notification.IsRead=true);
    this.setState({
      notifications:allNotifications,
    })
  }
  updateNotifications(){
    this.service.updateNotificationsStatus(this.state.notifications).then((status)=>status&&this.getNotifications());
  }
  closePanel():void{
    this.setState({
      isPanelOpen:false
    })
  }
  public render(): React.ReactElement<INotifierProps> {
    const panelStyles = {
      content: {
        padding: 0,
        margin: 0
      }
    };
    return (
      <div>
        <Panel customWidth='500px' type={PanelType.custom} isOpen={this.state.isPanelOpen} styles={panelStyles} hasCloseButton={false} >
          <div className={styles.notificationPane}>
            <NotificationTrayHeader isNotificationTray={!this.state.isPreferences} onPreferenceClick={() => this.changePreferencesNavigation()} onCloseClick={()=>this.closePanel()} onDismissAll={()=>this.dismissNotifications()}/>
            {!this.state.isPreferences
            ?<NotificationPanel newNotifications={this.state.notifications}  onNotificationRead={(notificationId:number)=>this.makeNotificationRead(notificationId)} updateNotifications={()=>this.getNotifications()} updateNotificationStatus={()=>this.updateNotifications()}/>
            :<NotificationPreferencePanel onCancel={()=>this.closePanel()}/>}
          </div>
        </Panel>
      </div>
    );
  }
}

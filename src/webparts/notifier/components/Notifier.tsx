import * as React from 'react';
import { INotifierProps, INotifierState } from './INotifier';
import NotificationTrayHeader from './notificationFlyoutHeader/notificationTrayHeader';
import NotificationPanel from './noficationPanel/notificationPanel';
import Services from '../services/service';
import { Panel, PanelType } from 'office-ui-fabric-react';
import styles from './Notifier.module.scss';
import NotificationPreferencePanel from './notificationPreferencesPanel/notificationsPreferencePanel';


export default class Notifier extends React.Component<INotifierProps, INotifierState> {
  service = new Services;
  constructor(props: INotifierProps) {
    super(props);
    this.state = {
      isPreferences: false,
      isPanelOpen: false,
      notifications: []
    }
  }
  componentDidMount(): void {
    this.service.getNewNotifications().then(
      (newNotifications) => {
        this.setState({
          notifications: newNotifications
        })
      })
  }
  getNotifications():void {
    this.service.getNewNotifications().then(
      (newNotifications) => {
        this.setState({
          notifications: newNotifications
        })
      })
  }
  togglePreferences(): void {
    this.setState({
      isPreferences: !this.state.isPreferences,
    });
  }
  dismissNotifications():void {
    this.service.setAllNotificationsRead().then((status: boolean) =>
      status && this.setState({
        notifications: [],
      }))
  }
  makeNotificationRead(notificationId: number) {
    let allNotifications = [...this.state.notifications];
    allNotifications.filter((notification) => notification.Id === notificationId).map((notification) => notification.IsRead = true);
    this.setState({
      notifications: allNotifications,
    })
  }
  updateNotifications() {
    this.service.updateNotificationsStatus(this.state.notifications).then((status) => status && this.getNotifications());
  }
  closeNotification(notificationId: number) {
    this.service.updateNotificationStatusAndGetNewNotification(notificationId).then(
      (newNotificaion) => {
        let updatedNotifications = this.state.notifications.filter((notification)=>notification.Id!==notificationId);
        (newNotificaion[7]) && updatedNotifications.push(newNotificaion[7]);
          this.setState(
            {
              notifications: updatedNotifications,
            }
          )
      });
  }
  closePanel(): void {
    this.setState({
      isPanelOpen: false
    })
  }
  openPanel():void{
    this.setState({
      isPanelOpen:true
    });
    console.log("yesh");    
  }
  public render(): React.ReactElement<INotifierProps> {
    return (
      <div>
        <button onClick={()=>this.openPanel()}>open notifcations</button>
        <Panel customWidth='500px' type={PanelType.custom} isOpen={this.state.isPanelOpen} className={`${styles.panelStyle}`} hasCloseButton={false} >
          <div className={`${styles.notificationPane}`}>
            <NotificationTrayHeader isNotificationTray={!this.state.isPreferences} togglePreferences={() => this.togglePreferences()} onClose={() => this.closePanel()} onDismiss={() => this.dismissNotifications()} />
            {!this.state.isPreferences
              ? <NotificationPanel newNotifications={this.state.notifications} onNotificationClose={(notificationId: number) => this.closeNotification(notificationId)} onNotificationRead={(notificationId: number) => this.makeNotificationRead(notificationId)} updateNotifications={() => this.getNotifications()} updateNotificationsStatus={() => this.updateNotifications()} />
              : <NotificationPreferencePanel onCancel={() => this.closePanel()} />}
          </div>
        </Panel>
      </div>
    );
  }
}

import * as React from "react";
import "./notificationPanel.css";
import { INotificationPanelProps, INotificationPanelState } from "./INotificationPanel";
import Services from "../../services/service";
import NotificationDetailCard from "../notificationCard/notificationDetailCard";
import styles from './notificationPanel.module.scss';
export default class NotificationPanel extends React.Component<INotificationPanelProps, INotificationPanelState>{
    service = new Services();
    constructor(props: INotificationPanelProps) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(): void {
        this.props.updateNotifications();
    }
    componentWillUnmount(): void {
        this.props.updateNotificationsStatus();
    }
    closeNotification(notificationId:number){
        this.props.onNotificationClose(notificationId);
    }
    render(): React.ReactNode {
        return (
                    <div className={this.props.newNotifications.length === 0 ?`${styles.notificationPanel} ${styles.noNotificationsAvailable}`:`${styles.notificationPanel} ${styles.notificationsAvailable}`}>
                        <div className={`${styles.panelHeader}`}>
                            <p className={`${styles.notificationLink}`}>{this.props.newNotifications.length === 0 ? "See older notifications":"See all"}</p>
                        </div>
                        {this.props.newNotifications.length === 0 ?
                        <div className={`${styles.noNotifications}`}>
                            <div>
                                <img className={`${styles.errorImage}`} src={require("../../assets/notepadImage.png")} />
                                <p className={`${styles.message}`}>No new notifications to show</p>
                                <p className={`${styles.notificationLink}`}>See older notifications</p>
                            </div>
                        </div>
                        :
                        (this.props.newNotifications.map((notificationDetails)=><NotificationDetailCard onRead={()=>this.props.onNotificationRead(notificationDetails.Id)} notification={notificationDetails} onNotificationClose={()=>this.closeNotification(notificationDetails.Id)}/>))
                        }
                    </div>
        );
    }
}
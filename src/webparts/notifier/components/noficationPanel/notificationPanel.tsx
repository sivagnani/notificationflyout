import * as React from "react";
import "./notificationPanel.css";
import { INotificationPanelProps, INotificationPanelState } from "./INotificationPanel";
import Services from "../../services/service";
import NotificationDetailCard from "../notificationCard/notificationDetailCard";
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
        this.props.updateNotificationStatus();
    }
    closeNotification(notificationId:number){
        this.props.onNotificationRead(notificationId);
        this.props.updateNotificationStatus();
    }
    render(): React.ReactNode {
        return (
                this.props.newNotifications.length === 0 ?
                    <div className="notificationPanel noNotificationsAvailable">
                        <div className="panelHeader">
                            <p className="notificationLink">See older notifications</p>
                        </div>
                        <div className="noNotifications">
                            <div>
                                <img className="errorImage" src={require("../../assets/notepadImage.png")} />
                                <p className="message">No new notifications to show</p>
                                <p className="notificationLink">See older notifications</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="notificationPanel notificationsAvailable">
                        <div className="panelHeader">
                            <p className="notificationLink">See all</p>
                        </div>
                        {this.props.newNotifications.map((notificationDetails)=><NotificationDetailCard onRead={()=>this.props.onNotificationRead(notificationDetails.Id)} notification={notificationDetails} onNotificationClose={()=>this.closeNotification(notificationDetails.Id)}/>)}
                    </div>
        );
    }
}
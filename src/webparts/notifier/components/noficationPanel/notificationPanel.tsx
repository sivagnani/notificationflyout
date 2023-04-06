import * as React from "react";
import "./notificationPanel.css";
import { INotificationPanelProps, INotificationPanelState } from "./INotificationPanel";
import NotificationPreferencePanel from "../notificationPreferencesPanel/notificationsPreferencePanel";
import Services from "../../services/service";
export default class NotificationPanel extends React.Component<INotificationPanelProps, INotificationPanelState>{
    service = new Services();
    constructor(props:INotificationPanelProps){
        super(props);
        this.state={
            newNotifications:[],
        }
    }
    componentDidMount(): void {
        this.service.getNewNotifications().then(
            (notifications)=>this.setState({
                newNotifications:notifications,
            })
        )
    }
    render(): React.ReactNode {
        return (
            this.props.isNotificationTray?
            (this.state.newNotifications.length>0)?
            <div className="notificationPanel">
                <div className="panelHeader">
                    <p className="notificationLink">See older notifications</p>
                </div>
                <div className="noNotifications">
                    <div>
                        <img src={require("../../assets/notepadImage.png")}/>
                        <p className="message">No new notifications to show</p>
                        <p className="notificationLink">See older notifications</p>
                    </div>
                </div>
            </div>
            :
            <div className="notificationPanel">
                <div className="panelHeader">
                    <p className="notificationLink">See all</p>
                </div>
                <div className="noNotifications">
                    <div>
                        <img src={require("../../assets/notepadImage.png")}/>
                        <p className="message">No new notifications to show</p>
                        <p className="notificationLink">See older notifications</p>
                    </div>
                </div>
            </div>
            :
            <NotificationPreferencePanel/>
        );
    }
}
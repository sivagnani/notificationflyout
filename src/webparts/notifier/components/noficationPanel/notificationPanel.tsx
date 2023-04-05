import * as React from "react";
import "./notificationPanel.css";
import { INotificationPanelProps, INotificationPanelState } from "./INotificationPanel";
import NotificationPreferencePanel from "../notificationPreferencesPanel/notificationsPreferencePanel";
export default class NotificationPanel extends React.Component<INotificationPanelProps, INotificationPanelState>{
    render(): React.ReactNode {
        return (
            this.props.isNotificationTray?
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
            <NotificationPreferencePanel/>
        );
    }
}
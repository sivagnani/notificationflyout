import * as React from "react";
import "./notificationsPreference.css";
import { INotificationsPreferenceProps, INotificationsPreferenceState } from "./INotificationPreference";

export default class NotificationPreference extends React.Component<INotificationsPreferenceProps, INotificationsPreferenceState>{
    render(): React.ReactNode {
        return (
            <div className="notificationPreferences">
                <p className="title">{this.props.preference.title}</p>
                <div className="paddingBottom">
                    <input type="checkbox" checked={this.props.preference.isTrayEnabled} disabled={!this.props.preference.haveAccess}/>
                    <label>Tray</label>
                    <input type="checkbox" checked={this.props.preference.isEmailEnabled} disabled={!this.props.preference.haveAccess} />
                    <label>Email</label>
                </div>
            </div>
        );
    }
}
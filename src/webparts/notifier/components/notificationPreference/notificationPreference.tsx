import * as React from "react";
import "./notificationPreference.css";
import { INotificationsPreferenceProps, INotificationsPreferenceState } from "./INotificationPreference";

export default class NotificationPreference extends React.Component<INotificationsPreferenceProps, INotificationsPreferenceState>{
    render(): React.ReactNode {
        return (
            <div>
                <p className="title">{this.props.preference.NotificationTitle}</p>
                <div className="paddingBottom">
                    <input type="checkbox" checked={this.props.preference.Tray} disabled={!this.props.preference.HaveAccess}/>
                    <label>Tray</label>
                    <input type="checkbox" checked={this.props.preference.Email} disabled={!this.props.preference.HaveAccess} />
                    <label>Email</label>
                </div>
            </div>
        );
    }
}
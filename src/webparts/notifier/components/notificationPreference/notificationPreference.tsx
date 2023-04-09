import * as React from "react";
import "./notificationPreference.css";
import { INotificationsPreferenceProps, INotificationsPreferenceState } from "./INotificationPreference";
import { Icon } from "office-ui-fabric-react";

export default class NotificationPreference extends React.Component<INotificationsPreferenceProps, INotificationsPreferenceState>{
    render(): React.ReactNode {
        return (
            <div>
                <div className="preferenceTitle">
                    <p className="title">{this.props.preference.NotificationTitle}</p>
                    {!this.props.preference.HaveAccess && <Icon className="noAccess" iconName="LockSolid" />}
                </div>
                <div className={(this.props.preference.HaveAccess) ? "preferences" : "preferences notHaveAccess"}>
                    <div className="optionContainer">
                        <input type="checkbox" className="custom-checkbox" checked={this.props.preference.Tray} disabled={!this.props.preference.HaveAccess} onChange={() => this.props.onPrefenceChange(this.props.preference.Id, "Tray")} />
                        <label className="labelOption">Tray</label>
                    </div>
                    <div className="optionContainer">
                        <input type="checkbox" className="custom-checkbox" checked={this.props.preference.Email} disabled={!this.props.preference.HaveAccess} onChange={() => this.props.onPrefenceChange(this.props.preference.Id, "Email")} />
                        <label className="labelOption">Email</label>
                    </div>
                </div>
            </div>
        );
    }
}
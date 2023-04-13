import * as React from "react";
import "./notificationPreference.css";
import { INotificationsPreferenceProps, INotificationsPreferenceState } from "./INotificationPreference";
import { Icon } from "office-ui-fabric-react";
import styles from './notificationPreference.module.scss';

export default class NotificationPreference extends React.Component<INotificationsPreferenceProps, INotificationsPreferenceState>{
    render(): React.ReactNode {
        return (
            <div>
                <div className={`${styles.preferenceTitle}`}>
                    <p className={`${styles.title}`}>{this.props.preference.NotificationTitle}</p>
                    {!this.props.preference.HaveAccess && <Icon className={`${styles.noAccess}`} iconName="LockSolid" />}
                </div>
                <div className={(this.props.preference.HaveAccess) ? `${styles.preferences}` : `${styles.preferences} ${styles.notHaveAccess}`}>
                    <div className={`${styles.optionContainer}`}>
                        <input type="checkbox" className={`${styles.checkbox}`} checked={this.props.preference.Tray} disabled={!this.props.preference.HaveAccess} onChange={() => this.props.onPrefenceChange(this.props.preference.Id, "Tray")} />
                        <label className={`${styles.labelOption}`}>Tray</label>
                    </div>
                    <div className={`${styles.optionContainer}`}>
                        <input type="checkbox" className={`${styles.checkbox}`} checked={this.props.preference.Email} disabled={!this.props.preference.HaveAccess} onChange={() => this.props.onPrefenceChange(this.props.preference.Id, "Email")} />
                        <label className={`${styles.labelOption}`}>Email</label>
                    </div>
                </div>
            </div>
        );
    }
}
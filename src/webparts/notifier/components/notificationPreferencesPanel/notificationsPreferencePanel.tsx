import * as React from "react";
import "./notificationsPreferencePanel.css";
import { INotificationsPreferencePanelProps, INotificationsPreferencePanelState } from "./INotificationsPreferencePanel";
import Services from "../../services/service";
import NotificationPreference from "../notificationPreference/notificationPreference";
import styles from './notificationsPreferencePanel.module.scss';

export default class NotificationPreferencePanel extends React.Component<INotificationsPreferencePanelProps, INotificationsPreferencePanelState>{
    service = new Services();
    constructor(props: INotificationsPreferencePanelProps) {
        super(props);
        this.state = {
            notificationOptions: [],
            initialPreferences: [],
            didPreferenceChange: false,
        }
    }
    componentDidMount(): void {
        this.service.getNotificationPreferences().then(preferences => {
            this.setState({
                notificationOptions: preferences,
                initialPreferences: preferences,
            }
            );
        })
    }
    changePreference(id: number, type: string): void {
        let allPreferences = JSON.parse(JSON.stringify(this.state.notificationOptions));
        allPreferences.filter((preference: { Id: number; }) => preference.Id === id)
            .map((preference: { Tray: boolean; Email: boolean; }) => {
                (type === "Tray") ? preference.Tray = !preference.Tray : preference.Email = !preference.Email;
            })
        this.setState({
            notificationOptions: allPreferences,
            didPreferenceChange: (JSON.stringify(this.state.initialPreferences)!==JSON.stringify(allPreferences)),
        });
    }
    savePreferences(): void {
        this.service.updateNotificationPreference(this.state.notificationOptions).then(
            (status)=>{
                status?alert("Updated successfully"):alert("Not Updated");
                this.props.onCancel();
            }
        );
    }
    render(): React.ReactNode {
        return (
            <div className={`${styles.notificationPreferences}`}>
                <div className={`${styles.allPreferences}`}>
                    <div className={`${styles.marginBottom}`}>
                        <p className={`${styles.myContent}`}>My Content</p>
                    </div>
                    <div className={`${styles.marginBottom}`}>
                        <p className={`${styles.option}`}>Send me notifications when:</p>
                    </div>
                    {
                        this.state.notificationOptions
                            .filter((option) => option.NotificationOption === "My Content")
                            .map((option) => <NotificationPreference preference={option} onPrefenceChange={(id: number, type: string) => this.changePreference(id, type)} />)
                    }
                    <hr className={`${styles.marginBottom}`} />
                    <div className={`${styles.marginBottom}`}>
                        <p className={`${styles.myContent}`}>Social</p>
                    </div>
                    <div className={`${styles.marginBottom}`}>
                        <p className={`${styles.option}`}>Send me notifications when:</p>
                    </div>
                    {
                        this.state.notificationOptions
                            .filter((option) => option.NotificationOption === "Social")
                            .map((option) => <NotificationPreference preference={option} onPrefenceChange={(id: number, type: string) => this.changePreference(id, type)} />)
                    }
                </div>
                <div className={`${styles.footer}`}>
                    <button className={(this.state.didPreferenceChange) ? `${styles.footerButton} ${styles.save}` : `${styles.footerButton} ${styles.saveDisabled}`} disabled={!this.state.didPreferenceChange} onClick={()=>this.savePreferences()}>Save</button>
                    <button className={`${styles.footerButton} ${styles.cancel}`} onClick={this.props.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}
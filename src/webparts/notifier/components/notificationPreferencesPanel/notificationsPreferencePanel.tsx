import * as React from "react";
import "./notificationsPreferencePanel.css";
import { INotificationsPreferencePanelProps, INotificationsPreferencePanelState } from "./INotificationsPreferencePanel";
import Services from "../../services/service";
import NotificationPreference from "../notificationPreference/notificationPreference";
export default class NotificationPreferencePanel extends React.Component<INotificationsPreferencePanelProps, INotificationsPreferencePanelState>{
    service = new Services();
    constructor(props: INotificationsPreferencePanelProps) {
        super(props);
        this.state = {
            notificationOptions: [],
            initialNotifications: [],
            didPreferenceChange: false,
        }
    }
    componentDidMount(): void {
        this.service.getNotificationPreferences().then(preferences => {
            this.setState({
                notificationOptions: preferences,
                initialNotifications: preferences,
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
            didPreferenceChange: (JSON.stringify(this.state.initialNotifications)!==JSON.stringify(allPreferences)),
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
            <div className="notificationPreferences">
                <div className="allPreferences">
                    <div className="marginBottom">
                        <p className="myContent">My Content</p>
                    </div>
                    <div className="marginBottom">
                        <p className="option">Send me notifications when:</p>
                    </div>
                    {
                        this.state.notificationOptions
                            .filter((option) => option.NotificationOption === "My Content")
                            .map((option) => <NotificationPreference preference={option} onPrefenceChange={(id: number, type: string) => this.changePreference(id, type)} />)
                    }
                    <hr className="marginBottom" />
                    <div className="marginBottom">
                        <p className="myContent">Social</p>
                    </div>
                    <div className="marginBottom">
                        <p className="option">Send me notifications when:</p>
                    </div>
                    {
                        this.state.notificationOptions
                            .filter((option) => option.NotificationOption === "Social")
                            .map((option) => <NotificationPreference preference={option} onPrefenceChange={(id: number, type: string) => this.changePreference(id, type)} />)
                    }
                </div>
                <div className="footer">
                    <button className={(this.state.didPreferenceChange) ? "footerButton save" : "footerButton saveDisabled"} disabled={!this.state.didPreferenceChange} onClick={()=>this.savePreferences()}>Save</button>
                    <button className="footerButton cancel" onClick={this.props.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}
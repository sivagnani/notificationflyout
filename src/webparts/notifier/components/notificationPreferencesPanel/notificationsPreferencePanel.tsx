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
        }
    }
    componentDidMount(): void {
        this.service.getNotificationPreferences().then(preferences => {
            this.setState({
                notificationOptions: preferences,
            }
            );
        })
    }
    render(): React.ReactNode {
        return (
            <div className="notificationPreferences">
                <div className="marginBottom">
                    <p className="myContent">My Content</p>
                </div>
                <div className="marginBottom">
                    <p className="option">Send me notifications when:</p>
                </div>
                {
                    this.state.notificationOptions
                        .filter((option) => option.NotificationOption === "My Content")
                        .map((option) => <NotificationPreference preference={option} />)
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
                        .map((option) => <NotificationPreference preference={option} />)
                }
                <div className="footer">
                    <button className="footerButton save">Save</button>
                    <button className="footerButton cancel">Cancel</button>
                </div>
            </div>
        );
    }
}
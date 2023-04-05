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
            });
        })
    }
    render(): React.ReactNode {
        return (
            <div className="notificationPreferences">
                <div className="paddingBottom">
                    <p className="myContent">My Content</p>
                </div>
                <div className="paddingBottom">
                    <p className="option">Send me notifications when:</p>
                </div>
                {this.state.notificationOptions.map((preferences) => {
                    if(preferences.option==="My Content"){
                        return <NotificationPreference preference={preferences}/>
                    }
                })
                }
                <hr className="paddingBottom" />
                <div className="paddingBottom">
                    <p className="myContent">Social</p>
                </div>
                <div className="paddingBottom">
                    <p className="option">Send me notifications when:</p>
                </div>
            </div>
        );
    }
}
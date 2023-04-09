import * as React from "react";
import "./notificationTrayHeader.css";
import { INotificationTrayHeaderState, INotificationTrayHeaderProps } from "./INotificationTrayHeader";
import { Icon } from 'office-ui-fabric-react';
export default class NotificationTrayHeader extends React.Component<INotificationTrayHeaderProps, INotificationTrayHeaderState>{
    render(): React.ReactNode {

        return (
            this.props.isNotificationTray ?
                <div className="notificationHeader">
                    <div className="mainHeader header">
                        <div className="heading"><p>NotificationTray</p></div>
                        <div onClick={this.props.onCloseClick}><Icon className="closeIcon" iconName="ChromeClose" /></div>
                    </div>
                    <div className="header"  >
                        <div className="navs" onClick={this.props.onPreferenceClick}>
                            <div><Icon className="optionsIcon" iconName="ContentSettings" /></div>
                            <p className="options">Preferences</p>
                        </div>
                        <div className="navs" onClick={this.props.onDismissAll}>
                            <div><Icon className="optionsIcon" iconName="RingerRemove" /></div>
                            <p>Dismiss all</p>
                        </div>
                    </div>
                </div>
                :
                <div className="notificationHeader">
                    <div className="mainHeader header">
                        <div className="navs" onClick={this.props.onPreferenceClick}>
                            <div><Icon className="optionsIcon" iconName="ChromeBack" /></div>
                            <p>Back</p>
                        </div>
                        <div><Icon className="closeIcon" iconName="ChromeClose" /></div>
                    </div>
                    <div className="header">
                        <div className="heading">
                            <p>Notification Preferences</p>
                        </div>
                    </div>
                </div>
        );
    }
}
import * as React from "react";
import "./notificationTrayHeader.css";
import { INotificationTrayHeaderState, INotificationTrayHeaderProps } from "./INotificationTrayHeader";
import { IconButton, IIconProps} from 'office-ui-fabric-react';
const closeIcon: IIconProps = { iconName: 'ChromeClose' };
export default class NotificationTrayHeader extends React.Component<INotificationTrayHeaderProps, INotificationTrayHeaderState>{
    render(): React.ReactNode {
        return (
            this.props.isNotificationTray?
            <div className="notificationHeader">
                <div className="mainHeader header">
                    <div className="heading"><p>NotificationTray</p></div>
                    <div><button id="notificationCloseButton" type="button"><div><IconButton className="close" iconProps={closeIcon}/></div></button></div>
                </div>
                <div className="secondaryHeader header">
                    <div className="navs">
                        <p onClick={this.props.onPreferenceClick}>Preferences</p>
                    </div>
                    <div className="navs">
                        <p>Dismiss all</p>
                    </div>
                </div>
            </div>
            :
            <div className="notificationHeader">
                <div className="header">
                    <div className="navs" onClick={this.props.onPreferenceClick}>
                        <p>Back</p>
                    </div>
                    <div><button id="notificationCloseButton" type="button"><div><IconButton className="close" iconProps={closeIcon}/></div></button></div>
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
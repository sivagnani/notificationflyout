import * as React from "react";
import "./notificationTrayHeader.css";
import { INotificationTrayHeaderState, INotificationTrayHeaderProps } from "./INotificationTrayHeader";
import { Icon } from 'office-ui-fabric-react';
import styles from './notificationTrayHeader.module.scss';

export default class NotificationTrayHeader extends React.Component<INotificationTrayHeaderProps, INotificationTrayHeaderState>{
    render(): React.ReactNode {

        return (
            this.props.isNotificationTray ?
                <div className={`${styles.notificationHeader}`}>
                    <div className={`${styles.mainHeader} ${styles.header}`}>
                        <div className={`${styles.heading}`}><p>NotificationTray</p></div>
                        <div onClick={this.props.onClose}><Icon className={`${styles.closeIcon}`} iconName="ChromeClose" /></div>
                    </div>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.navs}`} onClick={this.props.togglePreferences}>
                            <div><Icon className={`${styles.optionsIcon}`} iconName="ContentSettings" /></div>
                            <p>Preferences</p>
                        </div>
                        <div className={`${styles.navs}`} onClick={this.props.onDismiss}>
                            <div><Icon className={`${styles.optionsIcon}`} iconName="RingerRemove" /></div>
                            <p>Dismiss all</p>
                        </div>
                    </div>
                </div>
                :
                <div className={`${styles.notificationHeader}`}>
                    <div className={`${styles.mainHeader} ${styles.header}`}>
                        <div className={`${styles.navs}`} onClick={this.props.togglePreferences}>
                            <div><Icon className={`${styles.optionsIcon}`} iconName="ChromeBack" /></div>
                            <p>Back</p>
                        </div>
                        <div onClick={this.props.onClose}><Icon className={`${styles.closeIcon}`} iconName="ChromeClose" /></div>
                    </div>
                    <div className={`${styles.header}`}>
                        <div className={`${styles.heading}`}>
                            <p>Notification Preferences</p>
                        </div>
                    </div>
                </div>
        );
    }
}
import * as React from "react";
import "./notificationDetailCard.css";
import { Icon } from 'office-ui-fabric-react';
import { INotificationCardProps, INotificationCardState } from "./INotificationDetailCard";
export default class NotificationDetailCard extends React.Component<INotificationCardProps, INotificationCardState>{
    convertDate(dateStr:string) {
        const date = new Date(dateStr);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = date.getMinutes();
        const formattedDate = `${month} ${day} ${year} at ${hours}:${minutes} ${ampm}`;
        return formattedDate;
    }
    render(): React.ReactNode {
        return (
            <div className="notificationCard">
                <div className="notificationDetails" onClick={this.props.onRead}>
                    <Icon className="statusIcon" iconName={this.props.notification.IsRead?"Read":"Mail"} />
                    <div className="notificationInfo">
                        <p className="notificationSubject">{this.props.notification.NotificationSubject}</p>
                        <p className="notificationTime">{this.convertDate(this.props.notification.Created)}</p>
                    </div>
                </div>
                <Icon className="notificationClose" iconName="ChromeClose" onClick={this.props.onNotificationClose} />
            </div>
        );
    }
}
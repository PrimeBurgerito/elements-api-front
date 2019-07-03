import * as React from 'react';
import './body-widget.scss';

interface ITrayWidgetProps {
  children: React.ReactChild[];
}

const TrayWidget = (props: ITrayWidgetProps): JSX.Element => {
  return <div className="tray">{props.children}</div>;
};

export default TrayWidget;

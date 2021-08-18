import React, {FunctionComponent} from 'react';
import {SidebarComponentPropsInterface} from './SidebarComponentPropsInterface';

const Sidebar: FunctionComponent<SidebarComponentPropsInterface> = ({...props}) => {

    return (
        <div className="sidebar">
            {props.children}
        </div>
    );
};

export default React.memo(Sidebar);

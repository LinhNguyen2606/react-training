import { useState } from 'react';

// Icon
import { ArrowLeft } from '@assets/icons';

// Components
import {Icon} from '@components/DataDisplay'
import Tabs from '@components/DataDisplay/Panel/Tabs'

// SCSS
import '@components/DataDisplay/Panel/Panel.scss';

type ContentType = {
  content: React.ReactNode
  title: string
}

type PanelProps = {
  tabs: ContentType[];
  onBackClick: () => void;
};

const Panel = ({ tabs, onBackClick }: PanelProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleActiveTab = (index: number) => setActiveTabIndex(index);

  /* Define name value of active tab */
  const tabData = tabs[activeTabIndex].content;

  return (
    <div className="panel">
        <div className="panel__header">
          <div className="panel__header--icon">
            <Icon src={ArrowLeft} onClick={onBackClick} />
            {tabs.map((tab, index) => (
              <Tabs 
                key={index}
                isActive={activeTabIndex === index}
                index={index}
                onClick={handleActiveTab}
              >
                {tab.title}
          </Tabs>
        ))}
          </div>
        </div>
        {tabData}
    </div>
  )
};

export default Panel;

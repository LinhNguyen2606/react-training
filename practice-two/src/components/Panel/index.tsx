import { useState } from 'react';

// Icon
import { ArrowLeft } from '@assets/icons';

// Components
import { Icons, Tabs } from '@components';

// SCSS
import '@components/Panel/Panel.scss';

interface Content {
  title: string;
  content: React.ReactNode;
}

interface PanelProps {
  tabs: Content[];
  onBackClick: () => void;
}

const Panel = ({ tabs, onBackClick }: PanelProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  /**
   * Handles the activation of a tab.
   * @param index - The index of the tab to activate.
   */
  const handleActiveTab = (index: number) => setActiveTabIndex(index);

  /* Define name value of active tab */
  const tabData = tabs[activeTabIndex].content;

  return (
    <div className="panel">
      <div className="panel__header">
        <Icons src={ArrowLeft} onClick={onBackClick} />
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
      {tabData}
    </div>
  );
};

export default Panel;

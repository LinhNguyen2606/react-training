// Components
import AvatarLabelView from '@components/Sidebar/AvatarLabelView';
import TextView from '@components/Sidebar/TextView';
import ListView from '@components/Sidebar/ListView';
import { ListItemViewProps } from '@components/Sidebar/ListView/ListItemView';

// Constant
import { VIEWTYPES } from '@constants';

export interface SidebarProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
}

const SidebarInfo = ({ data }: SidebarProps) => {
  return (
    <div>
      {data.map((item, index) => {
        switch (item.type) {
          case VIEWTYPES.AVATAR_LABEL_VIEW:
            return (
              <AvatarLabelView
                key={index}
                src={item.src}
                size={item.size}
                alt={item.alt}
                desc={item.desc}
                label={item.label}
                bgColor={item.bgColor}
              />
            );
          case VIEWTYPES.TEXT_VIEW:
            return (
              <TextView
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            );
          case VIEWTYPES.LIST_VIEW:
            return (
              <ListView
                key={index}
                values={item.values as ListItemViewProps[]}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SidebarInfo;

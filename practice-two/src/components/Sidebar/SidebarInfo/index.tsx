// Components
import AvatarLabelView from '@components/Sidebar/AvatarLabelView';
import TextView from '@components/Sidebar/TextView';
import ListView from '@components/Sidebar/ListView';
import { ListItemViewProps } from '@components/Sidebar/ListView/ListItemView';

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
          case 'AVATAR_LABEL_VIEW':
            return (
              <AvatarLabelView
                key={item.index}
                src={item.src}
                alt={item.alt}
                desc={item.desc}
                label={item.label}
                bgColor={item.bgColor}
              />
            );
          case 'TEXT_VIEW':
            return (
              <TextView
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            );
          case 'LIST_VIEW':
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

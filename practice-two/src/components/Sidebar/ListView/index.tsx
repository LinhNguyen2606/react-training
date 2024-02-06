// Components
import ListItemView, { ListItemViewProps } from '@components/Sidebar/ListView/ListItemView';

interface ListViewProps {
  values: ListItemViewProps[];
}

const ListView = ({ values }: ListViewProps) => {
  return (
    <>
      {values.map(({ icon, label, value }, index) => (
        <ListItemView
          key={index}
          icon={icon}
          label={label}
          value={value}
        />
      ))}
    </>
  );
};

export default ListView;

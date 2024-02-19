// Components
import ListItemView, { ListItemViewProps } from '@components/Sidebar/ListView/ListItemView';

interface ListViewProps {
  values: ListItemViewProps[];
}

const ListView = ({ values }: ListViewProps) => {
  return (
    <>
      {values.map(({ icon, label, values }, index) => (
        <ListItemView
          key={index}
          icon={icon}
          label={label}
          values={values}
        />
      ))}
    </>
  );
};

export default ListView;

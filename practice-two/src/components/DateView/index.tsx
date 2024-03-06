import '@components/DateView/DateView.scss';

interface DateViewProps {
  label: string;
  value: string;
}

const DateView = ({ label, value }: DateViewProps) => {
  return (
    <div className="date-view">
      <label className="date-view--label">{label}</label>
      <p className="date-view--text">{value}</p>
    </div>
  );
};

export default DateView;

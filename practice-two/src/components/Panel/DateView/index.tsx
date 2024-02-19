interface DateViewProps {
  label: string;
  value: string;
}

const DateView = ({ label, value }: DateViewProps) => {
  return (
    <div className="panel__date-view">
      <label className="panel__date-view--label">{label}</label>
      <p className="panel__date-view--text">{value}</p>
    </div>
  );
};

export default DateView;

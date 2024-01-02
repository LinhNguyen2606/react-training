type TextViewProps = {
  label?: string;
  value?: string;
};

const TextView = ({ label, value }: TextViewProps) => {
  return (
    <div className="panel__form-group">
      <label className="panel__form-group--label">{label}</label>
      <p className="panel__form-group--text">{value}</p>
    </div>
  );
};

export default TextView;

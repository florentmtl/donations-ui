import { useId } from 'react';

export function MoneyInput({ className, nameText, name, onChange }) {
  const inputId = useId();
  return (
    <div className={className}>
      <label htmlFor={inputId}>{nameText}</label>
      <div className="input-group">
        <span className="input-group-text">$</span>
        <input className="form-control" type="number" id={inputId} name={name} onChange={onChange} />
        <span className="input-group-text">.00</span>
      </div>
    </div>
  );
}

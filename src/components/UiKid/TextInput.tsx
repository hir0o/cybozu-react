import React from 'react';
import PropTypes from 'prop-types';

const propType = {
  inputType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  className: '',
};

type Props = {
  inputType: string,
  placeholder: string,
  value: string,
  className?: string,
  id: string,
  label: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};

const TextInput: React.FC<Props> = ({
  inputType, placeholder, value, onChange, className, id, label,
}) => (
  <div>
    {label ? (
      <label className="text-gray-700" htmlFor={id}>{label}</label>
    ) : ''}
    {inputType === 'textarea' ? (
      <textarea
        placeholder={placeholder}
        value={value}
        id={id}
        cols={30}
        rows={10}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      />
    ) : (
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      />
    )}
  </div>
);

TextInput.propTypes = propType;
TextInput.defaultProps = defaultProps;

export default TextInput;

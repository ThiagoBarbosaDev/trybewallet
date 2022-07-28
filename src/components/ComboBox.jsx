import React from 'react';
import PropTypes from 'prop-types';

class Combobox extends React.Component {
  render() {
    const { value, onChange, data, name, dataTestId, ...otherProps } = this.props;
    return (
      <select
        data-testid={ dataTestId }
        name={ name }
        value={ value }
        onChange={ onChange }
        { ...otherProps }
      >
        {data.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
    );
  }
}

Combobox.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default Combobox;

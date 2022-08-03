import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { dataTestId, placeholder, className, label,
      children, type, name, value, checked, ...otherProps } = this.props;
    return (
      <input
        data-testid={ dataTestId }
        name={ name }
        id={ `input-${name}` }
        type={ type }
        value={ value }
        checked={ checked }
        placeholder={ placeholder }
        className={ className }
        { ...otherProps }
      />
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  breakpage: PropTypes.string,
  children: PropTypes.node,
};

Input.defaultProps = {
  value: '',
  checked: null,
  dataTestId: null,
  label: null,
  placeholder: null,
  className: null,
  breakpage: null,
  children: null,
};

export default Input;

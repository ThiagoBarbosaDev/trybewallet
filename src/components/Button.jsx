import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { dataTestId, children, type, className, ...otherProps } = this.props;
    return (
      <button
        className={ className }
        data-testid={ dataTestId }
        type="button"
        { ...otherProps }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  dataTestId: null,
  children: null,
  className: null,
};

export default Button;

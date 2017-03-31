import React from 'react';
import s from './styles.css';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${s.container}`}>
        <div className={`${s.contents}`}>
          <h1>- ERROR -</h1>
          <h3>Please refresh the page</h3>
          <div className={`${s.error_details}`}>
            <h3>Error Message</h3>
            <p>
              {this.props.error && this.props.error.message || 'No error message available..'}
            </p>
          </div>
          <div>
            <h3>Stack Trace</h3>
            <p>
              {this.props.error && this.props.error.stack || 'No stack trace available..'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;

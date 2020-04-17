import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './terms.scss';
import WizardHeader from '../../../components/WizardHeader';
import { shell } from 'electron';
import Checkbox from '../../../components/Checkbox';

const TERMS_URL = 'https://www.bobwallet.com/terms-of-service.html';

export default class Terms extends Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
  };

  state = {
    hasAccepted: false,
  };

  toggleTerms = () => this.setState({hasAccepted: !this.state.hasAccepted});

  render() {
    const {onAccept, currentStep, totalSteps, onBack} = this.props;
    const {hasAccepted} = this.state;

    return (
      <div className="terms">
        <WizardHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} />
        <div className="terms__content">
          <div className="terms__header_text">Terms of Service</div>
          <div className="terms_subheader">
            Please review and agree to Bob's{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                shell.openExternal(TERMS_URL);
              }}
            >
              Terms of Service
            </a>.
          </div>
          <div className="terms__checkbox-container">
            <Checkbox
              className="terms__checkbox"
              checked={hasAccepted}
              onChange={this.toggleTerms}
            />
            <span className="terms__checkbox-description">
              I accept the Terms of Service.
            </span>
          </div>
        </div>
        <div className="terms__footer">
          <button
            className="extension_cta_button terms_cta"
            onClick={onAccept}
            disabled={!hasAccepted}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

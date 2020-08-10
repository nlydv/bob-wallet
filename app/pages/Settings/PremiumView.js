import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as walletActions from "../../ducks/walletActions";
import * as nodeActions from "../../ducks/node";
import {setCustomRPCStatus} from "../../ducks/node";
import "./premium-view.scss";
import copy from "copy-to-clipboard";
import MiniModal from "../../components/Modal/MiniModal";
import Alert from "../../components/Alert";
import {BigNumber as bn} from "bignumber.js";

@withRouter
@connect(
  (state) => ({
    fees: state.node.fees,
  }),
  dispatch => ({
  }),
)
export default class PremiumView extends Component {
  state = {
    isConfirming: false,
    isSending: false,
    errorMessage: '',
  };

  renderReview() {
    return (
      <div className="premium-view__form">
        <div className="premium-view__form__title">
          Upgrade to Premium
        </div>
        <div className="premium-view__form__row">
          <div className="premium-view__form__row__label">
            1-year access
          </div>
          <div className="premium-view__form__row__value">
            500 HNS
          </div>
        </div>
        <div className="premium-view__form__footer">
          <button
            className="premium-view__form__footer__btn"
            onClick={() => this.setState({ isConfirming: true })}
          >
            Review & Upgrade
          </button>
        </div>
      </div>
    );
  }

  renderConfirming() {
    const { isSending, errorMessage, feeAmount } = this.state;
    const gasFee = this.props.fees['standard'];

    return (
      <div className="premium-view__form premium-view__confirm-form">
        <div className="send__header">
          <div className="send__title">Confirm Transaction</div>
        </div>
        <Alert type="error" message={errorMessage} />
        <div className="send__confirm__to">
          <div className="send__confirm__label">Sending to</div>
          <div className="send__confirm__address">hs1q46htmdgj2zwu8sxkv9zw4z6gcq4kcnqasck8jx</div>
        </div>
        <div className="send__confirm__from">
          <div className="send__confirm__label">Sending from</div>
          <div className="send__confirm__time-text">Default account</div>
        </div>
        <div className="send__confirm__summary">
          <div className="send__confirm__summary-amount">
            <div className="send__confirm__summary-label">
              Amount to send:
            </div>
            <div className="send__confirm__summary-value">500.00 HNS</div>
          </div>
          <div className="send__confirm__summary-fee">
            <div className="send__confirm__summary-label">Network Fee Rate:</div>
            <div className="send__confirm__summary-value">{gasFee} HNS/kB</div>
          </div>
          <div className="send__confirm__summary-fee">
            <div className="send__confirm__summary-label">Estimated Fee:</div>
            <div className="send__confirm__summary-value">{feeAmount}</div>
          </div>
          <div className="send__confirm__summary-total">
            <div className="send__confirm__summary-label">Total:</div>
            <div className="send__confirm__summary-value"></div>
          </div>
        </div>
        <div className="send__confirm__actions">
          <button
            className="send__confirm__cancel-btn"
            onClick={() => this.setState({isConfirming: false})}
            disabled={isSending}
          >
            Cancel
          </button>
          <button
            key="confirm"
            className="send__confirm__cta-btn"
            disabled={isSending}
          >
            {isSending ? <div className="send__confirm__spinner" /> : 'Confirm'}
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="premium-view">
        <div className="premium-view__intro">
          <div className="premium-view__intro__title">
            Get the most out of Bob
          </div>
          <div className="premium-view__intro__description">
            Upgrading to premium, you will get:
          </div>
          <div className="premium-view__intro__body">
            <div className="premium-view__intro__list-item">
              Unlimited API access to hosted Handshake node
            </div>
            <div className="premium-view__intro__list-item">
              Reveal your bids automatically without giving up controls of your key
            </div>
            <div className="premium-view__intro__list-item">
              Customizable Email/SMS auction alerts
            </div>
            <div className="premium-view__intro__list-item">
              Priority tech support
            </div>
            <div className="premium-view__intro__list-item">
              Early access to new features
            </div>
          </div>
        </div>
        { this.state.isConfirming ? this.renderConfirming() : this.renderReview() }
      </div>
    )
  }
}

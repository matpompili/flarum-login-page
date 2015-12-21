/*
* This file is part of flarum-login-page.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import Modal from 'flarum/components/Modal';
import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal';
import SignUpModal from 'flarum/components/SignUpModal';
import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import LogInButtons from 'flarum/components/LogInButtons';
import extractText from 'flarum/utils/extractText';
import {override} from 'flarum/extend';

export default class LogInModal extends Modal {
  init() {
    super.init();

    /**
     * The value of the email input.
     *
     * @type {Function}
     */
    this.email = m.prop(this.props.email || '');

    /**
     * The value of the password input.
     *
     * @type {Function}
     */
    this.password = m.prop(this.props.password || '');

    this.isDismissible = function() {return false};
  }

  className() {
    return 'LogInModal fullPage';
  }

  title() {
    return app.translator.trans('core.forum.log_in.title');
  }

  content() {
    return [
      <div className="Modal-body">
        <LogInButtons/>

        <div className="logo">
          <img src={app.forum.attribute('logoURL') ? app.forum.attribute('logoURL')
           : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=300x300&w=300&h=300'} />
          <h1>{app.forum.attribute('title')}</h1>
        </div>

        <div className="Form Form--centered">
          <div className="Form-group">
            <input className="FormControl" name="email" placeholder={extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder'))}
              value={this.email()}
              onchange={m.withAttr('value', this.email)}
              disabled={this.loading} />
          </div>

          <div className="Form-group">
            <input className="FormControl" name="password" type="password" placeholder={extractText(app.translator.trans('core.forum.log_in.password_placeholder'))}
              value={this.password()}
              onchange={m.withAttr('value', this.password)}
              disabled={this.loading} />
          </div>

          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
              children: app.translator.trans('core.forum.log_in.submit_button')
            })}
          </div>
        </div>
      </div>,
      <div className="Modal-footer">
        <p className="LogInModal-forgotPassword">
          <a onclick={this.forgotPassword.bind(this)}>{app.translator.trans('core.forum.log_in.forgot_password_link')}</a>
        </p>

        {app.forum.attribute('allowSignUp') ? (
          <p className="LogInModal-signUp">
            {app.translator.trans('core.forum.log_in.sign_up_text', {a: <a onclick={this.signUp.bind(this)}/>})}
          </p>
        ) : ''}
      </div>
    ];
  }

  /**
   * Open the forgot password modal, prefilling it with an email if the user has
   * entered one.
   *
   * @public
   */
  forgotPassword() {
    const email = this.email();
    const props = email.indexOf('@') !== -1 ? {email} : undefined;

    app.modal.show(new ForgotPasswordModal(props));
  }

  /**
   * Open the sign up modal, prefilling it with an email/username/password if
   * the user has entered one.
   *
   * @public
   */
  signUp() {
    const props = {password: this.password()};
    const email = this.email();
    props[email.indexOf('@') !== -1 ? 'email' : 'username'] = email;

    app.modal.show(new SignUpModal(props));
  }

  onready() {
    this.$('[name=' + (this.email() ? 'password' : 'email') + ']').select();
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    const email = this.email();
    const password = this.password();

    app.session.login(email, password, {errorHandler: this.onerror.bind(this)})
      .catch(this.loaded.bind(this));
  }

  onerror(error) {
    if (error.status === 401) {
      if (error.response.emailConfirmationRequired) {
        error.alert.props.children = app.translator.trans('core.forum.log_in.confirmation_required_message', {email: error.response.emailConfirmationRequired});
        delete error.alert.props.type;
      } else {
        error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
      }
    }

    super.onerror(error);
  }
}

override(LogInModal.prototype, 'view', function (){
  if (this.alert) {
    this.alert.props.dismissible = false;
  }

  return (
    <div className={'Modal modal-dialog ' + this.className()}>
      <div className="Modal-content">
        {this.isDismissible() ? (
          <div className="Modal-close App-backControl">
            {Button.component({
              icon: 'times',
              onclick: this.hide.bind(this),
              className: 'Button Button--icon Button--link'
            })}
          </div>
        ) : ''}

        <form onsubmit={this.onsubmit.bind(this)}>
          <div className="Modal-header">
            <h3 className="App-titleControl App-titleControl--text">{this.title()} -  ciao</h3>
          </div>

          {alert ? <div className="Modal-alert">{this.alert}</div> : ''}

          {this.content()}
        </form>
      </div>
    </div>
  );
});

System.register('matpompili/login-page/components/FullPageLogInModal', ['flarum/components/Modal', 'flarum/components/ForgotPasswordModal', 'flarum/components/SignUpModal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText', 'flarum/extend'], function (_export) {
  /*
  * This file is part of flarum-login-page.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var Modal, ForgotPasswordModal, SignUpModal, Alert, Button, LogInButtons, extractText, override, LogInModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal['default'];
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal['default'];
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons['default'];
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText['default'];
    }, function (_flarumExtend) {
      override = _flarumExtend.override;
    }],
    execute: function () {
      LogInModal = (function (_Modal) {
        babelHelpers.inherits(LogInModal, _Modal);

        function LogInModal() {
          babelHelpers.classCallCheck(this, LogInModal);
          babelHelpers.get(Object.getPrototypeOf(LogInModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(LogInModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(LogInModal.prototype), 'init', this).call(this);

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

            this.isDismissible = function () {
              return false;
            };
          }
        }, {
          key: 'className',
          value: function className() {
            return 'LogInModal fullPage';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.log_in.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(LogInButtons, null),
              m(
                'div',
                { className: 'logo' },
                m('img', { src: app.forum.attribute('logoURL') ? app.forum.attribute('logoURL') : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=300x300&w=300&h=300' }),
                m(
                  'h1',
                  null,
                  app.forum.attribute('title')
                )
              ),
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'email', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                    value: this.email(),
                    onchange: m.withAttr('value', this.email),
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                    value: this.password(),
                    onchange: m.withAttr('value', this.password),
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.log_in.submit_button')
                  })
                )
              )
            ), m(
              'div',
              { className: 'Modal-footer' },
              m(
                'p',
                { className: 'LogInModal-forgotPassword' },
                m(
                  'a',
                  { onclick: this.forgotPassword.bind(this) },
                  app.translator.trans('core.forum.log_in.forgot_password_link')
                )
              ),
              app.forum.attribute('allowSignUp') ? m(
                'p',
                { className: 'LogInModal-signUp' },
                app.translator.trans('core.forum.log_in.sign_up_text', { a: m('a', { onclick: this.signUp.bind(this) }) })
              ) : ''
            )];
          }

          /**
           * Open the forgot password modal, prefilling it with an email if the user has
           * entered one.
           *
           * @public
           */
        }, {
          key: 'forgotPassword',
          value: function forgotPassword() {
            var email = this.email();
            var props = email.indexOf('@') !== -1 ? { email: email } : undefined;

            app.modal.show(new ForgotPasswordModal(props));
          }

          /**
           * Open the sign up modal, prefilling it with an email/username/password if
           * the user has entered one.
           *
           * @public
           */
        }, {
          key: 'signUp',
          value: function signUp() {
            var props = { password: this.password() };
            var email = this.email();
            props[email.indexOf('@') !== -1 ? 'email' : 'username'] = email;

            app.modal.show(new SignUpModal(props));
          }
        }, {
          key: 'onready',
          value: function onready() {
            this.$('[name=' + (this.email() ? 'password' : 'email') + ']').select();
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            var email = this.email();
            var password = this.password();

            app.session.login(email, password, { errorHandler: this.onerror.bind(this) })['catch'](this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              if (error.response.emailConfirmationRequired) {
                error.alert.props.children = app.translator.trans('core.forum.log_in.confirmation_required_message', { email: error.response.emailConfirmationRequired });
                delete error.alert.props.type;
              } else {
                error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
              }
            }

            babelHelpers.get(Object.getPrototypeOf(LogInModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return LogInModal;
      })(Modal);

      _export('default', LogInModal);

      override(LogInModal.prototype, 'view', function () {
        if (this.alert) {
          this.alert.props.dismissible = false;
        }

        return m(
          'div',
          { className: 'Modal modal-dialog ' + this.className() },
          m(
            'div',
            { className: 'Modal-content' },
            this.isDismissible() ? m(
              'div',
              { className: 'Modal-close App-backControl' },
              Button.component({
                icon: 'times',
                onclick: this.hide.bind(this),
                className: 'Button Button--icon Button--link'
              })
            ) : '',
            m(
              'form',
              { onsubmit: this.onsubmit.bind(this) },
              m(
                'div',
                { className: 'Modal-header' },
                m(
                  'h3',
                  { className: 'App-titleControl App-titleControl--text' },
                  this.title(),
                  ' -  ciao'
                )
              ),
              alert ? m(
                'div',
                { className: 'Modal-alert' },
                this.alert
              ) : '',
              this.content()
            )
          )
        );
      });
    }
  };
});;
System.register('matpompili/login-page/main', ['flarum/extend', 'flarum/components/IndexPage', 'flarum/components/DiscussionPage', 'matpompili/login-page/components/FullPageLogInModal'], function (_export) {
  /*
  * This file is part of flarum-login-page.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var extend, IndexPage, DiscussionPage, FullPageLogInModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsIndexPage) {
      IndexPage = _flarumComponentsIndexPage['default'];
    }, function (_flarumComponentsDiscussionPage) {
      DiscussionPage = _flarumComponentsDiscussionPage['default'];
    }, function (_matpompiliLoginPageComponentsFullPageLogInModal) {
      FullPageLogInModal = _matpompiliLoginPageComponentsFullPageLogInModal['default'];
    }],
    execute: function () {

      app.initializers.add('matpompili-login-page', function (app) {
        extend(IndexPage.prototype, 'init', function () {
          if (!app.session.user) {
            var myModal = new FullPageLogInModal();
            app.modal.show(myModal);
            $(myModal.element.parentNode).addClass('fullPage').css('padding-right', '');
          }
        });

        extend(DiscussionPage.prototype, 'init', function () {
          if (!app.session.user) {
            var myModal = new FullPageLogInModal();
            app.modal.show(myModal);
            $(myModal.element.parentNode).addClass('fullPage').css('padding-right', '');
          }
        });
      });
    }
  };
});
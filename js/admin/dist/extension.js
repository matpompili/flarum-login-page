System.register('matpompili/login-page/components/LoginPageSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
  /*
  * This file is part of flarum-login-page.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var SettingsModal, LoginPageSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal['default'];
    }],
    execute: function () {
      LoginPageSettingsModal = (function (_SettingsModal) {
        babelHelpers.inherits(LoginPageSettingsModal, _SettingsModal);

        function LoginPageSettingsModal() {
          babelHelpers.classCallCheck(this, LoginPageSettingsModal);
          babelHelpers.get(Object.getPrototypeOf(LoginPageSettingsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(LoginPageSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'LoginPageSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Login Page Settings';
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('matpompili-login-page.admin.logoURL')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.login-page.logoURL') })
            )];
          }
        }]);
        return LoginPageSettingsModal;
      })(SettingsModal);

      _export('default', LoginPageSettingsModal);
    }
  };
});;
System.register('matpompili/login-page/main', ['flarum/extend', 'flarum/app', 'matpompili/login-page/components/LoginPageSettingsModal'], function (_export) {
  /*
  * This file is part of flarum-login-page.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var extend, app, LoginPageSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_matpompiliLoginPageComponentsLoginPageSettingsModal) {
      LoginPageSettingsModal = _matpompiliLoginPageComponentsLoginPageSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('matpompili-login-page', function (app) {
        app.extensionSettings['matpompili-login-page'] = function () {
          return app.modal.show(new LoginPageSettingsModal());
        };
      });
    }
  };
});
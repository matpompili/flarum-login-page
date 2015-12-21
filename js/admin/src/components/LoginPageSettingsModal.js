/*
* This file is part of flarum-login-page.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import SettingsModal from 'flarum/components/SettingsModal';

export default class LoginPageSettingsModal extends SettingsModal {
  className() {
    return 'LoginPageSettingsModal Modal--small';
  }

  title() {
    return 'Login Page Settings';
  }

  form() {
    return [
      <div className="Form-group">
      <label>{app.translator.trans('matpompili-login-page.admin.logoURL')}</label>
          <input className="FormControl" bidi={this.setting('matpompili.login-page.logoURL')}/>
      </div>
    ];
  }
}

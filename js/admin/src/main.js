/*
* This file is part of flarum-login-page.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import { extend } from 'flarum/extend';
import app from 'flarum/app';

import LoginPageSettingsModal from 'matpompili/login-page/components/LoginPageSettingsModal';

app.initializers.add('matpompili-login-page', app => {
  app.extensionSettings['matpompili-login-page'] = () => app.modal.show(new LoginPageSettingsModal());
});

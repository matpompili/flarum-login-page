/*
* This file is part of flarum-login-page.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage'
// import DiscussionPage from 'flarum/components/DiscussionPage'
import FullPageLogInModal from 'matpompili/login-page/components/FullPageLogInModal'

app.initializers.add('matpompili-login-page', app => {
  extend(IndexPage.prototype, 'init', function(){
    if(!app.session.user) {
      var myModal = new FullPageLogInModal();
      app.modal.show(myModal);
      $(myModal.element.parentNode).addClass('fullPage').css('padding-right', '');
    }
  });

  // extend(DiscussionPage.prototype, 'init', function(){
  //   if(!app.session.user) {
  //     var myModal = new FullPageLogInModal();
  //     app.modal.show(myModal);
  //     $(myModal.element.parentNode).addClass('fullPage').css('padding-right', '');
  //   }
  // });
});

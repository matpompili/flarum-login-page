<?php namespace Matpompili\Login\Page\Listeners;

/*
* This file is part of flarum-login-page.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;

class LoadSettingsFromDatabase {
  protected $settings;

  public function __construct(SettingsRepositoryInterface $settings) {
    $this->settings = $settings;
  }

  public function subscribe(Dispatcher $events) {
    $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
  }
  /*
  * Get the setting values from the database and make them available
  * in the forum.
  */
  public function prepareApiAttributes(PrepareApiAttributes $event) {
    if ($event->isSerializer(ForumSerializer::class)) {
      $event->attributes['logoURL'] = $this->settings->get('matpompili.login-page.logoURL');
    }
  }
}

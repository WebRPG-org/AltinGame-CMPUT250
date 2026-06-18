//=============================================================================
// Clear Map Photos
// Version: 1.0.0
//=============================================================================
var Imported = Imported || {};
Imported.Kru_ClearMapPhotos = "1.0.0";
//=============================================================================
/*:
 * @plugindesc 1.0.0 Clear Map Photos - Remove photos from the map on load.
 *
 * @author Krues8dr (krues8dr.com)
 *
 * Information
 *
 * This plugin automatically clears all previously-loaded pictures when a map is
 * loaded.  This makes it easy to automatically unload pictures for parallax
 * maps.
 *
 * Terms & Conditions
 * This plugin is free for both non-commercial and commercial use.
 */

(function() {
  "use strict";

  var _originalMapLoadedCallback = Scene_Map.prototype.onMapLoaded;

  Scene_Map.prototype.onMapLoaded = function() {
    $gameScreen.clearPictures();
    _originalMapLoadedCallback.call(this);

  }

})();
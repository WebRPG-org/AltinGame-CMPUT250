//=============================================================================
// QCulling
//=============================================================================

var Imported = Imported || {};
Imported.QCulling = '1.0.1';

//=============================================================================
 /*:
 * @plugindesc <QCulling>
 * @author Quxios  | Version 1.0.1
 *
 * @help
 * ============================================================================
 * ## About
 * ============================================================================
 * Culls out sprites that are not on screen. Can increases performance on maps
 * with a lot of sprites that are lagging due to having many sprites.
 * ============================================================================
 * ## Terms of use
 * ============================================================================
 * This is a private plugin for Quxios's personal project. This is only
 * released for T3+ Patreons. Those that were given this plugin are free to use
 * it for any of their projects. But avoid sharing it and giving it away as
 * this is your reward and would be unfair if others get it for free.
 * ============================================================================
 * ## Links
 * ============================================================================
 * RPGMakerWebs:
 *
 *  http://forums.rpgmakerweb.com/index.php?threads/qplugins.73023/
 *
 * Like my plugins? Support me on Patreon!
 *
 *  https://www.patreon.com/quxios
 *
 * @tags culling
 */
//=============================================================================

//=============================================================================
// QCulling

(function() {
  var _PADDING = 20;

  //-----------------------------------------------------------------------------
  // Sprite

  Object.defineProperty(Sprite.prototype, 'visible', {
    get() {
      return this._visible && !this._cull;
    },
    set(bool) {
      this._visible = bool;
    }
  });

  var Alias_Sprite_update = Sprite.prototype.update;
  Sprite.prototype.update = function() {
    Alias_Sprite_update.call(this);
    if (this.needsCulling()) {
      this.updateCulling();
    }
  };

  Sprite.prototype.needsCulling = function() {
    var scene = SceneManager._scene;
    if (scene.constructor !== Scene_Map) return false;
    if (!scene._spriteset) return false;
    var spriteset = scene._spriteset;
    var tilemap = spriteset._tilemap;
    if (this.parent !== tilemap || this.parent !== spriteset) return false;
    if (this._dontCull) return false;
    return true
  };

  Sprite.prototype.updateCulling = function() {
    var camX = $gameMap.displayX();
    var camY = $gameMap.displayY();
    if (this.prevX !== this.x || this.prevY !== this.y || this.prevCamX !== camX || this.prevCamY !== camY) {
      var w = this.width;
      var h = this.height;
      var x = this.x - (this.anchor.x * w);
      var y = this.y - (this.anchor.y * h);
      var minX = -_PADDING - w;
      var minY = -_PADDING - h;
      var maxX = Graphics.width + _PADDING + w;
      var maxY = Graphics.height + _PADDING + h;
      var insideX = x >= minX && x <= maxX;
      var insideY = y >= minY && y <= maxY;
      this._cull = !insideX || !insideY;
      this.prevX = this.x;
      this.prevY = this.y;
      this.prevCamX = camX;
      this.prevCamY = camY;
    }
  };
})()

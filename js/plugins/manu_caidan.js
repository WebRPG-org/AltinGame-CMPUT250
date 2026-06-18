//=============================================================
/*更改菜单的各种样式
*/
//============================================================


(function(){

  //初始化
  Scene_Menu.prototype.create = function() {
      Scene_MenuBase.prototype.create.call(this);
      this.createCommandWindow();
      //this.createGoldWindow();
      this.createCommandImages();
      this.createStatusWindow();

  };

  Scene_Menu.prototype.createCommandImages = function(){
      //this._itemButton = new Sprite();
      this._saveButton = new Sprite();
      this._saveButton.setClickHandler(this.commandSave.bind(this));
      this._saveButton.y = 100;

      this._loadButton = new Sprite();
      this._loadButton.setClickHandler(this.commandLoad.bind(this));
      this._loadButton.y = 180;

      this._optionButton = new Sprite();
      this._optionButton.setClickHandler(this.commandOptions.bind(this));
      this._optionButton.y = 260;

      this._endButton = new Sprite();
      this._endButton.setClickHandler(this.commandOptions.bind(this));
      this._endButton.y = 340;


      this.addChild( this._saveButton );
      this.addChild( this._loadButton );
      this.addChild( this._optionButton );
      this.addChild( this._endButton );

  }

  //更新菜单变化
  Scene_Menu.prototype.update = function(){

    //将菜单的预设控制载入
    Scene_MenuBase.prototype.update.call(this);

    //控制图片切换的样式
    switch( this._commandWindow._index){
      case 0:
        this._saveButton.bitmap = ImageManager.loadPicture('save1');
        this._loadButton.bitmap = ImageManager.loadPicture('load0');
        this._optionButton.bitmap = ImageManager.loadPicture('option0');
        this._endButton.bitmap = ImageManager.loadPicture('end0');
      break;

      case 1:
        this._saveButton.bitmap = ImageManager.loadPicture('save0');
        this._loadButton.bitmap = ImageManager.loadPicture('load1');
        this._optionButton.bitmap = ImageManager.loadPicture('option0');
        this._endButton.bitmap = ImageManager.loadPicture('end0');
      break;

      case 2:
        this._saveButton.bitmap = ImageManager.loadPicture('save0');
        this._loadButton.bitmap = ImageManager.loadPicture('load0');
        this._optionButton.bitmap = ImageManager.loadPicture('option1');
        this._endButton.bitmap = ImageManager.loadPicture('end0');
      break;

      case 3:
        this._saveButton.bitmap = ImageManager.loadPicture('save0');
        this._loadButton.bitmap = ImageManager.loadPicture('load0');
        this._optionButton.bitmap = ImageManager.loadPicture('option0');
        this._endButton.bitmap = ImageManager.loadPicture('end1');
      break;
    }

  }

  Scene_Menu.prototype.start = function() {
      Scene_MenuBase.prototype.start.call(this);
      this._statusWindow.refresh();
  };

  Scene_Menu.prototype.createCommandWindow = function() {
      this._commandWindow = new Window_MenuCommand(0, 0);
      this._commandWindow.visible = false;
      this._commandWindow.x = Graphics.boxWidth;
      this._commandWindow.y = Graphics.boxHeight;
      //this._commandWindow.setHandler('item',      this.commandItem.bind(this));
      //this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
      //this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
      //this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
      //this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
      //this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
      this._commandWindow.setHandler('save',      this.commandSave.bind(this));
      this._commandWindow.setHandler('load',      this.commandLoad.bind(this)); //new stuff
      this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
      this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
      this.addWindow(this._commandWindow);
  };

  Window_MenuCommand.prototype.addMainCommands = function() {
      var enabled = this.areMainCommandsEnabled();
      //if (this.needsCommand('item')) {
      //    this.addCommand(TextManager.item, 'item', enabled);
      //}
      //if (this.needsCommand('skill')) {
      //    this.addCommand(TextManager.skill, 'skill', enabled);
      //}
      //if (this.needsCommand('equip')) {
      //    this.addCommand(TextManager.equip, 'equip', enabled);
      //}
      //if (this.needsCommand('status')) {
      //    this.addCommand(TextManager.status, 'status', enabled);
      //}

  };

  Scene_MenuBase.prototype.createBackground = function() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadTitle1('Sword');//SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
  };

  //new load function
  Scene_Menu.prototype.commandLoad = function(){
    SceneManager.push( Scene_Load );
  }

  Window_MenuCommand.prototype.makeCommandList = function() {
      this.addMainCommands();
      //this.addFormationCommand();
      //this.addOriginalCommands();
      this.addSaveCommand();
      this.addLoadCommand();
      this.addOptionsCommand();
      this.addGameEndCommand();
  };

  Window_MenuCommand.prototype.addLoadCommand = function(){
    this.addCommand('load','load', true)
  }







})();

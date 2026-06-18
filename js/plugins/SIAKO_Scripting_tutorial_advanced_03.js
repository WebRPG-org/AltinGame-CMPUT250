//=============================================================================
 /*:
 * @plugindesc SIAKO_customMenu v0.80 自訂遊戲菜單樣式
 * @author Siako Chen
 *
 * @help
 * plugin Command useage:
 * N/A
 */
//=============================================================================

(function(){

	//初始化建立菜單
	Scene_Menu.prototype.create = function() {
	    Scene_MenuBase.prototype.create.call(this);
	    this.createCommandWindow();
	    this.createCommandImages();
	};

	//建立圖片化選項
	Scene_Menu.prototype.createCommandImages = function(){

		// Sprite 圖形化宣告
		// Sprite_Button 圖形化按鈕宣告

		this._itemButton = new Sprite_Button();
		this._itemButton.setClickHandler(this.commandItem.bind(this));
		this._itemButton.y = 100;
		this._itemButton.x = 540;


		this._saveButton = new Sprite_Button();
		this._saveButton.setClickHandler(this.commandSave.bind(this));
		this._saveButton.y = 180;
		this._saveButton.x = 540;

		this._loadButton = new Sprite_Button();
		this._loadButton.setClickHandler(this.commandLoad.bind(this));
		this._loadButton.y = 260;
		this._loadButton.x = 540;

		this._optionsButton = new Sprite_Button();
		this._optionsButton.setClickHandler(this.commandOptions.bind(this));
		this._optionsButton.y = 340;
		this._optionsButton.x = 540;

		this._endButton = new Sprite_Button();
		this._endButton.setClickHandler(this.commandGameEnd.bind(this));
		this._endButton.y = 420;
		this._endButton.x = 540;
		this.addChild( this._saveButton );
		this.addChild( this._loadButton );
		this.addChild( this._optionsButton );
		this.addChild( this._endButton );


	}

	//更新菜單的圖片變化
	Scene_Menu.prototype.update = function(){

		//將菜單的預設控制選擇載入
		Scene_MenuBase.prototype.update.call(this);

		//控制圖片切換的樣式
		switch( this._commandWindow._index ){

			//物品
			case 0:
				this._itemButton.bitmap = ImageManager.loadPicture('menuBtn_01');
				this._saveButton.bitmap = ImageManager.loadPicture('menuBtn_02o');
				this._loadButton.bitmap = ImageManager.loadPicture('menuBtn_03o');
				this._optionsButton.bitmap = ImageManager.loadPicture('menuBtn_04o');
				this._endButton.bitmap = ImageManager.loadPicture('menuBtn_05o');

			break;

			//存檔
			case 1:
				this._itemButton.bitmap = ImageManager.loadPicture('menuBtn_01o');
				this._saveButton.bitmap = ImageManager.loadPicture('menuBtn_02');
				this._loadButton.bitmap = ImageManager.loadPicture('menuBtn_03o');
				this._optionsButton.bitmap = ImageManager.loadPicture('menuBtn_04o');
				this._endButton.bitmap = ImageManager.loadPicture('menuBtn_05o');
			break;

			//讀檔
			case 2:
				this._itemButton.bitmap = ImageManager.loadPicture('menuBtn_01o');
				this._saveButton.bitmap = ImageManager.loadPicture('menuBtn_02o');
				this._loadButton.bitmap = ImageManager.loadPicture('menuBtn_03');
				this._optionsButton.bitmap = ImageManager.loadPicture('menuBtn_04o');
				this._endButton.bitmap = ImageManager.loadPicture('menuBtn_05o');
			break;

			//選項
			case 3:
				this._itemButton.bitmap = ImageManager.loadPicture('menuBtn_01o');
				this._saveButton.bitmap = ImageManager.loadPicture('menuBtn_02o');
				this._loadButton.bitmap = ImageManager.loadPicture('menuBtn_03o');
				this._optionsButton.bitmap = ImageManager.loadPicture('menuBtn_04');
				this._endButton.bitmap = ImageManager.loadPicture('menuBtn_05o');
			break;

			//離開
			case 4:
				this._itemButton.bitmap = ImageManager.loadPicture('menuBtn_01o');
				this._saveButton.bitmap = ImageManager.loadPicture('menuBtn_02o');
				this._loadButton.bitmap = ImageManager.loadPicture('menuBtn_03o');
				this._optionsButton.bitmap = ImageManager.loadPicture('menuBtn_04o');
				this._endButton.bitmap = ImageManager.loadPicture('menuBtn_05');
			break;

		}
	}

	Scene_Menu.prototype.start = function() {
	    Scene_MenuBase.prototype.start.call(this);
	};

	//菜單功能綁定
	Scene_Menu.prototype.createCommandWindow = function() {
	    this._commandWindow = new Window_MenuCommand(0, 0);

	    this._commandWindow.visible = false; //隱藏預設菜單
	    this._commandWindow.x = Graphics.boxWidth;
	    this._commandWindow.y = Graphics.boxHeight;

	    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
	    this._commandWindow.setHandler('save',      this.commandSave.bind(this));
	    this._commandWindow.setHandler('load',      this.commandLoad.bind(this));
	    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
	    this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
	    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
	    this.addWindow(this._commandWindow);
	};

	//新增一個讀取功能
	Scene_Menu.prototype.commandLoad = function(){
		SceneManager.push( Scene_Load );
	}

	Window_MenuCommand.prototype.addMainCommands = function() {
	    var enabled = this.areMainCommandsEnabled();

	    if (this.needsCommand('item')) {
	        this.addCommand(TextManager.item, 'item', enabled);
	    }
	};

	//建立菜單背景
	/*Scene_MenuBase.prototype.createBackground = function() {
	    this._backgroundSprite = new Sprite();

	    //物品功能背景
	    if( SceneManager._scene instanceof Scene_Item ){

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('Book');

	    //存檔功能背景
	    }else if( SceneManager._scene instanceof Scene_Save ){

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('Gates');

	    //讀檔功能背景
	    }else if( SceneManager._scene instanceof Scene_Load ){

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('Sword');

	    //選項功能背景
	    }else if( SceneManager._scene instanceof Scene_Options ){

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('Hexagram');

	    //離開功能背景
	    }else if( SceneManager._scene instanceof Scene_GameEnd ){

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('Castle');

	    //菜單起始背景
	    }else{

	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1('CrossedSwords');

	    }

	    this.addChild(this._backgroundSprite);
	};*/

	Window_MenuCommand.prototype.makeCommandList = function() {
	    this.addMainCommands();
	    this.addSaveCommand();
	    this.addLoadCommand();
	    this.addOptionsCommand();
	    this.addGameEndCommand();
	};

	Window_MenuCommand.prototype.addLoadCommand = function(){
		this.addCommand( '讀取進度', 'load', true );
	}

})();

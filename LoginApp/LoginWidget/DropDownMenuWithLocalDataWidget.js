define(["dojo/_base/declare",
        "dojo/_base/lang",
        "LoginWidget/DropDownMenuUtils",
        "LoginWidget/DropDownMenuWidget"],
	function(declare,
			 lang,
			 ddmUtils,
			 DropDownMenu){
		return declare(DropDownMenu, {
			localData: [],
			
			constructor: function(opts) {
				if (opts) this.localData = opts.local;
			},
        	
			getItems: function() {
				return this.localData;
			}			
		});	
	}	
);
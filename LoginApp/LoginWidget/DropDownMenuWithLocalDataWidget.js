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
        	
			update: function() {
    			var items = ddmUtils.extendEmailServers(this.localData, this.target.value);
    			this.fillItems(items);
				return this.localData;
			}			
		});	
	}	
);
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "LoginWidget/DropDownMenuWidget"],
	function(declare,
			 lang,
			 DropDownMenu){
		return declare([DropDownMenu], {
			localData: null,
			
			constructor: function(opts) {
				this.inherited(arguments);
				if (lang.isArray(opts)) this.localData = opts.servers;
			}
			
		});	
	}	
);
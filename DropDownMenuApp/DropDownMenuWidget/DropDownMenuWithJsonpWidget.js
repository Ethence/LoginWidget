define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/request/script",
        "dojo/json",
        "DropDownMenuWidget/DropDownMenuUtils",
        "DropDownMenuWidget/DropDownMenuWidget"],
	function(declare,
			 lang,
			 script,
			 JSON,
			 ddmUtils,
			 DropDownMenu){
		return declare(DropDownMenu, {
			url: null,
			
			constructor: function(opts) {
				if (opts) this.url = opts.url;
			},
        	
			update: function() {
				var self = this;
				script.get(this.url, {
					jsonp: "callback"
				}).then(
						function(data) {
			    			var items = ddmUtils.extendEmailServers(data, self.target.value);
			    			self.fillItems(items);
						},
						function(error) {
							console.log(error);
						}
				);
			}			
		});	
	}	
);
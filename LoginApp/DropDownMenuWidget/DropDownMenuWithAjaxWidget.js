define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/request",
        "dojo/json",
        "DropDownMenuWidget/DropDownMenuUtils",
        "DropDownMenuWidget/DropDownMenuWidget"],
	function(declare,
			 lang,
			 request,
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
				request.get(this.url, {
					handleAs: "json"
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
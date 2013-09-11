define([], function(){
		return {
	        deleteAllSpaces : function (txt) {
	            if (txt) return txt.replace(/\s+/g, "");
	            else return txt;
	        },
	        
	        extractEmailServer : function (userInput) {
	            var s = "";
	            var p = userInput.indexOf("@");
	            if (p !== -1) s = userInput.slice(p+1);
	            return s;
	        },
	        
	        extendEmailServers : function(serverList, userInput) {
	            var matchServers = [];
	            userInput = this.deleteAllSpaces(userInput);
	            var u = userInput;
	            var p = userInput.indexOf("@");
	            if (p != -1) {
	                u = userInput.slice(0, p);
	                var s = userInput.slice(p+1).toLowerCase();
	                if (s) {
	                    for (var i = 0; i < serverList.length; i++) {
	                        if (serverList[i].indexOf(s) === 0) matchServers.push(serverList[i]);
	                    }
	                }
	                else matchServers = serverList;
	            }
	            else matchServers = serverList;
	            if (u) {
	                var strs = [];
	                for (var i = 0; i < matchServers.length; i++) {
	                    var str = u+"@"+matchServers[i];
	                    if (str != userInput) strs.push(str);
	                }
	                return strs;
	            }
	            else return [];
	        },
		};
	}
);
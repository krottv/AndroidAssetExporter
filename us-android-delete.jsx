/*!
 * Android Assets for Photoshop
 * =============================
 *
 * Version: 1.0.0
 * Author: Vladislav Krot
 * Licensed under the MIT license
 */



// Photoshop variables
var resolutionsObj = {

		xxxxhdpi : {
			density : 6.0/originalResolution
		},

		xxxhdpi : {
			density : 4.0/originalResolution
		},

		xxhdpi : {
			density : 3.0/originalResolution
		},

		xhdpi : {
			density : 2.0/originalResolution
		},

		hdpi : {
			density : 1.5/originalResolution
		},

		mdpi : {
			density : 1.0/originalResolution
		}
	};


// Initialize
init();

function init() {
    
    //resize and save
	for(resolution in resolutionsObj) {

		deleteFile(resolution);
	}
}

function deleteFile(resolution){
	var split = activeLayer.name.split(":");

	var fileName;
	if(split.length != 2){
	    fileName = activeLayer.name;
	}else{
	    fileName=split[0];
	}
	fileName = fileName.replace(/\.[^\.]+$/, '');


	var docFolder = Folder(docPath + '/drawable-' + resolution);

	var saveFile = File(docFolder + "/" + fileName + ".png");
	saveFile.remove();
}

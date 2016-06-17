﻿/*!
 * Android Assets for Photoshop
 * =============================
 *
 * Version: 1.0.0
 * Author: Vladislav Krot
 * Licensed under the MIT license
 */



// Photoshop variables
var docRef = app.activeDocument,
	docName = docRef.name,
	docPath = docRef.path,	

	//this variable should be edited. Can be one of values (not index) in the array below. 
	originalResolution = 2.0, //xhdpi

	resolutionsObj = {
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
	var tempDocName = app.activeDocument.activeLayer.name.replace(/\.[^\.]+$/, ''),
		docFolder = Folder(docPath + '/drawable-' + resolution);

	var saveFile = File(docFolder + "/" + tempDocName + ".png");
	saveFile.remove();
}
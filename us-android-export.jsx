/*!
 * Android Assets for Photoshop
 * =============================
 *
 * Version: 1.0.0
 * Author: Gaston Figueroa (Uncorked Studios)
 * Site: uncorkedstudios.com
 * Licensed under the MIT license
 */


// Photoshop variables
var docRef = app.activeDocument,
	activeLayer = docRef.activeLayer,
	activeLayer2,
	docName = docRef.name,
	docPath = docRef.path,	

	doCreateNewDocument = true,

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
    
    // save current ruler unit settings, so we can restore it
    var ru = app.preferences.rulerUnits;
    
    // set ruler units to pixel to ensure scaling works as expected
    app.preferences.rulerUnits = Units.PIXELS; 

	if(!isDocumentNew()) {
		
		//create new trimmed document
		if(doCreateNewDocument){
			dupToNewFile();
		}

		//clear cache history to avoid errors
		app.purge (PurgeTarget.HISTORYCACHES);

		//save history
		var history = app.activeDocument.historyStates.length - 1;

		//resize and save
		for(resolution in resolutionsObj) {

			saveFunc(resolution);

			//back to the history
			app.activeDocument.activeHistoryState = app.activeDocument.historyStates[history];
		}

		// Close the document without saving or just remove history
		if(doCreateNewDocument){

			activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		}else{
			app.purge (PurgeTarget.HISTORYCACHES);
		}

	} else {
		alert("Please save your document before running this script.");
	}

    // restore old ruler unit settings
    app.preferences.rulerUnits = ru;
}

// Test if the document is new (unsaved)
// http://2.adobe-photoshop-scripting.overzone.net/determine-if-file-has-never-been-saved-in-javascript-t264.html

function isDocumentNew(doc){
	// assumes doc is the activeDocument
	cTID = function(s) { return app.charIDToTypeID(s); }
	var ref = new ActionReference();
	ref.putEnumerated( cTID("Dcmn"),
	cTID("Ordn"),
	cTID("Trgt") ); //activeDoc
	var desc = executeActionGet(ref);
	var rc = true;
		if (desc.hasKey(cTID("FilR"))) { // FileReference
		var path = desc.getPath(cTID("FilR"));
		
		if (path) {
			rc = (path.absoluteURI.length == 0);
		}
	}
	return rc;
};


function resizeDoc(document, resolution) {

	var percentage = resolutionsObj[resolution].density * 100;
	app.preferences.rulerUnits = Units.PERCENT;  
 
	document.resizeImage(percentage,undefined,undefined,ResampleMethod.BICUBIC); 
}




function dupToNewFile() {	
	var split = activeLayer.name.split(":");

	var fileName;
	if(split.length != 2){
	    fileName = activeLayer.name;
	}else{
	    fileName=split[0];
	}
	fileName = fileName.replace(/\.[^\.]+$/, '');

	var calcWidth  = Math.ceil(activeLayer.bounds[2] - activeLayer.bounds[0]),
		calcHeight = Math.ceil(activeLayer.bounds[3] - activeLayer.bounds[1]),
		docResolution = docRef.resolution,
		document = app.documents.add(calcWidth, calcHeight, docResolution, fileName, NewDocumentMode.RGB,
		DocumentFill.TRANSPARENT);

	app.activeDocument = docRef;

	// Duplicated selection to a temp document
	activeLayer.duplicate(document, ElementPlacement.INSIDE);

	// Set focus on temp document
	app.activeDocument = document;

	// Assign a variable to the layer we pasted inside the temp document
	activeLayer2 = document.activeLayer;

	// Center the layer
	activeLayer2.translate(-activeLayer2.bounds[0],-activeLayer2.bounds[1]);

	document.trim(TrimType.TRANSPARENT,true,true,true,true);

	if(split.length == 2){
		split = split[1].split("x");
		var width = parseInt(split[0],10);
		var height = parseInt(split[1],10);

		document.resizeCanvas(width, height);  
	}
}

function saveFunc(resolution) {
	
	var tempDoc = app.activeDocument;
	
	resizeDoc(tempDoc, resolution);

	// Merge all layers inside the temp document
	//tempDoc.activeLayer.merge(); obsolete

	var tempDocName = tempDoc.name.replace(/\.[^\.]+$/, ''),
		docFolder = Folder(docPath + '/drawable-' + resolution);

	if(!docFolder.exists) {
		docFolder.create();
	}

	var saveFile = File(docFolder + "/" + tempDocName + ".png");

	var sfwOptions = new ExportOptionsSaveForWeb(); 
	sfwOptions.format = SaveDocumentType.PNG; 
	sfwOptions.includeProfile = false; 
	sfwOptions.interlaced = 0; 
	sfwOptions.optimized = true; 
	sfwOptions.quality = 100;
	sfwOptions.PNG8 = false;

	// Export the layer as a PNG
	activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);

}
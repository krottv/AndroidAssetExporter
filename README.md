# AndroidAssetExporter
Script file for adobe photoshop for exporting android assets as png in one click for four screen densities.

## What does it do?

1. Duplicate focused layer to new document
2. Trim transparent pixels
3. May be add transparent pixels if size is specified
4. Resize document
5. Save it to folder (xhdpi for example)
6. Repeat for every resolution

## Installation
1. Download the script here

2. Move the **.jsx** file to your Photoshop scripts folder:

	- Mac: **/Applications/Adobe Photoshop.../Presets/Scripts/**
	- PC 64bit: **C:\Program Files\Adobe\Adobe Photoshop... (64 Bit)\Presets\Scripts\**
	- PC 32bit: **C:\Program Files\Adobe\Adobe Photoshop...\Presets\Scripts\**
	
3. Optional. Create actions to make it super fast.

## Note
* The script supposes that your original psd file is xhdpi. If you have different then open us-android-export, find originalResolution variable and set to your's. 
* If you want your icon to be in specific size (with transparent pixels around). Name your layer like this "icon_search:64x64" first is width, second is height.

## us-android-export 
This script exports focused layer as png in folders xxhdpi, xhdpi, hdpi, mdpi near your .psd location. With trimming of transparent pixels.

## us-android-export-thisfile
This script exports current document as png in folders xxhdpi, xhdpi, hdpi, mdpi near your .psd location. WITHOUT trimmin.

## us-android-delete
Deletes files in folders xxhdpi, xhdpi, hdpi, mdpi with name of focused layer. Sometimes useful if you saved layer with wrong name.

## License
It is fork of https://github.com/UncorkedStudios/export-to-android/. You can modify and use it everywhere.

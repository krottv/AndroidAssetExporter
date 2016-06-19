# AndroidAssetExporter
Script file for adobe photoshop for exporting android assets as png in one click for four screen densities. You can find [complete tutorial here](https://medium.com/@neokrot/how-to-export-assets-from-psd-for-android-in-one-click-cd122ead4299#.4q74hdxxe), how to cut psd with help of this script.

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

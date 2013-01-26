/*==========================================================

Device Art Generator - Photoshop Script
Author: Ashung Hung. 
Mail: ashung.hung@gmail.com
Dribbble: dribbble.com/ashung
     
============================================================
HOW TO USE

Parameter                       Parameter type  What it does
createDeviceArt
   ([deviceId]                  String          Id list in devices array. 
                                                like: 'nexus_4', 'iPhone5_white'.     
    [, isPortrait]              Boolean         Ture to use portrait mode, (default: true). 
    [, transparentBackground]   Boolean         Background of Psd document, (default: true). 
    [, hasShadow]               Boolean         Shadow of devices, (default: true). 
    [, hasLight])               Boolean         glare of device, (default: true). 

like: 
    createDeviceArt('nexus_4'); //Google Nexus 4 device with transparent background.
or
    createDeviceArt('iPhone4s_white', true, false); //iPhone 4s white device with white background.
or
    createDeviceArt('iPhone5_black_3d', true, false); //iPhone 5 3D view
    
==========================================================*/

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

var root = $.fileName.slice(0, $.fileName.lastIndexOf('/', $.fileName.lastIndexOf('/')-1));
var deviceFramesPath = root + '/DeviceFrames/';
var devices = [

{id: 'nexus_4',                    title: 'Nexus 4',               density: 'XHDPI',   landOffset: [349,214],  portOffset: [213,350],  screenSize: [768,1280],  landDoc: [1994,1195], portDoc: [1195,1994]},
{id: 'nexus_7',                    title: 'Nexus 7',               density: '213dpi',  landOffset: [347,268],  portOffset: [262,329],  screenSize: [800,1280],  landDoc: [1974,1329], portDoc: [1329,1938]},
{id: 'nexus_10',                   title: 'Nexus 10',              density: 'XHDPI',   landOffset: [227,217],  portOffset: [217,223],  screenSize: [800,1280],  landDoc: [1730,1248], portDoc: [1248,1730],   actualResolution: [1600,2560]},
{id: 'xoom',                       title: 'Motorola XOOM',         density: 'MDPI',    landOffset: [218,191],  portOffset: [199,200],  screenSize: [800,1280],  landDoc: [1700,1198], portDoc: [1198,1700]},
{id: 'galaxy_nexus',               title: 'Galaxy Nexus',          density: 'XHDPI',   landOffset: [371,199],  portOffset: [216,353],  screenSize: [720,1280],  landDoc: [1994,1148], portDoc: [1148,1994]},
{id: 'nexus_s',                    title: 'Nexus S',               density: 'HDPI',    landOffset: [247,135],  portOffset: [134,247],  screenSize: [480,800],   landDoc: [1308,749],  portDoc: [749,1308]},
{id: 'htc_one_x',                  title: 'htc One X',             density: 'XHDPI',   landOffset: [346,211],  portOffset: [302,306],  screenSize: [720,1280],  landDoc: [1984,1159], portDoc: [1331,1942]},
{id: 'samsung_galaxy_note',        title: 'SAMSUNG Galaxy Note',   density: 'XHDPI',   landOffset: [353,209],  portOffset: [289,312],  screenSize: [800,1280],  landDoc: [1977,1243], portDoc: [1377,1933]},
{id: 'samsung_galaxy_s3',          title: 'SAMSUNG Galaxy s3',     density: 'XHDPI',   landOffset: [346,211],  portOffset: [302,307],  screenSize: [720,1280],  landDoc: [1984,1159], portDoc: [1331,1942]},
{id: 'samsung_galaxy_tab_2_7inch', title: 'SAMSUNG Galaxy Tab 2',  density: 'HDPI',    landOffset: [230,203],  portOffset: [274,222],  screenSize: [600,1024],  landDoc: [1490,1026], portDoc: [1147,1495]},

{id: 'iPad2_black', title: 'iPad 2 Black', landOffset: [0,0], portOffset: [223,373], screenSize: [768,1024], landDoc: [0,0], portDoc: [1209,1784]},
{id: 'iPad2_white', title: 'iPad 2 White', landOffset: [0,0], portOffset: [223,373], screenSize: [768,1024], landDoc: [0,0], portDoc: [1209,1784]},
{id: 'iPhone4s_black', title: 'iPhone 4s Black', landOffset: [0,0], portOffset: [202,363], screenSize: [640,960], landDoc: [0,0], portDoc: [1044,1904]},
{id: 'iPhone4s_white', title: 'iPhone 4s White', landOffset: [0,0], portOffset: [202,363], screenSize: [640,960], landDoc: [0,0], portDoc: [1044,1904]},
{id: 'iPhone5_black', title: 'iPhone 5 Black', landOffset: [0,0], portOffset: [198,336], screenSize: [640,1136], landDoc: [0,0], portDoc: [1038,1900]},
{id: 'iPhone5_white', title: 'iPhone 5 White', landOffset: [0,0], portOffset: [198,336], screenSize: [640,1136], landDoc: [0,0], portDoc: [1038,1900]},
{id: 'iPadMini_black', title: 'iPad Mini Black', landOffset: [0,0], portOffset: [248,181], screenSize: [768,1024], landDoc: [0,0], portDoc: [1264,1600]},
{id: 'iPadMini_white', title: 'iPad Mini White', landOffset: [0,0], portOffset: [248,181], screenSize: [768,1024], landDoc: [0,0], portDoc: [1209,1600]},
{id: 'iPhone5_black_3d', title: 'iPhone5 Black 3D', view: '3d', landOffset: [0,0], portOffset: [0,0], screenSize: [640,1136], landDoc: [2400,2400], portDoc: [2400,2400]},
{id: 'iPhone5_white_3d', title: 'iPhone5 White 3D', view: '3d', landOffset: [0,0], portOffset: [0,0], screenSize: [640,1136], landDoc: [2400,2400], portDoc: [2400,2400]}

];

function createDeviceArt(deviceId, isPortrait, transparentBackground, hasShadow, hasLight) {
    var currentDevice, devicePath,
        docName, docWidth, docHeight,
        screenWidth, screenHeight,
        actualScreenWidth, actualScreenHeight,
        landOffsetX, landOffsetY, portOffsetX, portOffsetY,
        shadowImage, landShadowImage, portShadowImage,
        deviceImage, landDeviceImage, portDeviceImage,
        lightImage, landLightImage, portLightImage;
    if(arguments[1]  == undefined) { isPortrait = true; }
    if(arguments[2]  == undefined) { transparentBackground = true; }
    if(arguments[3]  == undefined) { hasShadow = true; }
    if(arguments[4]  == undefined) { hasLight = true; }
    for(var i = 0; i < devices.length; i ++) {
        if(devices[i].id == deviceId) {
            currentDevice = devices[i];
            devicePath = deviceFramesPath + deviceId;
            docName = currentDevice.title;
            docWidth = isPortrait ? currentDevice.portDoc[0] : currentDevice.landDoc[0];
            docHeight = isPortrait ? currentDevice.portDoc[1] : currentDevice.landDoc[1];
            screenWidth = isPortrait ? currentDevice.screenSize[0] : currentDevice.screenSize[1];
            screenHeight = isPortrait ? currentDevice.screenSize[1] : currentDevice.screenSize[0];
            if('actualResolution' in currentDevice) {
                actualScreenWidth = isPortrait ? currentDevice.actualResolution[0] : currentDevice.actualResolution[1];
                actualScreenHeight = isPortrait ? currentDevice.actualResolution[1] : currentDevice.actualResolution[0];
            } else {
                actualScreenWidth = screenWidth;
                actualScreenHeight = screenHeight;
            }
            landOffsetX = currentDevice.landOffset[0];
            landOffsetY = currentDevice.landOffset[1];
            portOffsetX = currentDevice.portOffset[0];
            portOffsetY = currentDevice.portOffset[1];
            offsetX = isPortrait ? portOffsetX : landOffsetX;
            offsetY = isPortrait ? portOffsetY : landOffsetY;
            landShadowImage = devicePath + '/land_shadow.png';
            portShadowImage = devicePath + '/port_shadow.png';
            shadowImage = (isPortrait || currentDevice.view == '3d') ? portShadowImage : landShadowImage;
            landDeviceImage = devicePath + '/land_back.png';
            portDeviceImage = devicePath + '/port_back.png';
            deviceImage = (isPortrait || currentDevice.view == '3d') ? portDeviceImage : landDeviceImage;
            landLightImage = devicePath + '/land_fore.png';
            portLightImage = devicePath + '/port_fore.png';
            lightImage = (isPortrait || currentDevice.view == '3d') ? portLightImage : landLightImage;
            break;
        }
    }

    if(!currentDevice) {
        var msg = {
            en: 'Can\'t found the infomation of device.\ndeviceId: %1.',
            zh: '无法找到设备信息. \n设备ID: %1.'
        };
        alert(localize(msg, deviceId));
        return false;
    }

    // lose image
    var assetImage = [shadowImage, deviceImage, lightImage];
    var loseImage = false;
    var loseImageMsg = {
            en: 'Lose some images.',
            zh: '缺失部分图片.'
        };
    for(var i = 0; i < assetImage.length; i ++) {
        if(!File(assetImage[i]).exists) {
            loseImage = true;
            for(var j in loseImageMsg) {
                eval('loseImageMsg.' + j + '= loseImageMsg.' + j + '+"\r/"+' + deviceId + '+"/"+' + assetImage[i].name);
            }
        }
    }
    if(loseImage) {
        alert(localize(loseImageMsg));
        return false;
    }

    var orginInterpolation = null;
    try {
        orginInterpolation = app.preferences.interpolation;
    } catch(e){}
    
    // New Document
    if(transparentBackground == true) {
        newDoc(docName, docWidth, docHeight);
    } else {
        newWhiteDoc(docName, docWidth, docHeight);
    }
    
    // Import Shadow Image
    if(hasShadow) {
        activeDocument.artLayers.add();
        convertToSmartObject();
        smartObjectReplaceContents(shadowImage);
        activeDocument.activeLayer.name = 'shadow';
    }

    // Import Device Image
    activeDocument.artLayers.add();
    convertToSmartObject();
    smartObjectReplaceContents(deviceImage);
    activeDocument.activeLayer.name = 'device';
    
    if(transparentBackground == true) {
        removeBottomLayer();
    }

    // Screen
    if(currentDevice.view == '3d') {
        activeDocument.artLayers.add();
        convertToSmartObject();
        smartObjectReplaceContents(devicePath + '/design_3d_view.psb');
        editSmartObject();
        var design3DViewWidth = activeDocument.activeLayer.bounds[2].as('px') - activeDocument.activeLayer.bounds[0].as('px');
        var design3DVieweight = activeDocument.activeLayer.bounds[3].as('px') - activeDocument.activeLayer.bounds[1].as('px');
        app.preferences.interpolation = ResampleMethod.BICUBICSHARPER;
    } else {
        rect(offsetX, offsetY, screenWidth, screenHeight, '000000', 'screen');
        convertToSmartObject();
    }
    // Import Design Image
    try {
        var msg = {
            en: 'Choose your design file. Image size: %1 x %2 image.',
            zh: '选择要导入的设计文件. 图像尺寸为: %1 x %2 px.'
        }
        var designImage = File.openDialog(localize(msg, actualScreenWidth, actualScreenHeight));
        
        smartObjectReplaceContents(designImage);
        
    } catch(e) {
        alert(e.message);
    }

    if (designImage != null) {
        var designImageWidth = activeDocument.activeLayer.bounds[2].as('px') - activeDocument.activeLayer.bounds[0].as('px');
        var designImageHeight = activeDocument.activeLayer.bounds[3].as('px') - activeDocument.activeLayer.bounds[1].as('px');
        if(currentDevice.view == '3d') {
            if(designImageWidth != design3DViewWidth || designImageHeight != design3DVieweight) {
                var msg = {
                    en: 'Your design must match %1 width and %2 height. If not, Photoshop can\'t import the design. \rPlease import the design yourself use menu "Layer" - "Smart Objects" - "Repleace Contents...".',
                    zh: '你的设计稿必须为%1宽和%2高. 否则Ps将不会自动载入会导致错位的. \r请从"图层"-"智能对象"-"替换内容"手动选择合适图片.'
                }
                alert(localize(msg));
                activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            } else {
                activeDocument.close(SaveOptions.SAVECHANGES);
            }
        } else {
            activeDocument.activeLayer.name = 'design';
            // Resize Sesign Layer
            if(designImageWidth != screenWidth || designImageHeight != screenHeight) {
                if(designImageWidth == actualScreenWidth && designImageHeight == actualScreenHeight) {
                    app.preferences.interpolation = ResampleMethod.BILINEAR;
                    activeDocument.activeLayer.resize(actualScreenWidth * 100 / designImageWidth, actualScreenHeight * 100 / designImageHeight, AnchorPosition.TOPLEFT);
                } else {
                    var msg = {
                        en: 'Your design is no match the screen size, Do you want to resize image?',
                        zh: '你的设计与屏幕尺寸不匹配, 是否要改变图像大小?'
                    }
                    if(confirm(localize(msg))) {
                        if(designImageWidth > screenWidth) {
                            app.preferences.interpolation = ResampleMethod.BILINEAR;
                        } else if (screenWidth % designImageWidth == 0) {
                            app.preferences.interpolation = ResampleMethod.NEARESTNEIGHBOR;
                        } else {
                            app.preferences.interpolation = ResampleMethod.BICUBICSMOOTHER;
                        }
                        activeDocument.activeLayer.resize(screenWidth * 100 / designImageWidth, screenHeight * 100 / designImageHeight, AnchorPosition.TOPLEFT);
                    }
                }
                var newPosX = activeDocument.activeLayer.bounds[0].as('px');
                var newPosY = activeDocument.activeLayer.bounds[1].as('px');
                var x = new UnitValue(newPosX > offsetX ? Math.abs(newPosX-offsetX)*-1 : Math.abs(newPosX-offsetX), 'px');
                var y = new UnitValue(newPosY > offsetY ? Math.abs(newPosY-offsetY)*-1 : Math.abs(newPosY-offsetY), 'px');
                activeDocument.activeLayer.translate(x, y);
            }
        }
    }

    // Import Light Image
    if(hasLight) {
        activeDocument.artLayers.add();
        convertToSmartObject();
        smartObjectReplaceContents(lightImage);
        activeDocument.activeLayer.name = 'light';
    }

    if(orginInterpolation) {
        app.preferences.interpolation = orginInterpolation;
    }

}

function newDoc(docName, docWidth, docHeight) {
    preferences.rulerUnits = Units.PIXELS;
    documents.add(docWidth, docHeight, 72, docName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
}

function newWhiteDoc(docName, docWidth, docHeight) {
    preferences.rulerUnits = Units.PIXELS;
    documents.add(docWidth, docHeight, 72, docName, NewDocumentMode.RGB, DocumentFill.WHITE);
}

function convertToSmartObject() {
    executeAction(sTID('newPlacedLayer'), undefined, DialogModes.NO);
}

function editSmartObject() {
    executeAction(sTID('placedLayerEditContents'), undefined, DialogModes.NO);
}

function smartObjectReplaceContents(filePath) {
    var file = new File(filePath);
    if(!file.exists) {
        return false;
    } else {
        var desc1 = new ActionDescriptor();
            desc1.putPath(cTID('null'), file);
        executeAction(sTID('placedLayerReplaceContents'), desc1, DialogModes.NO);
    }
}

function rect(posX, posY, width, height, fillColor, layerName) {
    rectPath(posX, posY, width, height);
    fillPath(fillColor, layerName);
    deselectPath();
}

function rectPath(posX, posY, width, height) {
    var top = posY;
    var left = posX;
    var bottom = height + posY;
    var right = width + posX;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putProperty(cTID('Path'), cTID('WrPt'));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), top);
        desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), left);
        desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), bottom);
        desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), right);
        desc1.putObject(cTID('T   '), cTID('Rctn'), desc2);
    executeAction(cTID('setd'), desc1, DialogModes.NO);
}

function fillPath(fillColor, layerName) {
    var color = new SolidColor();
        color.rgb.red = parseInt(fillColor.substr(0,2), 16);
        color.rgb.green = parseInt(fillColor.substr(2,2), 16);
        color.rgb.blue = parseInt(fillColor.substr(4,2), 16);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putClass(sTID("contentLayer"));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putString(cTID('Nm  '), layerName);
    var desc3 = new ActionDescriptor();
    var desc4 = new ActionDescriptor();
        desc4.putDouble(cTID('Rd  '), color.rgb.red);
        desc4.putDouble(cTID('Grn '), color.rgb.green);
        desc4.putDouble(cTID('Bl  '), color.rgb.blue);
        desc3.putObject(cTID('Clr '), sTID("RGBColor"), desc4);
        desc2.putObject(cTID('Type'), sTID("solidColorLayer"), desc3);
        desc1.putObject(cTID('Usng'), sTID("contentLayer"), desc2);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);    
}

function removeBottomLayer() {
    activeDocument.layers[activeDocument.layers.length - 1].remove();
}

function deselectPath() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Path'));
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('Dslc'), desc1, DialogModes.NO);    
}

// Type the code below, like: createDeviceArt('iPhone4s_white', true, false);



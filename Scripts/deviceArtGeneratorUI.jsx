/*==========================================================

Device Art Generator - Photoshop Script
Author: Ashung Hung
Mail: ashung.hung@gmail.com
Dribbble: dribbble.com/ashung
    
==========================================================*/

#target photoshop
#include 'deviceArtGenerator.jsx';

app.bringToFront();

var lang = {
    title: {
        en: 'Device Art Genertator',
        zh: '设备效果生成工具'
    },
    mainGroupTitle: {
        en: 'Device and Design',
        zh: '设备与设计文件'
    },
    devicesLabel: {
        en: 'Choose Devices:',
        zh: '选择设备:'
    },
    docsLabel: {
        en: 'Opened Doc As Design:',
        zh: '已打开文件作为设计文件:'
    },
    designLabel: {
        en: 'Choose Design:',
        zh: '选择设计文件:'
    },
    chooseBtn: {
        en: 'Choose...',
        zh: '选择...'
    },
    optionGroupTitle: {
        en: 'Options',
        zh: '选项'
    },
    portraitText: {
        en: 'Portrait Mode',
        zh: '竖向模式'
    },
    transparentText: {
        en: 'Transparent Background',
        zh: '透明背景'
    },
    shadowText: {
        en: 'Generate Shadow Layer',
        zh: '生成投影图层'
    },
    foregroundText: {
        en: 'Generate Foreground Layer',
        zh: '生成前景图层'
    },
    emptyText: {
        en: 'No Import Design',
        zh: '不导入设计文件'
    },
    foreText: {
        en: 'Generate',
        zh: '生成前景图层'
    },
    okBtnText: {
        en: 'Generate',
        zh: '生成'
    },
    chooseAnotherFile: {
        en: 'Choose another file...',
        zh: '选择其他文件...'
    },
    chooseFileMsg: {
        en: 'Please choose your design file.',
        zh: '请选择要导入的设计文件. '
    },
    fileNotExistsMsg: {
        en: 'File is not exists.',
        zh: '文件不存在. '
    },
    openDesignTitle: {
        en: 'Choose your design file. Image size: %1 x %2 px.',
        zh: '选择要导入的设计文件. 图像尺寸为: %1 x %2 px.'
    }
};

var layoutRes = 
"dialog {\
    text: '" + localize(lang.title) + "',\
    alignChildren: 'fill',\
    main: Panel {\
        orientation: 'column',\
        text: '" + localize(lang.mainGroupTitle) + "',\
        margins: 15,\
        alignChildren: 'left',\
        device: Group {\
            orientation: 'row',\
            label: StaticText { text: '" + localize(lang.devicesLabel) + "', characters: 19, justify: 'right'},\
            select: DropDownList { size: [210, 20] }\
        },\
        designDoc: Group {\
            orientation: 'row',\
            label: StaticText { text: '" + localize(lang.docsLabel) + "', characters: 19, justify: 'right'},\
            select: DropDownList { size: [210, 20]}\
        },\
        designImage: Group {\
            orientation: 'row',\
            label: StaticText { text: '" + localize(lang.designLabel) + "', characters: 19, justify: 'right'},\
            input: EditText { size: [140, 20], enabled: false},\
            choose: Button { text: '" + localize(lang.chooseBtn) + "', size: [60, 20]}\
        }\
    },\
    options: Panel {\
        orientation: 'column',\
        text: '" + localize(lang.optionGroupTitle) + "',\
        margins: 15,\
        alignChildren: 'left',\
        portrait: Group {\
            orientation: 'row',\
            checkbox: Checkbox { value: true },\
            label: StaticText { text: '" + localize(lang.portraitText) + "'}\
        },\
        transparent: Group {\
            orientation: 'row',\
            checkbox: Checkbox { value: false },\
            label: StaticText { text: '" + localize(lang.transparentText) + "'}\
        },\
        shadow: Group {\
            orientation: 'row',\
            checkbox: Checkbox { value: true },\
            label: StaticText { text: '" + localize(lang.shadowText) + "'}\
        },\
        foreground: Group {\
            orientation: 'row',\
            checkbox: Checkbox { value: true },\
            label: StaticText { text: '" + localize(lang.foregroundText) + "'}\
        }\
    },\
    buttons: Group {\
        orientation: 'row',\
        alignment: 'right',\
        okBtn: Button {\
            text: '" + localize(lang.okBtnText) + "'\
        }\
    }\
}";

var win = new Window(layoutRes);
    win.center();

// Device DropDownList
var deviceDropDownList = win.main.device.select;
var deviceId = devices[0].id;
var deviceOnlyPortrait = false;
var deviceOnlyLandscape = false;
var docOnlyPortrait = false;
var docOnlyLandscape = false;
for(var i = 0; i < devices.length; i ++) {
    var actualResolution = devices[i].actualResolution ? (' (' + devices[i].actualResolution[0] + 'x' + devices[i].actualResolution[1] + 'px)') : '';
    var text = devices[i].title + ': ' + devices[i].screenSize[0] + 'x' + devices[i].screenSize[1] + 'px' + actualResolution;
    deviceDropDownList.add('item', text);
}
deviceDropDownList.onChange = function() {
    deviceId = devices[this.selection.index].id;
    if(devices[this.selection.index].landOffset == '0,0' && devices[this.selection.index].portOffset != '0,0') {
        deviceOnlyPortrait = true;
        deviceOnlyLandscape = false;
        win.options.portrait.checkbox.value = true;
        win.options.portrait.checkbox.enabled = false;
    } else if (devices[this.selection.index].landOffset != '0,0' && devices[this.selection.index].portOffset == '0,0') {
        deviceOnlyPortrait = false;
        deviceOnlyLandscape = true;
        win.options.portrait.checkbox.value = false;
        win.options.portrait.checkbox.enabled = false;
    } else if(devices[this.selection.index].view == '3d'){
        deviceOnlyPortrait = true;
        deviceOnlyLandscape = false;
        win.options.portrait.checkbox.value = true;
        win.options.portrait.checkbox.enabled = false;
    } else {
        deviceOnlyPortrait = false;
        deviceOnlyLandscape = false;
        win.options.portrait.checkbox.enabled = true;
        
        if(docOnlyPortrait) {
            win.options.portrait.checkbox.value = true;
            win.options.portrait.checkbox.enabled = false;
        }
        if(docOnlyLandscape) {
            win.options.portrait.checkbox.value = false;
            win.options.portrait.checkbox.enabled = false;
        }
    }
}
deviceDropDownList.selection = deviceDropDownList.items[0];

// Design 
var docDropDownList = win.main.designDoc.select;
var designInput = win.main.designImage.input;
var designChoose = win.main.designImage.choose;
var designFilePath = '';
var designFileArray = [];
for(var i = 0; i < documents.length; i ++) {
    try {
        if(documents[i].fullName) {
            docDropDownList.add('item', documents[i].name + ' ('+ documents[i].width.as('px') + 'x' + documents[i].height.as('px') + 'px)');
            designFileArray.push(documents[i]);
        }
    } catch(e){}
}
docDropDownList.add('item', localize(lang.emptyText));
docDropDownList.add('item', localize(lang.chooseAnotherFile));
designInput.enabled = false;
designChoose.enabled = false;
docDropDownList.onChange = function() {
    if(this.selection.index < designFileArray.length) {
        designInput.enabled = false;
        designChoose.enabled = false;
        designInput.text = '';
        designFilePath = designFileArray[this.selection.index].fullName.absoluteURI;

        var targetDoc = designFileArray[this.selection.index];
        activeDocument = targetDoc;
        if(targetDoc.width.as('px') > targetDoc.height.as('px')) {
            docOnlyPortrait = false;
            docOnlyLandscape = true;
            win.options.portrait.checkbox.value = false;
            win.options.portrait.checkbox.enabled = false;
        } else {
            docOnlyPortrait = true;
            docOnlyLandscape = false;
            win.options.portrait.checkbox.value = true;
            win.options.portrait.checkbox.enabled = false;
        }
        if(deviceOnlyPortrait) {
            win.options.portrait.checkbox.value = true;
            win.options.portrait.checkbox.enabled = false;
        }
        if(deviceOnlyLandscape) {
            win.options.portrait.checkbox.value = false;
            win.options.portrait.checkbox.enabled = false;
        }
    } else {
        if(this.selection.index == designFileArray.length) {
            designInput.enabled = false;
            designChoose.enabled = false;
            designInput.text = '';
            designFilePath = null;
        } else {
            designInput.enabled = true;
            designChoose.enabled = true;
            designFilePath = designInput.text;
        }
        docOnlyPortrait = false;
        docOnlyLandscape = false;
        win.options.portrait.checkbox.value = true;
        win.options.portrait.checkbox.enabled = true;
        if(deviceOnlyPortrait) {
            win.options.portrait.checkbox.value = true;
            win.options.portrait.checkbox.enabled = false;
        }
        if(deviceOnlyLandscape) {
            win.options.portrait.checkbox.value = false;
            win.options.portrait.checkbox.enabled = false;
        }
    }
}
designChoose.onClick = function() {
    try{
        var currentDevice = devices[deviceDropDownList.selection.index];
        var isPortrait = win.options.portrait.checkbox.value;
        var width;
        var height;
        if('actualResolution' in currentDevice) {
            width = isPortrait ? currentDevice.actualResolution[0] : currentDevice.actualResolution[1];
            height = isPortrait ? currentDevice.actualResolution[1] : currentDevice.actualResolution[0];
        } else {
            width = isPortrait ? currentDevice.screenSize[0] : currentDevice.screenSize[1];
            height = isPortrait ? currentDevice.screenSize[1] : currentDevice.screenSize[0];
        }        
        var tmp = File.openDialog(localize(lang.openDesignTitle, width, height), 'PNG: *.png, Photoshop File: *.psd; *.psb');
        designInput.text = tmp.fullName;
        designFilePath = tmp.fullName;
    } catch(e) {}
}
designInput.onChange = function() {
    designFilePath = this.text;
}
docDropDownList.selection = docDropDownList.items[0];

// Options CheckBox 
var optionItems = ['portrait', 'transparent', 'shadow', 'foreground'];
for(var i = 0; i < optionItems.length; i ++) {
    win.options[optionItems[i]].label.onClick = function () {
        var tmp = this.parent;
        tmp.checkbox.value = (tmp.checkbox.value == true) ? false : true;
    }
}

// Button Event
win.buttons.okBtn.onClick = function() {
    var designFile = File(designFilePath);
    var isPortrait = win.options.portrait.checkbox.value;
    var transparentBackground = win.options.transparent.checkbox.value;
    var hasShadow = win.options.shadow.checkbox.value;
    var hasForeground = win.options.foreground.checkbox.value;
    if(designFilePath == null) {
        designFile = null;
        //alert(deviceId+', '+ designFile + ', ' + isPortrait +', ' + transparentBackground +', ' + hasShadow +', ' + hasForeground);
        createDeviceArt(deviceId, designFile, isPortrait, transparentBackground, hasShadow, hasForeground);
        win.hide();
    } else {
        if(!designFile.exists) {
            if(/^\s*$/.test(designFilePath)) {
                alert(localize(lang.chooseFileMsg));
            } else {
                alert(localize(lang.fileNotExistsMsg));
            }
            return false;
        } else {
            //alert(deviceId+', '+ designFile + ', ' + isPortrait +', ' + transparentBackground +', ' + hasShadow +', ' + hasForeground);
            createDeviceArt(deviceId, designFile, isPortrait, transparentBackground, hasShadow, hasForeground);
            win.hide();
        }
    }
}

win.show();

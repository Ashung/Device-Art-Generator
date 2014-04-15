# Device Art Generator for Photoshop #

Photoshop Scripts for iOS and Android UI designers to generate the device art. 

### How to use ###

##### Dialog, The Easy Way. #####

Run "Scripts/deviceArtGeneratiorUI.jsx" set the Device, Design and Options, then press the "Generate" button.

##### Separate File #####

<table>
<tr><th>Parameter</th><th>Parameter type</th><th>What it does</th></tr>
<tr><td><code>createDeviceArt([deviceId]</code></td><td><code>String</code></td><td>Id list in devices array.<br>like: <code>'nexus_4'</code>, <code>'iPhone5_white'</code>.</td></tr>
<tr><td><code>[, designFile]</code></td><td><code>NULL,Boolean,File</code></td><td>Null and Boolen will open a dialog to choose a file.</td></tr>
<tr><td><code>[, isPortrait] </code></td><td><code>Boolean </code></td><td>Ture to use portrait mode, (default: true).</td></tr>
<tr><td><code>[, transparentBackground] </code></td><td><code>Boolean </code></td><td>Background of Psd document, (default: true).</td></tr>
<tr><td><code>[, hasShadow] </code></td><td><code>Boolean </code></td><td>Shadow of devices, (default: true).</td></tr>
<tr><td><code>[, hasForeground]);</code></td><td><code>Boolean  </code></td><td>glare of device, (default: true).</td></tr>
</table>

Create a new jsx file in "Device_Art_Generator/Scripts" folder. Open and type  the code below:

    #target photoshop
    #include 'deviceArtGenerator.jsx';
    app.bringToFront();

    createDeviceArt('iPhone5_black', true, true, false);

You can change the last line like below: 

    createDeviceArt('nexus_4'); //Google Nexus 4 device with transparent background.

or

    createDeviceArt('iPhone4s_white', true, true, false); //iPhone 4s white device with white background.

or

    createDeviceArt('iPhone5_black_3d'); //iPhone 5 3D view with transparent background.

or
    
    createDeviceArt('iPhone4s_black', null); //iPhone 4s black device without design.

or
    
    createDeviceArt('iPhone5_black', activeDocument.fullName, true, false, true, true); //Use current document as design.

or
    
    createDeviceArt('iPhone5_black', File('~/design.psd'), true, false, true, true); //Use a exists document as design.
    
Save document, double click the jsx file to run. If has trouble go to Photoshop, run this script form the 'File' -> 'Scripts' -> 'Browse...' menu.

### Support Devices:

<table>
<tr><th>Device</th><th>ID</th><th>Portrait</th><th>Landscape</th><th>Screen resolution (px)</th></tr>
<tr><td colspan="5">Android Mobile and Tablet</td></tr>
<tr><td>Nexus 4</td><td>nexus_4</td><td>Y</td><td>Y</td><td>768x1280</td></tr>
<tr><td>Nexus 7</td><td>nexus_7</td><td>Y</td><td>Y</td><td>800x1280</td></tr>
<tr><td>Nexus 10</td><td>nexus_10</td><td>Y</td><td>Y</td><td>800x1280 (1600x2560)</td></tr>
<tr><td>Motorola XOOM</td><td>xoom</td><td>Y</td><td>Y</td><td>800x1280</td></tr>
<tr><td>Galaxy Nexus</td><td>galaxy_nexus</td><td>Y</td><td>Y</td><td>720x1280</td></tr>
<tr><td>nexus_s</td><td>nexus_s</td><td>Y</td><td>Y</td><td>480x800</td></tr>
<tr><td>htc One X</td><td>htc_one_x</td><td>Y</td><td>Y</td><td>720x1280</td></tr>
<tr><td>SAMSUNG Galaxy Note</td><td>samsung_galaxy_note</td><td>Y</td><td>Y</td><td>800x1280</td></tr>
<tr><td>SAMSUNG Galaxy s3</td><td>samsung_galaxy_s3</td><td>Y</td><td>Y</td><td>720x1280</td></tr>
<tr><td>SAMSUNG Galaxy Tab 2</td><td>samsung_galaxy_tab_2_7inch</td><td>Y</td><td>Y</td><td>600x1024</td></tr>

<tr><td colspan="5">iOS Mobile and Tablet</td></tr>
<tr><td>iPad 2 Black/White</td><td>iPad2_black, iPad2_white</td><td>Y</td><td>-</td><td>768x1024</td></tr>
<tr><td>iPad 2 Black/White Perspective</td><td>iPad2_black_perspective, iPad2_white_perspective</td><td>-</td><td>-</td><td>1024x768</td></tr>
<tr><td>iPhone 4s Black/White</td><td>iPhone4s_black, iPhone4s_white</td><td>Y</td><td>Y</td><td>640x960</td></tr>
<tr><td>iPhone 5 Black/White</td><td>iPhone5_black, iPhone5_white</td><td>Y</td><td>Y</td><td>640x1136</td></tr>
<tr><td>iPad 3 Black/White</td><td>iPad3_black, iPad3_white</td><td>Y</td><td>Y</td><td>1536x2048</td></tr>
<tr><td>iPad Mini Black/White</td><td>iPadMini_black, iPadMini_white</td><td>Y</td><td>-</td><td>768x1024</td></tr>
<tr><td>iPhone 5 3D Black/White</td><td>iPhone5_black_3d, iPhone5_white_3d</td><td>-</td><td>-</td><td>640x1136</td></tr>
</table>


### THANKS ###

All Android devices image download from [Device Art Generator](http://developer.android.com/distribute/promote/device-art.html) and [android-ui-utils project](http://android-ui-utils.googlecode.com). 

All iPhone and iPad image download from [Pixeden.com](http://www.pixeden.com) 

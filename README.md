# ION DRIVER - Ionic 5 Taxi Booking Complete App (V2.0.2)
This is the Driver component of the Taxi Booking Complete App - MVP

This is an ionic project for integrating firebase to your application and retrieving and adding data in real-time. You need to have Firestore, Cordova and Ionic 5.0.0 installed on the system to run it successfully.

Detailed documentation of the full platform featurs and working can be found at [Taxi Booking Complete Platform](https://enappd.gitbook.io/ionic-taxi-booking-app-starter/)

## Using this project

#### Node

This project is tested on latest stable version of Node 12.16.1. Make sure you have a node version close to this.

You can download the correct version from the [download page](https://nodejs.org/en/download/) for node.


To verify the node installation, open a new terminal window and run:

```
$ node --version
$ npm --version
```

#### Cordova

You must have cordova installed prior to this. Install Cordova using


```
$ npm install -g cordova
```

The `ios-sim` and `ios-deploy` are utilities that deploy apps to the iOS simulator and iOS devices during development. They can be installed globally with npm.

```
$ npm install -g ios-sim
$ brew install ios-deploy
```

#### Ionic

Install Ionic globally using

```
$ npm install -g ionic
```

## Installation of this project

* Extract the zip file you received after purchase

* Install npm dependencies

```
$ npm install
```
* Install Resources
```
$ ionic cordova resources
```
* Install Firebase (Automatically installed with `npm install`)
```
$ npm install @angular/fire firebase --save
```

* Add Platform (whichever required)
```
$ ionic cordova platform add android

$ ionic cordova platform add ios
```

in few cases, you might need to install the latest platform

```
$ ionic cordova platform add android@latest

$ ionic cordova platform add ios@latest
```
* Install Plugins (whichever required. All included plugins are installed automatically with `npm i`)

```
$ ionic cordova plugin add YOUR_PLUGIN_NAME
```

* Add Firebase config to environments variable. Check [How to connect Firebase with Ionic 5 App](https://enappd.com/blog/connect-firebase-with-ionic-5-app/134/) for details about how to get Firebase configuration variables from your Firebase account

Please note, this Firebase project should be the same as the one connected to other two apps - User and Admin app

```
export const environment = {
    production: false,
    firebase: {
        apiKey: '<your-key>',
        authDomain: '<your-project-authdomain>',
        databaseURL: '<your-database-URL>',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>',
        messagingSenderId: '<your-messaging-sender-id>'
    }
};

```

* Add Google Map API key

1. In the `package.json` file

```
"cordova-plugin-googlemaps": {
   "API_KEY_FOR_ANDROID": "<Google Map API Key>",
}
```

Details about getting Google Maps API key [here](https://developers.google.com/maps/documentation/embed/get-api-key)

2. In `config.xml` file

```

<preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="<Google Map API Key>" />

<plugin name="cordova-plugin-googlemaps" spec="^2.6.2">

<variable name="API_KEY_FOR_ANDROID" value="<Google Map API Key>" />

</plugin>

```
3. In `environment.ts` file (`environment.prod.ts` for production version)


```
        After adding the AngularFireModule you also need to add modules for the individual @NgModules that your application needs.

        AngularFireAuthModule
        AngularFireDatabaseModule
        AngularFireFunctionsModule
        AngularFirestoreModule
        AngularFireStorageModule
        AngularFireMessagingModule

```
* Open the Firebase Console and create a new project.

* In Database section, choose Get Started button for Cloud Firestore.

* Choose Mode

* Click Enable

* Initialize the new git
    ```git init```

* Setup the new git remotes accordingly
    ```git remote add origin new remote```


* Install Plugins (whichever required)

```
    $ ionic cordova plugin add YOUR_PLUGIN_NAME
```


## Plugins List

```
      "cordova-plugin-geolocation",
      "cordova-plugin-googlemaps",
	  "cordova-plugin-whitelist",
	  "cordova-plugin-statusbar",
	  "cordova-plugin-device",
	  "cordova-plugin-splashscreen",
	  "cordova-plugin-ionic-webview",
	  "cordova-plugin-ionic-keyboard"
      "mx.ferreyra.callnumber"
      "call-number"
      "cordova-plugin-x-socialsharing"
      "cordova-plugin-inappbrowser"
      "cordova-plugin-camera"
      "cordova-plugin-geolocation"
      "uk.co.workingedge.phonegap.plugin.launchnavigator"
      "com.telerik.plugins.nativepagetransitions"
```


## Run app on device

```
$ ionic cordova prepare android

$ ionic cordova prepare ios
```

You can run the apps on device or Simulators from Android Studio/Xcode for Android / iOS.

Or you can run directly from CLI

``` $ ionic cordova run android

$ ionic cordova run ios

```
(iOS might have issues running directly from CLI)

For more details on running the app on device / simulator check the official documentation [Android](https://ionicframework.com/docs/developing/android) / [iOS](https://ionicframework.com/docs/developing/ios)

#### Android Prodction APK

* Create signing key for android to release on Google Play

```
$ keytool -genkey -v -keystore keystore folder address -alias app alias -keyalg RSA -keysize 2048 -validity 10000
```
* Create release build for Android Play Store

```
$ ionic cordova build android --release
```

* Sign the unsigned APK for upload on Play store

```
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore .keystore file full path unsigned apk full path app alias
```
* Zipalign to optimize size for play store upload

```
$ ./zipalign -v 4 signed apk full path path for final APK
```
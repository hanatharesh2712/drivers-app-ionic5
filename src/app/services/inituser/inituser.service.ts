/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@angular/core';
import { Driver } from '@app/models/driver';
import { APIService } from '@app/services/api/api.service';
import { StorageService } from '@app/services/api/firestorage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';

@Injectable()
export class InitUserProvider {
  public loggedInUser: Driver;

  constructor(
    public storage: Storage,
    private api: APIService,
    private camera: Camera,
    private storageServ: StorageService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.createNewEmptyUser();
  }

  public getUserData(): any {
    return this.loggedInUser;
  }

  createNewEmptyUser() {
    this.loggedInUser = {
      id: null,
      email: '',
      password: '',
      approved: false,
      available: false,
      location_lat: 0,
      location_lng: 0,
      dob: '',
      gender: '',
      name: '',
      phone: '',
      profile_img: '',
      token: '',
      car_model: '',
      car_number: ''
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        this.api.updateToken(token);
        this.api.getDriver().subscribe((user: any) => {
          if (user) {
            this.setLoggedInUser(user);
          }
          resolve(true);
        }, err => {
          resolve(true);
          console.log(err);
        });
      });
    });
  }

  async setToken(token) {
    this.api.updateToken(token);
    await this.storage.set('token', token);
  }

  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }

  async setLoggedInUser(user) {
    Object.assign(this.loggedInUser, user);
    await this.storage.set('id', user.id);
    this.loggedInUser.token = await this.getToken();
    console.log('SetLoggedinUser', this.loggedInUser);
  }

  async logout(): Promise<any> {
    this.createNewEmptyUser();
    await this.api.logout();
    return this.storage.clear();
  }

  getLocalUrl(_imagePath): Promise<{ url: string; nativeUrl: string; }> {
    return new Promise((resolve, reject) => {
      const name = _imagePath.split('/');
      this.makeFileIntoBlob(_imagePath, name[name.length - 1]).then((image) => {
        resolve({ url: window.URL.createObjectURL(image), nativeUrl: _imagePath });
      }).catch(error => {
        reject(error);

      });
    });
  }

  makeFileIntoBlob(_imagePath, fileName) {
    return new Promise((resolve, reject) => {
      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {
        fileEntry['file']((resFile) => {
          const reader = new FileReader();
          reader.onload = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {

            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        }, (err) => {

          reject(err);
        });
      }, (err) => {
        console.log('err');
      });
    });
  }


  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      // let name = url.split('/');

      this.makeFileIntoBlob(url, name).then(imageData => {
        this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          await this.loadingCtrl.dismiss();
          this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          await this.loadingCtrl.dismiss();
          this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => { console.log('err', err); });
  }


  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();

      this.makeFileIntoBlob(url, name).then(imageData => {

        this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          await this.loadingCtrl.dismiss();
          this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          await this.loadingCtrl.dismiss();
          this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => {
      console.log('errrrr', err);
    });
  }

  async createToast(message, showCloseButton = false, position = 'bottom' as 'top' | 'bottom' | 'middle', duration = 2000): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration,
      buttons: [{
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return toast;
  }

  async createLoader(message): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingCtrl.create({
      message
      // duration: 3000
    });
    return loader;
  }


}

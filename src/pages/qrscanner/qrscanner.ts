import { Component } from '@angular/core';
import { Toast, ViewController, NavParams, ToastController } from 'ionic-angular';

@Component({
    selector: 'page-qrscanner',
    templateUrl: 'qrscanner.html'
})
export class QRScannerPage {

    protected light: boolean = false;
    protected frontCamera: boolean = false;
    protected scanningError: Toast;
    protected validate: any;

    constructor(toastController: ToastController, private viewController: ViewController, navParams: NavParams
    ) {
        this.scanningError = toastController.create({
            message: '这是一个扫描错误，请重试!',
            duration: 2000
        });

        this.validate = navParams.get('validate');
    }


    close(data: any = null) {
        this.viewController.dismiss(data);
    }

    toggleCamera() {
        this.frontCamera = !this.frontCamera;

        if (this.frontCamera) {
            window['QRScanner'].useFrontCamera();
        } else {
            window['QRScanner'].useBackCamera();
        }
    }

    toggleLight() {
        this.light = !this.light;

        if (this.light) {
            window['QRScanner'].enableLight();
        } else {
            window['QRScanner'].disableLight();
        }
    }

    setupScanner() {
        window['QRScanner'].scan((error, text) => {
            if (error || !this.validate(text)) {
                this.scanningError.present();
                this.close();
            } else {
                this.close({
                    'text': this.validate(text)
                });
            }
        });
    }

    ionViewWillEnter() {
        window['QRScanner'].show();
        this.setupScanner();
        window.document.querySelector('ion-app > .app-root').classList.add('hide');
    }

    ionViewWillLeave() {
        window.document.querySelector('ion-app > .app-root').classList.remove('hide');
        window['QRScanner'].destroy();
    }

    ionViewCanEnter() {
        if (window['QRScanner']) {
            return true;
        } else {
            return false;
        }
    }
}
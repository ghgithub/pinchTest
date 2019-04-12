import { ModalController } from 'ionic-angular';
import { QRScannerModel } from './qrscanner/qrscanner';



export function provideQRScanner(modalController: ModalController) {
    return new QRScannerModel(modalController);
}

export {
    QRScannerModel
};

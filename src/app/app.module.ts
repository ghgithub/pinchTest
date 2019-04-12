import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QRScannerPage } from '../pages/qrscanner/qrscanner';
import { QRScannerModel, provideQRScanner,} from '../providers/index';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QRScannerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QRScannerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide:QRScannerModel, useFactory:provideQRScanner, deps:[ModalController] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Insomnia } from '@ionic-native/insomnia';
import { Media } from '@ionic-native/media';
import { Network } from '@ionic-native/network';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { TabPageModule } from '../pages/tab/tab.module';

import { LoginPageModule } from '../pages/login/login.module';
import { MainPageModule } from '../pages/main/main.module';
import { ParametrePageModule } from '../pages/parametre/parametre.module';
import { AboutModule } from '../pages/about/about.module';

import { EmplacementModule } from '../pages/emplacement/emplacement.module';
import { ColisListPageModule } from '../pages/colis/list/colis-list.module';
import { ColisEditPageModule } from '../pages/colis/edit/colis-edit.module';
import { ColisPrisePageModule } from '../pages/colis/prise/colis-prise.module';
import { ColisDeposePageModule } from '../pages/colis/depose/colis-depose.module';

import { PassagePageModule } from '../pages/passage/passage.module';

import { SyncDataService } from '../providers/orm/sync/sync-data-service'
import { LoginService } from '../providers/login-service';

import { NetworkService } from '../providers/network-service';

import { UpdateService } from '../providers/update-service';
import { LoggerService } from '../providers/orm/logger-service';
import { ScannerService } from '../providers/scanner-service';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false }),
    IonicStorageModule.forRoot({ name: '__gtRatierDb', driverOrder: ['sqlite', 'websql', 'indexeddb'] }),
    TabPageModule,
    AboutModule,
    PassagePageModule,
    LoginPageModule,
    MainPageModule,
    ParametrePageModule,
    EmplacementModule,
    ColisListPageModule,
    ColisEditPageModule,
    ColisPrisePageModule,
    ColisDeposePageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    HttpModule,
    SyncDataService,
    LoginService,
    NetworkService,
    UpdateService,
    LoggerService,
    StatusBar,
    SplashScreen,
    AppVersion,
    SQLite,
    BarcodeScanner,
    Insomnia,
    Media,
    Network,
    FileTransfer,
    Keyboard,
    ScreenOrientation,
    ScannerService,
  ]
})
export class AppModule { }

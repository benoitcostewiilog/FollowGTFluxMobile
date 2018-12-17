import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';

import { LoggerService } from '../../../providers/orm/logger-service';
import { SyncEventsService } from '../../../providers/orm/sync/sync-events-service';
import { SyncDataService } from '../../../providers/orm/sync/sync-data-service';
import { WrkMouvementDB } from '../../../providers/db/wrk-mouvement-db';
import { WrkGroupeDB } from '../../../providers/db/wrk-groupe-db';
import * as moment from 'moment';
import { AdmParametrageDB } from '../../../providers/db/adm-parametrage-db';

/**
 * Generated class for the Comptage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-colis-edit',
  templateUrl: 'colis-edit.html',
})
export class ColisEditPage {


  private mouvement: any = {};
  private mouvementOrigin: any = {};

  private emplacement = "";
  private type = "";

  private TYPE_PRISE = WrkMouvementDB.TYPE_PRISE;
  private TYPE_DEPOSE = WrkMouvementDB.TYPE_DEPOSE;
  private TYPE_GROUPE = WrkMouvementDB.TYPE_GROUPE;
  private TYPE_INVENTAIRE = WrkMouvementDB.TYPE_INVENTAIRE;
  public moment = moment;

  private title = "Détails du produit";

  private readonly = false;
  private noDelete = false;
  private callback;

  private wrkGroupeDB: WrkGroupeDB;
  private admParametrageDB: AdmParametrageDB;
  
  private groupes = [];

  private vidageComplet = true;
  private showToggleVidageComplet = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private sync: SyncDataService) {
    this.type = this.navParams.get("type");
    this.emplacement = navParams.get("emplacement");
    this.mouvementOrigin = this.navParams.get("mouvement");
    this.mouvement = this.mouvementOrigin.toArray();
    this.callback = this.navParams.get("callback");
    this.readonly = navParams.get("readonly") ? true : false;

    this.wrkGroupeDB = new WrkGroupeDB();
    this.admParametrageDB = new AdmParametrageDB();
    if (this.readonly) {
      this.noDelete = true;
    } else {
      this.noDelete = navParams.get("noDelete") ? true : false;
    }


  }


  ionViewDidLoad() {
    LoggerService.info('ionViewDidLoad ColisEditPage');
    this.searchGroupe();
    this.loadParametrage();
  }

  searchGroupe() {
    this.wrkGroupeDB.findBy("libelle", this.mouvement.ref_produit).then((groupes) => {
      if (groupes && groupes.length > 0) {
        this.groupes = groupes;
      }
    });

  }
  loadParametrage() {
    
    this.admParametrageDB.isShowToggleVidageCompletUM().then((res) => {
      this.showToggleVidageComplet = res;
    });
  
  }



  setCommentaire() {
    if (!this.readonly) {

      let confirm = this.alertCtrl.create({
        title: 'Commentaire',
        inputs: [
          {
            name: 'commentaire',
            value: this.mouvement.commentaire
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            handler: () => {

            }
          },
          {
            text: 'Modifier',
            handler: data => {
              this.mouvement.commentaire = data.commentaire;
            }
          }
        ]
      });

      confirm.present();
    }
  }
  setQte() {
    if (!this.readonly && this.groupes.length == 0) {

      let confirm = this.alertCtrl.create({
        title: 'Quantité',
        inputs: [
          {
            name: 'qte',
            type: "number",
            value: "",
            placeholder: this.mouvement.quantite + ""
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            handler: () => {

            }
          },
          {
            text: 'Valider',
            handler: data => {
              let qte = parseInt(data.qte);
              if (qte <= 0 || isNaN(qte) || qte > 1000000000) {
                qte = this.mouvement.quantite;
              }
              this.mouvement.quantite = qte;
            }
          }
        ]
      });

      confirm.present();
    }
  }

  vidageCompletClick() {
    this.vidageComplet = !this.vidageComplet;
  }
  save() {
    let loading = this.loadingCtrl.create({
      duration: 0,
      content: ""
    });
    loading.present();

    loading.setContent("Enregistrement du mouvement");

    loading.dismiss().then(() => {
      this.mouvementOrigin.createFromArray(this.mouvement);
      this.mouvementOrigin.vidage = this.vidageComplet;
      this.navCtrl.pop();
      this.callback();
    });

  }

  cancel() {
    let title = "";
    let message = "";
    if (this.type == this.TYPE_GROUPE) {
      title = "Retirer ce produit ?";
      message = "Voulez vous vraiment retirer ce produit du groupe ?";
    } else {
      title = "Supprimer ce mouvement ?";
      message = "Voulez vous vraiment supprimer ce mouvement ?";
    }

    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'NON',
          handler: () => {

          }
        },
        {
          text: 'OUI',
          handler: () => {
            this.callback("delete");
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();

  }


}

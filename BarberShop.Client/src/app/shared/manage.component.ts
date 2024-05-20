import { Component, Inject, Injectable, OnInit } from "@angular/core";
import { BaseComponent } from "./base.component";
import { ServiceBase } from "./services/base.service";
import { EntityBase } from "./model/entity-base.vm";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserClaimType } from "./enum/user-claim-type.enum";


@Injectable()
@Component({
    template: '',
})
export abstract class ManageComponent<TEntity extends EntityBase> extends BaseComponent implements OnInit {
    entityDetails: TEntity;
    isEditMode = false;
    lookups: any;
    isModal = false;
    withAttachments: boolean;
    subscription: Subscription;
    storeId: number;


    constructor(protected serviceBase: ServiceBase<any, any>,
        @Inject('entity') public entity: new () => TEntity) {
        super();
        this.activatedRoute.queryParams.subscribe((p) => {
            if (!p.filter) {
                this.isEditMode = false;
                this.entityDetails = new entity();
                this.entityDetails.isActive = true;
            } else {
                const params = p.filter;
                const decodedParams = JSON.parse(this.decode(params));
                this.isEditMode = !!decodedParams.id;
                this.entityDetails = new entity();
                this.entityDetails.id = decodedParams.id;
                this.entityDetails.isActive = !this.isEditMode ? true : this.entityDetails.isActive;

            }
        });
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.isEditMode) {
            this.getByID();
        }
    }

  

    onStoreChange() {

    }

    async initData() {
        await this.authenticationService.getClaim(UserClaimType.StoreId).then(storeId => {
            this.storeId = storeId;
        });
    }

    onLoadEntity(result: TEntity) {
    }

    getByID() {
        this.serviceBase.getByID(this.entityDetails.id).subscribe((res) => {
            if (!res.data) {
                this.entityDetails = res;

            } else {
                this.entityDetails = res.data;
            }
            this.onLoadEntity(this.entityDetails);
        })
    }


    save(form: NgForm) {
        return new Promise(resolve => {
            if (form.valid) {
                if (!this.isEditMode) {
                    this.add().then(res => {
                        resolve(res);
                    });
                } else {
                    this.edit().then(res => {
                        resolve(res);
                    });
                }
            } else {
                for (var key in form.controls) {
                    form.controls[key].updateValueAndValidity();
                }
            }
        })

    }

    add() {
        console.log(this.entityDetails);
        return new Promise(resolve => {
          
                this.serviceBase.add(this.entityDetails).subscribe(
                    (result) => {
                        if(result.resultCode == 200){
                            this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
                            this.backToList();
                            resolve(result);
                        }else {
                            resolve(false);
                            this.toaster.error(result.errorMessage);
                        }
                       
                    },
                    (error) => {
                        this.error = error;
                        resolve(false);
                    }
                );
            
        })

    }

    edit() {
        return new Promise(resolve => {
          
                this.serviceBase.edit(this.entityDetails).subscribe(
                    (result) => {
                        this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
                        this.backToList();
                        resolve(result)
                    },
                    (error) => {
                        this.error = error;
                        resolve(false)
                    }
                );
            
        })

    }



    onDeleteItem(item: TEntity) {
        return new Promise(resolve => {
            this.serviceBase.delete(item.id).subscribe(
                (result) => {
                    this.toaster.success(this.translate.instant('general.deletedSuccessfully'), this.translate.instant('general.success'));

                    resolve(true);
                },
                (error) => {
                    resolve(false);
                    this.toaster.error(error.error[0].message, this.translate.instant('general.error'));
                }
            );
        });

    }




    backToList() {
        if (!this.isModal) {
            const urlTree = this.router.parseUrl(this.router.url);
            let paramsTemp = JSON.parse(this.decode(urlTree.queryParams['filter']));
            paramsTemp.id = 0;
            const params = this.encode(JSON.stringify(paramsTemp));
            let urlWithoutParams: any = urlTree.root.children['primary'].segments.map(it => it.path);
            urlWithoutParams.pop();
            urlWithoutParams.join('/');
            this.router.navigate([urlWithoutParams.join('/')], {
                relativeTo: this.activatedRoute,
                queryParams: { filter: params }
            });
        }

    }

    // backToList() {
    //     const urlTree = this.router.parseUrl(this.router.url);
    //     let urlWithoutParams: any = urlTree.root.children['primary'].segments.map(it => it.path);
    //     urlWithoutParams.pop();
    //     urlWithoutParams.join('/');
    //     this.router.navigate([urlWithoutParams.join('/')], {
    //         relativeTo: this.activatedRoute,
    //         queryParams: this.activatedRoute.queryParams
    //     });
    // }

     convertFileToBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1] || ''); // Extract the base64 string (omit the data URL prefix)
            } else {
              reject(new Error('Failed to read file as data URL.'));
            }
          };
    
          reader.onerror = () => {
            reject(new Error('Error reading file.'));
          };
    
          reader.readAsDataURL(file);
        });
      }
    
}

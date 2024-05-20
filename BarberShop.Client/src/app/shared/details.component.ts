import {BaseComponent} from './base.component';
import {Component, Inject, OnInit} from '@angular/core';
import {Params} from '@angular/router';
import {EntityBase} from "./model/entity-base.vm";
import {FilterBase} from "./model/filter-base";
import {ServiceBase} from "./services/base.service";
import {HttpStatusCode} from "./enum/http-status-code-enum";


@Component({
  template: '',

})
export abstract class DetailsComponent<TEntity extends EntityBase, TEntityFilter extends FilterBase> extends BaseComponent implements OnInit {
  entityId: number;
  entity: TEntity;
  isLoaded: boolean;
  routeParams = '';

  constructor(protected entityService: ServiceBase<TEntity, TEntityFilter>,
              @Inject('entityType') entityType: new () => TEntity) {
    super();

    this.entity = new entityType();
  }

  override ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!this.entityId){
          this.entityId = Number(params['id']);
        }
        if (this.entityId) {
          this.getById();
        }
      }
    );

    super.ngOnInit();
  }

  onRouteParams(params: Params) {
  }

  getById() {
    this.entityService.getByID(this.entityId).subscribe(
      (result:any) => {
        this.isLoaded = true;
        if(result.isSuccess) {
          this.entity = result.data;
          this.onLoadEntity(result);
        }
      },
      (error) => {
        if (error.status == HttpStatusCode.NotFound) {
          this.router.navigate([`details-${this.entityId}`]);
        }
        this.error = error;
      }
    );
  }

  onLoadEntity(result) {
  }

  backToList() {
    this.activatedRoute.queryParams.subscribe((p) => {
      const params = p.filter;
      this.router.navigate(['../'], {relativeTo: this.activatedRoute, queryParams: {filter: params}});
    });

  }
}

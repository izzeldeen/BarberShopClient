import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FeatherModule} from 'angular-feather';
import {allIcons} from 'angular-feather/icons';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {ClickOutsideModule} from 'ng-click-outside';
import {VerticalComponent} from './vertical/vertical.component';
import {TopbarComponent} from './topbar/topbar.component';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {FooterComponent} from "./footer/footer.component";
import {BaseMenuComponent} from "./base-menu.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {AvatarModule} from "ngx-avatars";


@NgModule({
    declarations: [
        VerticalComponent,
        TopbarComponent,
        LayoutComponent,
        SidebarComponent,
        FooterComponent,
        BaseMenuComponent
    ],
    providers: [],
    exports: [VerticalComponent, FooterComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FeatherModule.pick(allIcons),
        NgbDropdownModule,
        ClickOutsideModule,
        TranslateModule,
        AvatarModule,
        NgSelectModule,
        FormsModule
        
    ]
})
export class LayoutsModule {
}

import {Injector, NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LayoutsModule} from './layouts/layouts.module';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {LocatorService} from "./core/services/locator.service";
import {SpinnerInterceptor} from './core/interceptors/spinner-interceptor';
import {SpinnerModule} from "./shared/spinner/spinner.module";
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./shared/shared.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import localeAr from '@angular/common/locales/ar';
import {AdminGuard} from "./core/guards/admin.guard";
import {UIHelper} from "./core/utilities/ui-helper";
import {BaseComponent} from "./shared/base.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(
            {
                closeButton: true,
                newestOnTop: true,
                progressBar: true,
            }
        ),
        SharedModule,
        SpinnerModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgApexchartsModule,
        NgbModule,
        NgbPaginationModule, 
        NgbAlertModule
      
    ],
    providers: [
        AdminGuard,
        UIHelper,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        // Create global Service Injector.
        LocatorService.injector = this.injector;
        // registerLocaleData(localeAr, 'ar');
    }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PcPunchConfigurationComponent } from './components/main-page/pc-punch-configuration/pc-punch-configuration.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoWelcomeComponent } from './components/login-page/logo-welcome/logo-welcome.component';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';
import { NavBarComponent } from './components/main-page/nav-bar/nav-bar.component';
import { FunctionKeyComponent } from './components/main-page/function-key/function-key.component';
import { FunctionKey1Component } from './components/main-page/function-key-1/function-key-1.component';
import { FunctionKey2Component } from './components/main-page/function-key-2/function-key-2.component';
import { FunctionKey3Component } from './components/main-page/function-key-3/function-key-3.component';
import { FunctionKey4Component } from './components/main-page/function-key-4/function-key-4.component';
import { FunctionKey5Component } from './components/main-page/function-key-5/function-key-5.component';
import { FunctionKey6Component } from './components/main-page/function-key-6/function-key-6.component';
import { PayCodeDialogComponent } from './components/main-page/pay-code-dialog/pay-code-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    LoginPageComponent,
    PcPunchConfigurationComponent,
    FooterComponent,
    LogoWelcomeComponent,
    LoginFormComponent,
    NavBarComponent,
    FunctionKeyComponent,
    FunctionKey1Component,
    FunctionKey2Component,
    FunctionKey3Component,
    FunctionKey4Component,
    FunctionKey5Component,
    FunctionKey6Component,
    PayCodeDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

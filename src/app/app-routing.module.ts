import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PcPunchConfigurationComponent } from './components/main-page/pc-punch-configuration/pc-punch-configuration.component';
import { FunctionKey1Component } from './components/main-page/function-key-1/function-key-1.component';
import { FunctionKey2Component } from './components/main-page/function-key-2/function-key-2.component';
import { FunctionKey3Component } from './components/main-page/function-key-3/function-key-3.component';
import { FunctionKey4Component } from './components/main-page/function-key-4/function-key-4.component';
import { FunctionKey5Component } from './components/main-page/function-key-5/function-key-5.component';
import { FunctionKey6Component } from './components/main-page/function-key-6/function-key-6.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'pc-punch-configuration', component: PcPunchConfigurationComponent },
  { path: 'function-key-1', component: FunctionKey1Component},
  { path: 'function-key-2', component: FunctionKey2Component},
  { path: 'function-key-3', component: FunctionKey3Component},
  { path: 'function-key-4', component: FunctionKey4Component},
  { path: 'function-key-5', component: FunctionKey5Component},
  { path: 'function-key-6', component: FunctionKey6Component},
  // redirect to `home` if there is no path
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

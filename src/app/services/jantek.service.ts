import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable, Subject } from 'rxjs';
import { PunchConfig } from '../models/punch-config';
import { FunctionKey } from '../models/function-key';
import { PCList } from '../models/pc-list';

const apiRoot = "http://201.12.20.40/timothy_jan/sqlwebpunch";

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();
  punchConfiguration: PunchConfig;
  // = {
  //   "status": "OK",
  //   "logintype": 2,
  //   "clocktype": 1,
  //   "checklo": 0,
  //   "closetable": 2,
  //   "lunchlock": 1,
  //   "lunchlen": 30,
  //   "breaklock": 0,
  //   "breaklen": 0,
  //   "fk1": {
  //     "fktype": 18,
  //     "caption": "View Last Punch",
  //     "msg1": "",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk2": {
  //     "fktype": 19,
  //     "caption": "View Total Hour",
  //     "msg1": "",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk3": {
  //     "fktype": 5,
  //     "caption": "Company Change",
  //     "msg1": "Enter Company",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk4": {
  //     "fktype": 16,
  //     "caption": "Hour Entry",
  //     "msg1": "Enter Hour",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 1
  //   },
  //   "fk5": {
  //     "fktype": 17,
  //     "caption": "Tip Entry",
  //     "msg1": "Enter Tip",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 30
  //   },
  //   "fk6": {
  //     "fktype": 20,
  //     "caption": "Calculated Pay Code",
  //     "msg1": "",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 24
  //   }
  // }

  /** DEMO ONLY */
  demoAdminName:string = "jantek";
  demoAdminPassword:string = "jantek";

  constructor(
    private _alertService: AlertService,
    private http: HttpClient
  ) { }

  /** Check user in database to login */
  login(form: any): boolean {
    // Admin Authentication
    if(form.username == this.demoAdminName && form.password == this.demoAdminPassword) {
      this.isAuthenticatedChange.next(true);
      this._alertService.openSnackBar("Login Successful");
      return true;
    }
    this._alertService.openSnackBar("Incorrect Login");
    return false;
  }

  /** Log Off */
  logoff() {
    this.isAuthenticatedChange.next(false);
    this._alertService.openSnackBar("Logoff Successful");
  }

  /** Https request to get punch configuration from server */
  getPunchConfiguration(): Observable<PunchConfig> {
    return this.http.get<PunchConfig>(`${apiRoot}/swp_getpunchcfg.asp`);
  }

  /** Return current Login Type */
  getLoginType(): number {
    return this.punchConfiguration.logintype;
  }

  /** Returns current Clock Type */
  getClockType(): number {
    return this.punchConfiguration.clocktype;
  }

  /** Returns current Auto Close type */
  getCloseTable(): number {
    return this.punchConfiguration.closetable;
  }

  /** Returns current Check Lock-Out Profile */
  getCheckLo(): number {
    return this.punchConfiguration.checklo;
  }

  /** Https request to post punch configuration to server */
  updatePunchConfiguration(form: any) {
    console.log(form);
    this._alertService.openSnackBar("Configuration Saved!");
  }

  /** Returns fk1 */
  getFK1(): FunctionKey {
    return this.punchConfiguration.fk1;
  }

  /** Returns fk2 */
  getFK2(): FunctionKey {
    return this.punchConfiguration.fk2;
  }

  /** Returns fk3 */
  getFK3(): FunctionKey {
    return this.punchConfiguration.fk3;
  }

  /** Returns fk4 */
  getFK4(): FunctionKey {
    return this.punchConfiguration.fk4;
  }

  /** Returns fk5 */
  getFK5(): FunctionKey {
    return this.punchConfiguration.fk5;
  }

  /** Returns fk6 */
  getFK6(): FunctionKey {
    return this.punchConfiguration.fk6;
  }

  /** Https request to post function key update */
  functionKeyUpdate(form: any) {
    console.log(form);
    this._alertService.openSnackBar(`Function Key ${form['functionKeyNumber']} Saved!`);
  }

  /** Https request to get list of pay codes */
  getPayCodes(fktype: number): Observable<PCList> {
    switch(fktype) {
      /** "HNC" - Hourly non-calculated (employee enters hour value) */
      case 16: {
        const options = {
          params: {
            Company: "TIMOTHYPROJECT",
            pctype: "HNC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      /** "ED" - Earning/Deduction code (employee enters dollar amount) */
      case 17: {
        const options = {
          params: {
            Company: "TIMOTHYPROJECT",
            pctype: "ED",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      /** "HC" - Hourly Calculated (excluding pacyode 0) */
      case 20: {
        const options = {
          params: {
            Company: "TIMOTHYPROJECT",
            pctype: "HC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      default: {
        console.log("switch default");
        return this.http.get<PCList>(`${apiRoot}/swp_GetPcList.asp?Company=TIMOTHYJANPROJECT&pctype=HNC&order=1&startloc=1&listsize=100`);
      }
    }
  }
}

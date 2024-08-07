import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable, Subject } from 'rxjs';
import { PunchConfig } from '../models/punch-config';
import { FunctionKey } from '../models/function-key';
import { PCList } from '../models/pc-list';
import { JsonF0 } from '../models/json-F0';

const APIROOT = "http://201.12.20.40/timothy_jan/webpunch/api";
// const APIROOT = "http://newdev.jantek.net/webpunch/api";
// const APIROOT = "../webpunch/api";
// const APIROOT = "../api";
// const APIROOT = "../../api";
const COMPANYNAME = "TIMOTHYJANPROJECT";

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();
  punchConfiguration: PunchConfig;

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
    const options = {
      params: {
        Company: COMPANYNAME,
      }
    };
    return this.http.get<PunchConfig>(`${APIROOT}/wp_getpunchcfg.asp`, options);
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

  /** Https request to post punch configuration items "logintype", "clocktype" and "checklo" properties to server */
  updatePunchConfigurationF0(form: any) {
    let data:JsonF0 = {
      "status": "OK",
      "logintype": form["logintype"],
      "clocktype": form["clocktype"],
      "checklo": form["checklo"],
      "closetable": form["closetable"],
      "lunchlock": this.punchConfiguration.lunchlock,
      "lunchlen": this.punchConfiguration.lunchlen,
      "breaklock": this.punchConfiguration.breaklock,
      "breaklen": this.punchConfiguration.breaklen
    };
    const options = {
      params: {
        Company: COMPANYNAME,
        Page:"F0",
        config: JSON.stringify(data)
      }
    };

    this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, options).subscribe(
      response => {
        // console.log('Response from server:', response);
      },
      error => {
        console.error('Error sending data:', error);
      }
    );
    this._alertService.openSnackBar("Configuration Saved!");
  }

  /** Incomplete */
  /** Https request to post function key update */
  functionKeyUpdate(form: any) {
    switch(form['functionKeyNumber']) {
      case 1:
        let fk1data = {
          "fk1": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk1Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F1",
            config: JSON.stringify(fk1data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk1Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk1Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
      case 2:
        let fk2data = {
          "fk2": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk2Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F2",
            config: JSON.stringify(fk2data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk2Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk2Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
      case 3:
        let fk3data = {
          "fk3": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk3Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F3",
            config: JSON.stringify(fk3data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk3Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk3Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
      case 4:
        let fk4data = {
          "fk4": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk4Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F4",
            config: JSON.stringify(fk4data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk4Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk4Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
      case 5:
        let fk5data = {
          "fk5": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk5Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F5",
            config: JSON.stringify(fk5data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk5Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk5Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
      case 6:
        let fk6data = {
          "fk6": {
            "fktype": form["fktype"],
            "caption": form["caption"] || "",
            "msg1": form["msg1"] || 0,
            "msg2": form["msg2"] || 0,
            "msg3": form["msg3"] || 0,
            "PC": form["PC"] || 0
          }
        }
        let fk6Options = {
          params: {
            Company: COMPANYNAME,
            Page:"F6",
            config: JSON.stringify(fk6data)
          }
        }
        // console.log(`${APIROOT}/wp_setpunchcfg.asp`, fk6Options);
        this.http.get(`${APIROOT}/wp_setpunchcfg.asp`, fk6Options).subscribe(
          response => {
            console.log('Response from server:', response);
          },
          error => {
            console.error('Error sending data:', error);
          }
        );
        break;
    }
    this._alertService.openSnackBar(`Function Key ${form['functionKeyNumber']} Saved!`);
  }

  /** Https request to get list of pay codes */
  getPayCodes(fktype: number): Observable<PCList> {
    switch(fktype) {
      /** "HNC" - Hourly non-calculated (employee enters hour value) */
      case 16: {
        const options = {
          params: {
            Company: COMPANYNAME,
            pctype: "HNC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${APIROOT}/wp_GetPcList.asp`, options);
      }
      /** "ED" - Earning/Deduction code (employee enters dollar amount) */
      case 17: {
        const options = {
          params: {
            Company: COMPANYNAME,
            pctype: "ED",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${APIROOT}/wp_GetPcList.asp`, options);
      }
      /** "HC" - Hourly Calculated (excluding pacyode 0) */
      case 20: {
        const options = {
          params: {
            Company: COMPANYNAME,
            pctype: "HC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${APIROOT}/wp_GetPcList.asp`, options);
      }
      default: {
        const options = {
          params: {
            Company: COMPANYNAME,
            pctype: "HNC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<PCList>(`${APIROOT}/wp_GetPcList.asp`, options);
      }
    }
  }
}

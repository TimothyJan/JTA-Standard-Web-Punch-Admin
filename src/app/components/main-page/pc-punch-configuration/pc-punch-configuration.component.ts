import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-pc-punch-configuration',
  templateUrl: './pc-punch-configuration.component.html',
  styleUrl: './pc-punch-configuration.component.css'
})
export class PcPunchConfigurationComponent implements OnInit{
  dataFetched: boolean = false;
  configurationForm: FormGroup = new FormGroup({
    logintype: new FormControl(3, Validators.required),
    clocktype: new FormControl(1, Validators.required),
    closetable: new FormControl(1, Validators.required),
    checklo: new FormControl(false, Validators.required),
  });

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this._jantekService.getPunchConfiguration().subscribe(response => {
      // Get punch configuration
      this._jantekService.punchConfiguration = { ...response}

      // Assign formcontrol values
      this.configurationForm.controls["logintype"].setValue(
        this._jantekService.getLoginType()
      );
      this.configurationForm.controls["clocktype"].setValue(
        this._jantekService.getClockType()
      );
      this.configurationForm.controls["closetable"].setValue(
        this._jantekService.getCloseTable()
      );
      /** mat-checkbox return bool, covnert bool to 0 and 1 */
      if(this._jantekService.getCheckLo()) {
        this.configurationForm.controls["checklo"].setValue(true);
      } else {
        this.configurationForm.controls["checklo"].setValue(false);
      }
      this.dataFetched = true;
    });
  }

  onSubmit() {
    if (this.configurationForm.valid) {
      /** mat-checkbox return bool, covnert bool to 0 and 1 */
      if (this.configurationForm.controls["checklo"].value) {
        this.configurationForm.controls["checklo"].setValue(1);
      } else {
        this.configurationForm.controls["checklo"].setValue(0);
      }
      this._jantekService.updatePunchConfiguration(this.configurationForm.value);
    }
  }

}

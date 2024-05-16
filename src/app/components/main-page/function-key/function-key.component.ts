import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JantekService } from '../../../services/jantek.service';
import { FunctionKey } from '../../../models/function-key';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PayCodeDialogComponent } from '../pay-code-dialog/pay-code-dialog.component';

@Component({
  selector: 'app-function-key',
  templateUrl: './function-key.component.html',
  styleUrl: './function-key.component.css'
})
export class FunctionKeyComponent implements OnInit{
  payCodeSearchDisabled: boolean = true;
  msg1Disabled: boolean = true;
  msg2Disabled: boolean = true;
  msg3Disabled: boolean = true;

  @Input() functionKeyNumber: number = 0;
  fk:FunctionKey = {
    "fktype": 0,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };

  functionKeyForm = new FormGroup({
    functionKeyNumber: new FormControl(0, Validators.required),
    fktype: new FormControl(1, Validators.required),
    caption: new FormControl("None", Validators.required),
    msg1: new FormControl({value: "", disabled: true}, [Validators.required]),
    msg2: new FormControl({value: "", disabled: true}, [Validators.required]),
    msg3: new FormControl({value: "", disabled: true}, [Validators.required]),
    PC: new FormControl({value: 0, disabled: true}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  constructor(
    private _jantekService: JantekService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    switch(this.functionKeyNumber) {
      case 1:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk1;
          this.setFunctionKeyForm();
        });
        break;
      case 2:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk2;
          this.setFunctionKeyForm();
        });
        break;
      case 3:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk3;
          this.setFunctionKeyForm();
        });
        break;
      case 4:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk4;
          this.setFunctionKeyForm();
        });
        break;
      case 5:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk5;
          this.setFunctionKeyForm();
        });
        break;
      case 6:
        this._jantekService.getPunchConfiguration().subscribe(response => {
          // Get punch configuration
          this._jantekService.punchConfiguration = { ...response};
          this.fk = response.fk6;
          this.setFunctionKeyForm();
        });
        break;
    }
  }

  setFunctionKeyForm(): void {
    this.functionKeyForm.controls["functionKeyNumber"].setValue(this.functionKeyNumber);
    this.functionKeyForm.controls["fktype"].setValue(this.fk["fktype"]);
    this.functionKeyForm.controls["caption"].setValue(this.fk["caption"]);
    if(this.fk["msg1"]) {
      this.enableMsg1();
      this.functionKeyForm.controls["msg1"].setValue(this.fk["msg1"]);
    }
    if(this.fk["msg2"]) {
      this.enableMsg2();
      this.functionKeyForm.controls["msg2"].setValue(this.fk["msg2"]);
    }
    if(this.fk["msg3"]) {
      this.enableMsg3();
      this.functionKeyForm.controls["msg3"].setValue(this.fk["msg3"]);
    }
    if(this.fk["PC"]) {
      this.enablePayCode()
      this.functionKeyForm.controls["PC"].setValue(this.fk["PC"]);
    }
  }

  /** When type is changed, controls are enabled/disabled */
  typeChanged(event: any): void {
    this.clearMessagesAndPayCode();
    switch(event) {
      case 0: /** None */
        this.functionKeyForm.controls["caption"].setValue("None");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 1: /** None */
        this.functionKeyForm.controls["caption"].setValue("None");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 2: /** In */
        this.functionKeyForm.controls["caption"].setValue("IN");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 3: /** Out */
        this.functionKeyForm.controls["caption"].setValue("OUT");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 4: /** Swipe-and-go w/ L3 Change */
        this.functionKeyForm.controls["caption"].setValue("Swipe-and-go w/ L3 change");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 5: /** L1 Change */
        this.functionKeyForm.controls["caption"].setValue("L1 change");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 6: /** L2 Change */
        this.functionKeyForm.controls["caption"].setValue("L2 change");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 7: /** L3 Change */
        this.functionKeyForm.controls["caption"].setValue("L3 change");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 8: /** L1, L2 Change */
        this.functionKeyForm.controls["caption"].setValue("L1, L2 change");
        this.enableMsg1();
        this.enableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 9: /** L1, L3 Change */
        this.functionKeyForm.controls["caption"].setValue("L1, L3 change");
        this.enableMsg1();
        this.enableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 10: /** L2, L3 Change */
        this.functionKeyForm.controls["caption"].setValue("L2, L3 change");
        this.enableMsg1();
        this.enableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 11: /** L1, L2, L3 change */
        this.functionKeyForm.controls["caption"].setValue("L1, L2, L3 change");
        this.enableMsg1();
        this.enableMsg2();
        this.enableMsg3();
        this.disablePayCode()
        break;
      case 12: /** Break Start */
        this.functionKeyForm.controls["caption"].setValue("Break Start");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 13: /** Break End */
        this.functionKeyForm.controls["caption"].setValue("Break End");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 14: /** Lunch Start */
        this.functionKeyForm.controls["caption"].setValue("Lunch Start");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 15: /** Lunch End */
        this.functionKeyForm.controls["caption"].setValue("Lunch End");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 16: /** Hour Entry */
        this.functionKeyForm.controls["caption"].setValue("Hour Entry");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.enablePayCode()
        break;
      case 17: /** Amount Entry */
        this.functionKeyForm.controls["caption"].setValue("Amount Entry");
        this.enableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.enablePayCode()
        break;
      case 18: /** View Last Punch */
        this.functionKeyForm.controls["caption"].setValue("View Last Punch");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 19: /** View Total Hours */
        this.functionKeyForm.controls["caption"].setValue("View Total Hours");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
      case 20: /** Calculated Pay Code */
        this.functionKeyForm.controls["caption"].setValue("Calculated Pay Code");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.enablePayCode()
        break;
      default: /** None default */
        this.functionKeyForm.controls["caption"].setValue("None");
        this.disableMsg1();
        this.disableMsg2();
        this.disableMsg3();
        this.disablePayCode()
        break;
    }
  }

  /** Enable Msg 1 input and dialog */
  enableMsg1(): void {
    this.msg1Disabled = false;
    this.functionKeyForm.controls["msg1"].enable();
  }

  /** Disable Msg 1 input and dialog */
  disableMsg1():void {
    this.msg1Disabled = true;
    this.functionKeyForm.controls["msg1"].disable();
  }

  /** Enable Msg 2 input and dialog */
  enableMsg2(): void {
    this.msg2Disabled = false;
    this.functionKeyForm.controls["msg2"].enable();
  }

  /** Disable Msg 2 input and dialog */
  disableMsg2():void {
    this.msg2Disabled = true;
    this.functionKeyForm.controls["msg2"].disable();
  }

  /** Enable Msg 3 input and dialog */
  enableMsg3(): void {
    this.msg3Disabled = false;
    this.functionKeyForm.controls["msg3"].enable();
  }

  /** Disable Msg 3 input and dialog */
  disableMsg3():void {
    this.msg3Disabled = true;
    this.functionKeyForm.controls["msg3"].disable();
  }

  /** Resets messages and paycode controls  */
  clearMessagesAndPayCode(): void {
    this.functionKeyForm.controls["msg1"].reset();
    this.functionKeyForm.controls["msg2"].reset();
    this.functionKeyForm.controls["msg3"].reset();
    this.functionKeyForm.controls["PC"].reset();
  }

  /** Enable PayCode and PayCode search dialog */
  enablePayCode(): void {
    this.functionKeyForm.controls["PC"].enable();
    this.payCodeSearchDisabled = false;
  }

  /** Disable PayCode and PayCode search dialog */
  disablePayCode(): void {
    this.functionKeyForm.controls["PC"].disable();
    this.payCodeSearchDisabled = true;
  }

  /** Opens PayCode dialog and passes fktype and current PayCode to dialog component */
  openPayCodeDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fktype: this.functionKeyForm.controls["fktype"].value,
      currentPayCode: this.fk.PC
    };

    const dialogRef = this._dialog.open(PayCodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.functionKeyForm.controls["PC"].setValue(data[0]);
      }
    );
  }

  /**  */
  onSubmit(): void {
    if (this.functionKeyForm.valid) {
      this._jantekService.functionKeyUpdate(this.functionKeyForm.value);
    }
  }
}

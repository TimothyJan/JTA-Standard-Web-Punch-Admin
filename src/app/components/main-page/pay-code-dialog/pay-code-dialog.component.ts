import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PayCode } from '../../../models/pay-code';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-pay-code-dialog',
  templateUrl: './pay-code-dialog.component.html',
  styleUrl: './pay-code-dialog.component.css'
})
export class PayCodeDialogComponent implements OnInit{

  payCodeSelected: number = 0;
  payCodeList: PayCode[] = [new PayCode(0, "None")];
  payCodeNumList: number[] = [0];

  /** data injected gives "fktype" and "currentPayCode" currently selected */
  constructor(
    private _jantekService: JantekService,
    private _dialogRef: MatDialogRef<PayCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dialogResize();
    this.getPayCodes();
  }

  /** Dialog selection */
  // onPayCodeDialogChange(event:any) {
  //   // console.log(event);
  // }

  // Resizes dialog based on window width
  dialogResize(): void {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
      this._dialogRef.updateSize('40%');
    } else {
      this._dialogRef.updateSize('80%');
    }
  }

  /** HostListener to update the flag on window resize */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.dialogResize();
  }

  // Load list of pay codes into payCodeList
  getPayCodes(): void {
    this._jantekService.getPayCodes(this.data.fktype).subscribe(
      data => {
        for(var index = 0; index<data["list"].length; index++) {
          // Push Paycode num and description
          let newPayCode = new PayCode(data["list"][index][0], data["list"][index][1]);
          this.payCodeList.push(newPayCode);

          // Push Paycode num list for easier selection in matlistoption
          this.payCodeNumList.push(data["list"][index][0]);
        }
      }
    );
  }

  /** Send selected pay code data to function-key */
  savePayCodeDialog(): void {
    this._dialogRef.close(this.payCodeSelected);
  }

  /** Close dialog and sends previous code input as selction */
  closePayCodeDialog(): void {
    this._dialogRef.close(this.data.currentPayCode);
  }
}

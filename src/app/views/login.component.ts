import { AppState } from '../app.state';
import { Auth } from '../store/auth.reducer';
import { Component, Inject, OnInit } from '@angular/core';
import { IAppState } from '../store/index';
import { AuthActions } from '../actions/auth.actions';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'login',
  template: `
    <mat-grid-list cols="3" rowHeight="1:1">

      <mat-grid-tile></mat-grid-tile>

      <mat-grid-tile>

        <mat-card>

          <form #f="ngForm" (ngSubmit)="login(f.value)">

            <!-- Username field -->
            <mat-form-field class="example-full-width">
              <input matInput type="text"
                placeholder="Type a name"
                [ngModel]="username"
                name="username"
                #labelRef="ngModel"
                minlength="4"
                required />
              <mat-error *ngIf="labelRef.hasError('required')">
                Username is mandatory
              </mat-error>
            </mat-form-field>

            <div class="small-padding"></div>

            <!-- Password field -->
            <mat-form-field class="example-full-width">
              <input matInput type="password"
                placeholder="Type a password"
                [ngModel]="password"
                name="password"
                #priceRef="ngModel"
                required />
              <mat-error *ngIf="priceRef.hasError('required')">
                Password is mandatory
              </mat-error>
            </mat-form-field>

            <div class="small-padding"></div>

            <!-- Login button -->
            <button mat-raised-button
                    color="primary"
                    type="submit"
                    [disabled]="f.invalid || loginInProgress">
              <span *ngIf="!loginInProgress">LOGIN</span>
              <mat-spinner *ngIf="loginInProgress" color="warn"></mat-spinner>
            </button>
          </form>

        </mat-card>

      </mat-grid-tile>

      <mat-grid-tile></mat-grid-tile>

    </mat-grid-list>

  `
})

export class LoginComponent implements OnInit {

  username: string;

  password: string;

  loginInProgress: boolean;

  constructor(public actions: AuthActions, public dialog: MatDialog, public snackBar: MatSnackBar, public app: AppState) { }

  ngOnInit() {
    this.app.onAuthChange.subscribe(auth => {
      this.loginInProgress = false;
      if (auth.loginError && auth.loginErrorCode === 403) {
        console.log();
        this.openSnackBar('Credenziali errate');
      } else if (auth.loginError) {
        this.openSnackBar('Si è verificato un errore');
      }
    });
  }

  login(data) {
    this.loginInProgress = true;
    const login = this.actions.login(data.username, data.password);
  }

  openSnackBar(text) {
    this.app.onOpenSnackBar.emit(text);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.username, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div>Alert</div>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

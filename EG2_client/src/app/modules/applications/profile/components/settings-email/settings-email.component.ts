import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { ImapService } from 'src/app/core/services/imap.service';

@Component({
  selector: 'app-settings-email',
  templateUrl: './settings-email.component.html',
  styleUrls: ['./settings-email.component.scss']
})
export class SettingsEmailComponent implements OnInit {
  public form!: FormGroup;
  public imapForm!: FormGroup;
  public smtpForm!: FormGroup;
  private imapSmtpConfig: any;
  constructor(
    public authentificationService: AuthentificationService,
    private imapService: ImapService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.imapService.get().subscribe({
      next: data => {
        this.imapSmtpConfig = data.data;
        this.setForm(true);
      },
      error: err => {
        this.setForm(true);
      }
    })
  }
  private setForm(enabled?: boolean) {
    this.imapForm = this.formBuilder.group({
      host: [this.imapSmtpConfig?.imap?.host || '', [Validators.required]],
      port: [this.imapSmtpConfig?.imap?.port || '', [Validators.required]],
      secure: [this.imapSmtpConfig?.imap?.secure || false],
      tls: this.formBuilder.group({
        rejectUnauthorized: [this.imapSmtpConfig?.imap?.tls?.rejectUnauthorized || false],
        minVersion: [this.imapSmtpConfig?.imap?.tls?.minVersion || ''],
      })
    });
    this.smtpForm = this.formBuilder.group({
      host: [this.imapSmtpConfig?.smtp?.host || '', [Validators.required]],
      port: [this.imapSmtpConfig?.smtp?.port || '', [Validators.required]],
      secure: [this.imapSmtpConfig?.smtp?.secure || false],
      tls: this.formBuilder.group({
        rejectUnauthorized: [this.imapSmtpConfig?.smtp?.tls?.rejectUnauthorized || false],
        minVersion: [this.imapSmtpConfig?.smtp?.tls?.minVersion || ''],
      })
    });
    this.form = this.formBuilder.group({
      password: ['', Validators.required]
    });
    this.imapForm.disable();
    this.smtpForm.disable();
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) return;
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.form.value));
    this.imapService.update(formData).subscribe();
  }

}

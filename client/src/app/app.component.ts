import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';
    isOptions = [0]

    userProfileObj = this.fb.group({
        name: ['', Validators.required],
        organization: [''],
        contacts: this.fb.array([
            this.fb.group({
                communicationType: ['Email'],
                label: ['', Validators.required],
                emailOrPhoneText: ['', Validators.required]
            })
        ])
    });

    constructor(private fb: FormBuilder) { }

    get name() { return this.userProfileObj.get('name'); }
    get organization() { return this.userProfileObj.get('organization') }
    get contacts() {
        return this.userProfileObj.get('contacts') as FormArray;
    }

    checkEmailOrPhoneText = (str, type) => {
        const { _pendingValue: input } = str

        const regexPhone = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (String(type.trim()) === 'Email') {
            if (!regexEmail.test(String(input).toLowerCase())) return true
        }
        if (String(type.trim()) === 'Phone Number') {
            if (!regexPhone.test(input)) return true
        }
    }

    contactTypeChange = (i, e) => {
        this.contacts.setControl(i, this.fb.group({
            communicationType: [e.innerHTML],
            label: ['', Validators.required],
            emailOrPhoneText: ['', Validators.required]
        })
        );
        this.isOptions[i] = 0
    }

    addContact() {
        this.contacts.push(
            this.fb.group({
                communicationType: ['Email'],
                label: ['', Validators.required],
                emailOrPhoneText: ['', Validators.required]
            })
        );
        this.isOptions.push(0)
    }

    deleteContact(i) {
        this.isOptions.splice(i, 1)
        this.contacts.removeAt(i);
    }

    onSubmit() {
        console.log('Send data to server');
    }
}

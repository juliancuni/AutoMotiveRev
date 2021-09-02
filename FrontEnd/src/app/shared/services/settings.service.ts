import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

    private user: any;
    private app: any;
    private layout: any;

    constructor() {

        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Angle',
            description: 'Angular Bootstrap Admin Template',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

    }

    getAppSetting(name: string) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name: string) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name: string) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name: string, value: any) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name: string, value: any) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name: string, value: any) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name: string) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}

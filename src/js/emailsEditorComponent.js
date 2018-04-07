'use strict';

class emailsEditorController {
    constructor($window) {
        this.newEmail = '';
        this.$window = $window;
        this.emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    }

    addEmail(email) {
        if (email) {
            this.newEmail = email;
        }
        if (this.newEmail != '') {
            this.emails.push(this.newEmail);
            this.newEmail = ''
        }
    }

    handleInputKey(e) {
        if (e.keyCode == 13 || e.keyCode == 188) {
            e.preventDefault(); //prevent putting comma into input
            this.addEmail();
        }
    }

    remove(index) {
        this.emails.splice(index, 1);
    }

    isInvalid(email) {
        return this.emailRegexp.test(email.toLowerCase()) ? '' : 'error';
    }

    focusInput() {
        if (event.target == event.currentTarget) {
            this.$window.document.querySelector('#newEmail').focus();
        }
    }

    handlePaste(e) {
        console.log(e);
        e.preventDefault();
        if (typeof e.clipboardData !== "undefined") { // for Clipboard API supporting browsers
            e.preventDefault();
            this.addEmail(e.clipboardData.getData('text/plain'));
        } else { //for VERY bad and old browsers
            $timeout(()=> {
                this.addEmail(angular.element(e.currentTarget).val());
            });
        }
    }
};


emailsEditorController.$inject = ['$window'];

const emailsEditorConf = {
    bindings: {
        emails: '='
    },
    template: `<ul class="emails-holder" ng-click="$ctrl.focusInput()">
                <li class="email" ng-repeat="email in $ctrl.emails track by $index" ng-class="$ctrl.isInvalid(email)">
                    <span class="address">{{::email}}</span>
                    <a class="remove">
                        <span class="text-fallback" ng-click="$ctrl.remove($index)">×</span>
                    </a>
                </li>

                <li class="new-email">
                    <input type="text" id="newEmail" placeholder="add more people..." ng-model="$ctrl.newEmail" ng-paste="$ctrl.handlePaste($event)" ng-blur="$ctrl.addEmail()" ng-keydown="$ctrl.handleInputKey($event)">
                </li>
            </ul>`,
    controller: emailsEditorController
};

export default emailsEditorConf;
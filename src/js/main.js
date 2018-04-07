import emailsEditorConf from  './emailsEditorComponent.js';
import mainController from './mainController';
angular
    .module('emailTestApp', [])
    .controller('mainController', mainController)
    .component('emailsEditor', emailsEditorConf)
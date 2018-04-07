class mainController{
    constructor(){
        this.emails=['sidorov@mail.ru'];
    }
    addRandomEmail(){
        this.emails.push(Math.random().toString(36).replace(/[^a-z]+/g, '')+'@gmail.com');
    }
    getEmailsCount(){
        alert(this.emails.length);
    }
}


export default mainController;
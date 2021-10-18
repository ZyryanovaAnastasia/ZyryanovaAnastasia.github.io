//  1. Шаблон для замены ковычек

function replaceQuotes(text) {
    const newText = text.replace(/\b'\b'/g, '"');
    console.log(newText);
    return newText;
}
replaceQuotes("They said: 'We aren't from france'");

// 2. Создать форму обратной связи с полями: Имя, Телефон, E-mail
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.

function checkText(text, regExp) {
    const result = text.replace(regExp, ""); 
    if (result.length != 0) {
        throw new Error(`Поле ${text} не прошло валидацию`)
    }
}

function checkForm(name, phone, email) {
    checkText(name, /[a-z]/ig);
    checkText(phone, /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi);
    checkText(email, /[a-z0-9.-]+@[a-z]+\.(ru|com)/gi);
}

checkForm("Nasty", "+7(000)000-0000", "my-mail@mail.ru");
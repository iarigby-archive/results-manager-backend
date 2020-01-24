module.exports = {
    new_file: {
        subject: (id, notification) =>
            `${id}: ${notification.type} დაემატა გამოცდების ნაშრომებს საგანში ${notification.subject}`
        ,
        body: (url, notification) =>
            `თქვენი ნაშრომს ახალი ფაილები დაემატა გამოცდებისთვის: ${notification.exam}
        ფაილების და დეტალების ნახვა შეგიძლიათ ბმულზე 
        ${url}
        თუ გვერდზე რაიმე შეცდომა დაფიქსირდა, გთხოვთ უპასუხოთ ამ მეილს.`
    }
}
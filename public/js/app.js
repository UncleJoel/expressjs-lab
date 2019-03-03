
$('button').click((e) => {
    e.preventDefault();
    let name = $('#name').val();
    let email = $('#email').val();
    let user = {
        name,
        email
    };

    $.ajax({
        type: 'POST',
        url: '/contact-form',
        data: user
    })
    .then(res => {
        console.log(res)
    })
    window.location.href = '/formsubmissions'
});
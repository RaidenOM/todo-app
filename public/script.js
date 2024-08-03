document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', function () {
        const description = this.closest('.notes-container').querySelector('p')
        const arrowIcon = this;
        description.classList.toggle('hidden');
        arrow.classList.toggle('fa-chevron-down');
        arrow.classList.toggle('fa-chevron-up');
    });
});

document.querySelectorAll('.edit').forEach(button => {
    button.addEventListener('click', function () {
        const container = this.closest('.notes-container');
        container.querySelector('.edit-form').classList.toggle('hidden');
    });
});

document.querySelectorAll('.cancel').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.edit-form').classList.add('hidden');
    });
});

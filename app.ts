import cssTransition from './src/cssTransition';

const button = document.getElementById('button');
const dialog = document.getElementById('dialog');

let open = false;

button.addEventListener('click', () => {
    if (open) {
        cssTransition.exit(dialog, 'anim-fadeout', true, () => {
            dialog.style.display = 'none';
        });
    } else {
        dialog.style.display = 'block';
        cssTransition.enter(dialog, 'anim-fadein');
    }
    open = !open;
});
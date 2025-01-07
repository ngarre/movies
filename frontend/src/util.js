import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const notifyError = function(message){
    Toastify({
            text: message,
            duration: 3000,
            gravity: 'top',
            position: 'center', // Corrige el error tipográfico
            style: {
                background: "red"
            },
        }).showToast();
};

const notifyOk = function(message){
    Toastify({
            text: message,
            duration: 3000,
            gravity: 'bottom',
            position: 'right', // Corrige el error tipográfico
            style: {
                background: "green"
            },
        }).showToast();
};

module.exports = {
    notifyError,
    notifyOk
};
import { ref } from 'vue';

export const token = ref(localStorage.getItem('authToken') || '');

export function setToken(value) {
    token.value = value;
    if (value) {
        localStorage.setItem('authToken', value);
    } else {
        localStorage.removeItem('authToken');
    }
}
window.addEventListener('storage', (event) => {
    if (event.key === 'authToken') {
        token.value = event.newValue;
    }
});

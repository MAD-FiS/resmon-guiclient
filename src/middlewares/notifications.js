import Notification from '../components/Notification';
import { SIGN_IN_SUCCESS, SIGN_OUT } from '../actions/auth';

const errorToMsg = (code, error) => {
    switch (code) {
        case 400:
            return 'Formularz został źle wypełniony';
        case 401:
            return 'Błędne dane autoryzacyjne';
        case 404:
            return 'Podany zasób nie istnieje';
        case 409:
            return 'Zasób, do którego próbujesz się odwołać, już istnieje i nie może zostać w ten sposób zmodyfikowany';
        default:
            return error;
    }
}

/**
 * Notification logic core - it's always better to hold it in one place... so here we are :)
 */
export default store => next => action => {

    if (action.error) {
        const msg = errorToMsg(action.code, action.error);
        Notification.error(msg);
    }

    else if (action.type === SIGN_IN_SUCCESS) {
        Notification.success('Zostałeś zalogowany poprawnie');
    }

    else if (action.type === SIGN_OUT) {
        Notification.success('Zostałeś wylogowany poprawnie');
    }

    return next(action);

}

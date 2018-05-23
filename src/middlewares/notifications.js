import Notification from '../components/Notification';
import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT } from '../actions/auth';
import { CHANGE_MONITOR_ADDRESS, CHANGE_MONITOR_DESCRIPTION, CHANGE_MONITOR, ADD_MONITOR } from '../actions/monitors';
import { getMonitorById } from '../reducers';

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

    else if (action.type === SIGN_UP_SUCCESS) {
        Notification.success('Rejestracja przebiegła pomyślnie');
    }

    else if (action.type === SIGN_OUT) {
        Notification.success('Zostałeś wylogowany poprawnie');
    }

    // notifications with checkings

    else if (action.type === CHANGE_MONITOR_ADDRESS) {
        const target = getMonitorById(store.getState(), action.address);
        const monitorExists = getMonitorById(store.getState(), action.newAddress);
        if (!action.newAddress) {
            Notification.error('Pole z adresem monitora nie może być puste!');
            action.newAddress = target.address;
        }
        else if (monitorExists) {
            Notification.error('Podany nowy adres monitora już istnieje');
            action.newAddress = target.address;
        }
    }

    else if (action.type === CHANGE_MONITOR_DESCRIPTION) {
        const target = getMonitorById(store.getState(), action.address);
        if (!action.newDescription) {
            Notification.error('Pole z opisem monitora nie może być puste!');
            action.newDescription = target.description;
        }
    }

    else if (action.type === CHANGE_MONITOR) {
        const target = getMonitorById(store.getState(), action.address);
        const monitorExists = getMonitorById(store.getState(), action.payload.address);
        if (!action.payload.address) {
            Notification.error('Pole z adresem monitora nie może być puste!');
            action.payload = target;
        }
        else if (!action.payload.description) {
            Notification.error('Pole z opisem monitora nie może być puste!');
            action.payload = target;
        }
        else if (monitorExists) {
            Notification.error('Podany nowy adres monitora już istnieje');
            action.payload = target;
        }
    }

    else if (action.type === ADD_MONITOR) {
        if (!action.payload.address) {
            Notification.error('Pole z adresem monitora nie może być puste!');
            return;
        }
        if (!action.payload.description) {
            Notification.error('Pole z opisem monitora nie może być puste!');
            return;
        }
        const monitorExists = getMonitorById(store.getState(), action.payload.address);
        if (monitorExists) {
            Notification.error('Podany adres monitora już istnieje');
            return;
        }
    }

    return next(action);

}

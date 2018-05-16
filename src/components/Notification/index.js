import {notification} from 'antd';

/*
    Example:

    import Notification from "/components/Notification";

    Notification.error("Błędny login lub hasło");
    Notification.success("Metryka zaawansowana została dodana");
 */

export default class Notification
{
    static success(description) {
        notification.success({
            message: "Sukces",
            placement: "bottomLeft",
            duration: 3,
            description
        });
    }

    static info(description) {
        notification.info({
            message: "Informacja",
            placement: "bottomLeft",
            duration: 3,
            description
        });
    }

    static warning(description) {
        notification.warning({
            message: "Ostrzeżenie",
            placement: "bottomLeft",
            duration: 3,
            description
        });
    }

    static error(description) {
        notification.error({
            message: "Błąd",
            placement: "bottomLeft",
            duration: 3,
            description
        });
    }
}

export const regexPhone = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[0-9]{8,16}$/
);
export const regexEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
    regexPhone,
    regexEmail,
};

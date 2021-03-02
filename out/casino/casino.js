"use strict";
class Casino {
    constructor() {
    }
    doubleOrNothing(user, value) {
        if (Math.random() * Math.floor(max) > 51) {
            user.addCash(value);
            return [true, value];
        }
    }
}

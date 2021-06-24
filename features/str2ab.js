"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str2ab = void 0;
function str2ab(str) {
    var array = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i);
    }
    return array.buffer;
}
exports.str2ab = str2ab;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationPhp = void 0;
exports.registrationPhp = "<?php\r\n\
\\Magento\\Framework\\Component\\ComponentRegistrar::register(\r\n\
    \t\\Magento\\Framework\\Component\\ComponentRegistrar::MODULE,\r\n\
    \t'%moduleName%',\r\n\
    \t__DIR__\r\n\
);";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleXml = '<?xml version="1.0" ?>\r\n\
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">\r\n\
\t<module name="%moduleName%"/>\r\n\
</config>';
exports.registrationPhp = "<?php\r\n\
\\Magento\\Framework\\Component\\ComponentRegistrar::register(\r\n\
    \t\\Magento\\Framework\\Component\\ComponentRegistrar::MODULE,\r\n\
    \t'%moduleName%',\r\n\
    \t__DIR__\r\n\
);";
exports.helperData = "<?php\r\n\
\r\n\
namespace %moduleName%\\Helper;\r\n\
\r\n\
use Magento\\Framework\\Stdlib\\DateTime\\DateTime;\r\n\
use Magento\\Customer\\Model\\Session as CustomerSession;\r\n\
\r\n\
/**\r\n\
 * helper class.\r\n\
 *\/\r\n\
class Data extends \\Magento\\Framework\\App\\Helper\\AbstractHelper\r\n\
{\r\n\
\t/**\r\n\
\t * @param Session $customerSession\r\n\
\t * @param \\Magento\\Framework\\App\\Helper\\Context $context\r\n\
\t * @param \\Magento\\Store\\Model\\StoreManagerInterface $storeManager\r\n\
\t *\/\r\n\
\tpublic function __construct(\r\n\
\t\tCustomerSession $customerSession,\r\n\
\t\t\\Magento\\Framework\\App\\Helper\\Context $context,\r\n\
\t\t\\Magento\\Store\\Model\\StoreManagerInterface $storeManager\r\n\
\t) {\r\n\
\t\t$this->_customerSession = $customerSession;\r\n\
\t\t$this->_storeManager = $storeManager;\r\n\
\t\tparent::__construct($context);\r\n\
\t}\r\n\
}";
exports.frontRouteTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:framework:App/etc/routes.xsd\">\r\n\
\t<router id=\"standard\">\r\n\
\t\t<route id=\"%route%\" frontName=\"%route%\">\r\n\
\t\t\t<module name=\"%module_name%\"/>\r\n\
\t\t</route>\r\n\
\t</router>\r\n\
</config>";
exports.adminRouteTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:framework:App/etc/routes.xsd\">\r\n\
\t<router id=\"admin\">\r\n\
\t\t<route id=\"%route%\" frontName=\"%route%\">\r\n\
\t\t\t<module name=\"%module_name%\"/>\r\n\
\t\t</route>\r\n\
\t</router>\r\n\
</config>";
exports.frontActionTemplate = "<?php\r\n\
\r\n\
namespace %module_name%\\Controller\\%controller%;\r\n\
\r\n\
use Magento\\Framework\\App\\Action\\Action;\r\n\
use Magento\\Framework\\App\\Action\\Context;\r\n\
use Magento\\Framework\\View\\Result\\PageFactory;\r\n\
\r\n\
class %class_name% extends Action\r\n\
{\r\n\
\t/**\r\n\
\t * @param Context $context\r\n\
\t * @param PageFactory $resultPageFactory\r\n\
\t */\r\n\
\tpublic function __construct(\r\n\
\t\tContext $context,\r\n\
\t\tPageFactory $resultPageFactory\r\n\
\t) {\r\n\
\t\t$this->_resultPageFactory = $resultPageFactory;\r\n\
\t\tparent::__construct($context);\r\n\
\t}\r\n\
\r\n\
\tpublic function execute()\r\n\
\t{\r\n\
\t\t$resultPage = $this->_resultPageFactory->create();\r\n\
\t\t$pageLabel = \"\";\r\n\
\t\t$resultPage->getConfig()->getTitle()->set(__());\r\n\
\t\t$layout = $resultPage->getLayout();\r\n\
\t\treturn $resultPage;\r\n\
\t}\r\n\
}";
exports.adminActionTemplate = "<?php\r\n\
\r\n\
namespace %module_name%\\Controller\\%controller%;\r\n\
\r\n\
use Magento\\Backend\\App\\Action;\r\n\
use Magento\\Backend\\App\\Action\\Context;\r\n\
use Magento\\Framework\\View\\Result\\PageFactory;\r\n\
\r\n\
class %class_name% extends Action\r\n\
{\r\n\
\tpublic function __construct(\r\n\
\t\tContext $context,\r\n\
\t\tPageFactory $resultPageFactory,\r\n\
\t\t\\Magento\\Backend\\Model\\View\\Result\\ForwardFactory $resultForwardFactory\r\n\
\t) {\r\n\
\t\tparent::__construct($context);\r\n\
\t\t$this->resultPageFactory = $resultPageFactory;\r\n\
\t\t$this->resultForwardFactory = $resultForwardFactory;\r\n\
\t}\r\n\
\r\n\
\t/**\r\n\
\t * Check for is allowed\r\n\
\t *\r\n\
\t * @return boolean\r\n\
\t */\r\n\
\tprotected function _isAllowed()\r\n\
\t{\r\n\
\t\treturn $this->_authorization->isAllowed(\"resource_name\");\r\n\
\t}\r\n\
\r\n\
\tpublic function execute()\r\n\
\t{\r\n\
\t\t\r\n\
\t}\r\n\
}";
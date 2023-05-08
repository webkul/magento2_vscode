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
);\n";
exports.helperData = "<?php\r\n\
\r\n\
namespace %moduleName%\\Helper;\r\n\
\r\n\
use Magento\\Customer\\Model\\Session as CustomerSession;\r\n\
use Magento\\Framework\\Stdlib\\DateTime\\DateTime;\r\n\
\r\n\
/**\r\n\
 * Helper class\r\n\
 *\/\r\n\
class Data extends \\Magento\\Framework\\App\\Helper\\AbstractHelper\r\n\
{\n\
\t/**\n\
\t* @param Session $_customerSession\n\
\t* @param DateTime $_dateTime\n\
\t* @param \\Magento\\Store\\Model\\StoreManagerInterface $_storeManager\n\
\t* @param \\Magento\\Framework\\App\\Helper\\Context $context\n\
\t*\/\n\
\tpublic function __construct(\n\
\t\tpublic CustomerSession $_customerSession,\n\
\t\tpublic DateTime $_dateTime,\n\
\t\tpublic \\Magento\\Store\\Model\\StoreManagerInterface $_storeManager,\n\
\t\t\\Magento\\Framework\\App\\Helper\\Context $context\n\
\t) {\n\
\t\tparent::__construct($context);\n\
\t}\n\
}\n";
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
use Magento\\Framework\\App\\ActionInterface;\r\n\
use Magento\\Framework\\View\\Result\\PageFactory;\r\n\
\r\n\
class %class_name% implements ActionInterface\r\n\
{\r\n\
\t/**\r\n\
\t * @param PageFactory $_resultPageFactory\r\n\
\t */\r\n\
\tpublic function __construct(\r\n\
\t\tpublic PageFactory $_resultPageFactory\r\n\
\t) {\r\n\
\t}\r\n\
\r\n\
\tpublic function execute()\r\n\
\t{\r\n\
\t\t$resultPage = $this->_resultPageFactory->create();\r\n\
\t\t$pageLabel = __(\"\");\r\n\
\t\t$resultPage->getConfig()->getTitle()->set($pageLabel);\r\n\
\t\t$layout = $resultPage->getLayout();\r\n\
\t\treturn $resultPage;\r\n\
\t}\r\n\
}\n";
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
\t\tpublic PageFactory $resultPageFactory,\r\n\
\t\tpublic \\Magento\\Backend\\Model\\View\\Result\\ForwardFactory $resultForwardFactory\r\n\
\t) {\r\n\
\t\tparent::__construct($context);\r\n\
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
}\n";

// shipping method file templates

exports.systemXmlTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:module:Magento_Config:etc/system_file.xsd\">\r\n\
\t<system>\r\n\
\t\t<section id=\"carriers\" type=\"text\" sortOrder=\"999\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"1\">\r\n\
\t\t\t<group id=\"%shipping_code%\" type=\"text\" sortOrder=\"999\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"1\">\r\n\
\t\t\t\t<label>%name%</label>\r\n\
\t\t\t\t<field id=\"active\" translate=\"label\" type=\"select\" sortOrder=\"10\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Enabled</label>\r\n\
\t\t\t\t\t<source_model>Magento\\Config\\Model\\Config\\Source\\Yesno</source_model>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"name\" translate=\"label\" type=\"text\" sortOrder=\"30\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Method Name</label>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"sort_order\" translate=\"label\" type=\"text\" sortOrder=\"100\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Sort Order</label>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"title\" translate=\"label\" type=\"text\" sortOrder=\"20\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Title</label>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"price\" translate=\"label\" type=\"text\" sortOrder=\"100\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Price</label>\r\n\
\t\t\t\t\t<validate>validate-number validate-zero-or-greater</validate>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"applicable_countries\" translate=\"label\" type=\"select\" sortOrder=\"50\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Ship to Applicable Countries</label>\r\n\
\t\t\t\t\t<frontend_class>shipping-applicable-country</frontend_class>\r\n\
\t\t\t\t\t<source_model>Magento\\Shipping\\Model\\Config\\Source\\Allspecificcountries</source_model>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t\t<field id=\"sallowspecific\" translate=\"label\" type=\"multiselect\" sortOrder=\"51\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Ship to Specific Countries</label>\r\n\
\t\t\t\t\t<can_be_empty>1</can_be_empty>\r\n\
\t\t\t\t\t<source_model>Magento\\Directory\\Model\\Config\\Source\\Country</source_model>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t</group>\r\n\
\t\t</section>\r\n\
\t</system>\r\n\
</config>";

exports.configXmlTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:module:Magento_Store:etc/config.xsd\">\r\n\
\t<default>\r\n\
\t\t<carriers>\r\n\
\t\t\t<%shipping_code%>\r\n\
\t\t\t\t<active>1</active>\r\n\
\t\t\t\t<sallowspecific/>\r\n\
\t\t\t\t<model>%moduleName%\\Model\\%name%\\Carrier</model>\r\n\
\t\t\t\t<price>5.00</price>\r\n\
\t\t\t\t<title>%name%</title>\r\n\
\t\t\t\t<specificerrmsg>Not able to load shipping cost.</specificerrmsg>\r\n\
\t\t\t</%shipping_code%>\r\n\
\t\t</carriers>\r\n\
\t</default>\r\n\
</config>";

exports.carrierFileTemplate = "<?php\r\n\
\r\n\
namespace %moduleName%\\Model\\%name%;\r\n\
\r\n\
use Magento\\Quote\\Model\\Quote\\Address\\RateRequest;\r\n\
\r\n\
/**\r\n\
 * Shipping Model.\r\n\
 *\/\r\n\
class Carrier extends \\Magento\\Shipping\\Model\\Carrier\\AbstractCarrier implements \\Magento\\Shipping\\Model\\Carrier\\CarrierInterface\r\n\
{\r\n\
\t/**\r\n\
\t * @var string\r\n\
\t */\r\n\
\tprotected $_code = '%shipping_code%';\r\n\
\r\n\
\t/**\r\n\
\t * @var bool\r\n\
\t */\r\n\
\tprotected $_isFixed = true;\r\n\
\r\n\
\t/**\r\n\
\t * @param \\Magento\\Framework\\App\\Config\\ScopeConfigInterface $scopeConfig\r\n\
\t * @param \\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\ErrorFactory $rateErrorFactory\r\n\
\t * @param \\Psr\\Log\\LoggerInterface $logger\r\n\
\t * @param \\Magento\\Shipping\\Model\\Rate\\ResultFactory $rateResultFactory\r\n\
\t * @param \\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\MethodFactory $rateMethodFactory\r\n\
\t * @param array $data\r\n\
\t */\r\n\
\tpublic function __construct(\r\n\
\t\t\\Magento\\Framework\\App\\Config\\ScopeConfigInterface $scopeConfig,\r\n\
\t\t\\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\ErrorFactory $rateErrorFactory,\r\n\
\t\t\\Psr\\Log\\LoggerInterface $logger,\r\n\
\t\tprotected \\Magento\\Shipping\\Model\\Rate\\ResultFactory $_rateResultFactory,\r\n\
\t\tprotected \\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\MethodFactory $_rateMethodFactory,\r\n\
\t\tarray $data = []\r\n\
\t)\t{\r\n\
\t\tparent::__construct($scopeConfig, $rateErrorFactory, $logger, $data);\r\n\
\t}\r\n\
\r\n\
\t/**\r\n\
\t * Rates Collector\r\n\
\t *\r\n\
\t * @param RateRequest $request\r\n\
\t * @return \\Magento\\Shipping\\Model\\Rate\\Result|bool\r\n\
\t */\r\n\
\tpublic function collectRates(RateRequest $request)\r\n\
\t{\r\n\
\t\tif (!$this->getConfigFlag('active')) {\r\n\
\t\t    return false;\r\n\
\t\t}\r\n\
\t\t\r\n\
\t\t/** @var \\Magento\\Shipping\\Model\\Rate\\Result $result */\r\n\
\t\t$result = $this->_rateResultFactory->create();\r\n\
\t\t\r\n\
\t\t$method = $this->_rateMethodFactory->create();\r\n\
\t\t$method->setCarrier('%shipping_code%');\r\n\
\t\t$method->setCarrierTitle($this->getConfigData('title'));\r\n\
\t\t\r\n\
\t\t$method->setMethod('%shipping_code%');\r\n\
\t\t$method->setMethodTitle($this->getConfigData('name'));\r\n\
\t\t\r\n\
\t\t$method->setPrice($this->getConfigData('price'));\r\n\
\t\t$method->setCost($this->getConfigData('price'));\r\n\
\t\t$result->append($method);\r\n\
\t\t\r\n\
\t\treturn $result;\r\n\
\t}\r\n\
\r\n\
\t/**\r\n\
\t * Returns allowed shipping methods\r\n\
\t *\r\n\
\t * @return array\r\n\
\t */\r\n\
\tpublic function getAllowedMethods()\r\n\
\t{\r\n\
\t\treturn ['%shipping_code%' => $this->getConfigData('name')];\r\n\
\t}\r\n\
}\n";

// payment methods template

exports.systemXmlPaymentTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:module:Magento_Config:etc/system_file.xsd\">\r\n\
\t<system>\r\n\
\t\t<section id=\"payment\" type=\"text\" sortOrder=\"999\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"1\">\r\n\
\t\t\t<group id=\"%payment_code%\" type=\"text\" sortOrder=\"999\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"1\">\r\n\
\t\t\t\t<label>%name%</label>\r\n\
\t\t\t\t<field id=\"active\" translate=\"label\" type=\"select\" sortOrder=\"10\" showInDefault=\"1\" showInWebsite=\"1\" showInStore=\"0\" canRestore=\"1\">\r\n\
\t\t\t\t\t<label>Enable</label>\r\n\
\t\t\t\t\t<source_model>Magento\\Config\\Model\\Config\\Source\\Yesno</source_model>\r\n\
\t\t\t\t</field>\r\n\
\t\t\t</group>\r\n\
\t\t</section>\r\n\
\t</system>\r\n\
</config>";

exports.configXmlPaymentTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<config xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:module:Magento_Store:etc/config.xsd\">\r\n\
\t<default>\r\n\
\t\t<payment>\r\n\
\t\t\t<%payment_code%>\r\n\
\t\t\t\t<active>1</active>\r\n\
\t\t\t\t<payment_action>authorize</payment_action>\r\n\
\t\t\t\t<model>%moduleName%\\Model\\%filename%</model>\r\n\
\t\t\t\t<title>%name%</title>\r\n\
\t\t\t\t<order_status>pending_payment</order_status>\r\n\
\t\t\t</%payment_code%>\r\n\
\t\t</payment>\r\n\
\t</default>\r\n\
</config>";

exports.paymentModelTemplate = "<?php\r\n\
\r\n\
namespace %moduleName%\\Model;\r\n\
\r\n\
/**\r\n\
 * %filename% Class\r\n\
 */\r\n\
class %filename% extends \\Magento\\Payment\\Model\\Method\\AbstractMethod\r\n\
{\r\n\
\t    \r\n\
\t    protected $_code = '%payment_code%';\r\n\
\t\r\n\
}";

exports.paymentlayoutFileTemplate = "<?xml version=\"1.0\"?>\r\n\
\r\n\
<page xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"urn:magento:framework:View/Layout/etc/page_configuration.xsd\">\r\n\
\t<body>\r\n\
\t\t<referenceBlock name=\"checkout.root\">\r\n\
\t\t\t<arguments>\r\n\
\t\t\t\t<argument name=\"jsLayout\" xsi:type=\"array\">\r\n\
\t\t\t\t\t<item name=\"components\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t<item name=\"checkout\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t<item name=\"children\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t<item name=\"steps\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t<item name=\"children\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t<item name=\"billing-step\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t<item name=\"component\" xsi:type=\"string\">uiComponent</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t<item name=\"children\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"payment\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"children\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"renders\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t <!-- merge payment method renders here -->\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"children\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"%payment_code%\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"component\" \txsi:type=\"string\">%moduleName%/js/view/payment/method-renderer</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"methods\" xsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"%payment_code%\" \txsi:type=\"array\">\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<item name=\"isBillingAddressRequired\" xsi:type=\"boolean\">true</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t\t</item>\r\n\
\t\t\t\t\t</item>\r\n\
\t\t\t\t</argument>\r\n\
\t\t\t</arguments>\r\n\
\t\t</referenceBlock>\r\n\
\t</body>\r\n\
</page>"

exports.paymentHtmlTemplate = "<div class=\"payment-method\" data-bind=\"css: {'_active': (getCode() == isChecked())}\">\r\n\
\t<div class=\"payment-method-title field choice\">\r\n\
\t\t<input type=\"radio\"\r\n\
\t\t\tname=\"payment[method]\"\r\n\
\t\t\tclass=\"radio\"\r\n\
\t\t\tdata-bind=\"attr: {'id': getCode()}, value: getCode(), checked: isChecked, click: selectPaymentMethod, visible: isRadioButtonVisible()\"/>\r\n\
\t\t<label data-bind=\"attr: {'for': getCode()}\" class=\"label\"><span data-bind=\"text: getTitle()\"></span></label>\r\n\
\t</div>\r\n\
\t<div class=\"payment-method-content\">\r\n\
\t\t<div class=\"actions-toolbar\">\r\n\
\t\t\t<div class=\"primary\">\r\n\
\t\t\t\t<button class=\"action primary checkout\"\r\n\
\t\t\t\t\t\ttype=\"submit\"\r\n\
\t\t\t\t\t\tdata-bind=\"\r\n\
\t\t\t\t\t\tclick: placeOrder,\r\n\
\t\t\t\t\t\tattr: {title: $t('Place Order')},\r\n\
\t\t\t\t\t\tcss: {disabled: !isPlaceOrderActionAllowed()},\r\n\
\t\t\t\t\t\tenable: (getCode() == isChecked())\r\n\
\t\t\t\t\t\t\"\r\n\
\t\t\t\t\t\tdisabled>\r\n\
\t\t\t\t\t<span data-bind=\"i18n: 'Place Order'\"></span>\r\n\
\t\t\t\t</button>\r\n\
\t\t\t</div>\r\n\
\t\t</div>\r\n\
\t</div>\r\n\
</div>"

exports.methodRenderTemplate = "define(\r\n\
\t[\r\n\
\t\t'uiComponent',\r\n\
\t\t'Magento_Checkout/js/model/payment/renderer-list'\r\n\
\t],\r\n\
\tfunction (\r\n\
\t\tComponent,\r\n\
\t\trendererList\r\n\
\t) {\r\n\
\t\t'use strict';\r\n\
\t\trendererList.push(\r\n\
\t\t\t{\r\n\
\t\t\t\ttype: '%payment_code%',\r\n\
\t\t\t\tcomponent: '%moduleName%/js/view/payment/method-renderer/%payment_code%'\r\n\
\t\t\t}\r\n\
\t\t);\r\n\
\t\treturn Component.extend({});\r\n\
\t}\r\n\
);"

exports.paymentjsTemplate = "define(\r\n\
\t[\r\n\
\t\t'Magento_Checkout/js/view/payment/default'\r\n\
\t],\r\n\
\tfunction (Component) {\r\n\
\t\t'use strict';\r\n\
\t\t\r\n\
\t\treturn Component.extend({\r\n\
\t\t\tdefaults: {\r\n\
\t\t\t\ttemplate: '%moduleName%/payment/%payment_code%'\r\n\
\t\t\t}\r\n\
\t\t});\r\n\
\t}\r\n\
);"

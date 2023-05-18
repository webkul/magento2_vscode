"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleXml = '<?xml version="1.0" ?>\r\n\
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">\r\n\
\t<module name="%moduleName%"/>\r\n\
</config>';
exports.registrationPhp = "<?php\n\
\\Magento\\Framework\\Component\\ComponentRegistrar::register(\n\
    \\Magento\\Framework\\Component\\ComponentRegistrar::MODULE,\n\
    '%moduleName%',\n\
    __DIR__\n\
);\n";
exports.helperData = "<?php\n\
\n\
namespace %moduleName%\\Helper;\n\
\n\
use Magento\\Framework\\App\\Helper\\AbstractHelper;\n\
use Magento\\Store\\Model\\StoreManagerInterface;\n\
use Magento\\Framework\\App\\Helper\\Context;\n\
\n\
/**\n\
 * Helper class\n\
 *\/\n\
class Data extends AbstractHelper\n\
{\n\
    /**\n\
     * @var StoreManagerInterface\n\
     *\/\n\
    public $_storeManager;\n\
\n\
    /**\n\
     * Helper class constructor\n\
     *\n\
     * @param StoreManagerInterface $_storeManager\n\
     * @param Context $context\n\
     *\/\n\
    public function __construct(\n\
        StoreManagerInterface $_storeManager,\n\
        Context $context\n\
    ) {\n\
        $this->_storeManager = $_storeManager;\n\
        parent::__construct($context);\n\
    }\n\
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
exports.frontActionTemplate = "<?php\n\
\n\
namespace %module_name%\\Controller\\%controller%;\n\
\n\
use Magento\\Framework\\App\\ActionInterface;\n\
use Magento\\Framework\\View\\Result\\PageFactory;\n\
\n\
/**\n\
 * %class_name% class for %controller%\n\
 *\/\n\
class %class_name% implements ActionInterface\n\
{\n\
    /**\n\
     * @var PageFactory\n\
     *\/\n\
    public $_resultPageFactory;\n\
    /**\n\
     * %class_name% class constructor\n\
     *\n\
     * @param PageFactory $_resultPageFactory\n\
     *\/\n\
    public function __construct(\n\
        PageFactory $_resultPageFactory\n\
    ) {\n\
        $this->_resultPageFactory = $_resultPageFactory;\n\
    }\n\
\n\
    /**\n\
     * %class_name% execute method\n\
     *\n\
     * @return \\Magento\\Framework\\View\\Result\\Page\n\
     *\/\n\
    public function execute()\n\
    {\n\
        $resultPage = $this->_resultPageFactory->create();\n\
        $pageLabel = __(\"\");\n\
        $resultPage->getConfig()->getTitle()->set($pageLabel);\n\
        return $resultPage;\n\
    }\n\
}\n";
exports.adminActionTemplate = "<?php\n\
\n\
namespace %module_name%\\Controller\\%controller%;\n\
\n\
use Magento\\Backend\\App\\Action as AppAction;\n\
use Magento\\Backend\\App\\Action\\Context;\n\
use Magento\\Framework\\View\\Result\\PageFactory;\n\
use Magento\\Backend\\Model\\View\\Result\\ForwardFactory;\n\
\n\
/**\n\
 * %class_name% class for %controller%\n\
 *\/\n\
class %class_name% extends AppAction\n\
{\n\
    /**\n\
     * @var PageFactory\n\
     *\/\n\
    public $_resultPageFactory;\n\
\n\
    /**\n\
     * @var ForwardFactory\n\
     *\/\n\
    public $_resultForwardFactory;\n\
\n\
    /**\n\
     * %class_name% class constructor\n\
     *\n\
     * @param Context $context\n\
     * @param PageFactory $_resultPageFactory\n\
     * @param ForwardFactory $_resultForwardFactory\n\
     *\/\n\
    public function __construct(\n\
        Context $context,\n\
        PageFactory $_resultPageFactory,\n\
        ForwardFactory $_resultForwardFactory\n\
    ) {\n\
        $this->_resultPageFactory = $_resultPageFactory;\n\
        $this->_resultForwardFactory = $_resultForwardFactory;\n\
        parent::__construct($context);\n\
    }\n\
\n\
    /**\n\
     * %class_name% execute method\n\
     *\n\
     * @return \\Magento\\Backend\\Model\\View\\Result\\Page\n\
     *\/\n\
    public function execute()\n\
    {\n\
        $resultPage = $this->_resultPageFactory->create();\n\
        $pageLabel = __(\"\");\n\
        $resultPage->getConfig()->getTitle()->set($pageLabel);\n\
        return $resultPage;\n\
    }\n\
\n\
    /**\n\
     * Check for is allowed\n\
     *\n\
     * @return boolean\n\
     */\n\
    protected function _isAllowed()\n\
    {\n\
        return $this->_authorization->isAllowed(\"resource_name\");\n\
    }\n\
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

exports.carrierFileTemplate = "<?php\n\
\n\
namespace %moduleName%\\Model\\%name%;\n\
\n\
use Magento\\Quote\\Model\\Quote\\Address\\RateRequest;\n\
use Magento\\Shipping\\Model\\Carrier\\AbstractCarrier;\n\
use Magento\\Shipping\\Model\\Carrier\\CarrierInterface;\n\
use Magento\\Shipping\\Model\\Rate\\ResultFactory;\n\
use Magento\\Quote\\Model\\Quote\\Address\\RateResult\\MethodFactory;\n\
\n\
/**\n\
 * Shipping Model.\n\
 *\/\n\
class Carrier extends AbstractCarrier implements CarrierInterface\n\
{\n\
    /**\n\
     * @var string\n\
     */\n\
    protected $_code = '%shipping_code%';\n\
\n\
    /**\n\
     * @var bool\n\
     */\n\
    protected $_isFixed = true;\n\
\n\
    /**\n\
     * @var ResultFactory\n\
     */\n\
    protected $_rateResultFactory;\n\
\n\
    /**\n\
     * @var MethodFactory\n\
     */\n\
    protected $_rateMethodFactory;\n\
\n\
    /**\n\
     * @param \\Magento\\Framework\\App\\Config\\ScopeConfigInterface $scopeConfig\n\
     * @param \\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\ErrorFactory $rateErrorFactory\n\
     * @param \\Psr\\Log\\LoggerInterface $logger\n\
     * @param ResultFactory $_rateResultFactory\n\
     * @param MethodFactory $_rateMethodFactory\n\
     * @param array $data\n\
     */\n\
    public function __construct(\n\
        \\Magento\\Framework\\App\\Config\\ScopeConfigInterface $scopeConfig,\n\
        \\Magento\\Quote\\Model\\Quote\\Address\\RateResult\\ErrorFactory $rateErrorFactory,\n\
        \\Psr\\Log\\LoggerInterface $logger,\n\
        ResultFactory $_rateResultFactory,\n\
        MethodFactory $_rateMethodFactory,\n\
        array $data = []\n\
    ) {\n\
        $this->_rateResultFactory = $_rateResultFactory;\n\
        $this->_rateMethodFactory = $_rateMethodFactory;\n\
        parent::__construct($scopeConfig, $rateErrorFactory, $logger, $data);\n\
    }\n\
\n\
    /**\n\
     * Rates Collector\n\
     *\n\
     * @param RateRequest $request\n\
     * @return \\Magento\\Shipping\\Model\\Rate\\Result|bool\n\
     */\n\
    public function collectRates(RateRequest $request)\n\
    {\n\
        if (!$this->getConfigFlag('active')) {\n\
            return false;\n\
        }\n\
        \n\
        /** @var \\Magento\\Shipping\\Model\\Rate\\Result $result */\n\
        $result = $this->_rateResultFactory->create();\n\
        \n\
        $method = $this->_rateMethodFactory->create();\n\
        $method->setCarrier('%shipping_code%');\n\
        $method->setCarrierTitle($this->getConfigData('title'));\n\
        \n\
        $method->setMethod('%shipping_code%');\n\
        $method->setMethodTitle($this->getConfigData('name'));\n\
        \n\
        $method->setPrice($this->getConfigData('price'));\n\
        $method->setCost($this->getConfigData('price'));\n\
        $result->append($method);\n\
        \n\
        return $result;\n\
    }\n\
\n\
    /**\n\
     * Returns allowed shipping methods\n\
     *\n\
     * @return array\n\
     */\n\
    public function getAllowedMethods()\n\
    {\n\
        return ['%shipping_code%' => $this->getConfigData('name')];\n\
    }\n\
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

exports.paymentModelTemplate = "<?php\n\
\n\
namespace %moduleName%\\Model;\n\
\n\
/**\n\
 * %filename% Class for Payment Method\n\
 */\n\
class %filename% extends \\Magento\\Payment\\Model\\Method\\AbstractMethod\n\
{\n\
    /**\n\
     * @var string\n\
     */\n\
    protected $_code = '%payment_code%';\n\
}\n";

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
\t\t\tdata-bind=\"attr: {'id': getCode()}, value: getCode(), checked: isChecked, click: selectPaymentMethod, visible: isRadioButtonVisible()\">\r\n\
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

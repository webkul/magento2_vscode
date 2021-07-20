let getTypes = () => {
    return [
        {
            name: 'tab',
            value: 'tab id="" translate="label" sortOrder="10">\n\t<label></label>\n</tab>'
        },
        {
            name: 'tab (reference)',
            value: 'tab></tab>'
        },
        {
            name: 'label',
            value: 'label></label>'
        },
        {
            name: 'resource',
            value: 'resource></resource>'
        },
        {
            name: 'validate',
            value: 'validate></validate>'
        },
        {
            name: 'comment',
            value: 'comment></comment>'
        },
        {
            name: 'source_model',
            value: 'source_model></source_model>'
        },
        {
            name: 'backend_model',
            value: 'backend_model></backend_model>'
        },
        {
            name: 'system',
            value: 'system>\n\t\n</system>'
        },
        {
            name: 'depends',
            value: 'depends>\n\t<field id="">1</field>\n</depends>'
        },
        {
            name: 'section',
            value: 'section id="" translate="label" type="text" sortOrder="300" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n\t<tab></tab>\n\t<resource></resource>\n\t<group id="" translate="label" type="text" sortOrder="0" showInDefault="1" showInWebsite="1" showInStore="1">\n\t\t<label></label>\n\t</group>\n</section>'
        },
        {
            name: 'group',
            value: 'group id="" translate="label" type="text" sortOrder="0" showInDefault="1" showInWebsite="1" showInStore="1">\n\t\t<label></label>\n\t</group>'
        },
        {
            name: 'field (text)',
            value: 'field id="" translate="label" sortOrder="0" type="text" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n</field>'
        },
        {
            name: 'field (select)',
            value: 'field id="" translate="label" sortOrder="0" type="select" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n\t<source_model></source_model>\n</field>'
        },
        {
            name: 'field (multiselect)',
            value: 'field id="" translate="label" sortOrder="0" type="multiselect" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n\t<source_model></source_model>\n</field>'
        },
        {
            name: 'field (image)',
            value: 'field id="" translate="label" sortOrder="0" type="image" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n\t<backend_model></backend_model>\n\t<base_url type="media" scope_info="1"></base_url>\n\t<upload_dir config="system/filesystem/media" scope_info="1"></upload_dir>\n</field>'
        },
        {
            name: 'field (password)',
            value: 'field id="" translate="label" sortOrder="0" type="password" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n</field>'
        },
        {
            name: 'field (obscure)',
            value: 'field id="" translate="label" sortOrder="0" type="obscure" showInDefault="1" showInWebsite="1" showInStore="1">\n\t<label></label>\n\t<backend_model>Magento\\Config\\Model\\Config\\Backend\\Encrypted</backend_model>\n</field>'
        }
    ];
}
let getValidations = () => {
    return [
        "alphanumeric",
        "integer",
        "ipv4",
        "ipv6",
        "letters-only",
        "letters-with-basic-punc",
        "mobileUK",
        "no-marginal-whitespace",
        "no-whitespace",
        "phoneUK",
        "phoneUS",
        "required-entry",
        "time",
        "time12h",
        "validate-admin-password",
        "validate-alphanum-with-spaces",
        "validate-clean-url",
        "validate-currency-dollar",
        "validate-data",
        "validate-date-au",
        "validate-email",
        "validate-emailSender",
        "validate-fax",
        "validate-no-empty",
        "validate-no-html-tags",
        "validate-password",
        "validate-phoneLax",
        "validate-phoneStrict",
        "validate-select",
        "validate-ssn",
        "validate-street",
        "validate-url",
        "validate-xml-identifier",
        "validate-zip-us",
        "vinUS"
    ];
}
exports.getTypes = getTypes;
exports.getValidations = getValidations;
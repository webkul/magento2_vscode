let getTypes = () => {
    return [
        {
            name: 'block',
            value: 'block class="" name=""></block>'
        },
        {
            name: 'referenceBlock',
            value: 'referenceBlock name="">\n\t\n</referenceBlock>'
        },
        {
            name: 'container',
            value: 'container name=""/>'
        },
        {
            name: 'referenceContainer',
            value: 'referenceContainer name="">\n\t\n</referenceContainer>'
        },
        {
            name: 'arguments',
            value: 'arguments>\n\t<argument name="" xsi:type=""></argument>\n</arguments>'
        },
        {
            name: 'head',
            value: 'head>\n\n</head>'
        },
        {
            name: 'body',
            value: 'body>\n\n</body>'
        },
        {
            name: 'action',
            value: 'action method="">\n\t<argument name="" xsi:type=""></argument>\n</action>'
        },
        {
            name: 'title',
            value: 'title></title>'
        },
        {
            name: 'css',
            value: 'css src=""/>'
        },
        {
            name: 'update',
            value: 'update handle=""/>'
        },
        {
            name: 'link',
            value: 'link src="" />'
        },
        {
            name: 'action (Template override)',
            value: 'action method="setTemplate">\n\t<argument name="template" xsi:type="string"></argument>\n</action>'
        },
        {
            name: 'arguments (Template override)',
            value: 'arguments>\n\t<argument name="template" xsi:type="string"></argument>\n</arguments>'
        }
    ];
}
exports.getTypes = getTypes;
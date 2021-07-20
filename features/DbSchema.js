let getColumns = () => {
    return [
        {
            name: 'int',
            value: 'xsi:type="int" name="" unsigned="true" nullable="false" padding="10" identity="true" comment=""/>'
        },
        {
            name: 'smallint',
            value: 'xsi:type="smallint" name="" padding="5" nullable="false" default="0" comment=""/>'
        },
        {
            name: 'decimal',
            value: 'xsi:type="decimal" name="" scale="4" precision="12" default="0.0000" unsigned="false" nullable="false" comment=""/>'
        },
        {
            name: 'text',
            value: 'xsi:type="text" name="" nullable="true" comment=""/>'
        },
        {
            name: 'timestamp',
            value: 'xsi:type="timestamp" name="" on_update="false" comment=""/>'
        },
        {
            name: 'varchar',
            value: 'xsi:type="varchar" name="" length="255" comment=""/>'
        },
    ];
}
let getConstraints = () => {
    return [
        {
            name: 'primary',
            value: 'xsi:type="primary" referenceId="PRIMARY">\n\t<column name="entity_id"/>\n</constraint>'
        },
        {
            name: 'foreign',
            value: 'xsi:type="foreign" referenceId="" table="" column="" referenceTable="" referenceColumn="" onDelete="CASCADE"/>'
        }
    ];
}
let getTable = () => {
    return [
        {
            name: 'table',
            value: 'name="" resource="default" engine="innodb" comment="">'
        }
    ];
}
let getTypes = () => {
    return ['table', 'column', 'constraint']
}
exports.getColumns = getColumns;
exports.getConstraints = getConstraints;
exports.getTable = getTable;
exports.getTypes = getTypes;
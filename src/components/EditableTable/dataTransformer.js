class dataTransformer
{
    static get internalFields() {
        return [
            '__editMode',
            '__loading',
            '__name',
            'key'
        ];
    }
    static data2model = (inputData) => {
        let outputData = [], outputRow, key = 0;
        for (const row of inputData) {
            outputRow = Object.assign({__editMode: false, __loading: false}, row);
            for (const cell in row) {
                outputRow[cell] = {
                    __editMode: false,
                    __loading: false,
                    __name: cell,
                    value: row[cell]
                }
            }
            outputRow.key = key++;
            outputData.push(outputRow);
        }
        return outputData;
    };

    static pureRow = (modelRow) => {
        let row = {};
        Object.entries(modelRow).forEach(([columnName, columnValue]) => {
            if(dataTransformer.internalFields.indexOf(columnName) < 0) {
                row[columnName] = columnValue.value;
            }
        });
        return row;
    }
}

export default dataTransformer;

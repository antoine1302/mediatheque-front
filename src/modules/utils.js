
export function collectionAsKeyValue(data, strKey, strVal){

    return data.map((entity) => {

        let computedLabel = '';

        strVal.forEach((elmt) => {
            computedLabel += entity[elmt] + ' ';
        });

        return {
            value: String(entity[strKey]),
            label: computedLabel
        };
    });
}

export function arrayRemove(arr, index) {

    return arr.filter(function(ele, i){
        if(i !== index){
            return ele;
        }
    });

}
const texts = ['Title', 'name', 'symbol'];
    const numbers = ['market_capital', 'dominance', 'Percentage', 'm_cap', 'price', 'volume_7d', 'volume_24h','change_7d', 'change_24h', 'v_change_24h', 'volume', 'avg_p_change', 'm_cap_change', 'v_change'];
    const percentages = ['Dominance', 'Percentage', 'change_7d', 'change_24h', 'v_change_24h', 'avg_p_change', 'm_cap_change', 'v_change']
export function formatData(data, type){
    
    let formattedData;
    if(texts.indexOf(type) !== -1){
        formattedData = formatText(data)
    } else if(numbers.indexOf(type) !== -1){
        formattedData = formatNumber(data, type);
    } else{
        formattedData = data
    }
    return formattedData;
}

function formatText(text) {
    const words = text.split('_');
    const formattedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedText.join(' ');
}

function formatNumber(number, type) {
    if (percentages.indexOf(type) !== -1) {
        if (number === undefined || number === null) {
            return '   -';
        }
        return ` ${number.toFixed(2)} %`
    } else {
      if (number >= 1e12) {
        return `$ ${(number / 1e12).toFixed(1)} T`;
    } else if (number >= 1e9) {
        return `$ ${(number / 1e9).toFixed(1)} B`;
    } else if (number >= 1e6) {
        return `$ ${(number / 1e6).toFixed(1)} M`;
    } else if (number >= 1e3) {
        return `$ ${(number / 1e3).toFixed(1)} K`;
    } else if (number === undefined || number === null) {
        return '   -';
    }else {
        return `$ ${number.toFixed(2)}`;
    }  
    } 
}
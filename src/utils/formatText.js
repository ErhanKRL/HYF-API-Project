export function formatText(text) {
    const words = text.split('_');
    const formattedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedText.join(' ');
}
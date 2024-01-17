export function checkDataTimeStamp(timeStamp) {
    const timestampDate = new Date(timeStamp);
    const currentDate = new Date();
    const timeDifference = currentDate - timestampDate;  
    const isUpToDate = timeDifference <= 240 * 60 * 1000;
  
    return isUpToDate;
}
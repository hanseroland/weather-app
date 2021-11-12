export const  getDayName = (dateStr, locale) =>
{

   
    const date = new Date(dateStr);
    Date.parse();

    return date.toLocaleDateString(locale, { weekday: 'long' });        
};

export const formatDate = (date) =>{
//AAAA-MM-JJ  MM/JJ/AAAA
    const dateSplit = date.split('-');
    const newDate = dateSplit[1]+'/'+dateSplit[2]+'/'+dateSplit[0];
    return newDate;
}


export const getFiveDays = (jour) =>{

      const daysMap = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi"
      ];
      const nameDay = getDayName(formatDate(''+jour+''), undefined)

         for(let i=0; i<daysMap.length; i++ ){
  
                     if(nameDay == daysMap[i]){

                          return  daysMap[i]
                     }
                }

}
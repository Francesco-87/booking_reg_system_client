import {allergensArray} from "./Images";


// function to distinguish between the 14 allergenns from the database table; /replacable if a better method is found
export function evaluateAllergens(allergen) {

    let allergens = [];


    if(allergen.celery){
        allergens[0] =allergensArray[0]
    }
    if(allergen.crustaceans){
        allergens[1] = allergensArray[1]
    }
    if(allergen.egg){
        allergens[2] =allergensArray[2]
    }
    if(allergen.fish){
        allergens[3] =allergensArray[3]
    }
    if(allergen.gluten){
        allergens[4] = allergensArray[4]
    }
    if(allergen.lupin){
        allergens[5] = allergensArray[5]
    }
    if(allergen.milk){
        allergens[6] =allergensArray[6]
    }
    if(allergen.moluscs){
        allergens[7] = allergensArray[7]
    }
    if(allergen.mustard){
        allergens[8] = allergensArray[8]
    }
    if(allergen.nuts){
        allergens[9] = allergensArray[9]
    }
    if(allergen.peanuts){
        allergens[10] = allergensArray[10]
    }
    if(allergen.sesame){
        allergens[11] = allergensArray[11]
    }
    if(allergen.soya){
        allergens[12] =allergensArray[12]
    }
    if(allergen.sulphites){
        allergens[13] = allergensArray[13]
    }

    return(allergens)
}

//format Date: the date passed from the database gets returned as europe standard
export function formatDateEurope(date) {

    let formatedDate = date;

    return (

        formatedDate.toLocaleString()
    )
}
//format Date: the date passed from the database gets returned as europe standard
export function formatDateDatabase(date) {
    let part1 = date.slice(0,2)
    let part2 = date.slice(3,5)
    let part3 = date.slice(6)

    return (
        part3  + "-" + part2 + "-" +  part1
    )
}

//format Date: from Database to Birthday
export function formatDateFromDatabase(date) {
    let parts = date.slice(0, 10).split('-')


    return (

        parts[2] +  "-" +parts[1]+ "-" + parts[0]
    )
}





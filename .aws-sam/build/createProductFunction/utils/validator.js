const validator = {
    validate(body, validators) {
        let validatorsKeys = Object.keys(validators);
        for(let i=0; i < validatorsKeys.length; i++) {
            
                let field = validatorsKeys[i];

                for(let j = 0;   j < validators[field].length; j++) {
                    let validatorName = validators[field][j];
                    let value = body[field];
                    console.log(validatorName);
                    if(validatorName === 'validateString') {
                        validateString(field, value);
                    }
                    if(validatorName === 'validateNumber') {
                        validateNumber(field, value);
                    }
                }
        }
    }
}


const validateString = (field,word) => {
    let regExp = /^[A-Za-z0-9]{3,120}$/;
    if(!regExp.test(word)) {
            throw new Error(`${field} incorrect format!`);
    }
}
const validateNumber = (field, number) => {
    let regExp = /^[0-9]{1,9}$/;
    console.log("OVDEEE");
    if(!regExp.test(number)) {
            throw new Error(`${field} incorrect format, ${field} must be number!`);
    }

}

exports.validateCreateBodyProduct = async (body, validators) => {

    try {
        validator.validate(body, validators);
    } catch(e) {
        throw new Error(e.message);
    }
  
}


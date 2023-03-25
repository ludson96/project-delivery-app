class ValidatingBody {
  constructor(keyList) {
    this.keyList = keyList;
    this.checkingBodyContents = this.checkingBodyContents.bind(this);
  }

  static keyChecker(reqWithBody, listOfKeys) {
    const list = [];
    let message;
  
    listOfKeys.forEach((item) => {
      if (!(item in reqWithBody.body)) list.push(item);
    });
    
    const listSizeOne = list.length === 1;
    const lstSzHgrOne = list.length > 1;
  
    if (listSizeOne) message = (`Body is missing the key ${list}.`).replaceAll(',', ', ');
    if (lstSzHgrOne) message = (`Body is missing the keys ${list}.`).replaceAll(',', ', ');
  
    return { message };
  }

  static saleBodyProductsArray(reqWithBody) {
    const arrayCheck = reqWithBody.body.products;
    let message;

    if (!Array.isArray(arrayCheck)) {
      message = 'Body needs the products key to be an array'; 
      return;
    }

    const isobj = arrayCheck.some((item) => Object.keys(item).length > 0);

    if (!isobj) {
      message = 'Values inside array needs to be an object';
      return;
    }

    return { message };
  }

  static objsInArrayCheck(reqWithBody) {
    const arrayCheck = reqWithBody.body.products;
    let message;
  
    arrayCheck.forEach((item) => {
      if (!('productId' in item)) message = 'A Key of an object in array needs to be productId';
      
      if (!('quantity' in item)) message = 'A Key of an object in array needs to be quantity';
    });
  
    return { message };
  }

  checkingBodyContents(req, res, next) {
    const one = ValidatingBody.keyChecker(req, this.keyList);
    if (one.message) return res.status(400).json({ message: one.message });
  
    const two = ValidatingBody.saleBodyProductsArray(req);
    if (two.message) return res.status(400).json({ message: two.message });
  
    const three = ValidatingBody.objsInArrayCheck(req);
    if (three.message) return res.status(400).json({ message: three.message });
  
    next();
  }
}

module.exports = {
  ValidatingBody,
};
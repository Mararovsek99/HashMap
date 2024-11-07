// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
//   }
  
  class CreateHash{
    constructor(array){
        this.array = array;
        this.map = {};         
        this.size = 0;                
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
      } 
  }

  const myHash = new CreateHash();

  const newValue = myHash.hash("carlos");

  console.log(newValue);
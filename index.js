
  
 export class CreateHash{
    constructor(){
        
        this.capacity = 0;         
        this.size = 16;    
        this.buckets = Array(this.size).fill().map(() => new LinkedList());            
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }
     
        return hashCode;
      }
      set(key,value){
        let newBucket = this.hash((key));
        
        if (this.has(key)) {
           let keyIndex = this.buckets[newBucket].find(key);
           this.buckets[newBucket].insertAt(value, keyIndex);
           this.checkCapacity();
           return;
        }
        else{
        this.buckets[newBucket].append(key,value);
        this.capacity += 1;
        this.checkCapacity();
        return;
        }
        
      }
      checkCapacity(){
        let loadFactor = 0.75;
        let maxBuckets = Math.floor(this.size * loadFactor);
        let addBuckets = 8;
        if(this.capacity > maxBuckets){
            this.buckets.push(...Array(addBuckets).fill().map(() => new LinkedList()));
            this.size = this.size + addBuckets;
        }
      }
      get(key){
        let getBucket = this.hash(key);
        let bucket = this.buckets[getBucket];
        if (bucket.find(key) || bucket.find(key) === 0) {
            let nodeIndex = bucket.find(key);
            let node = bucket.at(nodeIndex);
            return node.value;
        }
        else{
            return null;
        }    
      } 
      has(key){
        let getBucket = this.hash(key);
        let bucket = this.buckets[getBucket];

        if (bucket.find(key) || bucket.find(key) === 0) {
            return true;
        }
        else{
            return false;
        }    
      }
      remove(key){
        if (this.has(key)) {
            let getBucket = this.hash(key);
            let bucket = this.buckets[getBucket];

            let index = bucket.find(key);
            bucket.removeAt(index);
            this.capacity = this.capacity - 1;
            return true;
            
        }
        else{
            return false;
        }
      }
      length(){
        return this.capacity;
      }
      clear(){
        this.capacity = 0;         
        this.size = 16;    
        this.buckets = Array(this.size).fill().map(() => new LinkedList());
        return;
      }
      keys(){
        let keys = [];
        const buckets = this.buckets;

        buckets.forEach(element => {
            if (element.getKeys()) {
                let newKeys = element.getKeys();
                keys = [...keys, ...newKeys];
            }
        });
        return(keys);
      }
      values(){
        let values = [];
        const buckets = this.buckets;

        buckets.forEach(element => {
            if (element.getKeys()) {
                let newValues = element.getValues();
                values = [...values, ...newValues];
            }
        });
        return(values);
      }
      entries(){
        let entries = [];
        const buckets = this.buckets;

        buckets.forEach(element => {
            if (element.getKeys()) {
                let newValues = element.getEntries();
                entries = [...entries, ...newValues];
            }
        });
        return(entries);
      }
  }























  class Node{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
class LinkedList{


    constructor(){
        this.head = null
    }


    append(key,value){
        const newNode = new Node(key,value);
        if (!this.head) {
            this.head = newNode;
        }
    else{
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = newNode;
    }}


    prepend(value){
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        }else{
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    size(){
        let counter = 0;
        if (!this.head) {
            return 0;
        }
        else{
           let current = this.head;
            while(current){
                counter += 1;
                current = current.next;
            }
            return counter;
        }
    }  

    
    head(){
        return this.head;
    }


    tail(){
        if(this.head){
           let current = this.head;
            while(current.next){
                current = current.next;
            }
            return current;
        }
        else{
            return null;
        }
    }

    at(index){
        if(index > this.size()){
            return null;
        }
        if (!this.head) {
            return null;
        }
        else{
            let  current = this.head;
            for (let i = 0; i < index; i++) {
               current = current.next;
            }
            return current;
        }
    }
    pop(){
        if(!this.head){
            return null;
        }
        if(!this.head.next){
            const removedNode = this.head;
            this.head = null;
            return removedNode;
        }
        else{
            let current = this.head;
        while(current.next.next){
            current = current.next;
        }
        const removedNode = current.next;
        current.next = null;
        }
        return removedNode;
    }
    getKeys(){
        let keys = [];
        if (!this.head) {
            return;
        }
        else{
            let current = this.head;
            while(current){
                let key = current.key;
                keys.push(key);
                current = current.next;
            }
            return keys;
        }
    }
    getValues(){
        let values = [];
        if (!this.head) {
            return;
        }
        else{
            let current = this.head;
            while(current){
                let value = current.value;
                values.push(value);
                current = current.next;
            }
            return values;
        }
    }
    getEntries(){
        let entries = [];
        if (!this.head) {
            return;
        }
        else{
            let current = this.head;
            while(current){
                let value = current.value;
                let key = current.key;
                let newEntry = [key, value];
                entries.push(newEntry);
                current = current.next;
            }
            return entries;
        }
    }
    contains(value){
        if (!this.head) {
            return false;
        }
        else{
            let current = this.head;
            while(current){
                if(current.value === value){
                    return true;
                }
                else{
                    current = current.next;
                }
            }
            return false;
        }
    }
    find(key){
        if(!this.head){
            return null;
        }
        let counter = 0;
        let current = this.head;
        while(current){
            if(current.key === key){
                return counter;
            }
            else{
                current = current.next;
                counter += 1;
            }
        }
        return null;
    }
    toString(){
        if(!this.head){
            return null;
        }
        if(!this.head.next){
            let string = (` ${this.head.value} `);
            return string;
        }
        let string = "";
        let current = this.head;

        while(current){
            string = string + `( ${current.value} ) -> `;
            current = current.next;
        }
        string = string + `null`;
        return string;
    }
        //extra credit --------------------------------------
    insertAt(value, index){

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        current.value = value;
    }
    removeAt(index){
        
        if(index >= this.size()){
            console.log("You don`t have that many nodes!");
            return ;
        }
        if (!this.head) {
            return null;
        }
        if (this.head.next === null) {
            const removed = this.head;
            this.head = null;
            return removed; 
        }
        if (index === 0) {
            const removed = this.head;
            this.head = this.head.next;
            return removed; 
        }
        
        let counter = 0;
        let current = this.head;
        let oneBack = this.head;

        while(current){
            while(counter < index){       
                oneBack = current;          
                current = current.next;  
                counter += 1;
            }
            oneBack.next = current.next;
            return (this.toString());

        }
    }

}

 
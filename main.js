const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;

        this.hash=this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'01/01/2018','Genesis block',0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let mshCoin= new Blockchain();
mshCoin.addBlock(new Block(0,'10/01/2011',{amount:0}));
mshCoin.addBlock(new Block(1,'11/01/2011',{amount:1}));
mshCoin.addBlock(new Block(2,'12/01/2011',{amount:2}));

console.log(JSON.stringify(mshCoin,null,4));
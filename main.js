const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timeStamp, data, previousHash= "") {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
         return new Block(0, "09/02/2020", "Genesis block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let zachyCoin = new Blockchain();
zachyCoin.addBlock(new Block(1, "10/02/2020", { amount: 4 }));
zachyCoin.addBlock(new Block(2, "11/02/2020", { amount: 10 }));

console.log("Is blockChain valid? " + zachyCoin.isChainValid());

//console.log(JSON.stringify(zachyCoin, null, 4));
import { TRANSACTIONPOOLCOUNT, TRANSACTIONPOOLMAPCOUNT } from "../constants/transactionBatchCounts.js";
import { batchTx } from "../smart-contract/blockchain.js";

class TransactionPool {
    constructor () {
        this.txPool = [];
        this.txPoolMap = [];

    }

    addTxToPool(transaction) {
        if (this.txPool.length < TRANSACTIONPOOLCOUNT) {
            this.txPool.push(transaction);
        } else {
            this.txPoolMap.push([...this.txPool]);
            this.txPool = [];

            this.txPool.push(transaction);
        }
    }

    sendBatchTx() {
        if (this.txPoolMap.length >= TRANSACTIONPOOLMAPCOUNT) {
            const tmpTxList = this.txPoolMap;
            
            this.txPoolMap = [];
            batchTx(tmpTxList);
        }
    }
}

export default TransactionPool;

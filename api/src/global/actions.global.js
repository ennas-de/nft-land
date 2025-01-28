import TransactionPool from "./transactionPool.js";
import { resetScanCounts, resetTokenBalancess } from "../services/nft.service.js";


export const transactionPool = new TransactionPool();

export const globalActions = () => {
    setInterval(() => transactionPool.sendBatchTx(), 980000); // checked every 5 mintues

    setInterval(() => resetScanCounts(), 6400); // reset daily

    setInterval(() => resetTokenBalancess(), 980000); // reset monthly
}




async function payload() {
    return new Promise((resolve) => {
        setTimeout(() => {console.log(123)},  5000);

    })
}

class Queue {
   // concurrency = 20;
    promises = [];
    qSize = 0;

    constructor(concurrency = 20) {
        this.concurrency = concurrency;
    }

    get fullQueue() {
        return this.qSize === this.concurrency;
    }

    enqueue(item) {
        if(this.concurrency === null || this.promises.length < this.concurrency) {
            return this.promises.push(item);
        }
        return this.fullQueue;
    }

    fulfilled() {
        console.log('fulfilled')
        return this.qSize -= 1;
    }

    trim() {
        this.promises.shift();
    }
    logging() {
        this.qSize += 1;
        return this.promises[0];
    }
}

const q = new Queue();

for(let i = 0; i < 40; i++){
    q.enqueue(payload);
    if (!q.fullQueue) {
        q.logging().call().then(q.fulfilled());
        q.trim();
    }
    console.log(q.fullQueue);
}





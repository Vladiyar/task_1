let test = 0
async function payload() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('potato ' + test)
            test++
        },  Math.random() * 2000);

    })
}

class Queue {
    concurrency;
    tasks = [];
    qSize = 0;

    constructor(concurrency = 5) {
        this.concurrency = concurrency;
    }

    isFullQueue() {
        return this.qSize === this.concurrency;
    }

    enqueue(task) {
      this.tasks.push(task);
      if (this.isFullQueue()) {
        return;
      }
      this.#execute();
    }

    fulfilled(value) {
        console.log(value + ' fulfilled')
        this.qSize -= 1;
        this.#execute()
    }

    trim() {
        this.tasks.shift();
    }

    #execute() {
        if (this.tasks.length < 1) {
            return;
        }
        this.qSize += 1;
        this.tasks[0].call().then(
            (value) => {
                console.log(value, 'this is the task length right now ' + this.tasks.length + ' and qSize is ' + this.qSize)
                this.fulfilled(value);
            });
        this.trim()
    }

    onResolve() {
    }
}

const q = new Queue();

for(let i = 0; i < 10; i++){
    q.enqueue(payload);
}


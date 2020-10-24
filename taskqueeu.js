/**
* 简单的队列 带sleep功能
*/
class Person {
    taskQueue = [];

    constructor (name) {
        this.taskQueue.push(() => this.sayHi(name));
        this.runTaskQueue();
    }

    nextTick () {

        if (this.taskQueue.length) {
            let task = this.taskQueue.shift();

            if (typeof task === 'function') {
                task();
                this.nextTick()
            } else if (typeof task === 'number') {
                console.log(`sleep ${task} second`);
                setTimeout(() => this.nextTick(), task * 1000)
            }

        }

    }

    runTaskQueue () {
        setTimeout(() => this.nextTick())
    }

    sleep (time) {
        this.taskQueue.push(time);
        return this
    }

    sleepFirst (time) {
        this.taskQueue.unshift(time);
        return this
    }

    sayHi (name) {
        console.log(`hello ${name}`);
        return this
    }

    eat (foot) {
        this.taskQueue.push(() => console.log(`I like eat ${foot}`))
       return this
    }

}

var p = (name) => new Person(name)

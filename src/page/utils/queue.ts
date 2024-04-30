import { sleep } from "./sleep";

interface QueueItem<T, R> {
  data: T;
  resolve: (result: R) => void;
}

export class Queue<T, R> {
  private queue: QueueItem<T, R>[] = [];

  constructor(
    private interval: number,
    private process: (data: T) => R,
  ) {}

  async push(data: T): Promise<R> {
    return new Promise<R>((resolve) => {
      const alreadyProcessing = this.queue.length > 0;
      this.queue.push({
        data,
        resolve,
      });
      if (!alreadyProcessing) this.processQueue();
    });
  }

  private async processQueue() {
    while (this.queue.length > 0) {
      try {
        const { data, resolve } = this.queue[0];
        const result = await this.process(data);
        resolve(result);
        await sleep(this.interval);
      } catch (exc: unknown) {
        console.error("Failed to process queue item, function:", this.process.name, ", exc:", exc);
      }
      this.queue.shift();
    }
  }
}

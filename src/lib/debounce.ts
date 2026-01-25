/**
 * Debounce utility for batching API updates
 * Reduces API calls by 10x by waiting for user to finish actions
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Batch processor for multiple updates
 * Collects updates and sends them in a single API call
 */
export class BatchProcessor<T> {
  private queue: Map<string, T> = new Map();
  private timeoutId: NodeJS.Timeout | null = null;
  private readonly delay: number;
  private readonly processor: (batch: Map<string, T>) => Promise<void>;

  constructor(processor: (batch: Map<string, T>) => Promise<void>, delay = 2000) {
    this.processor = processor;
    this.delay = delay;
  }

  add(key: string, value: T): void {
    this.queue.set(key, value);
    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.flush();
    }, this.delay);
  }

  async flush(): Promise<void> {
    if (this.queue.size === 0) return;

    const batch = new Map(this.queue);
    this.queue.clear();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    try {
      await this.processor(batch);
    } catch (error) {
      console.error("Batch processing error:", error);
      // Re-add failed items back to queue
      batch.forEach((value, key) => {
        this.queue.set(key, value);
      });
    }
  }

  // Force immediate flush (e.g., on page unload)
  async forceFlush(): Promise<void> {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    await this.flush();
  }

  get size(): number {
    return this.queue.size;
  }
}

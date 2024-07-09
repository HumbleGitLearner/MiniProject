import { Injectable } from "@angular/core";

@Injectable()
export class CacheService {
  prunables: Prunable[] = [];

  registerPrunable(prunable: Prunable) {
    this.prunables.push(prunable);
  }

  //HY
  pruneAll() {
    this.prunables.forEach((p) => p.pruneCache());
  }
}

export interface Prunable {
  pruneCache(): void;
}

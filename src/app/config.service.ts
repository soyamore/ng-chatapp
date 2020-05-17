import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config;

  constructor() {}

  public getConfig() {
    return this.config;
  }
}

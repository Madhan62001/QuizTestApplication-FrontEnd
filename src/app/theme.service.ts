import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light'; // Default theme
  themeChanged = new EventEmitter<string>();

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    console.log(this.currentTheme);
    this.themeChanged.emit(this.currentTheme);
  }

  getTheme(): string {
    return this.currentTheme;
  }
}

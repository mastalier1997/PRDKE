import { Component } from '@angular/core';
import { ThemeVariables, ThemeRef, lyl, StyleRenderer } from '@alyle/ui';
import {Router} from '@angular/router';

const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: lyl `{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.default}
        font-family: ${theme.typography.fontFamily}
        margin: 0
        direction: ${theme.direction}
      }
    }`,
    root: lyl `{
      display: block
    }`
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StyleRenderer]
})
export class AppComponent {
  readonly classes = this.sRenderer.renderSheet(STYLES, true);

  title = 'Moods';

  constructor(readonly sRenderer: StyleRenderer, private router: Router ) { }

  checkUrl() {
    if (this.router.url.includes('profile')) {
      return false;
    }
    return true;
  }

  checkUrl2() {
    if (this.router.url.includes('login') || this.router.url.includes('register')) {
      return false;
    }
    return true;
  }

}



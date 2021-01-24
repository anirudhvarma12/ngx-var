# `*ngxVar`

Angular developers often use `*ngIf="foo$ | async as foo` to consume an observable easily in templates. However, this approach does not work if your observable emits a boolean as the `ngIf` will hide the template when the source observable emits a falsy value.

`*ngxVar` allows developers to easily consume any observable (or static values) regardless of the type.

# Installation
```
npm i --save ngx-var
```

## Import the module

```ts
import { NgxVarModule } from "ngx-var"

@NgModule({
  imports: [NgxVarModule],
})
class AppModule {}
```

# Examples
(Examples taken from tests)

## TestComponent

```ts
class TestComponent {
  numberObservable$: Observable<number>;
  boolObservable$: Observable<boolean>;
  sampleString = 'aa';
  sampleFunc = (a: number, b: number) => a * b;
}
```

## Use with a single boolean observable 

```html
<ng-container *ngxVar="boolObservable$ | async as bool">
    <span>{{bool ? 'true':'false'}}</span>
</ng-container>`
```

## Use with multiple values

```html
<ng-container *ngxVar="{ a: numberObservable$ | async, b: sampleString } as data">
    {{data.a}} {{data.b}}
</ng-container>
```
* Note: As you can see, `sampleString` is not an observable value, but can still be used.

## Use with `let` syntax

```html
<span *ngxVar="sampleFunc(5, 5); let data">
    {{data}}
</span>
```

# Development

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# LICENSE

The MIT License (MIT)

Copyright (c) 2021 Anirudh Varma

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

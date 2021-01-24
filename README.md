# `*ngxVar`

Angular developers often use `*ngIf="foo$ | async as foo` to consume an observable easily in templates. However, this approach does not work if your observable emits a boolean as the `ngIf` will hide the template when the source observable emits a falsy value.

`*ngxVar` allows developers to easily consume any observable (or static values) regardless of the type.

# Installation
// TODO

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
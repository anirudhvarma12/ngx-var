import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export class Context<T = unknown> {
  /**
   * The `$implicit` property powers the default `let-` syntax.
   * Eg:
   *
   * ```
   * <ng-container *ngxVar="isEnabled$ | async; let enabled">
   * ```
   *  or
   * ```
   * <ng-container *ngxVar="isEnabled$ | async; let-enabled=ngxVar>
   * ```
   */
  $implicit: T;
  /**
   * The name of this property *must* match the selector of the directive. This is
   * because Angular desugars the microsyntax with this assumption. For Eg:
   *
   * ```
   * <ng-container *ngxVar="isEnabled$ | async as enabled">
   * ```
   * is syntactic sugar for -
   *
   * ```
   * <ng-container *ngxVar="isEnabled$ | async" let-enabled="ngxVar">
   * ```
   *
   */
  ngxVar: T;
}

@Directive({
  selector: '[ngxVar]',
})
export class NgxVarDirective<T = unknown> implements OnInit {
  private _context = new Context<T>();

  @Input()
  set ngxVar(value: T) {
    this._context.$implicit = value;
    this._context.ngxVar = value;
  }

  constructor(
    private _vcr: ViewContainerRef,
    private _templateRef: TemplateRef<Context<T>>
  ) {}

  ngOnInit() {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }

  /** @internal */
  public static ngxVarUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `ngxVar` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `ngxVar` structural directive renders its template, the type of the expression bound
   * to `ngxVar` should be narrowed in some way. For `ngxVar`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `ngxVar`.
   */
  static ngTemplateGuard_ngxVar: 'binding';

  /**
   * Asserts the correct type of the context for the template that `ngxVar` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `ngxVar` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(
    dir: NgxVarDirective<T>,
    ctx: any
  ): ctx is Context<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }
}

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
  private _context = new Context();

  @Input()
  set ngxVar(value: T) {
    this._context.$implicit = value;
    this._context.ngxVar = value;
  }

  constructor(
    private _vcr: ViewContainerRef,
    private _templateRef: TemplateRef<Context>
  ) {}

  ngOnInit() {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }
}

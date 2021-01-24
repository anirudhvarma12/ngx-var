import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NgxVarDirective } from './ngx-var.directive';
import { NgxVarModule } from './ngx-var.module';

@Component({
  template: '',
  selector: 'ngx-var-test',
})
class TestComponent {
  @ViewChild(NgxVarDirective) ngxVarDirective: NgxVarDirective;
  numberObservable$: Observable<number>;
  boolObservable$: Observable<boolean>;
  sampleString = 'aa';
  sampleFunc = (a: number, b: number) => a * b;
}

@NgModule({
  declarations: [TestComponent],
  imports: [NgxVarModule, CommonModule],
  exports: [NgxVarModule, TestComponent],
})
class TestModule {}

describe('NgxVarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    });
  });

  afterEach(() => {
    fixture = null;
  });

  it('should create Module', () => {
    expect(new NgxVarModule()).toBeTruthy();
  });

  it('should work with ng-containers', async(() => {
    const template = `<ng-container *ngxVar="boolObservable$ | async as bool">
                        <span>{{bool?'true':'false'}}</span>
                      </ng-container>`;
    fixture = createComponentInstance(template);
    getComponent().boolObservable$ = of(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe('false');
  }));

  it('should work with mutliple values', async(() => {
    const template = `<ng-container *ngxVar="{ a: numberObservable$ | async, b: sampleString } as data">
                      {{data.a}} {{data.b}}
                      </ng-container>`;
    fixture = createComponentInstance(template);
    getComponent().numberObservable$ = of(10);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('10 aa');
  }));

  it('should work with functions', async(() => {
    const template = `<span *ngxVar="sampleFunc(5, 5) as data">
                      {{data}}
                      </span>`;
    fixture = createComponentInstance(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('25');
  }));

  it('should work with let- syntax', async(() => {
    const template = `<span *ngxVar="sampleFunc(5, 5); let data">
                      {{data}}
                      </span>`;
    fixture = createComponentInstance(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('25');
  }));

  it('should work with let- reassignment syntax', async(() => {
    const template = `<span *ngxVar="sampleFunc(5, 5); let data=ngxVar">
                      {{data}}
                      </span>`;
    fixture = createComponentInstance(template);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('25');
  }));
});

function createComponentInstance(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template },
  }).createComponent(TestComponent);
}

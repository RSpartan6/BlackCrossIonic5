import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalalumnoPage } from './calalumno.page';

describe('CalalumnoPage', () => {
  let component: CalalumnoPage;
  let fixture: ComponentFixture<CalalumnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalalumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

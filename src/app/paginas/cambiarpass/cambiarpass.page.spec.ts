import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambiarpassPage } from './cambiarpass.page';

describe('CambiarpassPage', () => {
  let component: CambiarpassPage;
  let fixture: ComponentFixture<CambiarpassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarpassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

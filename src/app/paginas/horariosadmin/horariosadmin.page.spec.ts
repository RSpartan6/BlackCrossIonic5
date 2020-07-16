import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HorariosadminPage } from './horariosadmin.page';

describe('HorariosadminPage', () => {
  let component: HorariosadminPage;
  let fixture: ComponentFixture<HorariosadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosadminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HorariosadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

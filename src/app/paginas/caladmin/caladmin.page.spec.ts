import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaladminPage } from './caladmin.page';

describe('CaladminPage', () => {
  let component: CaladminPage;
  let fixture: ComponentFixture<CaladminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaladminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaladminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
